import { UpdatePolicy } from "@src/common/data/Common";
import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import setUpTokens from "./TokenSet.fixtures";

describe("TokenSet Update Tests", () => {
    test("token gets upserted(added), when the token set is empty and policy is set to insert", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: type,
        };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toBe(validToken);
    });

    test("token does not get added, when the token set is empty and policy is set to ignore", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: type,
        };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added
        expect(tokenSet.tokens).toStrictEqual([]);
    });

    test("token gets added, when the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [
            { name: "25", valueByMode: { default: 5 }, type: type },
            { name: "75", valueByMode: { default: 15 }, type: type },
        ];
        const expectedTokens: Token[] = [
            { name: "25", valueByMode: { default: 5 }, type: type },
            { name: "75", valueByMode: { default: 15 }, type: type },
            { name: "50", valueByMode: { default: 10 }, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: type,
        };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token does not get added, when the token set is non-empty and policy is set to ignore", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [
            { name: "25", valueByMode: { default: 5 }, type: type },
            { name: "75", valueByMode: { default: 15 }, type: type },
        ];
        const expectedTokens: Token[] = [
            { name: "25", valueByMode: { default: 5 }, type: type },
            { name: "75", valueByMode: { default: 15 }, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: type,
        };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token gets added, when the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const { numberTokenSet } = setUpTokens();
        const validToken: Token = {
            name: "new token",
            valueByMode: { default: 10 },
            type: "number",
        };

        // and the valid token is not in the set
        expect(numberTokenSet.tokens).not.toContain(validToken);

        // When a token is added
        numberTokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added
        expect(numberTokenSet.tokens).toContain(validToken);
    });

    test("token upserted and sorted, when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
            { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
        ];
        const token: Token = {
            type: tokenType,
            valueByMode: { default: 5 },
            name: "size-50",
        };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token.name, token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted, when sort is turned on based on comparator", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            {
                type: tokenType,
                valueByMode: { default: 150 },
                name: "size-150",
            },
            { type: tokenType, valueByMode: { default: 20 }, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 20 }, name: "size-0" },
            {
                type: tokenType,
                valueByMode: { default: 150 },
                name: "size-150",
            },
        ];
        const token: Token = {
            type: tokenType,
            valueByMode: { default: 5 },
            name: "size-50",
        };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted with comparator
        tokenSet.updateToken(token.name, token, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(a.valueByMode)[0] -
                Object.values(b.valueByMode)[0],
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("throws error, when tokenset is empty and different type of token is upserted", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated(upserted)
        const differentToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: "spacing",
        };
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("throws error, when tokenset is non-empty and different type of token is upserted", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted)
        const differentToken: Token = {
            name: "50",
            valueByMode: { default: 10 },
            type: "spacing",
        };
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("throws error, when invalid token is passed in", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-50" },
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
        ];

        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted) with invalid valueByNames
        const updatedToken: Token = {
            name: "size-65",
            valueByMode: { default: "test" },
            type: tokenType,
        };
        // Then, an error is thrown
        expect(() => tokenSet.updateToken("size-50", updatedToken)).toThrow();
    });

    test("token upserted and sorted, when tokenset is empty and sort is turned on", () => {
        // Given a empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [];
        const token1: Token = {
            type: tokenType,
            valueByMode: { default: 5 },
            name: "size-50",
        };
        const token2: Token = {
            type: tokenType,
            valueByMode: { default: 0 },
            name: "size-0",
        };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);
        const sortedTokens: Token[] = [
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
            { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
        ];

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token1.name, token1, { sortToken: true });
        tokenSet.updateToken(token2.name, token2, { sortToken: true });

        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted, when sort is turned and comparator on is provided", () => {
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
            compareFn: (a, b) => Object.values(a.valueByMode)[0] - Object.values(b.valueByMode)[0],
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});
