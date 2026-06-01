import {DuplicationError} from "../error/DuplicationError";
import {IllegalArgumentError} from "../error/IllegalArgumentError";
import {InsertConflictPolicy, UpdatePolicy} from "./Common";
import {type ExtendedTokenType, type Levels, Token, type TokenComparator} from "./Token";
import {
    ExtendedToken,
    isValidLevel,
    validLevels,
} from "./Token";
import {
    type TokenNode,
} from "./TokenNode";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";

/**
 * Options for updating the contents of a {@link TokenSet}.
 * @property updatePolicy Policy to handle conflicts if a token does not exist.
 * @property sortToken Whether to re-sort the collection after the operation.
 * @property compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type TokenSetUpdateOptions = {
    updatePolicy?: UpdatePolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Options for adding contents to a {@link TokenSet}.
 * @property insertPolicy Policy to handle conflicts if a token with the same UID exists.
 * @property sortToken Whether to re-sort the collection after the operation.
 * @property compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type TokenSetAddOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Options for merging contents of a {@link TokenSet} with another.
 * @property insertPolicy Policy to handle conflicts if a token with the same UID exists.
 * @property sortToken Whether to re-sort the collection after the operation.
 * @property compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type TokenSetMergeOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * A strictly-typed collection of {@link TokenNode}s.
 * @remarks
 * **Invariants:**
 * - All nodes in a set must share the same `type`.
 * - Node names within a set should be unique.
 * - The name of the token set must be unique.
 */
export class TokenSet<T extends ExtendedTokenType> {
    name: string;
    type: T;
    level: Levels;
    modes: Set<string>;
    tokens: Token<T>[];
    /* Internal map for storing name to uid map to prevent duplicate entry. */
    #tokenIDMap: Map<string, ReferenceID>;
    #modes: Set<string>;

    /**
     * @param name   Unique identifier for the set.
     * @param type   The expected type for all member tokens (Default: "number").
     * @param level  The architectural level (Default: 1).
     * @param tokens Initial members (validated upon construction).
     *
     * @throws {IllegalArgumentError} If name is empty or initial tokens fail type validation.
     * @throws {DuplicationError}     If the token name is non-unique and the ID is unique.
     */
    constructor(
        name: string,
        type: ExtendedTokenType = ExtendedToken.number,
        level: Levels = 1,
        tokens: Token<T>[] = [],
    ) {
        if (!name)
            throw new IllegalArgumentError(`Name must be passed in for a TokenSet`);
        if (!isValidLevel(level))
            throw new IllegalArgumentError(`Invalid level: Level must be in ${validLevels}`);

        this.#tokenIDMap = new Map();
        this.#modes = new Set(); // TODO: Remove
        this.modes = new Set();

        // Checks if any of the token set contains a unique id
        if (!this.checkAllTokenUniqueness(tokens))
            throw new DuplicationError("Tokens cannot contain non-unique elements.");

        // Perform token validation
        this._validateToken(tokens, type)

        // Instantiate class members
        this.name = name;
        this.type = type as T;
        this.level = level;
        this.tokens = [];

        // Removes any duplicate tokens.
        const duplicates = new Set();
        for (const token of tokens) {
            if (!duplicates.has(token.name)) {
                duplicates.add(token.name);
                this.tokens.push(token);
            }
            // Add modes
            Object.keys(token.valueByMode).forEach(mode => {
                this.#addModeToAllTokens(mode)
            })
        }
    }

    /**
     * Add the given mode to all the TokenNode instances that are "token" type.
     *
     * @param mode The mode to add.
     *
     */
    #addModeToAllTokens(mode: string) {
        this.modes.add(mode) // Add the token to the current token set
        this.#modes.add(mode); // Add the mode if it doesn't exist. // TODO: Remove

        // Add the token to each token in the token set
        this.tokens.forEach((token) => {
            token.addMode(mode)
        });
    }

    /**
     * Add a node to the set while enforcing type consistency.
     *
     * @param token   The {@link Token} to insert.
     * @param options Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If the token type does not match the set's {@link type}.
     * @throws {DuplicationError}     If the token name is non-unique and the ID is unique.
     */
    addToken(
        token: Token<T>,
        {
            insertPolicy = InsertConflictPolicy.THROW,
            sortToken = false,
            compareFn,
        }: TokenSetAddOptions = {},
    ) {
        this._validateToken([token], this.type);

        const tokenIndex = this.getTokenIndex(token.uid);

        if (!this.checkTokenUniqueness(token) || tokenIndex !== -1) {
            if (insertPolicy === InsertConflictPolicy.IGNORE)
                return // Do nothing when the conflict policy is "ignore" and the current token is a duplicate
            else if (insertPolicy === InsertConflictPolicy.REPLACE)
                this.updateToken(token.uid, token);
            else
                throw new DuplicationError(
                    "A token with the same name already exists.",
                );
        } else {
            this.tokens.push(token);
        }

        if (sortToken) {
            this.sort(compareFn);
        }


        // Add a new mode from the token into the token group
        const modes = Object.keys(token.valueByMode);
        modes.forEach((mode) => {
            if (!this.#modes.has(mode)) this.#addModeToAllTokens(mode);
        });

        // Add all the existing modes to the current token
        this.#modes.forEach(mode => token.addMode(mode))
    }

    /**
     * Get the size of the current token set.
     *
     * @returns Non-zero number if the token set is not empty; else 0.
     */
    size() {
        return this.tokens.length;
    }

    /**
     * Get the index of the token in the set, if it exists.
     *
     * @param tokenId The unique identifier of the token.
     *
     * @returns The index if the token is present; else -1.
     */
    getTokenIndex(tokenId: ReferenceID) {
        return this.tokens.findIndex((t) => t.uid.equals(tokenId));
    }


    /**
     * Remove a token from the set.
     * @param {TokenNode_depr} token The token node to remove.
     */
    removeToken(token: Token<T>) {
        this.tokens = this.tokens.filter((t) => t !== token);
    }


    /**
     * Update a token with tokenId with the given token.
     * @remarks
     * **Important:** If the token is not in the tokenset, it will added a per option.updatePolicy.
     *
     * @param tokenId  The unique identifier of the token.
     * @param newToken The token to update.
     * @param options  Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If the token type does not match the set's {@link type}.
     */
    updateToken(
        tokenId: ReferenceID,
        newToken: Token<T>,
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

        // Add a new mode from the token into the token group
        const modes = Object.keys(newToken.valueByMode);
        modes.forEach((mode) => {
            if (!this.#modes.has(mode)) this.#addModeToAllTokens(mode);
        });

        // Add all the existing modes to the current token
        this.#modes.forEach(mode => newToken.addMode(mode))
    }

    /**
     * Remove a mode from the current TokenSet.
     *
     * @param mode The mode to remove.
     *
     * @throws @see {@link IllegalArgumentError} if the passed in mode does not exist on the tokenset.
     */
    removeMode(mode: string) {
        if (!this.#modes.has(mode))
            throw new IllegalArgumentError(`${mode} does not exist!`);

        if (this.#modes.size < 2)
            throw new IllegalArgumentError(
                `Cannot remove the default token mode. Consider removing the TokenSet if you need to remove the entire TokenSet.`,
            );

        this.tokens.forEach((token) => token.removeMode(mode))
        this.#modes.delete(mode);
    }

    /**
     * Re-orders the internal token collection.
     *
     * @param {TokenComparator} compareFn The comparison logic. Defaults to a numeric-aware,
     *                                    case-insensitive alphanumeric sort (e.g., "red-10" comes before "red-20").
     */
    sort(
        compareFn: TokenComparator = (a, b) =>
            a.name.localeCompare(b.name, undefined, {
                numeric: true, // Treat numeric literals inside string as numbers
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
     * @param {TokenSet} tokenSet          The source set to merge from.
     * @param {TokenSetAddOptions} options Configuration for conflict resolution and sorting.
     *
     * @throws {IllegalArgumentError} If architectural metadata (name/type/level) does not match.
     */
    mergeTokenSet(
        tokenSet: TokenSet<T>,
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
            this.addToken(token, {insertPolicy});
        }
        if (sortToken) this.sort(compareFn);
    }

    /**
     * Returns a JSON string representation of the current TokenSet.
     * @returns A JSON string.
     */
    toJSON(): string {
        return JSON.stringify({
            name: this.name,
            type: this.type,
            level: this.level,
            modes: [...this.modes], // TODO: Remove modes
            tokens: this.tokens,
        });
    }

    /**
     * Reconstructs a {@link TokenSet} instance from a JSON string.
     *
     * @param {string} jsonString A valid JSON representation of a TokenSet.
     *
     * @returns A new, validated instance of TokenSet.
     *
     * @throws {SyntaxError} If the string is not valid JSON.
     * @throws {IllegalArgumentError} If the hydrated data fails level or type validation.
     */
    // TODO: Update implementation
    static fromJson<K extends ExtendedTokenType>(
        jsonString: string,
    ): TokenSet<K> {
        const data = JSON.parse(jsonString);
        return new TokenSet(
            data?.name,
            data?.type,
            data?.level,
            data?.tokens?.map((token: Token<any>) =>
                new Token(token.type as ExtendedTokenType, token.name, token.valueByMode, token.group, ReferenceID.fromUUID(token.uid.toUUID()))
            ),
        );
    }


    /**
     * Validate a list of tokens are of the same type.
     * @remarks
     * Type must be the same among all the tokens and the parent token type.
     *
     * @private
     * @param tokens    The tokens to validate.
     * @param tokenType The parent token type to use for validation.
     *
     * @throws {@link IllegalArgumentError} If the tokens type is not the same across the set or the passed-in elements.
     */
    private _validateToken(
        tokens: Token<any>[],
        tokenType: ExtendedTokenType,
    ) {
        tokens.forEach(token => {
                if (token.type !== tokenType) {
                    throw new IllegalArgumentError(
                        "Invalid token set. Make sure that all the tokens are of the same type and are valid."
                    );
                }
            }
        )
    }

    /**
     * Perform check on whether the name is unique in the tokenset.
     *
     * @param name The name to check.
     *
     * @returns True if the name is unique within the current tokenset.
     */
    _checkUniqueName(name: string): boolean {
        return !this.tokens.some((token) => token.name === name);
    }


    /**
     * Perform a uniqueness check on token against this tokenset's internal collection.
     * **Invariants**
     * - A token is considered unique if it has the same name and ID.
     * - A token with same name but different ID will is not unique.
     *
     * @param token The name to validate.
     *
     * @returns True if the name is unique within the current tokenset.
     */
    checkTokenUniqueness(token: Token<any>): boolean {
        const matchingToken = this.#tokenIDMap.get(token.name)
        if (
            matchingToken &&
            !matchingToken.equals(token.uid)
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
     * @param tokens The set of tokens to validate.
     *
     * @returns True if the name is unique within the current {@link TokenSet}.
     */
    checkAllTokenUniqueness(tokens: Token<any>[]): boolean {
        for (const {name, uid} of tokens) {
            // If token is name is already in the set with a different ID, then it's not unique.
            const matchingToken = this.#tokenIDMap.get(name)
            if (
                matchingToken &&
                !matchingToken.equals(uid)
            )
                return false;

            // Add the id and name
            this.#tokenIDMap.set(name, uid);
        }

        return true;
    }
}
