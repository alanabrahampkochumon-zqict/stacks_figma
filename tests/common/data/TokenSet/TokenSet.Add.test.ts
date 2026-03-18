import { InsertConflictPolicy } from "@src/common/data/Common";
import { createGroup } from "@src/common/data/Group";
import { createToken } from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";

// Regex
// \{\s*type:\s*(.*),\s*valueByMode:\s*(\{.*\}),\s*name:\s*(.*)\s*\} -> createToken($3, $2, $1)
// \{\s*name:\s*(.*),\s*valueByMode:\s*(\{.*\}),\s*type:\s*(.*)\s*\} -> createToken($1, $2, $3)

// TODO: Groups cant be added to tokenonly nodes or vice verse
describe("TokenSet Add Tests", () => {
    test("token gets added, when a valid token is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken = createTokenNode(
            "50",
            createToken({ default: 10 }, type),
        );
        tokenSet.addToken(validToken);

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toStrictEqual(validToken);
    });

    test("group gets added, when a valid group is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "group";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a group is added
        const validGroup = createTokenNode("group", createGroup(true));
        tokenSet.addToken(validGroup);

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toStrictEqual(validGroup);
    });

    test("token gets upserted, when an existing token is passed in with insert policy of replace", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens = [
            createTokenNode("50", createToken({ default: 55 }, type)),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);
        const validToken = createTokenNode(
            "50",
            createToken({ default: 10 }, type),
            tokens[0].uid,
        );

        // When a token is added with same name and policy set to update
        tokenSet.addToken(validToken, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        // Then, then the token is updated
        expect(tokenSet.tokens).toStrictEqual([validToken]);
    });

    test("group gets upserted, when an existing group is passed in with insert policy of replace", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "group";
        const level = 1;
        const groups = [createTokenNode(type, createGroup(true))];
        const tokenSet = new TokenSet(name, type, level, groups);
        const validGroup = createTokenNode(
            type,
            createGroup(true),
            groups[0].uid,
        );

        // When a token is added with same name and policy set to update
        tokenSet.addToken(validGroup, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        // Then, then the token is updated
        expect(tokenSet.tokens).toStrictEqual([validGroup]);
    });

    test("token added and sorted, when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken = [
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

        const sortedTokens = [
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

        // When a token is added with sorting on
        tokenSet.addToken(token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token added and sorted, when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken = [
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
        const sortedTokens = [
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

    test("throws error, when a group is passed to a token set", () => {
        // Given a non-empty "token" set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens = [
            createTokenNode("50", createToken({ default: 55 }, type)),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a group is added
        const validGroup = createTokenNode("group", createGroup(true));

        // Then, an error is thrown
        expect(() => tokenSet.addToken(validGroup)).toThrow();
    });

    test("throws error, when a token is passed to a group set", () => {
        // Given a non-empty "group" set
        const name = "TokenSet";
        const type = "group";
        const level = 1;
        const tokens = [createTokenNode(type, createGroup(true))];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a group is added
        const validToken = createTokenNode(
            "50",
            createToken({ default: 55 }, "number"),
        );

        // Then, an error is thrown
        expect(() => tokenSet.addToken(validToken)).toThrow();
    });

    test("throws error, when a token with mismatching type is passed in", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: TokenNode[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken = createTokenNode(
            "50",
            createToken({ default: 10 }, "string"),
        );
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });
});
