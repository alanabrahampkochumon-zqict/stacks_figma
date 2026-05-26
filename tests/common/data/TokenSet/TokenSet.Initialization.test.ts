import {
    ExtendedToken,
    type ExtendedTokenType,
    type Levels, Token,
} from "@src/common/data/Token";
import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {generateToken} from "../utils/Generators";
import setUpTokens from "./TokenSet.fixtures";

describe("TokenSet: Instantiation", () => {
    test("creates TokenSet with default values, when initialized with only name", () => {
        // Given a TokenSet initialized with only name
        const name = "TokenSet";
        const tokenSet = new TokenSet(name);

        // Then, the object contains the correct name and default valueByNames
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(1);
        expect(tokenSet.tokens.length).toStrictEqual(0);
        expect(tokenSet.type).toStrictEqual("number");
    });

    test("creates TokenSet, when initialized with passed in values", () => {
        // When a TokenSet is initialized with default values
        const level = 1;
        const name = "TokenSet";
        const {numberTokens, numberTokenType} = setUpTokens();
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

    test("creates TokenSet, when initialized with empty tokens", () => {
        // Given a TokenSet initialized with empty tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token<"number">[] = [];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and empty tokens
        expect(tokenSet.name).toStrictEqual(name);
        expect(tokenSet.level).toStrictEqual(level);
        expect(tokenSet.tokens).toStrictEqual(tokens);
        expect(tokenSet.tokens.length).toStrictEqual(0);
        expect(tokenSet.type).toStrictEqual(tokenType);
    });

    test("adds additional modes, when a token with additional mode is in the list", () => {
        // Given a TokenNode with additional modes
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [1, 2, 3].map(() =>
            generateToken(tokenType)
        );

        tokens[2].addMode("another-mode", 1234)
        tokens[2].addMode("3rd-mode", 443)

        // When a TokenSet is initialized
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the all the modes are present in the other tokens
        tokenSet.tokens.slice(0, 2).forEach((token) => {
            expect(Object.keys(token.valueByMode)).toContain(
                "another-mode",
            );
            expect(Object.keys(token.valueByMode)).toContain("3rd-mode");

            // And share the default value of the pre-existing mode
            expect(token.valueByMode["another-mode"]).toStrictEqual(
                token.valueByMode.default,
            );
            expect(token.valueByMode["3rd-mode"]).toStrictEqual(
                token.valueByMode.default,
            );
        });
    });

    test("removes non-unique duplicates, when initialized", () => {
        // Given a TokenSet with non-unique duplicates
        const level = 1;
        const name = "TokenSet";
        const {numberTokens, numberTokenType} = setUpTokens();
        const duplicatedTokens = [
            ...numberTokens,
            numberTokens[0],
            numberTokens[1],
        ];

        // When a token set is created
        const tokenSet = new TokenSet(
            name,
            numberTokenType,
            level,
            duplicatedTokens,
        );

        // Then, there are no duplicates
        expect(tokenSet.tokens).toStrictEqual(numberTokens);
    });

    test("throws error, when initialized with mixed token types", () => {
        // Given a TokenSet trying to get initialized with mixed types
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;

        const {colorTokens, numberTokens} = setUpTokens();

        const tokens = [
            ...colorTokens.slice(0, 3),
            ...numberTokens.slice(0, 3),
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("throws error, when initialized with types different from the tokenSetType", () => {
        // Given a TokenSet trying to get initialized with different token type that the  tokenType specified
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const {colorTokens} = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, colorTokens),
        ).toThrow();
    });

    test("throws error, when initialized with invalid token", () => {
        // When a TokenSet is initialized with an invalid token.
        const name = "TokenSet";
        const tokenType: ExtendedTokenType = "number";
        const level = 1;
        const tokens = [
            new Token(ExtendedToken.color, "color-50", {"light": "#fff"}),
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("throws error, when initialized with invalid level", () => {
        // Given a TokenSet trying to get initialized with invalid level
        const name = "TokenSet";
        const tokenType = "number";
        const level = 8 as Levels;
        const {numberTokens} = setUpTokens();
        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, numberTokens),
        ).toThrow();
    });

    test("throws error, when initialized with invalid type", () => {
        // Given a TokenSet trying to get initialized with invalid token type
        const name = "TokenSet";
        const tokenType = "invalid token type" as ExtendedTokenType;
        const level = 1;
        const {numberTokens} = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, numberTokens),
        ).toThrow();
    });

    test("throws error, when initialized with empty name", () => {
        // Given a TokenSet trying to get initialized with no name
        const name = "";
        const tokenType = "number";
        const level = 1;
        const {numberTokens} = setUpTokens();

        // Then, the initializer throws an error
        expect(
            () => new TokenSet(name, tokenType, level, numberTokens),
        ).toThrow();
    });

    test("throws error, when initializing TokenSet with duplicate names and unique ids", () => {
        // When a TokenSet is initialized with default values
        const level = 1;
        const name = "TokenSet";
        const {numberTokens, numberTokenType} = setUpTokens();
        const dupToken = generateToken("number", numberTokens[0].name);
        expect(
            () =>
                new TokenSet(name, numberTokenType, level, [
                    ...numberTokens,
                    dupToken,
                ]),
        ).toThrow();
    });
});
