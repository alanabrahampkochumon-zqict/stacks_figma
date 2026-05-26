import {UpdatePolicy} from "@src/common/data/Common";
import {Token} from "@src/common/data/Token";
import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {generateToken} from "../utils/Generators";
import setUpTokens from "./TokenSet.fixtures";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";

const refIDPool = Array(10).fill(0).map(() => ReferenceID.generate())

// Regex: createTokenNode\(\s*(".+"),\s*createToken\((\{.+\}),\s*(.+)\),\s+"([0-9])",?\s*\)
// Replace: new Token($3, $1, $2, [], refIDPool[$4])

describe("TokenSet Update Tests", () => {
    test("token gets upserted(added), when the token set is empty and policy is set to insert", () => {
        // Given an empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token<typeof type>[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken = new Token(type, "50", {default: 10});
        tokenSet.updateToken(validToken.uid, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toBe(validToken);
    });

    test("modes get added back, when a token is updated with fewer modes", () => {
        // Given a TokenSet with more than 1 mode
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const tokenToUpdate = generateToken(
            type,
            undefined, [], undefined, undefined, [modes[0]]
        );

        const tokens = [
            generateToken(
                type,
                undefined, [], undefined, undefined, modes
            ),
            tokenToUpdate,
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with fewer modes
        tokenSet.updateToken(tokenSet.tokens[1].uid, tokenToUpdate);

        // Then, the existing tokens are added back
        const token = tokenSet.tokens[1];
        expect(Object.keys(token.valueByMode)).toContain(modes[0]);
        expect(Object.keys(token.valueByMode)).toContain(modes[1]);
        expect(Object.keys(token.valueByMode)).toContain(modes[2]);

        // And their values default to default mode value
        expect(token.valueByMode[modes[1]]).toStrictEqual(
            token.valueByMode[modes[0]],
        );
        expect(token.valueByMode[modes[2]]).toStrictEqual(
            token.valueByMode[modes[0]],
        );
    });

    test("new modes gets added to existing tokens, when updated token contains additional modes", () => {
        // Given a tokenset
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const secondToken = generateToken(
            type,
            undefined, [], undefined, undefined, [modes[0]]
        );
        const tokenToUpdate = generateToken(
            type,
            undefined, [], undefined, undefined, modes
        );
        const tokens = [
            generateToken(
                type,
                undefined, [], undefined, undefined, [modes[0]]
            ),
            secondToken,
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When one of the tokens is updated with new modes.
        tokenSet.updateToken(tokens[1].uid, tokenToUpdate);

        // Then, the existing token gets the new modes
        const token = tokenSet.tokens[0];
        expect(Object.keys(token.valueByMode)).toContain(modes[0]);
        expect(Object.keys(token.valueByMode)).toContain(modes[1]);
        expect(Object.keys(token.valueByMode)).toContain(modes[2]);

        // And their values default to default mode value
        expect(token.valueByMode[modes[1]]).toStrictEqual(
            token.valueByMode[modes[0]],
        );
        expect(token.valueByMode[modes[2]]).toStrictEqual(
            token.valueByMode[modes[0]],
        );
    });

    test("token does not get added, when the token set is empty and policy is set to ignore", () => {
        // Given an empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token<typeof type>[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken = new Token(type, "50", {default: 10});
        tokenSet.updateToken(validToken.uid, validToken, {
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
        const tokens = [
            new Token(type, "25", {default: 5}, [], refIDPool[1]),
            new Token(type, "75", {default: 15}, [], refIDPool[2]),
        ];
        const expectedTokens = [
            new Token(type, "25", {default: 5}, [], refIDPool[1]),
            new Token(type, "75", {default: 15}, [], refIDPool[2]),
            new Token(type, "50", {default: 10}, [], refIDPool[3]),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken = new Token(type, "50", {default: 10}, [], refIDPool[3]);
        tokenSet.updateToken(validToken.uid, validToken, {
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
        const tokens = [
            new Token(type, "25", {default: 5}, [], refIDPool[1]),
            new Token(type, "75", {default: 15}, [], refIDPool[2]),
        ];
        const expectedTokens = [
            new Token(type, "25", {default: 5}, [], refIDPool[1]),
            new Token(type, "75", {default: 15}, [], refIDPool[2]),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken = new Token(type, "50", {default: 10}, [], refIDPool[3]);
        tokenSet.updateToken(validToken.uid, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token gets added, when the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const {numberTokenSet} = setUpTokens();
        const validToken = new Token("number", "new token", {default: 10})

        // and the valid token is not in the set
        expect(numberTokenSet.tokens).not.toContain(validToken);

        // When a token is added
        numberTokenSet.updateToken(validToken.uid, validToken, {
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
        const initialToken = [
            new Token(tokenType, "size-100", {default: 10}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 15}, [], refIDPool[2]),
            new Token(tokenType, "size-0", {default: 0}, [], refIDPool[3]),
        ];
        const sortedTokens = [
            new Token(tokenType, "size-0", {default: 0}, [], refIDPool[3]),
            new Token(tokenType, "size-50", {default: 5}, [], refIDPool[4]),
            new Token(tokenType, "size-100", {default: 10}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 15}, [], refIDPool[2]),
        ];
        const token = new Token(tokenType, "size-50", {default: 5}, [], refIDPool[4]);
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token.uid, token, {sortToken: true});
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted, when sort is turned on based on comparator", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken = [
            new Token(tokenType, "size-100", {default: 10}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 150}, [], refIDPool[2]),
            new Token(tokenType, "size-0", {default: 20}, [], refIDPool[3]),
        ];
        const sortedTokens = [
            new Token(tokenType, "size-50", {default: 5}, [], refIDPool[4]),
            new Token(tokenType, "size-100", {default: 10}, [], refIDPool[1]),
            new Token(tokenType, "size-0", {default: 20}, [], refIDPool[3]),
            new Token(tokenType, "size-150", {default: 150}, [], refIDPool[2]),
        ];
        const token = new Token(tokenType, "size-50", {default: 5}, [], refIDPool[4]);
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted with comparator
        tokenSet.updateToken(token.uid, token, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(a.valueByMode)[0] - Object.values(b.valueByMode)[0]
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("throws error, when tokenset is empty and different type of token is upserted", () => {
        // Given an empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token<typeof type>[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated(upserted)
        const differentToken = new Token("spacing", "50", {default: 10})
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.uid, differentToken as any),
        ).toThrow();
    });

    test("throws error, when tokenset is non-empty and different type of token is upserted", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            new Token(tokenType, "size-100", {default: 10}),
            new Token(tokenType, "size-150", {default: 15}),
            new Token(tokenType, "size-0", {default: 0}),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted)
        const differentToken = new Token("spacing", "50", {default: 10})
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.uid, differentToken as any),
        ).toThrow();
    });

    test("throws error, when invalid token is passed in", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            new Token(tokenType, "size-100", {default: 10}),
            new Token(tokenType, "size-50", {default: 15}),
            new Token(tokenType, "size-0", {default: 0}),
        ];

        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted) with invalid valueByNames
        const updatedToken = new Token("string", "size-50", {default: "test"});
        // Then, an error is thrown
        expect(() => tokenSet.updateToken(tokens[0].uid, updatedToken as any)).toThrow();
    });

    test("token upserted and sorted, when tokenset is empty and sort is turned on", () => {
        // Given an empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token<typeof tokenType>[] = [];
        const token1 = new Token(tokenType, "size-50", {default: 5}, [], refIDPool[1]);
        const token2 = new Token(tokenType, "size-0", {default: 0}, [], refIDPool[2]);
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);
        const sortedTokens = [
            new Token(tokenType, "size-0", {default: 0}, [], refIDPool[2]),
            new Token(tokenType, "size-50", {default: 5}, [], refIDPool[1]),
        ];

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token1.uid, token1, {sortToken: true});
        tokenSet.updateToken(token2.uid, token2, {sortToken: true});

        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted, when sort is turned and comparator on is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken = [
            new Token(tokenType, "size-100", {default: 100}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 15}, [], refIDPool[2]),
            new Token(tokenType, "size-0", {default: 50}, [], refIDPool[3]),
        ];
        const sortedTokens = [
            new Token(tokenType, "size-50", {default: 0}, [], refIDPool[4]),
            new Token(tokenType, "size-150", {default: 15}, [], refIDPool[2]),
            new Token(tokenType, "size-0", {default: 50}, [], refIDPool[3]),
            new Token(tokenType, "size-100", {default: 100}, [], refIDPool[1]),
        ];
        const token = new Token(tokenType, "size-50", {default: 0}, [], refIDPool[4]);
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(a.valueByMode)[0] - Object.values(b.valueByMode)[0]
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});
