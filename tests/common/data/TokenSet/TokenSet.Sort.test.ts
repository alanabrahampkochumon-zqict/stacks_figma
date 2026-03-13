import { createToken, type Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Sorting Tests", () => {
    test("sort by name, if no comparator is provided", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
            createToken("size-0", { default: 0 }, tokenType),
            createToken("size-50", { default: 5 }, tokenType),
        ];
        const sortedTokens: Token[] = [
            createToken("size-0", { default: 0 }, tokenType),
            createToken("size-50", { default: 5 }, tokenType),
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
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
            createToken("size-100", { default: 55 }, tokenType),
            createToken("size-150", { default: 35 }, tokenType),
            createToken("size-0", { default: 100 }, tokenType),
            createToken("size-50", { default: 50 }, tokenType),
        ];
        const sortedTokens: Token[] = [
            createToken("size-150", { default: 35 }, tokenType),
            createToken("size-50", { default: 50 }, tokenType),
            createToken("size-100", { default: 55 }, tokenType),
            createToken("size-0", { default: 100 }, tokenType),
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
