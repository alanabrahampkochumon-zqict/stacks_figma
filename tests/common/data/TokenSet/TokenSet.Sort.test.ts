import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Sorting Tests", () => {
    test("sort by name, if no comparator is provided", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
            { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, valueByMode: { default: 0 }, name: "size-0" },
            { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
            { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it
        tokenSet.sort();

        // Then, the tokens are sorted by name
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("sort by comparator, when comparator is provided", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, valueByMode: { default: 55 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 35 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 100 }, name: "size-0" },
            { type: tokenType, valueByMode: { default: 50 }, name: "size-50" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, valueByMode: { default: 35 }, name: "size-150" },
            { type: tokenType, valueByMode: { default: 50 }, name: "size-50" },
            { type: tokenType, valueByMode: { default: 55 }, name: "size-100" },
            { type: tokenType, valueByMode: { default: 100 }, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it with a comparator
        tokenSet.sort(
            (a, b) =>
                Object.values(a.valueByMode)[0] -
                Object.values(b.valueByMode)[0],
        );

        // Then, the tokens are sorted by the comparator(here, valueByName)
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});
