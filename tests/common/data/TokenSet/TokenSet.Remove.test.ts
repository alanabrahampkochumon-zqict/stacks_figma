import { createToken, type Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Remove Tests", () => {
    test("removes a token, when a token in the set is passed in", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            createToken("size-50", { default: 5 }, tokenType),
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
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

    test("doesnot removes a token, when a token not in the set is passed in", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            createToken("size-50", { default: 5 }, tokenType),
            createToken("size-100", { default: 10 }, tokenType),
            createToken("size-150", { default: 15 }, tokenType),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token in the set is removed
        tokenSet.removeToken(createToken("size-25", { default: 4 }, tokenType));

        // Then, the object does not contain the removed token, but has the rest of the tokens
        expect(tokenSet.tokens).toHaveLength(3);
        expect(tokenSet.tokens).toContain(tokens[0]);
        expect(tokenSet.tokens).toContain(tokens[1]);
        expect(tokenSet.tokens).toContain(tokens[2]);
    });
});
