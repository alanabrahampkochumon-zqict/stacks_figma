import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import setUpTokens from "./TokenSet.fixtures";
import {Token} from "@src/common/data/Token.ts";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";

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
        numberTokens.push(new Token("number", numberTokens[0].name, numberTokens[0].valueByMode, numberTokens[0].group, ReferenceID.generate()))
        const tks = new TokenSet("tks");

        // When checked for uniqueness
        const result = tks.checkAllTokenUniqueness(numberTokens);

        // Then, the result is true
        expect(result).toBeFalsy();
    });
});
