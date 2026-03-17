import { createToken } from "@src/common/data/Token";
import { createTokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Size Tests", () => {
    const tokens = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
    ];
    const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

    test("returns correct size, when set is non-empty", () => {
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
