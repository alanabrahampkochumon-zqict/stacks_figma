import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Token Uniqueness", () => {
    test("returns true, tokens with duplicate id and name", () => {
        // Given a set of tokens
        const tokens = Array(2)
            .fill(0)
            .map(() => generateTokenNode());
        tokens.push(tokens[0]);
        console.log(generateTokenNode());
        console.log(tokens);

        expect(TokenSet.checkTokenUniqueness(tokens[0], tokens)).toBeTruthy();
    });

    test("returns true, tokens with no duplicate names", {});

    test("returns false, token with duplicate name and different id", () => {});
});
