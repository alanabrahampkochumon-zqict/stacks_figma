import { UpdatePolicy } from "@src/common/data/Common";
import { DesignSystem } from "@src/common/data/DesignSystem";
import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design Sytem Update TokenSet", () => {
    test("tokenset gets updated, when a existing tokenset name with new tokenset is passed in", () => {
        // Given a non-empty token set
        const { dsName, tokenSets, tokenSet3 } = setUpDesignSystem();
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
        } = setUpDesignSystem();
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
        } = setUpDesignSystem();
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
        const { dsName, tokenSets } = setUpDesignSystem();
        const token1: Token = {
            name: "test-3",
            type: tokenSets[0].type,
            valueByMode: { default: 3 },
        };
        const token2: Token = {
            name: "test-1",
            type: tokenSets[0].type,
            valueByMode: { default: 1 },
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
        } = setUpDesignSystem();
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
