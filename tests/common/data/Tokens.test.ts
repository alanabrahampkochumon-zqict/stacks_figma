import { describe, expect, test } from "vitest";

import { Token, TokenSet } from "../../../src/common/data/Tokens";

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

    test("TokenSet cannot be initialized with mixed token types", () => {
        // Given a tokenset trying to get initalized with mixed types
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: "color", value: "#ffffff", name: "size-100" },
            { type: "string", value: "hello", name: "size-150" },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("TokenSet cannot be initialized with types different from the tokenSetType", () => {
        // Given a tokenset trying to get initalized with different token type that the  tokenType specified
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: "string", value: "5", name: "size-50" },
            { type: "string", value: "#ffffff", name: "size-100" },
            { type: "string", value: "hello", name: "size-150" },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("TokenSet cannot be initialized with invalid token", () => {
        // Given a tokenset trying to get initalized with invalid token
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: "#ffffff", name: "color-50" },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });
});
