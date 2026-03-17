import { createToken } from "@src/common/data/Token";
import { createTokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

describe("TokenSet Remove Tests", () => {
    test("removes a token, when a token in the set is passed in", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            createTokenNode("size-50", createToken({ default: 5 }, tokenType)),
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
            ),
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

    test("doesnot remove a token, when a token not in the set is passed in", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            createTokenNode("size-50", createToken({ default: 5 }, tokenType)),
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
            ),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token in the set is removed
        tokenSet.removeToken(
            createTokenNode("size-25", createToken({ default: 4 }, tokenType)),
        );

        // Then, the object does not contain the removed token, but has the rest of the tokens
        expect(tokenSet.tokens).toHaveLength(3);
        expect(tokenSet.tokens).toContain(tokens[0]);
        expect(tokenSet.tokens).toContain(tokens[1]);
        expect(tokenSet.tokens).toContain(tokens[2]);
    });
});
