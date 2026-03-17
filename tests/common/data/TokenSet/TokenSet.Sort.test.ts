import { createToken } from "@src/common/data/Token";
import { createTokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Sorting Tests", () => {
    test("sort by name, if no comparator is provided", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 0 }, tokenType),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken({ default: 5 }, tokenType),
                "4",
            ),
        ];
        const sortedTokens = [
            createTokenNode(
                "size-0",
                createToken({ default: 0 }, tokenType),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken({ default: 5 }, tokenType),
                "4",
            ),
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
                "2",
            ),
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
        const tokens = [
            createTokenNode(
                "size-100",
                createToken({ default: 55 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 35 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 100 }, tokenType),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken({ default: 50 }, tokenType),
                "4",
            ),
        ];
        const sortedTokens = [
            createTokenNode(
                "size-150",
                createToken({ default: 35 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-50",
                createToken({ default: 50 }, tokenType),
                "4",
            ),
            createTokenNode(
                "size-100",
                createToken({ default: 55 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 100 }, tokenType),
                "3",
            ),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it with a comparator
        tokenSet.sort(
            (a, b) =>
                Object.values(
                    a.value?.entityType === "token" && a.value.valueByMode,
                )[0] -
                Object.values(
                    b.value?.entityType === "token" && b.value.valueByMode,
                )[0],
        );

        // Then, the tokens are sorted by the comparator(here, valueByName)
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});
