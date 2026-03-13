import { createToken, type Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
describe("TokenSet Find Tests", () => {
    const tokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
    ];
    const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

    test("returns correct index, when searched for existing token", () => {
        // Given a token set
        const expectedIndex = 0;

        // When an index of existing token is queried
        const index = tokenSet.getTokenIndex(tokens[expectedIndex].name);

        // Then, it returns correct index
        expect(index).toBe(expectedIndex);
    });

    test("returns -1, when search for non-existing token", () => {
        // Given a token set

        // When an index of non-existing token is queried
        const index = tokenSet.getTokenIndex("random-token");

        // Then, it returns -1
        expect(index).toBe(-1);
    });

    test("returns -1, when searched on empty token set", () => {
        // Given an empty token set
        const emptyTokenSet = new TokenSet("empty", "string");

        // When an index of non-existing token is queried
        const index = emptyTokenSet.getTokenIndex("random-token");

        // Then, it returns -1
        expect(index).toBe(-1);
    });
});
