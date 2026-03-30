import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { TokenMismatchError } from "../error/TokenMismatchError";
import { InsertConflictPolicy, UpdatePolicy } from "./Common";
import type { TokenComparator } from "./Token";
import type { TokenNode } from "./TokenNode";
import { TokenSet } from "./TokenSet";

/**
 * Options for adding contents to a {@link DesignSystem}.
 * @property {?InsertConflictPolicy} insertPolicy Policy to handle conflicts if a token with the same UID exists.
 * @property {?boolean} sortToken                 Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn         Custom sorting logic. Defaults to alphanumeric by name.
 */
type DesignSystemAddOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Options for updating the contents of a {@link DesignSystem}.
 * @property {?UpdatePolicy} updatePolicy Policy to handle conflicts if a tokenset does not exist.
 * @property {?boolean} sortToken         Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type DesignSystemUpdateOptions = {
    updatePolicy?: UpdatePolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Token type returned after hydrating a reference {@link TokenNode}.
 * @property {string} recursivePath     The entire path that was traversed to get to the primitive.
 *                                      For example: `semantic/button.danger` -> `alias/primitives/red.600`.
 * @property {string} relativePath      The first path that was traversed to get to the primitive.
 *                                      For example: `semantic/button.danger` -> `alias/danger.500`.
 * @property {TokenNode} primitiveToken The primitive token node.
 */
type HydratedToken = {
    recursivePath: string;
    relativePath: string;
    primitiveToken: TokenNode;
};

// TODO: Add lookup caching using a map
// TODO: Add reference identity map update with init, add, delete, update and clear.
// TODO: Add tokenReference caching when updating, deleting and clearing token.
/**
 * The root container for a Design System.
 * Orchestrates multiple {@link TokenSet} collections and ensures global naming integrity.
 *
 * @remarks
 * **Architecture Note:**
 * This class acts as a Facade for managing design tokens across different levels
 * and categories. It enforces a unique naming constraint across all child sets.
 * * @category Core
 *
 * @property {string} name    The unique name of the design system.
 */
export class DesignSystem {
    name: string;
    /** @internal Internal storage for token collections. */
    private _tokenSets: TokenSet[];
    /** @internal Internal flag for determining if the design system is hardened(immutable). */
    #isHardened: boolean;

    /** @internal Internal cache for groups. */
    #groupCache: Map<string, string>;

    /** @internal Internal cache for reference tokens. */
    #tokenReferenceCache: Map<string, { tokenSet: TokenSet; token: TokenNode }>;

    /** @internal Caching store for reference dependency within the design system. */
    #reverseTokenReferenceCache: Map<string, Set<TokenNode>>;

    /**
     * @param name         Unique name identifier for the Design System. Must not be empty.
     * @param tokenSets    Optional initial collections to seed the system.
     * @throws {IllegalArgumentError} If `name` is null, undefined, or an empty string.
     */
    constructor(name: string, tokenSets: TokenSet[] = []) {
        if (!name)
            throw new IllegalArgumentError(
                "Design system needs a name to be initialized!",
            );
        this.name = name;
        this._tokenSets = [];
        this.#isHardened = false;
        this.#groupCache = new Map();
        this.#tokenReferenceCache = new Map();
        this.#reverseTokenReferenceCache = new Map();

        for (const tokenSet of tokenSets) {
            this._tokenSets.push(tokenSet);

            // Stores the group name and id as a cache.
            if (tokenSet.type === "group")
                tokenSet.tokens.forEach((token) =>
                    this.#groupCache.set(token.uid, token.name),
                );
            tokenSet.tokens.forEach((token) => {
                // Cache the uid and token for forward referencing
                this.#tokenReferenceCache.set(token.uid, {
                    tokenSet,
                    token,
                });

                // Cache the reference for reverse referencing
                this.#updateReverseReferenceCache(token);
            });
        }
    }

    /**
     * @interal Update the reverse reference token cache with the appropriate {@link TokenNode} entry.
     * @param token The token to update the cache with
     */
    #updateReverseReferenceCache(token: TokenNode) {
        // If the token has a reference push it to the appropriate cache entry
        if (token.reference)
            if (this.#reverseTokenReferenceCache.has(token.reference))
                this.#reverseTokenReferenceCache
                    .get(token.reference)
                    ?.add(token);
            else {
                const cachedSet: Set<TokenNode> = new Set();
                cachedSet.add(token);
                this.#reverseTokenReferenceCache.set(
                    token.reference,
                    cachedSet,
                );
            }
    }

    /**
     * Integrates a {@link TokenSet} into the system.
     * @remarks
     * If {@link InsertConflictPolicy.MERGE} is used, the existing set is updated
     * in-place using the target set's tokens.
     *
     * @param {TokenSet} tokenSet                The collection to add.
     * @param {DesignSystemAddOptions} options   Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If tokens level and type does not match while **merging**.
     */
    addTokenSet(
        tokenSet: TokenSet,
        {
            insertPolicy = InsertConflictPolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: DesignSystemAddOptions = {},
    ) {
        if (Object.isFrozen(this))
            throw new Error("Cannot modify a locked Design System.");
        let tokenSetIndex = this.getIndex(tokenSet.name);
        if (tokenSetIndex === -1) {
            this._tokenSets.push(tokenSet);
            tokenSetIndex = this._tokenSets.length - 1;
        } else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this._tokenSets[tokenSetIndex] = tokenSet;
        else if (insertPolicy === InsertConflictPolicy.MERGE)
            this._tokenSets[tokenSetIndex].mergeTokenSet(tokenSet, {
                insertPolicy,
            });
        else
            return console.warn(
                "Duplicate token found, and insertion policy is set `InsertionConflictPolicy.IGNORE`",
            );
        if (sortToken) this._tokenSets[tokenSetIndex].sort(compareFn);
        // Update the cache
        if (tokenSet.type === "group")
            tokenSet.tokens.forEach((token) =>
                this.#groupCache.set(token.uid, token.name),
            );
        tokenSet.tokens.forEach((token) => {
            this.#tokenReferenceCache.set(token.uid, {
                tokenSet,
                token,
            });
            this.#updateReverseReferenceCache(token);
        });
    }
    // TODO: Update group cache only while updating or adding groups

    /**
     * Recursively traverses through a tokens references, until a primitive token is retrieved, if it exists.
     * @param referenceToken The `reference token` to hydate with value.
     * @throws {@link IllegalArgumentError} If the passed in token is a primitive (i.e, There is no reference identifier.)
     */
    hydrateToken(referenceToken: TokenNode): HydratedToken {
        if (!referenceToken.reference)
            throw new IllegalArgumentError(
                "Primitive token cannot be hydrated",
            );
        const visitedNode = new Set(); // Contains reference id of the token nodes already visited. To prevent circular dependency.
        let currentToken = referenceToken;
        let fullPath = "";
        let relativePath = "";
        while (currentToken.reference && !visitedNode.has(currentToken)) {
            const nextTokenSet = this.#tokenReferenceCache.get(
                currentToken.reference,
            );

            // If there is no matching token then throw an error
            if (!nextTokenSet || !nextTokenSet.token)
                throw new Error("Token cannot be matched with a primitive.");

            if (relativePath.length === 0)
                relativePath += `${nextTokenSet.tokenSet.name}/${nextTokenSet.token.name}`;

            fullPath += nextTokenSet.tokenSet.name + "/";
            visitedNode.add(currentToken);

            // Replace the current token as the primitive
            currentToken = nextTokenSet.token;
        }
        // Add to recursive path the token name
        fullPath += currentToken.name;

        return {
            primitiveToken: currentToken,
            relativePath: relativePath,
            recursivePath: fullPath,
        };
    }

    /**
     * Get the group name for the matching ID.
     *
     * @param {string} id The ID to be get the name for.
     *
     * @returns The group name if it exists else undefined.
     */
    getGroupName(id: string): string | undefined {
        return this.#groupCache.get(id);
    }

    /**
     * Get the index of a tokenset if it exists.
     * @param {string} tokenSetName The name of the token set to match.
     * @returns -1 if no match is found else index of tokenset
     */
    getIndex(tokenSetName: string) {
        return this._tokenSets.findIndex((ts) => ts.name === tokenSetName);
    }

    /**
     * Remove a token set from the design system.
     * @param {TokenSet} tokenSet The token set to be removed
     */
    removeTokenSet(tokenSet: TokenSet) {
        if (Object.isFrozen(this))
            throw new Error("Cannot modify a locked Design System.");
        this._tokenSets = this._tokenSets.filter((curTS) => curTS != tokenSet);

        // Update the cache
        if (tokenSet.type === "group")
            tokenSet.tokens.forEach((token) =>
                this.#groupCache.delete(token.uid),
            );
    }

    /**
     * Update a tokenset with the given tokenset, if it exists.
     *
     * @param {string} tokenSetName                The name of the tokenset to update.
     * @param {TokenSet} newTokenSet               Token set to update.
     * @param {DesignSystemUpdateOptions} option   Configuration for conflict resolution and sorting.
     */
    updateTokenSet(
        tokenSetName: string,
        newTokenSet: TokenSet,
        {
            updatePolicy = UpdatePolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: DesignSystemUpdateOptions = {},
    ) {
        if (Object.isFrozen(this))
            throw new Error("Cannot modify a locked Design System.");
        const tokenSetIndex = this.getIndex(tokenSetName);
        if (tokenSetIndex !== -1) {
            const oldTokenSet = this._tokenSets[tokenSetIndex];

            this._tokenSets[tokenSetIndex] = newTokenSet;
            if (sortToken) this._tokenSets[tokenSetIndex].sort(compareFn);

            // Invalidate cache
            oldTokenSet.tokens.forEach((token) => {
                this.#groupCache.delete(token.uid);
                this.#tokenReferenceCache.delete(token.uid);
            });
            newTokenSet.tokens.forEach((token) => {
                if (token.value?.entityType === "group")
                    this.#groupCache.set(token.uid, token.name);
                this.#tokenReferenceCache.set(token.uid, {
                    tokenSet: newTokenSet,
                    token: token,
                });
            });
        } else if (updatePolicy === UpdatePolicy.INSERT)
            this.addTokenSet(newTokenSet, { sortToken, compareFn });
        else
            console.log(
                "No matching token found! Aborting operation(Update policy set to IGNORE).",
            );
    }

    /**
     * Get a tokenset from the design system with name used for identification.
     *
     * @param name    Then name to match for.
     * @returns The token set if it exists.
     */
    getTokenSet(name: string): TokenSet | undefined {
        const index = this.getIndex(name);
        return index === -1 ? undefined : this._tokenSets[index];
    }

    /**
     * Safely updates a TokenSet's name while checking for system-wide collisions.
     * @remarks
     * - Direct mutation is not recommended due to lack of collision checking.
     *
     * @param name      The current name of the set.
     * @param newName   The desired new name.
     * @throws {DuplicationError}       If the new name already exists.
     * @throws {IllegalArgumentError}   If the reference name does not exists.
     */
    updateTokenSetName(name: string, newName: string) {
        if (Object.isFrozen(this))
            throw new Error("Cannot modify a locked Design System.");
        const tokenSetIndex = this.getIndex(name);
        if (tokenSetIndex === -1)
            throw new Error(`TokenSet with ${name} doesn't exist.`);
        if (this._tokenSets.some((tk) => tk.name === newName))
            throw new Error(
                `Name collision: TokenSet with ${newName} already exists`,
            );
        this._tokenSets[tokenSetIndex].name = newName;
    }

    /**
     * Returns a read-only view of the token sets.
     * @returns A read-only view of the managed tokensets.
     */
    getTokenSets(): readonly TokenSet[] {
        return this._tokenSets;
    }

    /**
     * Serializes the entire Design System into a JSON string.
     * Includes all nested {@link TokenSet} and {@link TokenNode} data.
     */
    toJson(): string {
        return JSON.stringify({
            name: this.name,
            tokenSets: this._tokenSets.map((tks) => tks.toJsonString()),
            isHardened: this.#isHardened,
        });
    }

    /**
     * Reconstructs a full {@link DesignSystem} instance from a JSON string.
     * @param jsonString    The serialized data.
     * @returns A new DesignSystem instance or undefined if parsing fails.
     * @throws {Error} If the JSON structure is valid but the data violates system invariants.
     */
    static fromJson(jsonString: string): DesignSystem | undefined {
        const parsedData = JSON.parse(jsonString, (key, value) => {
            if (key === "tokenSets") {
                const tokenSets: TokenSet[] = [];
                for (const tokenSetStr of value) {
                    const tokenSet = TokenSet.fromJson(tokenSetStr);
                    tokenSet && tokenSets.push(tokenSet);
                }
                return tokenSets;
            }
            return value;
        });
        const ds = new DesignSystem(
            parsedData?.name,
            parsedData?.tokenSets || [],
        );
        if (parsedData.isHardened) ds.harden();

        return ds;
    }

    /**
     * Make a deep-copy of this Design System.
     * @returns A new instance of the Design System.
     */
    clone(): DesignSystem {
        return DesignSystem.fromJson(this.toJson())!!;
    }

    /**
     * Clear all collections from the Design System.
     * @remarks
     * **WARNING**: This is an irreversible process and will reset your Design System.
     */
    clearAll() {
        this._tokenSets = [];
        this.#groupCache.clear();
        this.#isHardened = false;
        this.#tokenReferenceCache.clear();
    }

    /**
     * Hardens the Design System, preventing any further internal or external mutations.
     * @remarks
     * - This performs a "Deep Freeze." Once locked, any attempt to modify tokens,
     * sets, or names will throw a runtime TypeError in strict mode.
     * - If you need mutation, use {@link clone} to create a copy of the Design System.
     */
    harden() {
        this.#isHardened = true;
        this._tokenSets.forEach((tks) => {
            tks.tokens.forEach(Object.freeze);
            Object.freeze(tks.tokens);
            Object.freeze(tks);
        });
        Object.freeze(this._tokenSets);
        Object.freeze(this);
    }

    /**
     * Unlinks any reference to a @see {@link TokenNode} and hydrates it with the corresponding primitive value.
     *
     * @param token The token to unlink to a primitive.
     *
     * @return The same token with reference replaced with a value.
     */
    unlinkToken(token: TokenNode): TokenNode {
        const visited = new Set(); // To prevent any circular dependency
        let currentToken: TokenNode | undefined = token;
        while (!visited.has(currentToken) && currentToken?.reference) {
            visited.add(currentToken);
            currentToken = this.#tokenReferenceCache.get(
                currentToken.reference,
            )?.token;
        }
        if (currentToken) {
            token.value = currentToken.value;
            token.reference = undefined;
        } else {
            throw new TokenMismatchError(
                "The token cannot be unlinked, as it does not reference a valid primitive.",
            );
        }
        return token;
    }
}
