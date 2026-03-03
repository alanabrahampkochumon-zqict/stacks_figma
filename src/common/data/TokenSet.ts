import { InsertConflictPolicy, UpdatePolicy } from "./Common";
import type {
    ExtendedTokenTypes,
    Levels,
    Token,
    TokenComparator,
} from "./Token";
import { validateToken } from "./Token";

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
 * Class representing a single token. It contains the name, type, level (1-3) and the token collection.
 * NOTE: All the token's type must match the parent token type.
 */
export class TokenSet {
    name: string;
    type: ExtendedTokenTypes;
    level: Levels;
    tokens: Token[];

    constructor(
        name: string,
        type: ExtendedTokenTypes = "number",
        level: Levels = 1,
        tokens: Token[] = [],
    ) {
        this._validateToken(tokens, type);
        this.name = name;
        this.type = type;
        this.level = level;
        this.tokens = tokens;
    }

    /**
     * Inserts token into the token set. Conflicts can be resolved by using `InsertConflictPolicy`.
     * @param token token to be inserted into the tokenset.
     * @param options optional options for insertion policy(IGNORE, REPLACE, MERGE not supported). Defaults to ignore.
     *                and for sorting tokens, after insertions.
     */
    addToken(
        token: Token,
        {
            insertPolicy = InsertConflictPolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: TokenSetAddOptions = {},
    ) {
        this._validateToken([token], this.type);
        if (this.getTokenIndex(token.name) === -1) this.tokens.push(token);
        else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this.updateToken(token.name, token);

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
     * Returns the index of the token in the tokenset.
     * @param tokenName token name to get the index of.
     * @returns number greater than 0, if the token is present else -1
     */
    getTokenIndex(tokenName: string) {
        return this.tokens.findIndex((t) => t.name === tokenName);
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
     * @param tokenName Name of the token to be updated.
     * @param newToken Token to be updated with.
     * @param options Optional parameters like UpdatePolicy, whether to sort after insertion, soritng function can be provided.
     */
    updateToken(
        tokenName: string,
        newToken: Token,
        {
            updatePolicy = UpdatePolicy.INSERT,
            sortToken = false,
            compareFn = undefined,
        }: TokenSetUpdateOptions = {},
    ) {
        // Validate against the current `tokenType` and if it doesn't exist, they use the new token's token type
        this._validateToken([newToken], this.type ?? newToken.type);
        let tokenIndex = this.getTokenIndex(tokenName);
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

    /**
     * Converts the current tokenset into a JSON string
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
     * Converts a given string into TokenSet if valid.
     * @param jsonString json string to be parsed
     * @return TokenSet if the json string is valid else undefined
     */
    static toTokenSet(jsonString: string): TokenSet | undefined {
        try {
            return undefined;
        } catch (error) {
            return undefined;
        }
    }

    private _validateToken(tokens: Token[], tokenType: ExtendedTokenTypes) {
        if (tokens.length && tokenType !== tokens[0].type)
            throw new Error(
                `TokenSet type mismatched. Expected ${tokenType}, where children were passed in as ${tokens[0].type}.`,
            );

        const validationResult = tokens.every(
            (token) =>
                token.type === tokenType &&
                validateToken(token.value, token.type),
        );
        if (!validationResult)
            throw new Error(
                "Invalid token set. Make sure that all the tokens are of the same type and are valid.",
            );
    }
}
