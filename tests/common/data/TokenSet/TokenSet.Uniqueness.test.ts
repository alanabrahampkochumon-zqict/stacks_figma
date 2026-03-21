import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Token Uniqueness", () => {
    test("returns true, tokens with duplicate id and name", () => {
        // Given an array of tokens with duplicates
        const tokens = Array(2)
            .fill(0)
            .map(() => generateTokenNode());
        tokens.push(tokens[0]);

        // When checked for uniqueness of duplicate element
        // Then, it returns true
        expect(TokenSet.checkTokenUniqueness(tokens[0], tokens)).toBeTruthy();
    });

    test("returns true, tokens with no duplicate names", () => {
        // Given an array of tokens no duplicates
        const tokens = Array(10)
            .fill(0)
            .map(() => generateTokenNode());

        // When checked for uniqueness of first element.
        // Then, it returns true
        expect(TokenSet.checkTokenUniqueness(tokens[0], tokens)).toBeTruthy();
    });

    test("returns false, token with duplicate name and different id", () => {
        // Given an array of tokens with duplicate name and unique id
        const tokens = Array(10)
            .fill(0)
            .map(() => generateTokenNode());
        tokens.push(generateTokenNode(tokens[0].name));

        // When checked for uniqueness of duplicate element
        // Then, it returns true
        expect(TokenSet.checkTokenUniqueness(tokens[0], tokens)).toBeFalsy();
    });
});
