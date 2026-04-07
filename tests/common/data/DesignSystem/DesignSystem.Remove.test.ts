import { DesignSystem } from "@src/common/data/DesignSystem";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

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

    test("removes and unlinks token set, when a primitive token is removed", () => {
        // Given a design system
        const {
            dsName,
            tokenSets: [primitiveTokenSet],
        } = setUpDesignSystem();
        const aliasTokens = primitiveTokenSet.tokens.map((token) =>
            generateTokenNode(
                undefined,
                "token",
                "number",
                undefined,
                undefined,
                token.uid,
            ),
        );
        const aliasTokenSet = new TokenSet("tks", "number", 2, aliasTokens);
        const designSystem = new DesignSystem(dsName, [
            primitiveTokenSet,
            aliasTokenSet,
        ]);

        // When a primitive token set is removed
        designSystem.removeTokenSet(primitiveTokenSet);

        // Then the dependent values are hydrated with primitive values
        // Assumption: The ordering is not mutated by the design system, test or the intermediaries.
        aliasTokenSet.tokens.forEach((token, index) => {
            expect(token.value).toStrictEqual(
                primitiveTokenSet.tokens[index].value,
            );
        });
    });

    test("removes and unlinks token set, when a level 2 is removed", () => {
        // Given a design system
        const {
            dsName,
            tokenSets: [primitiveTokenSet],
        } = setUpDesignSystem();
        const aliasTokens = primitiveTokenSet.tokens.map((token) =>
            generateTokenNode(
                undefined,
                "token",
                "number",
                undefined,
                undefined,
                token.uid,
            ),
        );
        const semanticTokens = aliasTokens.map((token) =>
            generateTokenNode(
                undefined,
                "token",
                "number",
                undefined,
                undefined,
                token.uid,
            ),
        );
        const aliasTokenSet = new TokenSet("tks", "number", 2, aliasTokens);
        const semanticTokenSet = new TokenSet(
            "tks2",
            "number",
            3,
            semanticTokens,
        );
        const designSystem = new DesignSystem(dsName, [
            primitiveTokenSet,
            aliasTokenSet,
            semanticTokenSet,
        ]);

        // When a primitive token set is removed
        designSystem.removeTokenSet(aliasTokenSet);

        // Then the dependent values are hydrated with primitive values
        // Assumption: The ordering is not mutated by the design system, test or the intermediaries.
        semanticTokenSet.tokens.forEach((token, index) => {
            expect(token.value).toStrictEqual(
                primitiveTokenSet.tokens[index].value,
            );
        });
    });

    test("throws error, when non-primitive is hydrated after removing its referencing token  ", () => {
        // Given a design system
        const {
            dsName,
            tokenSets: [primitiveTokenSet],
        } = setUpDesignSystem();
        const aliasTokens = primitiveTokenSet.tokens.map((token) =>
            generateTokenNode(
                undefined,
                "token",
                "number",
                undefined,
                undefined,
                token.uid,
            ),
        );
        const aliasTokenSet = new TokenSet("tks", "number", 2, aliasTokens);
        const designSystem = new DesignSystem(dsName, [
            primitiveTokenSet,
            aliasTokenSet,
        ]);

        // When a primitive token set is removed
        designSystem.removeTokenSet(primitiveTokenSet);

        // Then the dependent values are hydrated with primitive values
        aliasTokenSet.tokens.forEach((token) => {
            expect(() => designSystem.hydrateToken(token)).toThrow();
        });
    });

    test("do not remove tokenset, when a partial token (matching name) is passed in", () => {
        // Given a non-empty token set
        const { dsName, tokenSets, tokenSet3 } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When a partially matching tokenset is removed
        designSystem.removeTokenSet(tokenSet3);

        // Then, the tokensets are unaffected
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });

    test("do not remove tokenset, when a non-existing is passed in", () => {
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
