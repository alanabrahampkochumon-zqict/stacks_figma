import { DuplicationError } from "../error/DuplicationError";
import { IllegalArgumentError } from "../error/IllegalArgumentError";
import { InsertConflictPolicy, UpdatePolicy } from "./Common";
import type { ExtendedTokenTypes, Levels, TokenComparator } from "./Token";
import {
    extendedTokens,
    isValidExtendedToken,
    isValidLevel,
    validateToken,
    validLevels,
} from "./Token";
import { createTokenNode, type TokenNode } from "./TokenNode";

/**
 * Options for updating the contents of a {@link TokenSet}.
 * @property {?UpdatePolicy} updatePolicy Policy to handle conflicts if a token does not exist.
 * @property {?boolean} sortToken Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type TokenSetUpdateOptions = {
    updatePolicy?: UpdatePolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};
// TODO: Refactor uniqueness check to run in Θ(N) time by taking into consideration the entire token
// TODO: Add uniqueness test for deserialization
/**
 * Options for adding contents to a {@link TokenSet}.
 * @property {?InsertConflictPolicy} insertPolicy Policy to handle conflicts if a token with the same UID exists.
 * @property {?boolean} sortToken Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type TokenSetAddOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Options for merging contents of a {@link TokenSet} with another.
 * @property {?InsertConflictPolicy} insertPolicy Policy to handle conflicts if a token with the same UID exists.
 * @property {?boolean} sortToken Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type TokenSetMergeOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * The allowed schema types for a {@link TokenSet}.
 * Either a specific design token category or a structural 'group'.
 */
type TokenSetType = ExtendedTokenTypes | "group";

/**
 * A strictly-typed collection of {@link TokenNode}s.
 * @remarks
 * **Invariants:**
 * - All nodes in a set must share the same `type`.
 * - A set cannot mix {@link Group} nodes and {@link Token} nodes.
 * - Names within a set should be unique.
 * @category Core
 *
 * @property {string} name          The unique name identifying this collection.
 * @property {TokenSetType} type    The mandatory schema for all members of this set.
 * @property {Levels} level         The elevation/hierarchy level (1-4). @see {@link Levels}.
 * @property {TokenNode[]} tokens   The internal collection of nodes..
 */
export class TokenSet {
    name: string;
    type: TokenSetType;
    level: Levels;
    tokens: TokenNode[];
    /* Internal map for storing name to uid map to prevent duplicate entry. */
    #tokenIDMap: Map<string, string>;

    /**
     * @param {string} name          Unique identifier for the set.
     * @param {TokenSetType} type    The expected type for all member tokens (Default: "number").
     * @param {Levels} level         The architectural level (Default: 1).
     * @param {TokenNode[]} tokens   Initial members (validated upon construction).
     *
     * @throws {IllegalArgumentError} If name is empty or initial tokens fail type validation.
     * @throws {DuplicationError}     If the token name is non-unique and the ID is unique.
     */
    constructor(
        name: string,
        type: TokenSetType = "number",
        level: Levels = 1,
        tokens: TokenNode[] = [],
    ) {
        if (!name)
            throw new IllegalArgumentError(
                `Name must be passed in for a tokenset`,
            );
        if (!isValidLevel(level))
            throw new IllegalArgumentError(
                `Invalid level: Level must be in ${validLevels}`,
            );

        this.#tokenIDMap = new Map();
        // Checks if any of the token set contains a unique id
        if (!this.checkAllTokenUniqueness(tokens))
            throw new DuplicationError(
                "Tokens cannot contain non-unique elements.",
            );

        this._validateToken(tokens, type);
        this.name = name;
        this.type = type;
        this.level = level;
        this.tokens = tokens;
    }

    /**
     * Add a node to the set while enforcing type consistency.
     *
     * @param {TokenNode} token              The node to insert.
     * @param {TokenSetAddOptions} options   Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If the token type does not match the set's {@link type}.
     * @throws {DuplicationError}     If the token name is non-unique and the ID is unique.
     */
    addToken(
        token: TokenNode,
        {
            insertPolicy = InsertConflictPolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: TokenSetAddOptions = {},
    ) {
        this._validateToken([token], this.type);
        const tokenIndex = this.getTokenIndex(token.uid);
        if (tokenIndex === -1 && !this._checkUniqueName(token.name))
            console.log(token);
        if (tokenIndex === -1 && !this._checkUniqueName(token.name))
            throw new DuplicationError(
                "A token with the same name already exists.",
            );
        else if (tokenIndex === -1) this.tokens.push(token);
        else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this.updateToken(token.uid, token);

        if (sortToken) {
            this.sort(compareFn);
        }
    }

    /**
     * Get the size of the current token set.
     * @returns Non-zero number if the token set is not empty; else 0.
     */
    size() {
        return this.tokens.length;
    }

    /**
     * Get the index of the token in the sset, if it exist.
     *
     * @param {string} tokenId The unique identifier of the token.
     *
     * @returns The index if the token is present; else -1.
     */
    getTokenIndex(tokenId: string) {
        return this.tokens.findIndex((t) => t.uid === tokenId);
    }

    /**
     * Remove a token from the set.
     * @param {TokenNode} token The token node to remove.
     */
    removeToken(token: TokenNode) {
        this.tokens = this.tokens.filter((t) => t !== token);
    }

    /**
     * Update a token with tokenId with the given token.
     * @remarks
     * **Important:** If the token is not in the tokenset, it will added a per option.updatePolicy.
     *
     * @param {string} tokenId               The unique identifier of the token.
     * @param {TokenNode} newToken           The token to update.
     * @param {TokenSetAddOptions} options   Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If the token type does not match the set's {@link type}.
     */
    updateToken(
        tokenId: string,
        newToken: TokenNode,
        {
            updatePolicy = UpdatePolicy.INSERT,
            sortToken = false,
            compareFn = undefined,
        }: TokenSetUpdateOptions = {},
    ) {
        this._validateToken([newToken], this.type);

        let tokenIndex = this.getTokenIndex(tokenId);
        if (tokenIndex !== -1) this.tokens[tokenIndex] = newToken;
        else
            switch (updatePolicy) {
                case UpdatePolicy.INSERT:
                    this.addToken(newToken);
                    break;
                case UpdatePolicy.IGNORE:
                    break;
            }
        if (sortToken) this.sort(compareFn);
    }

    /**
     * Re-orders the internal token collection.
     *
     * @param {TokenComparator} compareFn   The comparison logic. Defaults to a numeric-aware,
     *                                      case-insensitive alphanumeric sort (e.g., "red-10" comes before "red-20").
     */
    sort(
        compareFn: TokenComparator = (a, b) =>
            a.name.localeCompare(b.name, undefined, {
                numeric: true, // Treat numerics inside string as numbers
                sensitivity: "base",
            }),
    ) {
        this.tokens.sort(compareFn);
    }

    /**
     * Merges an external set into the current one.
     * @remarks
     * Both sets must have identical `name`, `type`, and `level` to be considered compatible for merging.
     *
     * @param {TokenSet} tokenSet   The source set to merge from.
     * @param {TokenSetAddOptions} options   Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If architectural metadata (name/type/level) does not match.
     */
    mergeTokenSet(
        tokenSet: TokenSet,
        {
            insertPolicy = InsertConflictPolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: TokenSetMergeOptions = {},
    ) {
        if (
            this.name !== tokenSet.name ||
            this.type !== tokenSet.type ||
            this.level !== tokenSet.level
        )
            throw new IllegalArgumentError(
                `TokenSet mismatch while merging: {${this.name}, ${this.type}, ${this.level}} != ${tokenSet.name}, ${tokenSet.type}, ${tokenSet.level}`,
            );
        for (const token of tokenSet.tokens) {
            this.addToken(token, { insertPolicy });
        }
        if (sortToken) this.sort(compareFn);
    }

    /**
     * Returns a JSON string representation of the current set.
     * @returns A JSON string.
     */
    toJsonString(): string {
        return JSON.stringify({
            name: this.name,
            type: this.type,
            level: this.level,
            tokens: this.tokens,
        });
    }

    /**
     * Reconstructs a {@link TokenSet} instance from a JSON string.
     *
     * @param {string} jsonString   A valid JSON representation of a TokenSet.
     *
     * @returns A new, validated instance of TokenSet.
     * @throws {SyntaxError} If the string is not valid JSON.
     * @throws {IllegalArgumentError} If the hydrated data fails level or type validation.
     */
    static fromJson(jsonString: string): TokenSet {
        const data = JSON.parse(jsonString);
        return new TokenSet(
            data?.name,
            data?.type,
            data?.level,
            data?.tokens?.map((token: TokenNode) =>
                createTokenNode(
                    token?.name,
                    token?.value,
                    token.uid,
                    token?.reference,
                    token?.parentId,
                ),
            ),
        );
    }

    /**
     * Validate a list of tokens are of the same type.
     * @remarks
     * Type must be the same among all the tokens and the parent token type.
     *
     * @private
     * @param {TokenNode[]} tokens The tokens to validate.
     * @param {TokenSetType} tokenType The parent token type to use for validation.
     *
     * @throws {IllegalArgumentError} If the tokens type is not the same across the set or the passed-in elements.
     */
    private _validateToken(tokens: TokenNode[], tokenType: TokenSetType) {
        // Parent Token Type validation
        if (!(tokenType === "group" || isValidExtendedToken(tokenType)))
            throw new IllegalArgumentError(
                `Invalid token type: Type must be in ${extendedTokens}`,
            );

        // Token Type validation
        let validationResult = false;
        if (tokenType === "group")
            validationResult = tokens.every(
                ({ value: tokenValue }) =>
                    tokenValue && tokenValue.entityType === "group",
            );
        else
            validationResult = tokens.every(
                ({ value: tokenValue }) =>
                    tokenValue &&
                    tokenValue.entityType === "token" &&
                    tokenValue.type === tokenType &&
                    validateToken(tokenValue.valueByMode, tokenValue.type),
            );

        if (!validationResult)
            throw new IllegalArgumentError(
                "Invalid token set. Make sure that all the tokens are of the same type and are valid.",
            );
    }

    /**
     * Perform check on whether the name is unique in the tokenset.
     *
     * @param {string} name The name to check.
     * @returns {boolean} True if the name is unique within the current tokenset.
     */
    _checkUniqueName(name: string): boolean {
        return !this.tokens.some((token) => token.name === name);
    }

    /**
     * Perform a uniqueness check on token against a this tokenset's internal collection.
     * **Invariants**
     * - A token is considered unique if it has the same name and ID.
     * - A token with same name but different ID will is not unique.
     *
     * @param {string} token The name to validate.
     * @returns {boolean} True if the name is unique within the current tokenset.
     */
    checkTokenUniqueness(token: TokenNode): boolean {
        if (
            this.#tokenIDMap.has(token.name) &&
            this.#tokenIDMap.get(token.name) !== token.uid
        )
            return false;
        this.#tokenIDMap.set(token.name, token.uid);
        return true;
    }

    /**
     * Perform a uniqueness check on every token against every other token in a given set of token.
     * **Invariants**
     * - A token is considered unique if it has the same name and ID.
     * - A token with same name but different ID will is not unique.
     *
     * @param {TokenNode[]} tokens The set of tokens to validate.
     * @returns {boolean} True if the name is unique within the current tokenset.
     */
    checkAllTokenUniqueness(tokens: TokenNode[]): boolean {
        for (const { name, uid } of tokens) {
            // If token is name is already in the set with a different ID, then it's not unique.
            if (
                this.#tokenIDMap.has(name) &&
                this.#tokenIDMap.get(name) !== uid
            )
                return false;

            // Add the id and name
            this.#tokenIDMap.set(name, uid);
        }

        return true;
    }
}
