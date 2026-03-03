import { describe, expect, test } from "vitest";

import {
    InsertConflictPolicy,
    UpdatePolicy,
} from "../../../src/common/data/Common";
import { Token } from "../../../src/common/data/Token";
import { TokenSet } from "../../../src/common/data/TokenSet";

// TODO: Refactor testnames using [return/action] when [condition] format

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

describe("TokenSet Size Tests", () => {
    const tokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
    ];
    const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

    test("return correct size when set is non-empty", () => {
        // Given a token set

        // When the length is queried
        const length = tokenSet.size();

        // Then, it returns correct length
        expect(length).toBe(tokens.length);
    });

    test("returns 0 when set is empty", () => {
        // Given an empty token set
        const emptyTokenSet = new TokenSet("empty", "string");

        // When the length is queried
        const length = emptyTokenSet.size();

        // Then, it returns 0
        expect(length).toBe(0);
    });
});

function setUp() {
    const originalTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
    ];

    const cleanMergingTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 30, name: "size-300" },
        { type: "sizing", value: 250, name: "size-250" },
        { type: "sizing", value: 120, name: "size-200" },
    ];
    const cleanMergingResultTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
        { type: "sizing", value: 30, name: "size-300" },
        { type: "sizing", value: 250, name: "size-250" },
        { type: "sizing", value: 120, name: "size-200" },
    ];
    const sortedMergingResultTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
        { type: "sizing", value: 120, name: "size-200" },
        { type: "sizing", value: 250, name: "size-250" },
        { type: "sizing", value: 30, name: "size-300" },
    ];
    const valueSortedMergingResultTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
        { type: "sizing", value: 30, name: "size-300" },
        { type: "sizing", value: 120, name: "size-200" },
        { type: "sizing", value: 250, name: "size-250" },
    ];
    const conflictMergingTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 15, name: "size-100" },
        { type: "sizing", value: 25, name: "size-150" },
        { type: "sizing", value: 35, name: "size-200" },
    ];
    const conflictMergingReplaceResultTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 15, name: "size-100" },
        { type: "sizing", value: 25, name: "size-150" },
        { type: "sizing", value: 35, name: "size-200" },
    ];
    const conflictMergingIgnoreResultTokens: Token[] = [
        { type: "sizing", value: 5, name: "size-50" },
        { type: "sizing", value: 10, name: "size-100" },
        { type: "sizing", value: 15, name: "size-150" },
        { type: "sizing", value: 35, name: "size-200" },
    ];
    const differentTokens: Token[] = [
        { type: "spacing", value: 25, name: "spacing-250" },
        { type: "spacing", value: 35, name: "spacing-350" },
        { type: "spacing", value: 45, name: "spacing-450" },
    ];

    const originalTokenSet = new TokenSet("ts", "sizing", 2, originalTokens);
    const originalTokenSetString = `
    {
        "name": "ts",
        "type": "sizing",
        "level": 2,
        "tokens": [
            { "type": "sizing", "value": 5, "name": "size-50" },
            { "type": "sizing", "value": 10, "name": "size-100" },
            { "type": "sizing", "value": 15, "name": "size-150" }
        ]
    }
    `.replace(/\s/g, "");
    const emptyTokenSet = new TokenSet("empty", "animation", 4);
    const emptyTokenSetString = `
    {
        "name": "empty",
        "type": "animation",
        "level": 4,
        "tokens": []
    }
    `.replace(/\s/g, "");

    const cleanMergingTokenSet = new TokenSet(
        "ts",
        "sizing",
        2,
        cleanMergingTokens,
    );
    const cleanMergingResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        cleanMergingResultTokens,
    );
    const conflictMergingTokenSet = new TokenSet(
        "ts",
        "sizing",
        2,
        conflictMergingTokens,
    );
    const differentTokenSet = new TokenSet(
        "ts",
        differentTokens[0].type,
        1,
        differentTokens,
    );
    const conflictMergingReplaceResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        conflictMergingReplaceResultTokens,
    );
    const conflictMergingIgnoreResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        conflictMergingIgnoreResultTokens,
    );
    const sortedResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        sortedMergingResultTokens,
    );
    const valueSortedResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        valueSortedMergingResultTokens,
    );

    return {
        originalTokenSet,
        cleanMergingTokenSet,
        conflictMergingTokenSet,
        differentTokenSet,
        cleanMergingResultTokenSet,
        conflictMergingReplaceResultTokenSet,
        conflictMergingIgnoreResultTokenSet,
        sortedResultTokenSet,
        valueSortedResultTokenSet,
        originalTokenSetString,
        emptyTokenSet,
        emptyTokenSetString,
    };
}

describe("TokenSet Merge Tests", () => {
    test("throws error when tokensets don't have the same name", () => {
        // When two tokenset of different names are merged
        const { originalTokenSet, cleanMergingTokenSet } = setUp();
        cleanMergingTokenSet.name = "bad name";

        // Then, error is thrown
        expect(() =>
            originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
        ).toThrow();
    });

    test("throws error when tokensets don't have the same type", () => {
        // When two tokenset of different types are merged
        const { originalTokenSet, cleanMergingTokenSet } = setUp();
        cleanMergingTokenSet.type = "color";

        // Then, error is thrown
        expect(() =>
            originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
        ).toThrow();
    });

    test("throws error when tokensets don't have the same level", () => {
        // When two tokenset of different levels are merged
        const { originalTokenSet, cleanMergingTokenSet } = setUp();
        cleanMergingTokenSet.level = 3;

        // Then, error is thrown
        expect(() =>
            originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
        ).toThrow();
    });

    test("merged without duplicates when tokensets are of same name, type, and level", () => {
        // When two tokenset are merged
        const {
            originalTokenSet,
            cleanMergingTokenSet,
            cleanMergingResultTokenSet,
        } = setUp();
        originalTokenSet.mergeTokenSet(cleanMergingTokenSet);

        // Then, the token sets contains elements without duplicates
        expect(originalTokenSet).toStrictEqual(cleanMergingResultTokenSet);
    });

    test("merged with conflicting elements replaced, policy set to replace", () => {
        // When two tokenset are merged with insertion policy set to replace
        const {
            originalTokenSet,
            conflictMergingTokenSet,
            conflictMergingReplaceResultTokenSet,
        } = setUp();

        originalTokenSet.mergeTokenSet(conflictMergingTokenSet, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        console.log(originalTokenSet);

        // Then, the old token set's duplicate elements are replaced with new elements
        expect(originalTokenSet).toStrictEqual(
            conflictMergingReplaceResultTokenSet,
        );
    });

    test("merged with conflicting elements ignored, policy set to ignore", () => {
        // When two tokenset are merged
        const {
            originalTokenSet,
            conflictMergingTokenSet,
            conflictMergingIgnoreResultTokenSet,
        } = setUp();
        originalTokenSet.mergeTokenSet(conflictMergingTokenSet, {
            insertPolicy: InsertConflictPolicy.IGNORE,
        });

        // Then, the old token set's duplicate elements persists
        expect(originalTokenSet).toStrictEqual(
            conflictMergingIgnoreResultTokenSet,
        );
    });

    test("merged with sorting, when sort is turned on", () => {
        // When two tokenset are merged with sorting on
        const { originalTokenSet, cleanMergingTokenSet, sortedResultTokenSet } =
            setUp();
        originalTokenSet.mergeTokenSet(cleanMergingTokenSet, {
            sortToken: true,
        });

        // Then, the token sets contains elements sorted by name
        expect(originalTokenSet).toStrictEqual(sortedResultTokenSet);
    });

    test("merged with sorting by value, a sort function is provided", () => {
        // When two tokenset are merged with sorting on and a function provided
        const {
            originalTokenSet,
            cleanMergingTokenSet,
            valueSortedResultTokenSet,
        } = setUp();
        originalTokenSet.mergeTokenSet(cleanMergingTokenSet, {
            sortToken: true,
            compareFn: (a, b) => a.value - b.value,
        });

        // Then, the token sets contains elements sorted by value.
        expect(originalTokenSet).toStrictEqual(valueSortedResultTokenSet);
    });
});

describe("TokenSet Serialization Tests", () => {
    test("returns serialized output, when provided with correct tokens", () => {
        // Given a token set
        const { originalTokenSet, originalTokenSetString } = setUp();

        // When serialized to JSON
        const jsonString = originalTokenSet.toJsonString();

        // Then the serialized string contains all the properties
        expect(jsonString).toStrictEqual(originalTokenSetString);
    });

    test("returns serialized output, when provided with correct tokens", () => {
        // Given an empty token set
        const { emptyTokenSetString, emptyTokenSet } = setUp();

        // When serialized to JSON
        const jsonString = emptyTokenSet.toJsonString();

        // Then the serialized string contains all the properties
        expect(jsonString).toStrictEqual(emptyTokenSetString);
    });
});

describe("TokenSet Deserialization Tests", () => {
    test("returns correct tokenset, when json string with name is passed in", () => {
        // Given a json string with name only
        const nameOnlyTokenJSON = `
        {
            "name": "test",
        }
        `;

        // When converted to token set
        const ts = TokenSet.toTokenSet(nameOnlyTokenJSON);

        // Then a token set is created with the correct values
        expect(ts).toBeDefined();
        expect(ts?.name).toStrictEqual("test");
        expect(ts?.type).toStrictEqual("number");
        expect(ts?.level).toStrictEqual(1);
        expect(ts?.tokens).toStrictEqual([]);
    });

    test("returns correct tokenset, when json string with name and type is passed in", () => {
        // Given a json string with name and type
        const nameAndTypeTokenJSON = `
        {
            "name": "test",
            "type": "animation"
        }
        `;

        // When converted to token set
        const ts = TokenSet.toTokenSet(nameAndTypeTokenJSON);

        // Then a token set is created with the correct values
        expect(ts).toBeDefined();
        expect(ts?.name).toStrictEqual("test");
        expect(ts?.type).toStrictEqual("animation");
        expect(ts?.level).toStrictEqual(1);
        expect(ts?.tokens).toStrictEqual([]);
    });

    test("returns correct tokenset, when json string with name, type, and level is passed in", () => {
        // Given a json string with name, type and level
        const { emptyTokenSet, emptyTokenSetString } = setUp();

        // When converted to token set
        const ts = TokenSet.toTokenSet(emptyTokenSetString);

        // Then a token set is created with the correct values
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(emptyTokenSet);
    });

    test("returns correct tokenset, when json string with name, type, level, and values is passed in", () => {
        // Given a json string with name only
        const { originalTokenSet, originalTokenSetString } = setUp();

        // When converted to token set
        const ts = TokenSet.toTokenSet(originalTokenSetString);

        // Then a token set is created with the correct values
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(originalTokenSet);
    });

    test("throws error, when json string with no name is passed in", () => {
        // Given a JSON string with level only
        const levelOnlyTokenString = `
        {
            "level": 2
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.toTokenSet(levelOnlyTokenString)).toThrow();
    });

    test("throws error, when json string with invalid level is passed in", () => {
        // Given a JSON string with invalid level
        const invalidLevelTokenString = `
        {
            "name": "ts",
            "level": 5
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.toTokenSet(invalidLevelTokenString)).toThrow();
    });

    test("throws error, when json string with invalid type is passed in", () => {
        // Given a JSON string with invalid type
        const invalidTypeTokenString = `
        {
            "name": "ts",
            "type": "testing..."
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.toTokenSet(invalidTypeTokenString)).toThrow();
    });

    test("throws error, when malformed json string is passed in", () => {
        // Given a JSON string with invalid type
        const malformedTokenSetString = `
        {
            "abc": 1234
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.toTokenSet(malformedTokenSetString)).toThrow();
    });
});
