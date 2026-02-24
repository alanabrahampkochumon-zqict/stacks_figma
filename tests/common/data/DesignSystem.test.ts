import { describe, expect, test } from "vitest";

import { Token, TokenSet } from "../../../src/common/data/DesignSystem";

describe("TokenSetTests", () => {
    test("TokenSet gets initialized with correct default values", () => {
        // Given a tokenset initialized with only name
        const name = "TokenSet";
        const tokenSet = new TokenSet(name);

        // Then, the object contains the correct name and default values
        expect(tokenSet.name).toBe(name);
        expect(tokenSet.level).toBe(1);
        expect(tokenSet.tokens.length).toBe(0);
        expect(tokenSet.type).toBe("number");
    });

    test("TokenSet gets initialized with passed in values", () => {
        // Given a tokenset initialized with only name
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and default values
        expect(tokenSet.name).toBe(name);
        expect(tokenSet.level).toBe(level);
        expect(tokenSet.tokens).toBe(tokens);
        expect(tokenSet.type).toBe(tokenType);
    });

    test("TokenSet cannot be initialized with mixed token types", () => {});

    test("TokenSet cannot be initialized with types different from the tokenSetType", () => {});
});
