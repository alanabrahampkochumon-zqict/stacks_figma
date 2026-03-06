import { InsertConflictPolicy } from "@src/common/data/Common";
import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Add Tests", () => {
    test("token gets added, when a valid token is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: type,
        };
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
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10, another: 25 },
            type: type,
        };
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
        const tokens: Token[] = [
            { name: "50", valueByMode: { default: 55 }, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: type,
        };

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
            {
                type: tokenType,
                valueByMode: { default: 10 },
                name: "size-100",
            },
            {
                type: tokenType,
                valueByMode: { default: 15 },
                name: "size-150",
            },
            {
                type: tokenType,
                valueByMode: { default: 0 },
                name: "size-0",
            },
        ];

        const sortedTokens: Token[] = [
            {
                type: tokenType,
                valueByMode: { default: 0 },
                name: "size-0",
            },
            {
                type: tokenType,
                valueByMode: { default: 5 },
                name: "size-50",
            },
            {
                type: tokenType,
                valueByMode: { default: 10 },
                name: "size-100",
            },
            {
                type: tokenType,
                valueByMode: { default: 15 },
                name: "size-150",
            },
        ];
        const token: Token = {
            type: tokenType,
            valueByMode: { default: 5 },
            name: "size-50",
        };
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
            {
                type: tokenType,
                valueByMode: { default: 100 },
                name: "size-100",
            },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 50 }, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, valueByMode: { default: 0 }, name: "size-50" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 50 }, name: "size-0" },
            {
                type: tokenType,
                valueByMode: { default: 100 },
                name: "size-100",
            },
        ];
        const token: Token = {
            type: tokenType,
            valueByMode: { default: 0 },
            name: "size-50",
        };
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
        const invalidToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: "string",
        };
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });
});
