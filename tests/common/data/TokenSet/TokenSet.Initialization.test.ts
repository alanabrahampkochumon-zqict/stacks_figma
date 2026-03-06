import type { ExtendedTokenTypes, Levels, Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import setUpTokens from "./TokenSet.fixtures";

describe("TokenSet Intialization Tests", () => {
    test("creates tokenset with default values, when initialized with only name", () => {
        // Given a tokenset initialized with only name
        const name = "TokenSet";
        const tokenSet = new TokenSet(name);

        // Then, the object contains the correct name and default valueByNames
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(1);
        expect(tokenSet.tokens.length).toStrictEqual(0);
        expect(tokenSet.type).toStrictEqual("number");
        expect(tokenSet.modes).contain("default");
    });

    test("creates tokenset, when initialized with passed in values", () => {
        // When a tokenset is initialized with default values
        const level = 1;
        const name = "TokenSet";
        const { numberTokens, numberTokenModes } = setUpTokens();
        const tokenSet = new TokenSet(
            name,
            numberTokens[0].type,
            level,
            numberTokens,
            numberTokenModes,
        );

        // Then, the object contains the correct name and default values
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(level);
        expect(tokenSet.tokens).toStrictEqual(numberTokens);
        expect(tokenSet.type).toStrictEqual(numberTokens[0].type);
        expect(Array.from(tokenSet.modes)).toStrictEqual(numberTokenModes);
    });

    test("creates tokenset, when initialized with empty tokens", () => {
        // Given a tokenset initialized with empty tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and empty tokens
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(level);
        expect(tokenSet.tokens).toStrictEqual(tokens);
        expect(tokenSet.tokens.length).toStrictEqual(0);
        expect(tokenSet.type).toStrictEqual(tokenType);
    });

    test("creates modes automatically, when initialized by non empty tokens", () => {
        // When a tokenset is initialized without specifying modes
        const level = 1;
        const name = "TokenSet";
        const { colorTokens, colorTokenModes } = setUpTokens();
        const tokenSet = new TokenSet(
            name,
            colorTokens[0].type,
            level,
            colorTokens,
        );

        // Then, the object contains the correct name and default valueByNames
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(level);
        expect(tokenSet.tokens).toStrictEqual(colorTokens);
        expect(tokenSet.type).toStrictEqual(colorTokens[0].type);
        // And, modes are taken from the added token
        expect(Array.from(tokenSet.modes)).toStrictEqual(colorTokenModes);
    });

    test("throws error, when initialized with mixed token types", () => {
        // Given a tokenset trying to get initalized with mixed types
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;

        const { colorTokenModes, colorTokens, numberTokenModes, numberTokens } =
            setUpTokens();

        const tokens: Token[] = [
            ...colorTokens.slice(0, 3),
            ...numberTokens.slice(0, 3),
        ];
        // Then, the initializer throws an error
        expect(
            () =>
                new TokenSet(name, tokenType, level, tokens, [
                    ...colorTokenModes,
                    ...numberTokenModes,
                ]),
        ).toThrow();
    });

    test("throws error, when initialized with types different from the tokenSetType", () => {
        // Given a tokenset trying to get initalized with different token type that the  tokenType specified
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const { colorTokenModes, colorTokens } = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () =>
                new TokenSet(
                    name,
                    tokenType,
                    level,
                    colorTokens,
                    colorTokenModes,
                ),
        ).toThrow();
    });

    test("throws error, when initialized with invalid token", () => {
        // Given a tokenset trying to get initalized with invalid token
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            {
                type: tokenType,
                valueByMode: { default: "#ffffff" },
                name: "color-50",
            },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("throws error, when initialized with invalid level", () => {
        // Given a tokenset trying to get initalized with invalid level
        const name = "TokenSet";
        const tokenType = "number";
        const level = 8 as Levels;
        const { numberTokens, numberTokenModes } = setUpTokens();
        // Then, the initializer throws an error
        expect(
            () =>
                new TokenSet(
                    name,
                    tokenType,
                    level,
                    numberTokens,
                    numberTokenModes,
                ),
        ).toThrow();
    });

    test("throws error, when initialized with invalid type", () => {
        // Given a tokenset trying to get initalized with invalid token type
        const name = "TokenSet";
        const tokenType = "invalid token type" as ExtendedTokenTypes;
        const level = 1;
        const { numberTokens, numberTokenModes } = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () =>
                new TokenSet(
                    name,
                    tokenType,
                    level,
                    numberTokens,
                    numberTokenModes,
                ),
        ).toThrow();
    });

    test("throws error, when initialized with empty name", () => {
        // Given a tokenset trying to get initalized with no name
        const name = "";
        const tokenType = "number";
        const level = 1;
        const { numberTokens, numberTokenModes } = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () =>
                new TokenSet(
                    name,
                    tokenType,
                    level,
                    numberTokens,
                    numberTokenModes,
                ),
        ).toThrow();
    });
});
