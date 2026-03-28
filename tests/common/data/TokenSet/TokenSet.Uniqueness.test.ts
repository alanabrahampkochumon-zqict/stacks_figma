import type { ExtendedTokenTypes } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Token Uniqueness", () => {
    test("returns true, tokens with duplicate id and name", () => {
        // Given an array of tokens with duplicates
        const tokenType: ExtendedTokenTypes = "number";
        const tokens = Array(2)
            .fill(0)
            .map(() => generateTokenNode(undefined, "token", tokenType));
        tokens.push(tokens[0]);
        const tokenSet = new TokenSet("tks", tokenType, 1, tokens);

        // When checked for uniqueness of duplicate element
        // Then, it returns true
        expect(tokenSet.checkTokenUniqueness(tokens[0])).toBeTruthy();
    });

    test("returns true, tokens with no duplicate names", () => {
        // Given an array of tokens no duplicates
        const tokenType: ExtendedTokenTypes = "number";
        const tokens = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "token", tokenType));
        const tokenSet = new TokenSet("tks", tokenType, 1, tokens);

        // When checked for uniqueness of first element.
        // Then, it returns true
        expect(tokenSet.checkTokenUniqueness(tokens[0])).toBeTruthy();
    });

    test("returns false, token with duplicate name and different id", () => {
        // Given an array of tokens with duplicate name and unique id
        const tokenType: ExtendedTokenTypes = "number";
        const tokens = Array(2)
            .fill(0)
            .map(() => generateTokenNode(undefined, "token", tokenType));
        const duplicateToken = generateTokenNode(tokens[0].name);
        const tokenSet = new TokenSet("tks", tokenType, 1, tokens);

        // When checked for uniqueness of duplicate element
        // Then, it returns true
        expect(tokenSet.checkTokenUniqueness(duplicateToken)).toBeFalsy();
    });
});
