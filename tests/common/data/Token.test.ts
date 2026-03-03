import { describe, expect, test } from "vitest";
import type { ExtendedTokenTypes } from "../../../src/common/data/Token";
import {
    extendedTokens,
    isValidExtendedToken,
    validateToken,
} from "../../../src/common/data/Token";

describe("TokenType Validator Tests", () => {
    test.each(extendedTokens)("return true, if token is %s", (token) => {
        // Given a valid extended token
        // Then, validation returns true
        expect(isValidExtendedToken(token)).toStrictEqual(true);
    });

    test.each(["token-1234", "invalid", "true"])(
        "return false, if token is %s (invalid)",
        (token) => {
            // Given an invalid extended token
            // Then, validation returns true
            expect(isValidExtendedToken(token)).toStrictEqual(false);
        },
    );
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
        // TODO: Test other types like gradient and box-shadow
    ];

    test.each(testCases)("$name", ({ input, expected, type }) => {
        // When, a specific input is validated as number
        const result = validateToken(input, type);

        // Then, it matches expected result
        expect(result).toBe(expected);
    });
});
