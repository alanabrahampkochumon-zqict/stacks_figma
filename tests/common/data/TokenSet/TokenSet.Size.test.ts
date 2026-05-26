import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {generateToken} from "../utils/Generators.ts";

describe("TokenSet Size Tests", () => {
    const size = 3
    const tokens = Array(size).fill(0).map(() => generateToken("spacing"))
    const tokenSet = new TokenSet("ts", "spacing", 2, tokens);

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
