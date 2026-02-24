import { describe, expect, test } from "vitest";

import {
    ExtendedTokenTypes,
    Token,
    TokenSet,
    validateToken,
} from "../../../src/common/data/Tokens";

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

describe("TokenValidatorTests", () => {
    const testCases: {
        name: string;
        input: any;
        expected: boolean;
        type: ExtendedTokenTypes;
    }[] = [
        // Number validation
        {
            name: "number validation: floating point number",
            input: 12.7,
            expected: true,
            type: "number",
        },
        {
            name: "number validation: integral number",
            input: 5,
            expected: true,
            type: "number",
        },
        {
            name: "number validation: negative number",
            input: -5,
            expected: true,
            type: "number",
        },
        {
            name: "number validation: string number",
            input: "5",
            expected: false,
            type: "number",
        },
        {
            name: "number validation: string",
            input: "fff",
            expected: false,
            type: "number",
        },

        // String validation
        {
            name: "string validation: string",
            input: "test",
            expected: true,
            type: "string",
        },
        {
            name: "string validation: char",
            input: "t",
            expected: true,
            type: "string",
        },
        {
            name: "string validation: non-string",
            input: 5,
            expected: false,
            type: "string",
        },

        // Sizing validation
        {
            name: "sizing validation: floating point number",
            input: 12.7,
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: integral number",
            input: 5,
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: negative number",
            input: -5,
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: string number",
            input: "5",
            expected: false,
            type: "sizing",
        },
        {
            name: "sizing validation: string",
            input: "fff",
            expected: false,
            type: "sizing",
        },

        // Spacing Validation
        {
            name: "spacing validation: floating point number",
            input: 12.7,
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: integral number",
            input: 5,
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: negative number",
            input: -5,
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: string number",
            input: "5",
            expected: false,
            type: "spacing",
        },
        {
            name: "spacing validation: string",
            input: "fff",
            expected: false,
            type: "spacing",
        },

        // Corner Radius validation
        {
            name: "corner radius validation: floating point number",
            input: 12.7,
            expected: true,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: integral number",
            input: 5,
            expected: true,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: negative number",
            input: -5,
            expected: true,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: string number",
            input: "5",
            expected: false,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: string",
            input: "fff",
            expected: false,
            type: "corner-radius",
        },

        // Boolean validation
        {
            name: "boolean validation: true",
            input: true,
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: false",
            input: false,
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: expression",
            input: 7 > 5,
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: string boolean",
            input: "true",
            expected: false,
            type: "boolean",
        },
        {
            name: "boolean validation: string",
            input: "test",
            expected: false,
            type: "boolean",
        },

        // Color Validation
        {
            name: "color validation: #rgb (alpha only)",
            input: "#fff",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (alpha only)",
            input: "#ffffff",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgb (number only)",
            input: "#123456",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (number only)",
            input: "#123456",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgb (alpha numeric)",
            input: "#3e3e3d",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (alpha numeric)",
            input: "#3e3e3d",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgba",
            input: "#1ef9",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbbaa",
            input: "#1123fe99",
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbba",
            input: "#1123fe9",
            expected: false,
            type: "color",
        },
        {
            name: "color validation: #rgbaa",
            input: "#112af",
            expected: false,
            type: "color",
        },
        {
            name: "color validation: rgba",
            input: "1234",
            expected: false,
            type: "color",
        },
        {
            name: "color validation: rrggbbaa",
            input: "123456ff",
            expected: false,
            type: "color",
        },
    ];

    test.each(testCases)("$name", ({ input, expected, type }) => {
        // When, a specific input is validated as number
        const result = validateToken(input, type);

        // Then, it matches expected result
        expect(result).toBe(expected);
    });
});
