import { TokenSet } from "@src/common/data/TokenSet";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";
import setUpTokens from "./TokenSet.fixtures";

describe("Token Set: All Token Uniqueness", () => {
    test("returns true, if duplicate name with same id is found", () => {
        // Given a list of tokens with 2 duplicates
        const { numberTokens } = setUpTokens();
        numberTokens.push(numberTokens[0]);
        numberTokens.push(numberTokens[1]);
        const tks = new TokenSet("tks");

        // When checked for uniqueness
        const result = tks.checkAllTokenUniqueness(numberTokens);

        // Then, the result is true
        expect(result).toBeTruthy();
    });

    test("returns true, if not duplicates are in the set", () => {
        // Given a list of tokens with no duplicates
        const { numberTokens } = setUpTokens();
        const tks = new TokenSet("tks");

        // When checked for uniqueness
        const result = tks.checkAllTokenUniqueness(numberTokens);

        // Then, the result is true
        expect(result).toBeTruthy();
    });

    test("returns false, if duplicate name with different id is found", () => {
        // Given a list of tokens with a duplicate name but different id token
        const { numberTokens } = setUpTokens();
        numberTokens.push({ ...numberTokens[0], uid: v4() });
        const tks = new TokenSet("tks");

        // When checked for uniqueness
        const result = tks.checkAllTokenUniqueness(numberTokens);

        // Then, the result is true
        expect(result).toBeFalsy();
    });
});
