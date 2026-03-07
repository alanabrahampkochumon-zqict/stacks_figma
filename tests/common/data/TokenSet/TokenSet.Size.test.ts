import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Size Tests", () => {
    const tokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 10 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-150" },
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
