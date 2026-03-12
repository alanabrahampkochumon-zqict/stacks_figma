import { InsertConflictPolicy } from "@src/common/data/Common";
import { createToken, type Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

// Regex
// \{\s*type:\s*(.*),\s*valueByMode:\s*(\{.*\}),\s*name:\s*(.*)\s*\} -> createToken($3, $2, $1)
// \{\s*name:\s*(.*),\s*valueByMode:\s*(\{.*\}),\s*type:\s*(.*)\s*\} -> createToken($1, $2, $3)

describe("TokenSet Add Tests", () => {
    test("token gets added, when a valid token is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken: Token = createToken("50", { default: 10 }, type);
        tokenSet.addToken(validToken);

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toStrictEqual(validToken);
    });

    test("modes gets added, when a valid token is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken: Token = createToken(
            "50",
            { default: 10, another: 25 },
            type,
        );
        tokenSet.addToken(validToken);

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toStrictEqual(validToken);

        // And, modes are added from the added token
        expect(tokenSet.modes).contain("default");
        expect(tokenSet.modes).contain("another");
    });

    test("token gets upserted, when an existing token is passed in with insert policy of replace", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [createToken("50", { default: 55 }, type)];
        const tokenSet = new TokenSet(name, type, level, tokens);
        const validToken: Token = createToken("50", { default: 10 }, type);

        // When a token is added with same name and policy set to update
        tokenSet.addToken(validToken, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        // Then, then the token is updated
        expect(tokenSet.tokens).toStrictEqual([validToken]);
    });

    test("token added and sorted, when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
            createToken("size-0", { default: 0 }, tokenType),
        ];

        const sortedTokens: Token[] = [
            createToken("size-0", { default: 0 }, tokenType),
            createToken("size-50", { default: 5 }, tokenType),
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
        ];
        const token: Token = createToken("size-50", { default: 5 }, tokenType);

        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token added and sorted, when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
            createToken("size-0", { default: 0 }, tokenType),
        ];
        const sortedTokens: Token[] = [
            createToken("size-0", { default: 0 }, tokenType),
            createToken("size-50", { default: 5 }, tokenType),
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
        ];
        const token: Token = createToken("size-50", { default: 5 }, tokenType);
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(a.valueByMode)[0] -
                Object.values(b.valueByMode)[0],
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("throws error, when a token with mismatching type is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken: Token = createToken(
            "50",
            { default: 10 },
            "string",
        );
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });
});
