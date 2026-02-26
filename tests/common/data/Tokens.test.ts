import { describe, expect, test } from "vitest";

import { UpdatePolicy } from "../../../src/common/data/Common";
import {
    ExtendedTokenTypes,
    Token,
    TokenSet,
    validateToken,
} from "../../../src/common/data/Tokens";

describe("TokenSet Intialization Tests", () => {
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

    test("TokenSet gets initialized with empty tokens", () => {
        // Given a tokenset initialized with empty tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and empty tokens
        expect(tokenSet.name).toBe(name);
        expect(tokenSet.level).toBe(level);
        expect(tokenSet.tokens).toBe(tokens);
        expect(tokenSet.tokens.length).toBe(0);
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

describe("TokenSet Add Tests", () => {
    test("valid token can be added", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.addToken(validToken);

        // Then, the token is added to the set
        expect(tokenSet.tokens.at(0)).toBe(validToken);
    });

    test("valid token can be added", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken: Token = { name: "50", value: 10, type: "string" };
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });

    test("token added and sorted when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const token: Token = { type: tokenType, value: 5, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token added and sorted when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 100, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-50" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
            { type: tokenType, value: 100, name: "size-100" },
        ];
        const token: Token = { type: tokenType, value: 0, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});

describe("TokenSet Update Tests", () => {
    test("token gets added to a token set if the token set is empty and policy is set to insert", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens.at(0)).toBe(validToken);
    });

    test("token doesn't get added to a token set if the token set is empty and policy is set to ignore", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added
        expect(tokenSet.tokens).toStrictEqual([]);
    });

    test("token gets added to a token set if the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
        ];
        const expectedTokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
            { name: "50", value: 10, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token doesn't get added to a token set if the token set is non-empty and policy is set to ignore", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
        ];
        const expectedTokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("valid with different type when updated to empty set throws error", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated(upserted)
        const differentToken: Token = {
            name: "50",
            value: 10,
            type: "spacing",
        };
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("valid with different type when updated to non-empty set throws error", () => {
        // Given a empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted)
        const differentToken: Token = {
            name: "50",
            value: 10,
            type: "spacing",
        };
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("non-existant valid token gets added when updated", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken: Token = { name: "50", value: 10, type: "string" };
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });

    test("invalid token update throws error", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-50" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const expectedTokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 55, name: "size-65" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted) with invalid values
        const updatedToken: Token = {
            name: "size-65",
            value: "test",
            type: tokenType,
        };
        // Then, an error is thrown
        expect(() => tokenSet.updateToken("size-50", updatedToken)).toThrow();
    });

    test("token upserted and sorted when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const token: Token = { type: tokenType, value: 5, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token.name, token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted when sort is turned on based on comparator", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 150, name: "size-150" },
            { type: tokenType, value: 20, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 20, name: "size-0" },
            { type: tokenType, value: 150, name: "size-150" },
        ];
        const token: Token = { type: tokenType, value: 5, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted with comparator
        tokenSet.updateToken(token.name, token, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    // TODO: Update Tokenset to use dictionary instead of array
    // TODO: Hastoken and token size methods
    // TODO: Start designsystem tests + func
    // TODO: Update below test
    test("token added and sorted when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 100, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-50" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
            { type: tokenType, value: 100, name: "size-100" },
        ];
        const token: Token = { type: tokenType, value: 0, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});

describe("TokenSet Remove Tests", () => {
    test("removes a token that is present", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token in the set is removed
        tokenSet.removeToken(tokens[0]);

        // Then, the object does not contain the removed token, but has the rest of the tokens
        expect(tokenSet.tokens).not.toContain(tokens[0]);
        expect(tokenSet.tokens).toHaveLength(2);
        expect(tokenSet.tokens).toContain(tokens[1]);
        expect(tokenSet.tokens).toContain(tokens[2]);
    });

    test("doesnot removes a non-existant token", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token in the set is removed
        tokenSet.removeToken({ type: tokenType, value: 4, name: "size-25" });

        // Then, the object does not contain the removed token, but has the rest of the tokens
        expect(tokenSet.tokens).toHaveLength(3);
        expect(tokenSet.tokens).toContain(tokens[0]);
        expect(tokenSet.tokens).toContain(tokens[1]);
        expect(tokenSet.tokens).toContain(tokens[2]);
    });
});

describe("TokenSet Sorting Tests", () => {
    test("sort function sorts by token name by default", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it
        tokenSet.sort();

        // Then, the tokens are sorted by name
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("sort function sort by comparator if provided", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 55, name: "size-100" },
            { type: tokenType, value: 35, name: "size-150" },
            { type: tokenType, value: 100, name: "size-0" },
            { type: tokenType, value: 50, name: "size-50" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 35, name: "size-150" },
            { type: tokenType, value: 50, name: "size-50" },
            { type: tokenType, value: 55, name: "size-100" },
            { type: tokenType, value: 100, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it with a comparator
        tokenSet.sort((a, b) => a.value - b.value);

        // Then, the tokens are sorted by the comparator(here, value)
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
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
