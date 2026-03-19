import { InsertConflictPolicy } from "@src/common/data/Common";
import { DesignSystem } from "@src/common/data/DesignSystem";
import { createToken } from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

// REGEX
// createToken\(\s*(".*"),\s*(\{.*\}),\s*(.*)\)
// createTokenNode($1, createToken($2, $3))

describe("Design System Add TokenSet", () => {
    test("tokenset(single) gets added, when added to empty design system", () => {
        // Given a empty design system
        const {
            dsName,
            tokenSets: [tokenSet],
        } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName);

        // When tokens are added
        designSystem.addTokenSet(tokenSet);

        // Then it gets added to the design system
        expect(designSystem.getTokenSets()).toStrictEqual([tokenSet]);
    });

    test("tokenset with same name will not get added, when added to non-empty design system with conflict policy of ignore", () => {
        // Given a non-empty design system
        const { dsName, tokenSets, tokenSet3 } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When tokens are added
        designSystem.addTokenSet(tokenSet3);

        // Then it gets added to the design system
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });

    test("throws error, when tokenset with different types are merged", () => {
        // Given a non-empty design system
        const { dsName, tokenSets } = setUpDesignSystem();
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
        const { dsName, tokenSets } = setUpDesignSystem();
        const token: TokenNode = createTokenNode(
            "invalid",
            createToken({ default: "#ffffff" }, "color"),
        );
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
        } = setUpDesignSystem();
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
        } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokens are added using merge policy and sorting set to true
        designSystem.addTokenSet(tokenSet3, {
            sortToken: true,
            insertPolicy: InsertConflictPolicy.MERGE,
            compareFn: (a, b) =>
                Object.values(
                    a.value?.entityType === "token" && a.value.valueByMode,
                )[0] -
                Object.values(
                    b.value?.entityType === "token" && b.value.valueByMode,
                )[0],
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
        } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, [tokenSet1]);

        // When tokens are added
        designSystem.addTokenSet(tokenSet3, {
            insertPolicy: InsertConflictPolicy.MERGE,
        });
        // Then it gets added to the design system
        expect(designSystem.getTokenSets()).toStrictEqual([mergedTokenSet]);
    });
});
