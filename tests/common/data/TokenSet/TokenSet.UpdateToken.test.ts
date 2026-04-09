import { UpdatePolicy } from "@src/common/data/Common";
import { createToken } from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";
import setUpTokens from "./TokenSet.fixtures";

describe("TokenSet Update Tests", () => {
    test("token gets upserted(added), when the token set is empty and policy is set to insert", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken = createTokenNode(
            "50",
            createToken({ default: 10 }, type),
        );
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toBe(validToken);
    });

    test("modes get added back, when a token is updated with fewer modes", () => {
        // Given a tokenset with more than 1 mode
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const tokenToUpdate = generateTokenNode(
            undefined,
            "token",
            type,
            undefined,
            undefined,
            undefined,
            [modes[0]],
        );
        const tokens: TokenNode[] = [
            generateTokenNode(
                undefined,
                "token",
                type,
                undefined,
                undefined,
                undefined,
                modes,
            ),
            { ...tokenToUpdate },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with less modes
        tokenSet.updateToken(tokenSet.tokens[1].uid, tokenToUpdate);

        // Then, the the existing tokens are added back
        if (tokenSet.tokens[1].value?.entityType !== "token")
            return expect.fail();
        const value = tokenSet.tokens[1].value;
        expect(Object.keys(value.valueByMode)).toContain(modes[0]);
        expect(Object.keys(value.valueByMode)).toContain(modes[1]);
        expect(Object.keys(value.valueByMode)).toContain(modes[2]);

        // And their values default to default mode value
        expect(value.valueByMode[modes[1]]).toStrictEqual(
            value.valueByMode[modes[0]],
        );
        expect(value.valueByMode[modes[2]]).toStrictEqual(
            value.valueByMode[modes[0]],
        );
    });

    test("new modes gets added to existing tokens, when updated token contains additional modes", () => {
        // Given a tokenset
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const secondToken = generateTokenNode(
            undefined,
            "token",
            type,
            undefined,
            undefined,
            undefined,
            [modes[0]],
        );
        const tokenToUpdate = generateTokenNode(
            secondToken.name,
            "token",
            type,
            secondToken.uid,
            secondToken.parentId,
            secondToken.reference,
            modes,
        );
        const tokens: TokenNode[] = [
            generateTokenNode(
                undefined,
                "token",
                type,
                undefined,
                undefined,
                undefined,
                [modes[0]],
            ),
            secondToken,
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When one of the tokens is updated with new modes.
        tokenSet.updateToken(tokens[1].uid, tokenToUpdate);
        // Then, the existing token gets the new modes
        if (tokenSet.tokens[0].value?.entityType !== "token")
            return expect.fail();
        const value = tokenSet.tokens[0].value;
        expect(Object.keys(value.valueByMode)).toContain(modes[0]);
        expect(Object.keys(value.valueByMode)).toContain(modes[1]);
        expect(Object.keys(value.valueByMode)).toContain(modes[2]);

        // And their values default to default mode value
        expect(value.valueByMode[modes[1]]).toStrictEqual(
            value.valueByMode[modes[0]],
        );
        expect(value.valueByMode[modes[2]]).toStrictEqual(
            value.valueByMode[modes[0]],
        );
    });

    test("token does not get added, when the token set is empty and policy is set to ignore", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken = createTokenNode(
            "50",
            createToken({ default: 10 }, type),
        );
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added
        expect(tokenSet.tokens).toStrictEqual([]);
    });

    test("token gets added, when the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [
            createTokenNode("25", createToken({ default: 5 }, type), "1"),
            createTokenNode("75", createToken({ default: 15 }, type), "2"),
        ];
        const expectedTokens: TokenNode[] = [
            createTokenNode("25", createToken({ default: 5 }, type), "1"),
            createTokenNode("75", createToken({ default: 15 }, type), "2"),
            createTokenNode("50", createToken({ default: 10 }, type), "3"),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken = createTokenNode(
            "50",
            createToken({ default: 10 }, type),
            "3",
        );
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token does not get added, when the token set is non-empty and policy is set to ignore", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [
            createTokenNode("25", createToken({ default: 5 }, type), "1"),
            createTokenNode("75", createToken({ default: 15 }, type), "2"),
        ];
        const expectedTokens: TokenNode[] = [
            createTokenNode("25", createToken({ default: 5 }, type), "1"),
            createTokenNode("75", createToken({ default: 15 }, type), "2"),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken = createTokenNode(
            "50",
            createToken({ default: 10 }, type),
            "3",
        );
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token gets added, when the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const { numberTokenSet } = setUpTokens();
        const validToken = createTokenNode(
            "new token",
            createToken({ default: 10 }, "number"),
        );

        // and the valid token is not in the set
        expect(numberTokenSet.tokens).not.toContain(validToken);

        // When a token is added
        numberTokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added
        expect(numberTokenSet.tokens).toContain(validToken);
    });

    test("token upserted and sorted, when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: TokenNode[] = [
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 0 }, tokenType),
                "3",
            ),
        ];
        const sortedTokens: TokenNode[] = [
            createTokenNode(
                "size-0",
                createToken({ default: 0 }, tokenType),
                "3",
            ),
            createTokenNode(
                "size-50",
                createToken({ default: 5 }, tokenType),
                "4",
            ),
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
                "2",
            ),
        ];
        const token = createTokenNode(
            "size-50",
            createToken({ default: 5 }, tokenType),
            "4",
        );
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token.name, token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted, when sort is turned on based on comparator", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: TokenNode[] = [
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 150 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 20 }, tokenType),
                "3",
            ),
        ];
        const sortedTokens: TokenNode[] = [
            createTokenNode(
                "size-50",
                createToken({ default: 5 }, tokenType),
                "4",
            ),
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 20 }, tokenType),
                "3",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 150 }, tokenType),
                "2",
            ),
        ];
        const token = createTokenNode(
            "size-50",
            createToken({ default: 5 }, tokenType),
            "4",
        );
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted with comparator
        tokenSet.updateToken(token.name, token, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(
                    a.value?.entityType === "token" && a.value.valueByMode,
                )[0] -
                Object.values(
                    b.value?.entityType === "token" && b.value.valueByMode,
                )[0],
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("throws error, when tokenset is empty and different type of token is upserted", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated(upserted)
        const differentToken = createTokenNode(
            "50",
            createToken({ default: 10 }, "spacing"),
        );
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("throws error, when tokenset is non-empty and different type of token is upserted", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: TokenNode[] = [
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
            ),
            createTokenNode("size-0", createToken({ default: 0 }, tokenType)),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted)
        const differentToken = createTokenNode(
            "50",
            createToken({ default: 10 }, "spacing"),
        );
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("throws error, when invalid token is passed in", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: TokenNode[] = [
            createTokenNode(
                "size-100",
                createToken({ default: 10 }, tokenType),
            ),
            createTokenNode("size-50", createToken({ default: 15 }, tokenType)),
            createTokenNode("size-0", createToken({ default: 0 }, tokenType)),
        ];

        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted) with invalid valueByNames
        const updatedToken = createTokenNode(
            "size-50",
            createToken({ default: "test" }, tokenType),
        );
        // Then, an error is thrown
        expect(() => tokenSet.updateToken("size-50", updatedToken)).toThrow();
    });

    test("token upserted and sorted, when tokenset is empty and sort is turned on", () => {
        // Given a empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: TokenNode[] = [];
        const token1 = createTokenNode(
            "size-50",
            createToken({ default: 5 }, tokenType),
            "1",
        );
        const token2 = createTokenNode(
            "size-0",
            createToken({ default: 0 }, tokenType),
            "2",
        );
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);
        const sortedTokens: TokenNode[] = [
            createTokenNode(
                "size-0",
                createToken({ default: 0 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-50",
                createToken({ default: 5 }, tokenType),
                "1",
            ),
        ];

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token1.name, token1, { sortToken: true });
        tokenSet.updateToken(token2.name, token2, { sortToken: true });

        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted, when sort is turned and comparator on is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: TokenNode[] = [
            createTokenNode(
                "size-100",
                createToken({ default: 100 }, tokenType),
                "1",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 50 }, tokenType),
                "3",
            ),
        ];
        const sortedTokens: TokenNode[] = [
            createTokenNode(
                "size-50",
                createToken({ default: 0 }, tokenType),
                "4",
            ),
            createTokenNode(
                "size-150",
                createToken({ default: 15 }, tokenType),
                "2",
            ),
            createTokenNode(
                "size-0",
                createToken({ default: 50 }, tokenType),
                "3",
            ),
            createTokenNode(
                "size-100",
                createToken({ default: 100 }, tokenType),
                "1",
            ),
        ];
        const token = createTokenNode(
            "size-50",
            createToken({ default: 0 }, tokenType),
            "4",
        );
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(
                    a.value?.entityType === "token" && a.value.valueByMode,
                )[0] -
                Object.values(
                    b.value?.entityType === "token" && b.value.valueByMode,
                )[0],
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});
