import { describe, expect, test } from "vitest";
import {
    InsertConflictPolicy,
    UpdatePolicy,
} from "../../../src/common/data/Common";
import { DesignSystem } from "../../../src/common/data/DesignSystem";
import { type Token } from "../../../src/common/data/Token";
import { TokenSet } from "../../../src/common/data/TokenSet";

function setUp() {
    const tokenType1 = "number";
    const tokens1: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 150, name: "size-150" },
        { type: tokenType1, value: 50, name: "size-50" },
        { type: tokenType1, value: 100, name: "size-1000" },
    ];
    const sortedTokens1: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 50, name: "size-50" },
        { type: tokenType1, value: 150, name: "size-150" },
        { type: tokenType1, value: 100, name: "size-1000" },
    ];
    const tokenType2 = "string";
    const tokens2: Token[] = [
        { type: tokenType2, value: "light", name: "light" },
        { type: tokenType2, value: "regular", name: "regular" },
        { type: tokenType2, value: "bold", name: "bold" },
    ];
    const tokens3: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 1000, name: "size-100" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 35, name: "size-350" },
    ];
    const mergedToken: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 150, name: "size-150" },
        { type: tokenType1, value: 50, name: "size-50" },
        { type: tokenType1, value: 100, name: "size-1000" },
        { type: tokenType1, value: 1000, name: "size-100" },
        { type: tokenType1, value: 35, name: "size-350" },
    ];
    const sortedMergedToken: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 50, name: "size-50" },
        { type: tokenType1, value: 1000, name: "size-100" },
        { type: tokenType1, value: 150, name: "size-150" },
        { type: tokenType1, value: 35, name: "size-350" },
        { type: tokenType1, value: 100, name: "size-1000" },
    ];
    const sortedMergedTokenByValue: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 35, name: "size-350" },
        { type: tokenType1, value: 50, name: "size-50" },
        { type: tokenType1, value: 100, name: "size-1000" },
        { type: tokenType1, value: 150, name: "size-150" },
        { type: tokenType1, value: 1000, name: "size-100" },
    ];
    const tokenSet1 = new TokenSet("token-1", tokenType1, 1, tokens1);
    const sortedTokenSet1 = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedTokens1,
    );
    const tokenSet2 = new TokenSet("token-2", tokenType2, 1, tokens2);
    const tokenSet3 = new TokenSet("token-1", tokenType1, 1, tokens3);
    const mergedTokenSet = new TokenSet("token-1", tokenType1, 1, mergedToken);
    const sortedMergedTokenSet = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedMergedToken,
    );

    const sortedByValueMergedTokenSet = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedMergedTokenByValue,
    );

    const tokenSets = [tokenSet1, tokenSet2];
    const dsName = "Falcon";

    const designSystem = new DesignSystem(dsName, tokenSets);
    const serializedDesignSystem = `
        {
            "name": "Falcon",
            "tokenSets": [
                "{\\"name\\":\\"token-1\\",\\"type\\":\\"number\\",\\"level\\":1,\\"tokens\\":[{\\"type\\":\\"number\\",\\"value\\":0,\\"name\\":\\"size-0\\"},{\\"type\\":\\"number\\",\\"value\\":150,\\"name\\":\\"size-150\\"},{\\"type\\":\\"number\\",\\"value\\":50,\\"name\\":\\"size-50\\"},{\\"type\\":\\"number\\",\\"value\\":100,\\"name\\":\\"size-1000\\"}]}",
                "{\\"name\\":\\"token-2\\",\\"type\\":\\"string\\",\\"level\\":1,\\"tokens\\":[{\\"type\\":\\"string\\",\\"value\\":\\"light\\",\\"name\\":\\"light\\"},{\\"type\\":\\"string\\",\\"value\\":\\"regular\\",\\"name\\":\\"regular\\"},{\\"type\\":\\"string\\",\\"value\\":\\"bold\\",\\"name\\":\\"bold\\"}]}"
            ]
        }
    `.replace(/\s/g, "");

    return {
        dsName,
        tokenSets,
        tokenSet3,
        sortedTokenSet1,
        mergedTokenSet,
        sortedMergedTokenSet,
        sortedByValueMergedTokenSet,
        serializedDesignSystem,
        designSystem,
    };
}

describe("Design System Initialization", () => {
    test("can be initialized with name only", () => {
        // When a design system is initialized with name only
        const { dsName } = setUp();
        const designSystem = new DesignSystem(dsName);

        // Then, it is correct initialized with default values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.getTokenSets().length).toBe(0);
    });

    test("can be initialized with name and tokenset", () => {
        // When a design system is initialized with name and tokenset
        const { dsName, tokenSets } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // Then, the design system is initialized with those values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });
});

describe("Design System Add TokenSet", () => {
    test("tokenset(single) gets added, when added to empty design system", () => {
        // Given a empty design system
        const {
            dsName,
            tokenSets: [tokenSet],
        } = setUp();
        const designSystem = new DesignSystem(dsName);

        // When tokens are added
        designSystem.addTokenSet(tokenSet);

        // Then it gets added to the design system
        expect(designSystem.getTokenSets()).toStrictEqual([tokenSet]);
    });

    test("tokenset with same name will not get added, when added to non-empty design system with conflict policy of ignore", () => {
        // Given a non-empty design system
        const { dsName, tokenSets, tokenSet3 } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When tokens are added
        designSystem.addTokenSet(tokenSet3);

        // Then it gets added to the design system
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });

    test("throws error, when tokenset with different types are merged", () => {
        // Given a non-empty design system
        const { dsName, tokenSets } = setUp();
        const newSet = new TokenSet(
            tokenSets[0].name,
            tokenSets[0].type,
            4,
            [],
        );
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When token with different types are merged (due to conflicting names),
        // Then, an error is thrown
        expect(() =>
            designSystem.addTokenSet(newSet, {
                insertPolicy: InsertConflictPolicy.MERGE,
            }),
        ).toThrow();
    });

    test("throws error, when tokenset with different levels are merged", () => {
        // Given a non-empty design system
        const { dsName, tokenSets } = setUp();
        const token: Token = {
            name: "invalid",
            value: "#ffffff",
            type: "color",
        };
        const newSet = new TokenSet(
            tokenSets[0].name,
            "color",
            tokenSets[0].level,
            [token],
        );
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When token with different levels are merged (due to conflicting names),
        // Then, an error is thrown
        expect(() =>
            designSystem.addTokenSet(newSet, {
                insertPolicy: InsertConflictPolicy.MERGE,
            }),
        ).toThrow();
    });

    test("sorts token, when inserted with sorted token set to true", () => {
        // Given a non-empty design system
        const {
            dsName,
            tokenSets: [tokenSet1],
            tokenSet3,
            sortedMergedTokenSet,
        } = setUp();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokens are added using merge policy and sorting set to true
        designSystem.addTokenSet(tokenSet3, {
            sortToken: true,
            insertPolicy: InsertConflictPolicy.MERGE,
        });

        // Then the merged tokens are sorted
        expect(designSystem.getTokenSets()).toStrictEqual([
            sortedMergedTokenSet,
        ]);
    });

    test("sorts token with compare function, when inserted with sorted with a compare function", () => {
        // Given a non-empty design system
        const {
            dsName,
            tokenSets: [tokenSet1],
            tokenSet3,
            sortedByValueMergedTokenSet,
        } = setUp();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokens are added using merge policy and sorting set to true
        designSystem.addTokenSet(tokenSet3, {
            sortToken: true,
            insertPolicy: InsertConflictPolicy.MERGE,
            compareFn: (a, b) => a.value - b.value,
        });

        // Then the merged tokens are sorted
        expect(designSystem.getTokenSets()).toStrictEqual([
            sortedByValueMergedTokenSet,
        ]);
    });

    test("tokenset with same name, level, and type gets gets merged, when added to non-empty design system with conflict policy of merge", () => {
        // Given a empty design system
        const {
            dsName,
            tokenSets: [tokenSet1],
            tokenSet3,
            mergedTokenSet,
        } = setUp();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokens are added
        designSystem.addTokenSet(tokenSet3, {
            insertPolicy: InsertConflictPolicy.MERGE,
        });
        // Then it gets added to the design system
        expect(designSystem.getTokenSets()).toStrictEqual([mergedTokenSet]);
    });
});

describe("Design System Remove TokenSet", () => {
    test("removes tokenset, if token exists in the set", () => {
        // Given a non-empty token set
        const { dsName, tokenSets } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When a tokenset is removed
        designSystem.removeTokenSet(tokenSets[0]);

        // Then, the tokenset is removed
        expect(designSystem.getTokenSets()).toStrictEqual([tokenSets[1]]);
    });

    test("do not remove tokenset, if partial token (matching name) is passed in", () => {
        // Given a non-empty token set
        const { dsName, tokenSets, tokenSet3 } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When a partially matching tokenset is removed
        designSystem.removeTokenSet(tokenSet3);

        // Then, the tokensets are unaffected
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });

    test("do not remove tokenset, if non-existing is passed in", () => {
        // Given a non-empty token set
        const nonExistingTokenSet = new TokenSet(
            "non-existing",
            "color",
            4,
            [],
        );
        const { dsName, tokenSets, tokenSet3 } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When a non-existing tokenset is removed
        designSystem.removeTokenSet(nonExistingTokenSet);

        // Then, the tokensets are unaffected
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });
});

describe("Design Sytem Update TokenSet", () => {
    test("tokenset gets updated, when a existing tokenset name with new tokenset is passed in", () => {
        // Given a non-empty token set
        const { dsName, tokenSets, tokenSet3 } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When tokenset is updated
        designSystem.updateTokenSet(tokenSets[0].name, tokenSet3);

        // Then, the tokenset is updated
        expect(designSystem.getTokenSets()).toStrictEqual([
            tokenSet3,
            tokenSets[1],
        ]);
    });

    test("tokenset gets inserted, when a new tokenset is passed in with update policy of INSERT", () => {
        // Given a non-empty token set
        const {
            dsName,
            tokenSets: [tokenSet1, tokenSet2],
        } = setUp();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokenset is updated with new token set
        // and update policy of INSERT
        designSystem.updateTokenSet(tokenSet2.name, tokenSet2, {
            updatePolicy: UpdatePolicy.INSERT,
        });

        // Then, the tokenset is added(not updated)
        expect(designSystem.getTokenSets()).toStrictEqual([
            tokenSet1,
            tokenSet2,
        ]);
    });

    test("tokenset does not get inserted, when a new tokenset is passed in with update policy of IGNORE", () => {
        // Given a non-empty token set
        const {
            dsName,
            tokenSets: [tokenSet1, tokenSet2],
        } = setUp();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokenset is updated with new token set
        // and update policy of IGNORE
        designSystem.updateTokenSet(tokenSet2.name, tokenSet2, {
            updatePolicy: UpdatePolicy.IGNORE,
        });

        // Then, the tokenset is not added
        expect(designSystem.getTokenSets()).toStrictEqual([tokenSet1]);
    });

    test("tokenset gets updated, when a existing tokenset is passed in with insert", () => {
        // Given a non-empty token set
        const { dsName, tokenSets } = setUp();
        const token1: Token = {
            name: "test-3",
            type: tokenSets[0].type,
            value: 3,
        };
        const token2: Token = {
            name: "test-1",
            type: tokenSets[0].type,
            value: 1,
        };

        const tokenSet = new TokenSet(
            tokenSets[0].name,
            tokenSets[0].type,
            tokenSets[0].level,
            [token1, token2],
        );

        const tokenSetSorted = new TokenSet(
            tokenSets[0].name,
            tokenSets[0].type,
            tokenSets[0].level,
            [token2, token1],
        );

        const designSystem = new DesignSystem(dsName, tokenSets);

        // When tokenset is updated
        designSystem.updateTokenSet(tokenSets[0].name, tokenSet);

        // Then, the tokenset is updated
        expect(designSystem.getTokenSets()).toStrictEqual([
            tokenSetSorted,
            tokenSets[1],
        ]);
    });

    test("tokenset gets sorted, when a new token set in passed in with update policy of INSERT", () => {
        // Given a non-empty token set
        const {
            dsName,
            tokenSets: [tokenSet1, tokenSet2],
            sortedTokenSet1,
        } = setUp();
        const designSystem = new DesignSystem(dsName, [tokenSet2]);

        // When tokenset is updated with new token set
        // and update policy of INSERT and sorting is set to true
        designSystem.updateTokenSet(tokenSet1.name, tokenSet1, {
            updatePolicy: UpdatePolicy.INSERT,
            sortToken: true,
        });

        // Then, the tokenset is added(not updated)
        expect(designSystem.getTokenSets()).toStrictEqual([
            tokenSet2,
            sortedTokenSet1,
        ]);
    });
});

describe("Design System Get TokenSet Index", () => {
    test("returns correct index, when queried for existing token", () => {
        // Given a design system with non-empty tokensets
        const expectedIndex = 0;
        const { dsName, tokenSets } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When queried for index of the tokenset
        const index = designSystem.getIndex(tokenSets[expectedIndex].name);

        // Then it returns the correct index
        expect(index).toBe(expectedIndex);
    });

    test("returns -1, when queried for non-existing token", () => {
        // Given a design system with non-empty tokensets
        const { dsName, tokenSets } = setUp();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When queried for index of the non-existing tokenset
        const index = designSystem.getIndex("Non-existing TS");

        // Then it returns -1
        expect(index).toBe(-1);
    });
});

describe("Design System GetTokenSet", () => {
    test("returns tokenset, when queried with existing name", () => {
        // Given a non empty design system
        const { tokenSets } = setUp();
        const ds = new DesignSystem("ds", tokenSets);

        // When queried for a tokenset in the design system
        const ts = ds.getTokenSet(tokenSets[0].name);

        // Then, it returns the same token in the design system
        expect(ts).toBe(ds.getTokenSets()[0]);
    });

    test("returns undefined, when queried with non-existing name", () => {
        // Given a non empty design system
        const { tokenSets } = setUp();
        const ds = new DesignSystem("ds", tokenSets);

        // When queried for a non-existent tokenset
        const ts = ds.getTokenSet("non-existent name");

        // Then, it returns undefined
        expect(ts).toBeUndefined();
    });

    test("returns undefined, when queried on empty design system", () => {
        // Given a  empty design system
        const ds = new DesignSystem("ds");

        // When queried for a tokenset
        const ts = ds.getTokenSet("non-existent name");

        // Then, it returns undefined
        expect(ts).toBeUndefined();
    });

    test("mutates design system, when tokenset is mutated", () => {
        // Given a non empty design system
        const { tokenSets } = setUp();
        const ds = new DesignSystem("ds", tokenSets);

        // When queried for a tokenset in the design system
        let ts = ds.getTokenSet(tokenSets[0].name);
        // and mutated
        ts!!.name = "Updated name";

        // Then, it updates the design system
        expect(ds.getTokenSets()[0]).toBe(ts);
    });
});

describe("TokenSet Name Update", () => {
    test("updates name, when given an existing token", () => {
        // Given a non empty design system
        const { tokenSets } = setUp();
        const ds = new DesignSystem("ds", tokenSets);
        const newName = "updated name";

        // When the name of the first token is mutated
        ds.updateTokenSetName(tokenSets[0].name, newName);

        // Then, the name is updated
        expect(ds.getTokenSets()[0].name).toStrictEqual(newName);
    });

    test("throws error, when given a non-existing token", () => {
        // Given a non empty design system
        const { tokenSets } = setUp();
        const ds = new DesignSystem("ds", tokenSets);
        const newName = "updated name";

        // When updating with a non-existant name
        // Then, it throws an error
        expect(() => ds.updateTokenSetName("unknown name", newName)).toThrow();

        // The design system is intact
        expect(ds.getTokenSets()).toStrictEqual(tokenSets);
    });

    test("throws error, when the new name already exists", () => {
        // Given a non empty design system
        const { tokenSets } = setUp();
        const ds = new DesignSystem("ds", tokenSets);

        // When updating with a colliding name
        // Then, it throws an error
        expect(() =>
            ds.updateTokenSetName(tokenSets[0].name, tokenSets[1].name),
        ).toThrow();
    });
});

describe("Design System Get TokenSets", () => {
    test("returns tokenset, if the design system is not empty", () => {
        // Given a non empty design system
        const { designSystem, tokenSets } = setUp();

        // When the token sets are retrieved
        const ts = designSystem.getTokenSets();

        // Then, it contains all the tokensets
        expect(ts).toStrictEqual(tokenSets);
    });
    test("returns [], if the design system is empty", () => {
        // Given an empty design system
        const ds = new DesignSystem("ds");

        // When the token sets are retrieved
        const ts = ds.getTokenSets();

        // Then, it is an empty []
        expect(ts).toStrictEqual([]);
    });
});

describe("Design System Serialization", () => {
    test("returns serialized output, when provided with non-empty design system", () => {
        // Given, a non-empty design system
        const { designSystem, serializedDesignSystem } = setUp();

        // When serialized
        const serialized = designSystem.toJson();

        // Then, it matches the serialized string
        expect(serialized).toStrictEqual(serializedDesignSystem);
    });

    //TODO: Add test
    test("returns serialized output, when provided with empty design system", () => {});
});

// TODO: Add deserialization
