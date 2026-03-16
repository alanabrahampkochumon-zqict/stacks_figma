import { InsertConflictPolicy, UpdatePolicy } from "./Common";
import type {
    ExtendedTokenTypes,
    Levels,
    Token,
    TokenComparator,
} from "./Token";
import {
    extendedTokens,
    isValidExtendedToken,
    isValidLevel,
    validateToken,
    validLevels,
} from "./Token";
import type { TokenNode } from "./TokenNode";

type TokenSetUpdateOptions = {
    updatePolicy?: UpdatePolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

type TokenSetAddOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

type TokenSetMergeOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Class representing a single token.
 * It contains the name, type, level (1-3), and the token collection.
 * NOTE: All the token's types must match the parent token type.
 */
/**
 * Class representation of a set of tokens.
 *
 * @property name The name of the token set.
 *                Must be unique.
 * @property type The type of tokens included in the token set.
 *                Must match the type of tokens added and should be a type of @see ExtendedTokenTypes
 * @property level The level of the token set.
 *                 Can only be from 1 to 4 inclusive.
 * @property tokens List of tokens ( @see TokenNode ) that makes up tokenset.
 */
export class TokenSet {
    name: string;
    type: ExtendedTokenTypes;
    level: Levels;
    tokens: TokenNode[];

    /**
     * Creates a token set with passed-in parameters
     * @param name The name of the token set.<p>Note: Must be unique and not empty. </p>
     * @param type type of tokens, like color or animation. Check `ExtendedTokenTypes` for more details.
     *             Default: "number"
     * @param level Level of the token set. 1, 2, 3, or 4.
     *              Default: 1.
     * @param tokens Tokens to be added to token set initially.
     *               <p>Note: All the tokens passed in must match the passed-in type and level.</p>
     */
    constructor(
        name: string,
        type: ExtendedTokenTypes = "number",
        level: Levels = 1,
        tokens: TokenNode[] = [],
    ) {
        if (!name) throw Error(`Name must be passed in for a tokenset`);
        if (!isValidLevel(level))
            throw Error(`Invalid level: Level must be in ${validLevels}`);
        if (!isValidExtendedToken(type))
            throw Error(
                `Invalid token type: Type must be in ${extendedTokens}`,
            );

        this._validateToken(tokens, type);
        this.name = name;
        this.type = type;
        this.level = level;
        this.tokens = tokens;
    }

    /**
     * Insert the token into the token set.
     * Conflicts can be resolved by using @see InsertConflictPolicy .
     * @param token The token node to insert. @see TokenNode for details.
     * @param options Optional configuration for insertion policy (IGNORE, REPLACE, MERGE not supported).
     *                Defaults to ignore and for sorting tokens after insertions.
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
        // TODO: Update to use "id"
        if (this.getTokenIndex(token.uid) === -1) this.tokens.push(token);
        else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this.updateToken(token.uid, token);

        if (sortToken) {
            this.sort(compareFn);
        }
    }

    /**
     * Returns the size of the current token set.
     * @returns integer greater than 0
     */
    size() {
        return this.tokens.length;
    }

    /**
     * Get the index of the token in the TokenSet, if it exist.
     * @param tokenId The unique identifier of the token.
     * @returns The index if the token is present; else -1.
     */
    getTokenIndex(tokenId: string) {
        return this.tokens.findIndex((t) => t.uid === tokenId);
    }

    /**
     * Removes token from a token set.
     * @param token token to be removed from the tokenset.
     */
    removeToken(token: Token) {
        this.tokens = this.tokens.filter((t) => t !== token);
    }

    /**
     * Updates the given token having `tokenName` with the newly provided token.
     * @param tokenId The ID of the token to update.
     * @param newToken Token to be updated with.
     * @param options Optional parameters like UpdatePolicy, whether to sort after insertion.
     *                Sorting function can be provided.
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
        // Validate against the current `tokenType` and if it doesn't exist, they use the new token's token type
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
     * Sorts the current token set.
     * @param compareFn (Token, Token) => Number function, that determines the sort order. Defaults to alphanumeric sorting.
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
     * Merges a token set with the current token set.
     * For merge to work, both tokens must have same name, type and level, else it will throw an error.
     * Common tokens will only get added once.
     * @param tokenSet token set to be merged with the current token set.
     * @param options optional options for insertion policy(IGNORE, REPLACE, MERGE not  supported). Defaults to IGNORE.
     *                and for sorting tokens, after insertions.
     * @throws error if tokens don't match level and type when merging on conflict.
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
            throw new Error(
                `TokenSet mismatch while merging: {${this.name}, ${this.type}, ${this.level}} != ${tokenSet.name}, ${tokenSet.type}, ${tokenSet.level}`,
            );
        for (const token of tokenSet.tokens) {
            this.addToken(token, { insertPolicy });
        }
        if (sortToken) this.sort(compareFn);
    }

    //TODO: Add name uniqueness validator and tests to update and insert

    /**
     * Converts the current tokenset into a JSON string
     */
    toJsonString(): string {
        return JSON.stringify({
            name: this.name,
            type: this.type,
            level: this.level,
            tokens: this.tokens,
            modes: [...this.modes],
        });
    }

    /**
     * Converts a given string into TokenSet if valid.
     * @param jsonString json string to be parsed
     * @return TokenSet if the json string is valid
     * @throws Error if a invalid string is passed in or if the values passed in not in the range, for example, 5 is passed for level which should be between 1..4
     */
    static fromJson(jsonString: string): TokenSet {
        const data = JSON.parse(jsonString);
        return new TokenSet(
            data?.name,
            data?.type,
            data?.level,
            data?.tokens,
            data?.modes,
        );
    }

    /**
     * Validate a list of tokens are of the same type.
     * And that each token has a valid value.
     *
     * @param tokens The tokens to validate.
     * @param tokenType The token type to use for validation.
     */
    private _validateToken(tokens: TokenNode[], tokenType: ExtendedTokenTypes) {
        const validationResult = tokens.every(
            ({ value: tokenValue }) =>
                tokenValue &&
                tokenValue.entityType === "token" &&
                tokenValue.type === tokenType &&
                validateToken(tokenValue.valueByMode, tokenValue.type),
        );
        if (!validationResult)
            throw new Error(
                "Invalid token set. Make sure that all the tokens are of the same type and are valid.",
            );
    }

    // Adds any mode that is missing from token
    // private _addModeForToken(tokens: Token[]) {
    //     tokens.forEach((token) =>
    //         Object.keys(token.valueByMode).forEach((mode) =>
    //             this.modes.add(mode),
    //         ),
    //     );
    // }
}
