import { DesignSystem } from "@src/common/data/DesignSystem";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";
import { generateTokenNode } from "../utils/Generators";

describe("Design System Remove TokenSet", () => {
    test("removes tokenset, if token exists in the set", () => {
        // Given a non-empty token set
        const { dsName, tokenSets } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When a tokenset is removed
        designSystem.removeTokenSet(tokenSets[0]);

        // Then, the tokenset is removed
        expect(designSystem.getTokenSets()).toStrictEqual([tokenSets[1]]);
    });

    test("removes and unlinks token set, if a primitive token is removed", () => {
        const { dsName, tokenSets:[primitiveTokenSet] } = setUpDesignSystem();
        const aliasTokens = primitiveTokenSet.tokens.map((token) => generateTokenNode(undefined, "token", "number", undefined, undefined, true))
        const designSystem = new DesignSystem(dsName, [primitiveTokenSet]);
    });

    test("do not remove tokenset, if partial token (matching name) is passed in", () => {
        // Given a non-empty token set
        const { dsName, tokenSets, tokenSet3 } = setUpDesignSystem();
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
        const { dsName, tokenSets } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When a non-existing tokenset is removed
        designSystem.removeTokenSet(nonExistingTokenSet);

        // Then, the tokensets are unaffected
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });
});
