import type { ExtendedTokenTypes } from "@src/common/data/Token";
import {
    createToken,
    extendedTokens,
    isValidExtendedToken,
    isValidLevel,
    validateToken,
    validLevels,
} from "@src/common/data/Token";
import { describe, expect, test } from "vitest";

describe("TokenType Validator Tests", () => {
    test.each(extendedTokens)("returns true, if token is %s", (token) => {
        // Given a valid extended token
        // Then, validation returns true
        expect(isValidExtendedToken(token)).toStrictEqual(true);
    });

    test.each(["token-1234", "invalid", "true"])(
        "returns false, if token is %s (invalid)",
        (token) => {
            // Given an invalid extended token
            // Then, validation returns true
            expect(isValidExtendedToken(token)).toStrictEqual(false);
        },
    );
});

describe("TokenLevel Validator Tests", () => {
    test.each(validLevels)("returns true, if level is %s", (level) => {
        // Given a valid level
        // Then, validation returns true
        expect(isValidLevel(level)).toStrictEqual(true);
    });

    test.each([99, 0, 523, -999, 999, 100, 10])(
        "returns false, if token is %s (invalid)",
        (level) => {
            // Given an invalid level
            // Then, validation returns true
            expect(isValidLevel(level)).toStrictEqual(false);
        },
    );
});

describe("Token Initialization Tests", () => {
    test("returns valid token with token type, when using createToken", () => {
        // When a token is created with createToken
        const tokenName = "token";
        const tokenValue = { default: "#fff", dark: "#000" };
        const tokenType = "color";

        const token = createToken(tokenName, tokenValue, tokenType);

        // Then, a valid token is returned
        expect(token.name).toStrictEqual(tokenName);
        expect(token.valueByMode).toStrictEqual(tokenValue);
        expect(token.type).toStrictEqual(tokenType);
        expect(token.entityType).toStrictEqual("token");
    });

    test("throws error, when passed in empty name", () => {
        // When a token is created with empty value
        const tokenName = "";
        const tokenValue = { default: "#fff", dark: "#000" };
        const tokenType = "color";

        // Then, an error is thrown
        expect(() => createToken(tokenName, tokenValue, tokenType)).toThrow();
    });

    test("throws error, when passed in empty value", () => {
        // When a token is created with empty value
        const tokenName = "token name";
        const tokenValue = {};
        const tokenType = "color";

        // Then, an error is thrown
        expect(() => createToken(tokenName, tokenValue, tokenType)).toThrow();
    });

    test("throws error, when passed in invalid type", () => {
        // When a token is created with invalid type
        const tokenName = "token name";
        const tokenValue = { default: "#fff", dark: "#000" };
        const tokenType = "invalid token type" as ExtendedTokenTypes;

        // Then, an error is thrown
        expect(() => createToken(tokenName, tokenValue, tokenType)).toThrow();
    });
});

describe("Token Validator Tests", () => {
    const testCases: {
        name: string;
        input: any;
        expected: boolean;
        type: ExtendedTokenTypes;
    }[] = [
        // Number validation
        {
            name: "number validation: floating point number",
            input: { default: 12.7 },
            expected: true,
            type: "number",
        },
        {
            name: "number validation: integral number",
            input: { default: 5 },
            expected: true,
            type: "number",
        },
        {
            name: "number validation: negative number",
            input: { default: -5 },
            expected: true,
            type: "number",
        },
        {
            name: "number validation: string number",
            input: { default: "5" },
            expected: false,
            type: "number",
        },
        {
            name: "number validation: string",
            input: { default: "fff" },
            expected: false,
            type: "number",
        },

        // String validation
        {
            name: "string validation: string",
            input: { default: "test" },
            expected: true,
            type: "string",
        },
        {
            name: "string validation: char",
            input: { default: "t" },
            expected: true,
            type: "string",
        },
        {
            name: "string validation: non-string",
            input: { default: 5 },
            expected: false,
            type: "string",
        },

        // Sizing validation
        {
            name: "sizing validation: floating point number",
            input: { default: 12.7 },
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: integral number",
            input: { default: 5 },
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: negative number",
            input: { default: -5 },
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: string number",
            input: { default: "5" },
            expected: false,
            type: "sizing",
        },
        {
            name: "sizing validation: string",
            input: { default: "fff" },
            expected: false,
            type: "sizing",
        },

        // Spacing Validation
        {
            name: "spacing validation: floating point number",
            input: { default: 12.7 },
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: integral number",
            input: { default: 5 },
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: negative number",
            input: { default: -5 },
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: string number",
            input: { default: "5" },
            expected: false,
            type: "spacing",
        },
        {
            name: "spacing validation: string",
            input: { default: "fff" },
            expected: false,
            type: "spacing",
        },

        // Corner Radius validation
        {
            name: "corner radius validation: floating point number",
            input: { default: 12.7 },
            expected: true,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: integral number",
            input: { default: 5 },
            expected: true,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: negative number",
            input: { default: -5 },
            expected: true,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: string number",
            input: { default: "5" },
            expected: false,
            type: "corner-radius",
        },
        {
            name: "corner radius validation: string",
            input: { default: "fff" },
            expected: false,
            type: "corner-radius",
        },

        // Boolean validation
        {
            name: "boolean validation: true",
            input: { default: true },
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: false",
            input: { default: false },
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: expression",
            input: { default: 7 > 5 },
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: string boolean",
            input: { default: "true" },
            expected: false,
            type: "boolean",
        },
        {
            name: "boolean validation: string",
            input: { default: "test" },
            expected: false,
            type: "boolean",
        },

        // Color Validation
        {
            name: "color validation: #rgb (alpha only)",
            input: { default: "#fff" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (alpha only)",
            input: { default: "#ffffff" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgb (number only)",
            input: { default: "#123456" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (number only)",
            input: { default: "#123456" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgb (alpha numeric)",
            input: { default: "#3e3e3d" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (alpha numeric)",
            input: { default: "#3e3e3d" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgba",
            input: { default: "#1ef9" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbbaa",
            input: { default: "#1123fe99" },
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbba",
            input: { default: "#1123fe9" },
            expected: false,
            type: "color",
        },
        {
            name: "color validation: #rgbaa",
            input: { default: "#112af" },
            expected: false,
            type: "color",
        },
        {
            name: "color validation: rgba",
            input: { default: "1234" },
            expected: false,
            type: "color",
        },
        {
            name: "color validation: rrggbbaa",
            input: { default: "123456ff" },
            expected: false,
            type: "color",
        },
        // TODO: Test other types like gradient and box-shadow
    ];

    test.each(testCases)(
        "returns $expected, $name",
        ({ input, expected, type }) => {
            // When, a specific input is validated as number
            const result = validateToken(input, type);

            // Then, it matches expected result
            expect(result).toBe(expected);
        },
    );

    const mutliModeTestCases: {
        name: string;
        input: any;
        expected: boolean;
        type: ExtendedTokenTypes;
    }[] = [
        {
            name: "tokens are of same type",
            input: { dark: "#fff", light: "#000" },
            expected: true,
            type: "color",
        },
        {
            name: "tokens are of same type",
            input: { dark: "#fff", light: "white-color" },
            expected: false,
            type: "color",
        },
        {
            name: "there are no tokens",
            input: {},
            expected: true,
            type: "color",
        },
    ];

    test.each(mutliModeTestCases)(
        "mutliple mode validation: return $expected, when $name",
        ({ input, expected, type }) => {
            // When, a specific input is validated as number
            const result = validateToken(input, type);

            // Then, it matches expected result
            expect(result).toBe(expected);
        },
    );
});
