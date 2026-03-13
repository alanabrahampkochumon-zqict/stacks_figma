import { createToken, type Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Size Tests", () => {
    const tokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
    ];
    const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

    test("return correct size, when set is non-empty", () => {
        // Given a token set

        // When the length is queried
        const length = tokenSet.size();

        // Then, it returns correct length
        expect(length).toBe(tokens.length);
    });

    test("returns 0, when set is empty", () => {
        // Given an empty token set
        const emptyTokenSet = new TokenSet("empty", "string");

        // When the length is queried
        const length = emptyTokenSet.size();

        // Then, it returns 0
        expect(length).toBe(0);
    });
});
