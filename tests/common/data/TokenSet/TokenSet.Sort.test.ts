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
                createToken(tokenType, { default: 10 }),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken(tokenType, { default: 15 }),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken(tokenType, { default: 0 }),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken(tokenType, { default: 5 }),
                "4",
            ),
        ];
        const sortedTokens = [
            createTokenNode(
                "size-0",
                createToken(tokenType, { default: 0 }),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken(tokenType, { default: 5 }),
                "4",
            ),
            createTokenNode(
                "size-100",
                createToken(tokenType, { default: 10 }),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken(tokenType, { default: 15 }),
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
                createToken(tokenType, { default: 55 }),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken(tokenType, { default: 35 }),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken(tokenType, { default: 100 }),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken(tokenType, { default: 50 }),
                "4",
            ),
        ];
        const sortedTokens = [
            createTokenNode(
                "size-150",
                createToken(tokenType, { default: 35 }),
                "2",
            ),
            createTokenNode(
                "size-50",
                createToken(tokenType, { default: 50 }),
                "4",
            ),
            createTokenNode(
                "size-100",
                createToken(tokenType, { default: 55 }),
                "1",
            ),
            createTokenNode(
                "size-0",
                createToken(tokenType, { default: 100 }),
                "3",
            ),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it with a comparator
        tokenSet.sort(
            (a, b) =>
                Object.values(a.value.entityType == "token" && a)
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
