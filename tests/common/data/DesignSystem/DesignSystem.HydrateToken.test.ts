import { DesignSystem } from "@src/common/data/DesignSystem";
import { TokenSet } from "@src/common/data/TokenSet";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Design System: Hydrate Token", () => {
    function setUp() {
        const primitiveTokens = Array(10)
            .fill(0)
            .map(() =>
                generateTokenNode(
                    undefined,
                    "token",
                    "number",
                    undefined,
                    undefined,
                    false,
                ),
            );
        const aliasTokens = primitiveTokens.map((token) => {
            return {
                ...token,
                uid: v4(),
                reference: token.uid,
                value: undefined,
            };
        });
        const semanticTokens = aliasTokens.map((token) => {
            return {
                ...token,
                uid: v4(),
                reference: token.uid,
                value: undefined,
            };
        });
        const primitiveTokenSetName = "primitives";
        const aliasTokenSetName = "alias";
        const semanticTokenSetName = "semantic";

        const primitiveTKS = new TokenSet(
            primitiveTokenSetName,
            "number",
            1,
            primitiveTokens,
        );
        const aliasTKS = new TokenSet(
            aliasTokenSetName,
            "number",
            2,
            aliasTokens,
        );
        const semanticTKS = new TokenSet(
            semanticTokenSetName,
            "number",
            3,
            semanticTokens,
        );
        return {
            primitiveTKS,
            primitiveTokenSetName,
            primitiveTokens,
            aliasTKS,
            aliasTokenSetName,
            aliasTokens,
            semanticTKS,
            semanticTokenSetName,
            semanticTokens,
        };
    }

    test("throws illegal argument error, if primitive token is hydrated", () => {
        // Given a design system
        const { primitiveTKS, primitiveTokens } = setUp();
        const designSystem = new DesignSystem("ds", [primitiveTKS]);
        // When hydrating a primitive
        // Then it throws an error
        expect(() => designSystem.hydrateToken(primitiveTokens[0])).toThrow();
    });

    test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
        "returns correct hydrated token, when passing a level 2 token for token at index %i",
        (index) => {
            const {
                primitiveTKS,
                primitiveTokens,
                aliasTKS,
                aliasTokens,
                primitiveTokenSetName,
            } = setUp();
            // Given a design system
            const designSystem = new DesignSystem("ds", [
                primitiveTKS,
                aliasTKS,
            ]);

            // When hydrating a level 2 token
            const hydratedToken = designSystem.hydrateToken(
                aliasTokens[index - 1],
            );

            // Then it returns a level 1 path, and the correct primitive
            expect(hydratedToken.recursivePath).toStrictEqual(
                primitiveTokenSetName + "/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.relativePath).toStrictEqual(
                primitiveTokenSetName + "/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.primitiveToken).toStrictEqual(
                primitiveTokens[index - 1],
            );
        },
    );

    test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
        "returns correct hydrated token, when passing a level 3 token for token at index %i",
        (index) => {
            const {
                primitiveTKS,
                primitiveTokens,
                aliasTKS,
                semanticTKS,
                primitiveTokenSetName,
                aliasTokenSetName,
                semanticTokens,
            } = setUp();

            // Given a design system
            const designSystem = new DesignSystem("ds", [
                primitiveTKS,
                aliasTKS,
                semanticTKS,
            ]);

            // When hydrating a level 3 token
            const hydratedToken = designSystem.hydrateToken(
                semanticTokens[index - 1],
            );

            // Then it returns a level 1 path, and the correct primitive
            expect(hydratedToken.recursivePath).toStrictEqual(
                primitiveTokenSetName +
                    "/" +
                    aliasTokenSetName +
                    "/" +
                    primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.relativePath).toStrictEqual(
                aliasTokenSetName + "/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.primitiveToken).toStrictEqual(
                primitiveTokens[index - 1],
            );
        },
    );

    test("returns correct hydrated token, when passing a a token with value and reference", () => {
        // Given a design system
        const { primitiveTKS, primitiveTokens, primitiveTokenSetName } =
            setUp();
        const token = {
            ...primitiveTokens[0],
            reference: primitiveTokens[0].uid,
            name: v4(),
            uid: v4(),
        };
        const tokenSet = new TokenSet("mapped", "number", 2, [token]);
        const designSystem = new DesignSystem("ds", [primitiveTKS, tokenSet]);
        // When hydrating a token with both reference and value
        const hydratedToken = designSystem.hydrateToken(token);

        // Then the reference takes precedence
        expect(hydratedToken.recursivePath).toStrictEqual(
            primitiveTokenSetName + "/" + primitiveTokens[0].name,
        );
        expect(hydratedToken.relativePath).toStrictEqual(
            primitiveTokenSetName + "/" + primitiveTokens[0].name,
        );
        expect(hydratedToken.primitiveToken).toStrictEqual(primitiveTokens[0]);
    });

    test.each([1, 2, 3, 4])(
        "returns correct hydrated token at index $i, after adding a new tokenset",
        (index) => {
            // Given a design system
            const {
                primitiveTKS,
                primitiveTokens,
                aliasTKS,
                primitiveTokenSetName,
                aliasTokenSetName,
                semanticTokens,
                semanticTKS,
            } = setUp();
            const designSystem = new DesignSystem("ds");

            // After adding all token sets
            designSystem.addTokenSet(primitiveTKS);
            designSystem.addTokenSet(aliasTKS);
            designSystem.addTokenSet(semanticTKS);

            // When, a tokensets from added token set is hydrated
            const hydratedToken = designSystem.hydrateToken(
                semanticTokens[index - 1],
            );

            // Then it returns a level 1 path, and the correct primitive
            expect(hydratedToken.recursivePath).toStrictEqual(
                primitiveTokenSetName +
                    "/" +
                    aliasTokenSetName +
                    "/" +
                    primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.relativePath).toStrictEqual(
                aliasTokenSetName + "/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.primitiveToken).toStrictEqual(
                primitiveTokens[index - 1],
            );
        },
    );

    test.each([1, 2, 3, 4])(
        "returns correct hydrated token at index $i, after adding renaming a tokenset",
        (index) => {
            // Given a design system
            const {
                primitiveTKS,
                primitiveTokens,
                aliasTKS,
                primitiveTokenSetName,
                aliasTokenSetName,
                semanticTokens,
                semanticTokenSetName,
                semanticTKS,
            } = setUp();
            const designSystem = new DesignSystem("ds", [
                primitiveTKS,
                aliasTKS,
                semanticTKS,
            ]);

            const newPrimitiveName = "new primitives";
            const newAliasName = "new alias";
            const newSemanticName = "new semantics";

            // After adding all token sets
            designSystem.updateTokenSetName(
                primitiveTokenSetName,
                newPrimitiveName,
            );
            designSystem.updateTokenSetName(aliasTokenSetName, newAliasName);
            designSystem.updateTokenSetName(
                semanticTokenSetName,
                newSemanticName,
            );

            // When, a tokensets from added token set is hydrated
            const hydratedToken = designSystem.hydrateToken(
                semanticTokens[index - 1],
            );

            // Then it returns a level 1 path, and the correct primitive
            expect(hydratedToken.recursivePath).toStrictEqual(
                newPrimitiveName +
                    "/" +
                    newAliasName +
                    "/" +
                    primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.relativePath).toStrictEqual(
                newAliasName + "/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.primitiveToken).toStrictEqual(
                primitiveTokens[index - 1],
            );
        },
    );
});
