import { DesignSystem } from "@src/common/data/DesignSystem";
import { TokenSet } from "@src/common/data/TokenSet";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Design System: Hydrate Token", () => {
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
        return { ...token, uid: v4(), reference: token.uid, value: undefined };
    });
    const semanticTokens = aliasTokens.map((token) => {
        return { ...token, uid: v4(), reference: token.uid, value: undefined };
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
    const aliasTKS = new TokenSet(aliasTokenSetName, "number", 2, aliasTokens);
    const semanticTKS = new TokenSet(
        semanticTokenSetName,
        "number",
        3,
        semanticTokens,
    );

    test("throws illegal argument error, if primitive token is hydrated", () => {
        // Given a design system
        const designSystem = new DesignSystem("ds", [primitiveTKS]);
        // When hydrating a primitive
        // Then it throws an error
        expect(() => designSystem.hydrateToken(primitiveTokens[0])).toThrow();
    });

    test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])(
        "returns correct hydrated token, when passing a level 2 token for token at index %i",
        (index) => {
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
                "primitives/" + "alias/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.relativePath).toStrictEqual(
                "alias/" + primitiveTokens[index - 1].name,
            );
            expect(hydratedToken.primitiveToken).toStrictEqual(
                primitiveTokens[index - 1],
            );
        },
    );
});
