import { describe, expect, test } from "vitest";

import {
    InsertConflictPolicy,
    UpdatePolicy,
} from "../../../src/common/data/Common";
import { Token } from "../../../src/common/data/Token";
import { TokenSet } from "../../../src/common/data/TokenSet";

describe("TokenSet Intialization Tests", () => {
    test("TokenSet gets initialized with correct default values", () => {
        // Given a tokenset initialized with only name
        const name = "TokenSet";
        const tokenSet = new TokenSet(name);

        // Then, the object contains the correct name and default values
        expect(tokenSet.name).toBe(name);
        expect(tokenSet.level).toBe(1);
        expect(tokenSet.tokens.length).toBe(0);
        expect(tokenSet.type).toBe("number");
    });

    test("TokenSet gets initialized with passed in values", () => {
        // Given a tokenset initialized with only name
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and default values
        expect(tokenSet.name).toBe(name);
        expect(tokenSet.level).toBe(level);
        expect(tokenSet.tokens).toBe(tokens);
        expect(tokenSet.type).toBe(tokenType);
    });

    test("TokenSet gets initialized with empty tokens", () => {
        // Given a tokenset initialized with empty tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // Then, the object contains the correct name and empty tokens
        expect(tokenSet.name).toBe(name);
        expect(tokenSet.level).toBe(level);
        expect(tokenSet.tokens).toBe(tokens);
        expect(tokenSet.tokens.length).toBe(0);
        expect(tokenSet.type).toBe(tokenType);
    });

    test("TokenSet cannot be initialized with mixed token types", () => {
        // Given a tokenset trying to get initalized with mixed types
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: "color", value: "#ffffff", name: "size-100" },
            { type: "string", value: "hello", name: "size-150" },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("TokenSet cannot be initialized with types different from the tokenSetType", () => {
        // Given a tokenset trying to get initalized with different token type that the  tokenType specified
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: "string", value: "5", name: "size-50" },
            { type: "string", value: "#ffffff", name: "size-100" },
            { type: "string", value: "hello", name: "size-150" },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });

    test("TokenSet cannot be initialized with invalid token", () => {
        // Given a tokenset trying to get initalized with invalid token
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: "#ffffff", name: "color-50" },
        ];
        // Then, the initializer throws an error
        expect(() => new TokenSet(name, tokenType, level, tokens)).toThrow();
    });
});

describe("TokenSet Add Tests", () => {
    test("valid token can be added", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.addToken(validToken);

        // Then, the token is added to the set
        expect(tokenSet.tokens.at(0)).toBe(validToken);
    });

    test("valid token can be added", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken: Token = { name: "50", value: 10, type: "string" };
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });

    test("existing gets upserted when policy is set to replace", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [{ name: "50", value: 55, type: type }];
        const tokenSet = new TokenSet(name, type, level, tokens);
        const validToken: Token = { name: "50", value: 10, type: type };

        // When a token is added with same name and policy set to update
        tokenSet.addToken(validToken, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        // Then, then the token is updated
        expect(tokenSet.tokens).toStrictEqual([validToken]);
    });

    test("token added and sorted when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const token: Token = { type: tokenType, value: 5, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token added and sorted when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 100, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-50" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
            { type: tokenType, value: 100, name: "size-100" },
        ];
        const token: Token = { type: tokenType, value: 0, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});

describe("TokenSet Update Tests", () => {
    test("token gets added to a token set if the token set is empty and policy is set to insert", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens.at(0)).toBe(validToken);
    });

    test("token doesn't get added to a token set if the token set is empty and policy is set to ignore", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added
        expect(tokenSet.tokens).toStrictEqual([]);
    });

    test("token gets added to a token set if the token set is non-empty and policy is set to insert", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
        ];
        const expectedTokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
            { name: "50", value: 10, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to insert
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the token is added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("token doesn't get added to a token set if the token set is non-empty and policy is set to ignore", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
        ];
        const expectedTokens: Token[] = [
            { name: "25", value: 5, type: type },
            { name: "75", value: 15, type: type },
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated with policy set to ignore
        const validToken: Token = { name: "50", value: 10, type: type };
        tokenSet.updateToken(validToken.name, validToken, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the token is not added to the set
        expect(tokenSet.tokens).toStrictEqual(expectedTokens);
    });

    test("valid with different type when updated to empty set throws error", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is updated(upserted)
        const differentToken: Token = {
            name: "50",
            value: 10,
            type: "spacing",
        };
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("valid with different type when updated to non-empty set throws error", () => {
        // Given a empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted)
        const differentToken: Token = {
            name: "50",
            value: 10,
            type: "spacing",
        };
        // Then, an error is thrown
        expect(() =>
            tokenSet.updateToken(differentToken.name, differentToken),
        ).toThrow();
    });

    test("non-existant valid token gets added when updated", () => {
        // Given a empty token set
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const tokens: Token[] = [];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a token is added
        const invalidToken: Token = { name: "50", value: 10, type: "string" };
        // Then, an error is thrown
        expect(() => tokenSet.addToken(invalidToken)).toThrow();
    });

    test("invalid token update throws error", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-50" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const expectedTokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 55, name: "size-65" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token is updated(upserted) with invalid values
        const updatedToken: Token = {
            name: "size-65",
            value: "test",
            type: tokenType,
        };
        // Then, an error is thrown
        expect(() => tokenSet.updateToken("size-50", updatedToken)).toThrow();
    });

    test("token upserted and sorted when sort is turned on", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const token: Token = { type: tokenType, value: 5, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token.name, token, { sortToken: true });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted and sorted when sort is turned on based on comparator", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 150, name: "size-150" },
            { type: tokenType, value: 20, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 20, name: "size-0" },
            { type: tokenType, value: 150, name: "size-150" },
        ];
        const token: Token = { type: tokenType, value: 5, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is updated(upserted) and sorted with comparator
        tokenSet.updateToken(token.name, token, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("token upserted into an empty token set and sorted when sort is turned on", () => {
        // Given a empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [];
        const token1: Token = { type: tokenType, value: 5, name: "size-50" };
        const token2: Token = { type: tokenType, value: 0, name: "size-0" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
        ];

        // When a token is updated(upserted) and sorted
        tokenSet.updateToken(token1.name, token1, { sortToken: true });
        tokenSet.updateToken(token2.name, token2, { sortToken: true });

        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    // TODO: Update Tokenset to use dictionary instead of array
    // TODO: Hastoken and token size methods
    // TODO: Start designsystem tests + func
    // TODO: Update below test
    test("token added and sorted when sort is turned on and comparator is provided", () => {
        // Given a non-empty token set
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const initialToken: Token[] = [
            { type: tokenType, value: 100, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-50" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 50, name: "size-0" },
            { type: tokenType, value: 100, name: "size-100" },
        ];
        const token: Token = { type: tokenType, value: 0, name: "size-50" };
        const tokenSet = new TokenSet(name, tokenType, level, initialToken);

        // When a token is added with sorting on
        tokenSet.addToken(token, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });
        // Then, the token is in sorted order
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});

describe("TokenSet Remove Tests", () => {
    test("removes a token that is present", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
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

    test("doesnot removes a non-existant token", () => {
        // Given a tokenset initialized tokens
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When a token in the set is removed
        tokenSet.removeToken({ type: tokenType, value: 4, name: "size-25" });

        // Then, the object does not contain the removed token, but has the rest of the tokens
        expect(tokenSet.tokens).toHaveLength(3);
        expect(tokenSet.tokens).toContain(tokens[0]);
        expect(tokenSet.tokens).toContain(tokens[1]);
        expect(tokenSet.tokens).toContain(tokens[2]);
    });
});

describe("TokenSet Sorting Tests", () => {
    test("sort function sorts by token name by default", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 0, name: "size-0" },
            { type: tokenType, value: 5, name: "size-50" },
            { type: tokenType, value: 10, name: "size-100" },
            { type: tokenType, value: 15, name: "size-150" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it
        tokenSet.sort();

        // Then, the tokens are sorted by name
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("sort function sort by comparator if provided", () => {
        // Given a unsorted tokenset
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens: Token[] = [
            { type: tokenType, value: 55, name: "size-100" },
            { type: tokenType, value: 35, name: "size-150" },
            { type: tokenType, value: 100, name: "size-0" },
            { type: tokenType, value: 50, name: "size-50" },
        ];
        const sortedTokens: Token[] = [
            { type: tokenType, value: 35, name: "size-150" },
            { type: tokenType, value: 50, name: "size-50" },
            { type: tokenType, value: 55, name: "size-100" },
            { type: tokenType, value: 100, name: "size-0" },
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it with a comparator
        tokenSet.sort((a, b) => a.value - b.value);

        // Then, the tokens are sorted by the comparator(here, value)
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});

describe("TokenSet Find Tests", () => {
    const tokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
    ];
    const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

    test("existing token when queried for index, returns correct index", () => {
        // Given a token set
        const expectedIndex = 0;

        // When an index of existing token is queried
        const index = tokenSet.getTokenIndex(tokens[expectedIndex].name);

        // Then, it returns correct index
        expect(index).toBe(expectedIndex);
    });

    test("non-existing token when queried for index, returns -1", () => {
        // Given a token set

        // When an index of non-existing token is queried
        const index = tokenSet.getTokenIndex("random-token");

        // Then, it returns -1
        expect(index).toBe(-1);
    });

    test("token index when queried on empty token set, returns -1", () => {
        // Given an empty token set
        const emptyTokenSet = new TokenSet("empty", "string");

        // When an index of non-existing token is queried
        const index = emptyTokenSet.getTokenIndex("random-token");

        // Then, it returns -1
        expect(index).toBe(-1);
    });
});
