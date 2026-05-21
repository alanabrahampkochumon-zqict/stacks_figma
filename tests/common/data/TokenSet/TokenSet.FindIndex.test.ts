import {Token} from "@src/common/data/Token";
import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";

describe("TokenSet: findIndex", () => {
    const tokens = [
        new Token("sizing", "size-50", {default: 5}),
        new Token("sizing", "size-100", {default: 10}),
        new Token("sizing", "size-150", {default: 15}),
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
        const index = tokenSet.getTokenIndex(ReferenceID.generate());

        // Then, it returns -1
        expect(index).toStrictEqual(-1);
    });

    test("returns -1, when searched on empty token set", () => {
        // Given an empty token set
        const emptyTokenSet = new TokenSet("empty", "string");

        // When an index of non-existing token is queried
        const index = emptyTokenSet.getTokenIndex(ReferenceID.generate());

        // Then, it returns -1
        expect(index).toStrictEqual(-1);
    });
});
