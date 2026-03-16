import { createToken } from "@src/common/data/Token";
import { createTokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
describe("TokenSet Find Tests", () => {
    const tokens = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
    ];
    const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

    test("returns correct index, when searched for existing token", () => {
        // Given a token set
        const expectedIndex = 0;

        // When an index of existing token is queried
        const index = tokenSet.getTokenIndex(tokens[expectedIndex].uid);

        // Then, it returns correct index
        expect(index).toStrictEqual(expectedIndex);
    });

    test("returns -1, when search for non-existing token", () => {
        // Given a token set

        // When an index of non-existing token is queried
        const index = tokenSet.getTokenIndex("invalid-id");

        // Then, it returns -1
        expect(index).toStrictEqual(-1);
    });

    test("returns -1, when searched on empty token set", () => {
        // Given an empty token set
        const emptyTokenSet = new TokenSet("empty", "string");

        // When an index of non-existing token is queried
        const index = emptyTokenSet.getTokenIndex("invalid-id");

        // Then, it returns -1
        expect(index).toStrictEqual(-1);
    });
});
