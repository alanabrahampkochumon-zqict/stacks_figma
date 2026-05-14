import {ValueNode} from "@src/common/data/TokenNode.ts";
import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {ExtendedToken} from "@src/common/data/Token.ts";

describe("TokenSet Size Tests", () => {
    const tokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5),
        new ValueNode(ExtendedToken.sizing, "size-100", 10),
        new ValueNode(ExtendedToken.sizing, "size-150", 15),
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
