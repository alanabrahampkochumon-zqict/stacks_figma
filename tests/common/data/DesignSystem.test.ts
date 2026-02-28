import { describe, expect, test } from "vitest";
import { InsertConflictPolicy } from "../../../src/common/data/Common";
import { DesignSystem } from "../../../src/common/data/DesignSystem";
import { type Token } from "../../../src/common/data/Token";
import { TokenSet } from "../../../src/common/data/TokenSet";

function initializeTokens() {
    const tokenType1 = "number";
    const tokens1: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 50, name: "size-500" },
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
        { type: tokenType1, value: 10, name: "size-100" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 35, name: "size-350" },
    ];
    const mergedToken: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 50, name: "size-500" },
        { type: tokenType1, value: 100, name: "size-1000" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 35, name: "size-350" },
    ];
    const sortedMergedToken: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 10, name: "size-100" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 35, name: "size-350" },
        { type: tokenType1, value: 50, name: "size-500" },
        { type: tokenType1, value: 100, name: "size-1000" },
    ];
    const tokenSet1 = new TokenSet("token-1", tokenType1, 1, tokens1);
    const tokenSet2 = new TokenSet("token-2", tokenType2, 1, tokens2);
    const tokenSet3 = new TokenSet("token-1", tokenType1, 1, tokens3);
    const mergedTokenSet = new TokenSet("token-1", tokenType1, 1, mergedToken);
    const sortedMergedTokenSet = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedMergedToken,
    );
    const tokenSets = [tokenSet1, tokenSet2];
    const dsName = "Falcon";
    return {
        dsName,
        tokenSets,
        tokenSet3,
        mergedTokenSet,
        sortedMergedTokenSet,
    };
}

describe("Design System Initialization", () => {
    test("can be initialized with name only", () => {
        // When a design system is initialized with name only
        const { dsName } = initializeTokens();
        const designSystem = new DesignSystem(dsName);

        // Then, it is correct initialized with default values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.tokenSets.length).toBe(0);
    });

    test("can be initialized with name and tokenset", () => {
        // When a design system is initialized with name and tokenset
        const { dsName, tokenSets } = initializeTokens();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // Then, the design system is initialized with those values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.tokenSets).toStrictEqual([...tokenSets]);
    });
});

describe("Design System Add Token", () => {
    test("tokenset(single) gets added, when added to empty design system", () => {
        // Given a empty design system
        const {
            dsName,
            tokenSets: [tokenSet],
        } = initializeTokens();
        const designSystem = new DesignSystem(dsName);

        // When tokens are added
        designSystem.addTokenSet(tokenSet);

        // Then it gets added to the design system
        expect(designSystem.tokenSets).toStrictEqual([tokenSet]);
    });

    test("tokenset with same name will not get added, when added to non-empty design system with conflict policy of ignore", () => {
        // Given a empty design system
        const { dsName, tokenSets, tokenSet3 } = initializeTokens();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When tokens are added
        designSystem.addTokenSet(tokenSet3);

        // Then it gets added to the design system
        expect(designSystem.tokenSets).toStrictEqual([...tokenSets]);
    });

    test("tokenset with same name, level, and type gets gets merged, when added to non-empty design system with conflict policy of merge", () => {
        // Given a empty design system
        const {
            dsName,
            tokenSets: [tokenSet1],
            tokenSet3,
            mergedTokenSet,
        } = initializeTokens();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokens are added
        designSystem.addTokenSet(tokenSet3, {
            insertPolicy: InsertConflictPolicy.MERGE,
        });
        console.log(designSystem.tokenSets);
        // Then it gets added to the design system
        expect(designSystem.tokenSets).toStrictEqual(mergedTokenSet);
    });
});

describe("Design System Get TokenSet Index", () => {
    test("returns correct index, when queried for existing token", () => {
        // Given a design system with non-empty tokensets
        const expectedIndex = 0;
        const { dsName, tokenSets } = initializeTokens();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When queried for index of the tokenset
        const index = designSystem.getIndex(tokenSets[expectedIndex].name);

        // Then it returns the correct index
        expect(index).toBe(expectedIndex);
    });

    test("returns -1, when queried for non-existing token", () => {
        // Given a design system with non-empty tokensets
        const { dsName, tokenSets } = initializeTokens();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When queried for index of the non-existing tokenset
        const index = designSystem.getIndex("Non-existing TS");

        // Then it returns -1
        expect(index).toBe(-1);
    });
});
