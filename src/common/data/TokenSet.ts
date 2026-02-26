import { UpdatePolicy } from "./Common";
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

    addToken(
        token: Token,
        { sortToken = false, compareFn }: TokenSetAddOptions = {},
    ) {
        this._validateToken([token], this.type);
        this.tokens.push(token);
        if (sortToken) {
            this.sort(compareFn);
        }
    }

    removeToken(token: Token) {
        this.tokens = this.tokens.filter((t) => t !== token);
    }

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
        let tokenIndex = this.tokens.findIndex((t) => t.name === tokenName);
        console.log(tokenIndex);
        console.log(updatePolicy);
        if (tokenIndex > 0) this.tokens[tokenIndex] = newToken;
        else
            switch (updatePolicy) {
                case UpdatePolicy.INSERT:
                    this.addToken(newToken);
                    console.log(newToken, " was added.");
                    break;
                case UpdatePolicy.IGNORE:
                    break;
            }
        if (sortToken) this.sort(compareFn);
    }

    sort(
        compareFn: TokenComparator = (a, b) =>
            a.name.localeCompare(b.name, undefined, {
                numeric: true, // Treat numerics inside string as numbers
                sensitivity: "base",
            }),
    ) {
        this.tokens.sort(compareFn);
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
