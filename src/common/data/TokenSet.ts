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
    modes: Set<string>;

    /**
     * Creates a token set with passed in parameters
     * @param name name of the token set. Must be unique and not empty.
     * @param type type of tokens, like color or animation. Check `ExtendedTokenTypes` for more details.
     * Default: "number"
     * @param level Level of the token set. 1, 2, 3, or 4. Default: 1.
     * @param modes that current token set supports.
     *              If not passed in, then values from tokens[] are taken as mode.
     *              If both are empty, then "default" mode is added.
     * @param tokens Tokens to be added to token set initially. All the tokens passed in must match the passed in type and level.
     */
    constructor(
        name: string,
        type: ExtendedTokenTypes = "number",
        level: Levels = 1,
        tokens: Token[] = [],
        modes: string[] = [],
    ) {
        if (!name) throw Error(`Name must be passed in for a tokenset`);
        if (!isValidLevel(level))
            throw Error(`Invalid level: Level must be in ${validLevels}`);
        if (!isValidExtendedToken(type))
            throw Error(
                `Invalid token type: Type must be in ${extendedTokens}`,
            );

        this._validateToken(tokens, type);
        this.modes = new Set();
        modes.forEach((mode) => this.addMode(mode));
        this.name = name;
        this.type = type;
        this.level = level;
        this.tokens = tokens;
        this._addModeForToken(tokens);

        if (modes.length < 1 && tokens.length < 1) this.modes.add("default");
    }

    /**
     * Adds a mode to the token set.
     * @param mode mode to be added
     * @returns `boolean`, whether or not the mode was added.
     */
    addMode(mode: string): boolean {
        if (this.modes.has(mode)) return false;
        this.modes.add(mode);
        return true;
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

        this._addModeForToken([token]); // Add the modes if they don't exist yet

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
     * @return TokenSet if the json string is valid
     * @throws Error if a invalid string is passed in or if the values passed in not in the range, for example, 5 is passed for level which should be between 1..4
     */
    static fromJson(jsonString: string): TokenSet {
        const data = JSON.parse(jsonString);
        return new TokenSet(data?.name, data?.type, data?.level, data?.tokens);
    }

    private _validateToken(tokens: Token[], tokenType: ExtendedTokenTypes) {
        if (tokens.length && tokenType !== tokens[0].type)
            throw new Error(
                `TokenSet type mismatched. Expected ${tokenType}, where children were passed in as ${tokens[0].type}.`,
            );

        const validationResult = tokens.every(
            (token) =>
                token.type === tokenType &&
                validateToken(token.valueByMode, token.type),
        );
        console.log(validationResult);
        if (!validationResult)
            throw new Error(
                "Invalid token set. Make sure that all the tokens are of the same type and are valid.",
            );
    }

    // Adds any mode that is missing from token
    private _addModeForToken(tokens: Token[]) {
        tokens.forEach((token) =>
            Object.keys(token.valueByMode).forEach((mode) =>
                this.modes.add(mode),
            ),
        );
    }
}
