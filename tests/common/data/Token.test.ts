import {
    ExtendedToken,
    isValidExtendedToken,
    isValidLevel,
    validateToken,
    validLevels, Token,
} from "@src/common/data/Token";
import {TypographyToken} from "@src/common/data/TypographyToken";
import {describe, expect, test} from "vitest";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";

describe("TokenType Validator Tests", () => {
    test.each(Object.values(ExtendedToken))(
        "returns true, if token is %s",
        (token) => {
            // Given a valid extended token
            // Then, validation returns true
            expect(isValidExtendedToken(token)).toStrictEqual(true);
        },
    );

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

describe("Token: Initialization", () => {
    test("returns Token with name, type and valueByMode and defaults for value and mode", () => {
        // When a token is created with createToken
        const tokenValue = {default: "#fff", dark: "#000"};
        const tokenType = "color";

        const token = new Token(tokenType, "token-1", tokenValue);

        // Then, a valid token is returned
        expect(token.valueByMode).toStrictEqual(tokenValue);
        expect(token.type).toStrictEqual(tokenType);
        expect(token.name).toStrictEqual("token-1");
        expect(token.group).toStrictEqual([]);
        expect(token.uid).toBeDefined()
    });

    test("returns Token with passed-in UID", () => {
        // When a token is created with createToken
        const tokenValue = {default: "#fff", dark: "#000"};
        const tokenType = "color";
        const uid = ReferenceID.generate()

        const token = new Token(tokenType, "token-1", tokenValue, [], uid);

        expect(token.uid.equals(uid)).toBeTruthy()
    });


    test("returns Token with passed-in groups", () => {
        // When a token is created with createToken
        const tokenValue = {default: "#fff", dark: "#000"};
        const tokenType = "color";
        const groups = ["primitives", "color"]

        const token = new Token(tokenType, "token-1", tokenValue, groups);

        expect(token.group).toStrictEqual(groups)
    });

    test("throws error, when passed in empty token value", () => {
        // When a token is created with empty value
        const tokenValue = {};
        const tokenType = "color";

        // Then, an error is thrown
        expect(() => new Token(tokenType, "token-1", tokenValue)).toThrow();
    });

    test("throws error, when passed in invalid type", () => {
        // When a token is created with invalid type
        const tokenValue = {default: "#fff", dark: "#000"};
        const tokenType = "invalid token type" as unknown as typeof ExtendedToken;

        // Then, an error is thrown
        expect(() => new Token(tokenType as any, "token-1", tokenValue)).toThrow();
    });

    test("throws error, when passed in blank name", () => {
        // When a token is created with blank name
        const tokenValue = {default: "#fff", dark: "#000"};
        const tokenType = ExtendedToken.color;

        // Then, an error is thrown
        expect(() => new Token(tokenType, "", tokenValue)).toThrow();
    });

    test("throws error, when passed in scrambled uuid", () => {
        // When a token is created with invalid uuid uuid
        const tokenValue = {default: "#fff", dark: "#000"};
        const tokenType = ExtendedToken.color;
        const uid = ReferenceID.fromUUID("1234")

        // Then, an error is thrown
        expect(() => new Token(tokenType, "", tokenValue, [], uid)).toThrow();
    });
});

describe("Token: addMode", () => {

    test("adds mode with first mode's value, when a value is not passed-in", () => {
        const token = new Token("color", "color", {"light": "#333", "high-contrast": "#000"})
        token.addMode("dark")
        expect(token.valueByMode["dark"]).toStrictEqual("#333")
    })

    test("add mode with value, when a mode with value is passed-in", () => {
        const token = new Token("color", "color", {"light": "#333"})
        token.addMode("dark", "#eee")
        expect(token.valueByMode["dark"]).toStrictEqual("#eee")
    })

    test("throws error, when a empty mode is passed-in", () => {
        const token = new Token("color", "color", {"light": "#333"})
        expect(() => token.addMode("")).toThrow()
    })

    test("throws error, when an existing mode mode is passed-in", () => {
        const token = new Token("color", "color", {"light": "#333"})
        expect(() => token.addMode("light")).toThrow()
    })
})

describe('Token: removeMode', () => {
    test.each(["", "invalid-mode"])("returns false, for invalid mode(%o)", (mode) => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        expect(token.removeMode(mode)).toBeFalsy()
    })

    test("returns true, when a valid mode is removed", () => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        expect(token.removeMode("dark")).toBeTruthy()
    })

    test("removes mode from valueByMode, when a valid mode is removed", () => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        token.removeMode("dark")
        expect(token.valueByMode["dark"]).toBeUndefined()
    })

    test("invalidates cache, when a mode is removed", () => {
        // We can't directly test this since cache is private(JS)
        // But we can rely on insert to test this since insertion throws an error when inserting a duplicate mode
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        token.removeMode("dark")
        expect(() => token.addMode("dark")).not.toThrow()
    })

    test("throws error, when attempting to remove the only mode", () => {
        const token = new Token("color", "color", {"light": "#333"})
        expect(() => token.removeMode("light")).toThrow()
    })
});

describe("Token: hasMode", () => {
    test.each(["", "invalid-mode"])("returns false, for invalid mode(%o)", (mode) => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        expect(token.hasMode(mode)).toBeFalsy()
    })

    test("returns true for existing mode", () => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        expect(token.hasMode("light")).toBeTruthy()
    })

    test("returns true for added mode", () => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        token.addMode("new-mode")
        expect(token.hasMode("new-mode")).toBeTruthy()
    })

    test("returns false for removed mode", () => {
        const token = new Token("color", "color", {"light": "#333", "dark": "#fff"})
        token.removeMode("light")
        expect(token.hasMode("light")).toBeFalsy()
    })
})

describe("Token Validator Tests", () => {
    const testCases: {
        name: string;
        input: any;
        expected: boolean;
        type: keyof typeof ExtendedToken;
    }[] = [
        // Number validation
        {
            name: "number validation: floating point number",
            input: {default: 12.7},
            expected: true,
            type: "number",
        },
        {
            name: "number validation: integral number",
            input: {default: 5},
            expected: true,
            type: "number",
        },
        {
            name: "number validation: negative number",
            input: {default: -5},
            expected: true,
            type: "number",
        },
        {
            name: "number validation: string number",
            input: {default: "5"},
            expected: false,
            type: "number",
        },
        {
            name: "number validation: string",
            input: {default: "fff"},
            expected: false,
            type: "number",
        },

        // String validation
        {
            name: "string validation: string",
            input: {default: "test"},
            expected: true,
            type: "string",
        },
        {
            name: "string validation: char",
            input: {default: "t"},
            expected: true,
            type: "string",
        },
        {
            name: "string validation: non-string",
            input: {default: 5},
            expected: false,
            type: "string",
        },

        // Sizing validation
        {
            name: "sizing validation: floating point number",
            input: {default: 12.7},
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: integral number",
            input: {default: 5},
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: negative number",
            input: {default: -5},
            expected: true,
            type: "sizing",
        },
        {
            name: "sizing validation: string number",
            input: {default: "5"},
            expected: false,
            type: "sizing",
        },
        {
            name: "sizing validation: string",
            input: {default: "fff"},
            expected: false,
            type: "sizing",
        },

        // Spacing Validation
        {
            name: "spacing validation: floating point number",
            input: {default: 12.7},
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: integral number",
            input: {default: 5},
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: negative number",
            input: {default: -5},
            expected: true,
            type: "spacing",
        },
        {
            name: "spacing validation: string number",
            input: {default: "5"},
            expected: false,
            type: "spacing",
        },
        {
            name: "spacing validation: string",
            input: {default: "fff"},
            expected: false,
            type: "spacing",
        },

        // Corner Radius validation
        {
            name: "corner radius validation: floating point number",
            input: {default: 12.7},
            expected: true,
            type: "cornerRadius",
        },
        {
            name: "corner radius validation: integral number",
            input: {default: 5},
            expected: true,
            type: "cornerRadius",
        },
        {
            name: "corner radius validation: negative number",
            input: {default: -5},
            expected: true,
            type: "cornerRadius",
        },
        {
            name: "corner radius validation: string number",
            input: {default: "5"},
            expected: false,
            type: "cornerRadius",
        },
        {
            name: "corner radius validation: string",
            input: {default: "fff"},
            expected: false,
            type: "cornerRadius",
        },

        // Boolean validation
        {
            name: "boolean validation: true",
            input: {default: true},
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: false",
            input: {default: false},
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: expression",
            input: {default: 7 > 5},
            expected: true,
            type: "boolean",
        },
        {
            name: "boolean validation: string boolean",
            input: {default: "true"},
            expected: false,
            type: "boolean",
        },
        {
            name: "boolean validation: string",
            input: {default: "test"},
            expected: false,
            type: "boolean",
        },

        // Color Validation
        {
            name: "color validation: #rgb (alpha only)",
            input: {default: "#fff"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (alpha only)",
            input: {default: "#ffffff"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgb (number only)",
            input: {default: "#123456"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (number only)",
            input: {default: "#123456"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgb (alpha numeric)",
            input: {default: "#3e3e3d"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbb (alpha numeric)",
            input: {default: "#3e3e3d"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rgba",
            input: {default: "#1ef9"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbbaa",
            input: {default: "#1123fe99"},
            expected: true,
            type: "color",
        },
        {
            name: "color validation: #rrggbba",
            input: {default: "#1123fe9"},
            expected: false,
            type: "color",
        },
        {
            name: "color validation: #rgbaa",
            input: {default: "#112af"},
            expected: false,
            type: "color",
        },
        {
            name: "color validation: rgba",
            input: {default: "1234"},
            expected: false,
            type: "color",
        },
        {
            name: "color validation: rrggbbaa",
            input: {default: "123456ff"},
            expected: false,
            type: "color",
        },

        // Typography
        {
            name: "typography: TypographyToken instance",
            input: {
                default: new TypographyToken(
                    "Roboto",
                    12,
                    "Bold",
                    1.5,
                    -0.23,
                    "LineThrough",
                ),
            },
            expected: true,
            type: "typography",
        },
        {
            name: "typography: number",
            input: {default: 5},
            expected: false,
            type: "typography",
        },
        {
            name: "typography: string",
            input: {default: "typography"},
            expected: false,
            type: "typography",
        },
        {
            name: "typography: number",
            input: {default: 5},
            expected: false,
            type: "typography",
        },
        {
            name: "typography: empty object",
            input: {default: {} as TypographyToken},
            expected: false,
            type: "typography",
        },
        // TODO: Test other types like gradient, box-shadow, typography etc.
    ];

    test.each(testCases)(
        "returns $expected, $name",
        ({input, expected, type}) => {
            // When, a specific input is validated as number
            const result = validateToken(input, type);

            // Then, it matches expected result
            expect(result).toBe(expected);
        },
    );

    // const mutliModeTestCases: {
    //     name: string;
    //     input: any;
    //     expected: boolean;
    //     type: keyof ExtendedTokenMap;
    // }[] = [
    //     {
    //         name: "tokens are of same type",
    //         input: {dark: "#fff", light: "#000"},
    //         expected: true,
    //         type: "color",
    //     },
    //     {
    //         name: "tokens are of same type",
    //         input: {dark: "#fff", light: "white-color"},
    //         expected: false,
    //         type: "color",
    //     },
    //     {
    //         name: "there are no tokens",
    //         input: {},
    //         expected: true,
    //         type: "color",
    //     },
    // ];
    //
    // test.each(mutliModeTestCases)(
    //     "mutliple mode validation: return $expected, when $name",
    //     ({input, expected, type}) => {
    //         // When, a specific input is validated as number
    //         const result = validateToken(input, type);
    //
    //         // Then, it matches expected result
    //         expect(result).toBe(expected);
    //     },
    // );
});
