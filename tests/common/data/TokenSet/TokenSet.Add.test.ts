import {InsertConflictPolicy} from "@src/common/data/Common";
import {ExtendedToken, Token} from "@src/common/data/Token";
import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {generateToken} from "../utils/Generators";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";
import {v4} from "uuid";

// Regex
// \{\s*type:\s*(.*),\s*valueByMode:\s*(\{.*\}),\s*name:\s*(.*)\s*\} -> createToken($3, $2, $1)
// \{\s*name:\s*(.*),\s*valueByMode:\s*(\{.*\}),\s*type:\s*(.*)\s*\} -> createToken($1, $2, $3)

describe("TokenSet Add Tests", () => {

    const uuidPool = Array(10).fill(0).map(() => v4())
    const name = "TokenSet";

    test("token gets added, when a valid token is passed in", () => {
        // Given an empty token set
        const name = "TokenSet";
        const type = ExtendedToken.number;
        const level = 1;
        const tokens: Token<typeof type>[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken = new Token(
            type,
            "50",
            {default: 10}
        );
        tokenSet.addToken(validToken);

        // Then, the token is added to the set
        expect(tokenSet.tokens[0]).toStrictEqual(validToken);
    });

    test("modes get added to new token, when a token with only default mode is passed in", () => {
        // Given a TokenSet with more than 1 mode
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const tokens = [
            generateToken(type, undefined, [], {"default": 10, small: 20, large: 30})
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken = generateToken(type, "50", [], {default: 10})
        tokenSet.addToken(validToken);

        // Then, the added token has the existing modes
        const value = tokenSet.tokens[1].valueByMode;
        expect(Object.keys(value)).toContain(modes[0]);
        expect(Object.keys(value)).toContain(modes[1]);
        expect(Object.keys(value)).toContain(modes[2]);

        // And their values default to default mode value
        expect(value[modes[0]]).toStrictEqual(value[modes[0]]);
        expect(value[modes[2]]).toStrictEqual(value[modes[0]]);
    });

    test("modes get added, when added token contains additional modes", () => {
        // Given a tokenset
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const tokens = [
            generateToken(type, undefined)
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token with new mode(s) is added
        const validToken = new Token(type, "50", {[modes[0]]: 5, [modes[1]]: 10, [modes[2]]: 15})
        tokenSet.addToken(validToken);

        // Then, the existing token gets the new modes
        const value = tokenSet.tokens[0];
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

    test("token gets upserted, when an existing token is passed in with insert policy of replace", () => {
        // Given a non-empty token set
        const type = "number";
        const level = 1;
        const tokens = [
            new Token(type, "50", {default: 55})
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);
        const validToken =
            new Token(type, "50", {default: 10}, [], tokens[0].uid)

        // When a token is added with same name and policy set to update
        tokenSet.addToken(validToken, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        // Then, then the token is updated
        expect(tokenSet.tokens).toStrictEqual([validToken]);
    });

    test("token added and sorted, when sort is turned on", () => {
        // Given a non-empty token set
        const tokenType = "number";
        const level = 1;
        const initialToken = [
            new Token(tokenType, "size-100", {default: 10}, [], ReferenceID.fromUUID(uuidPool[0])),
            new Token(tokenType, "size-150", {default: 15}, [], ReferenceID.fromUUID(uuidPool[1])),
            new Token(tokenType, "size-0", {default: 0}, [], ReferenceID.fromUUID(uuidPool[2])),
        ];

        const sortedTokens = [
            new Token(tokenType, "size-0", {default: 0}, [], ReferenceID.fromUUID(uuidPool[2])),
            new Token(tokenType, "size-50", {default: 5}, [], ReferenceID.fromUUID(uuidPool[3])),
            new Token(tokenType, "size-100", {default: 10}, [], ReferenceID.fromUUID(uuidPool[0])),
            new Token(tokenType, "size-150", {default: 15}, [], ReferenceID.fromUUID(uuidPool[1])),
        ];
        const token =
            new Token(tokenType, "size-50", {default: 5}, [], ReferenceID.fromUUID(uuidPool[3]))

        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {sortToken: true});
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token added and sorted, when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const tokenType = "number";
        const level = 1;
        const initialToken = [
            new Token(tokenType, "size-100", {default: 10}, [], ReferenceID.fromUUID(uuidPool[0])),
            new Token(tokenType, "size-150", {default: 15}, [], ReferenceID.fromUUID(uuidPool[1])),
            new Token(tokenType, "size-0", {default: 0}, [], ReferenceID.fromUUID(uuidPool[2])),
        ];
        const sortedTokens = [
            new Token(tokenType, "size-0", {default: 0}, [], ReferenceID.fromUUID(uuidPool[2])),
            new Token(tokenType, "size-50", {default: 5}, [], ReferenceID.fromUUID(uuidPool[3])),
            new Token(tokenType, "size-100", {default: 10}, [], ReferenceID.fromUUID(uuidPool[0])),
            new Token(tokenType, "size-150", {default: 15}, [], ReferenceID.fromUUID(uuidPool[1])),
        ];
        const token =
            new Token(tokenType, "size-50", {default: 5}, [], ReferenceID.fromUUID(uuidPool[3]))

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

    test("throws error, when a token with mismatching type is passed in", () => {
        // Given an empty token set
        const type = "number";
        const level = 1;
        const tokens: Token<any>[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken = new Token("string", "50", {"default": 10 as any});
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });

    test( "throws error, when adding token node with non-unique name and different id", () => {
        // Given a non-empty token set
        const tokenType = "number";
        const level = 1;

        const initialTokens = [
            new Token(tokenType, "size-100", {default: 10}, [], ReferenceID.fromUUID(uuidPool[0])),
            new Token(tokenType, "size-150", {default: 15}, [], ReferenceID.fromUUID(uuidPool[1])),
            new Token(tokenType, "size-0", {default: 0}, [], ReferenceID.fromUUID(uuidPool[2])),
        ];

        const token =
            new Token(tokenType, "size-100", {default: 15}, [], ReferenceID.fromUUID(uuidPool[8]))

        // When a token with duplicate name and unique id is added
        const tokenSet = new TokenSet(name, tokenType, level, initialTokens);

        // Then, it throws an error
        expect(() => tokenSet.addToken(token)).toThrow();
    });
});
