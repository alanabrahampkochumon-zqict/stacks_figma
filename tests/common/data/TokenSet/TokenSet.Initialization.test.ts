import {
    createToken,
    type ExtendedTokenTypes,
    type Levels,
} from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";
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
    });

    test("creates tokenset, when initialized with passed in values", () => {
        // When a tokenset is initialized with default values
        const level = 1;
        const name = "TokenSet";
        const { numberTokens, numberTokenType } = setUpTokens();
        const tokenSet = new TokenSet(
            name,
            numberTokenType,
            level,
            numberTokens,
        );

        // Then, the object contains the correct name and default values
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(level);
        expect(tokenSet.tokens).toStrictEqual(numberTokens);
        expect(tokenSet.type).toStrictEqual(numberTokenType);
    });

    test("creates tokenset, when initialized with empty tokens", () => {
        // Given a tokenset initialized with empty tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and empty tokens
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(level);
        expect(tokenSet.tokens).toStrictEqual(tokens);
        expect(tokenSet.tokens.length).toStrictEqual(0);
        expect(tokenSet.type).toStrictEqual(tokenType);
    });

    test("throws error, when initialized with mixed token types", () => {
        // Given a tokenset trying to get initalized with mixed types
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;

        const { colorTokens, numberTokens } = setUpTokens();

        const tokens: TokenNode[] = [
            ...colorTokens.slice(0, 3),
            ...numberTokens.slice(0, 3),
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("throws error, when initialized with types different from the tokenSetType", () => {
        // Given a tokenset trying to get initalized with different token type that the  tokenType specified
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const { colorTokens } = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, colorTokens),
        ).toThrow();
    });

    test("throws error, when initialized with invalid token", () => {
        // Given a tokenset trying to get initalized with invalid token
        const name = "TokenSet";
        const tokenType: ExtendedTokenTypes = "number";
        const level = 1;
        const tokens: TokenNode[] = [
            createTokenNode(
                "color-50",
                createToken({ default: "#ffffff" }, tokenType),
            ),
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("throws error, when initialized with invalid level", () => {
        // Given a tokenset trying to get initalized with invalid level
        const name = "TokenSet";
        const tokenType = "number";
        const level = 8 as Levels;
        const { numberTokens } = setUpTokens();
        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, numberTokens),
        ).toThrow();
    });

    test("throws error, when initialized with invalid type", () => {
        // Given a tokenset trying to get initalized with invalid token type
        const name = "TokenSet";
        const tokenType = "invalid token type" as ExtendedTokenTypes;
        const level = 1;
        const { numberTokens } = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, numberTokens),
        ).toThrow();
    });

    test("throws error, when initialized with empty name", () => {
        // Given a tokenset trying to get initalized with no name
        const name = "";
        const tokenType = "number";
        const level = 1;
        const { numberTokens } = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, numberTokens),
        ).toThrow();
    });

    test("throws error, when initializing tokenset with duplicate names and unique ids", () => {
        // When a tokenset is initialized with default values
        const level = 1;
        const name = "TokenSet";
        const { numberTokens, numberTokenType } = setUpTokens();
        const dupToken = generateTokenNode(numberTokens[0].name);
        console.log([...numberTokens, dupToken]);
        expect(
            () =>
                new TokenSet(name, numberTokenType, level, [
                    ...numberTokens,
                    dupToken,
                ]),
        ).toThrow();
    });
});
