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

    const primitiveTKS = new TokenSet(
        "primitives",
        "number",
        1,
        primitiveTokens,
    );
    const aliasTKS = new TokenSet("alias", "number", 2, aliasTokens);
    const semanticTKS = new TokenSet("semantic", "number", 3, semanticTokens);

    test("throws illegal argument error, if primitive token is hydrated", () => {
        // Given a design system
        const designSystem = new DesignSystem("ds", [primitiveTKS]);
        // When hydrating a primitive
        // Then it throws an error
        expect(() => designSystem.hydrateToken(primitiveTokens[0])).toThrow();
    });

    test("returns correct hydrated token, when passing a level 2 token", () => {
        // Given a design system
        const designSystem = new DesignSystem("ds", [primitiveTKS, aliasTKS]);

        // When hydrating a level 2 tokenset
        const hydratedToken = designSystem.hydrateToken(aliasTokens[0]);

        // Then it returns a level 1 path, and the correct primitive
        expect(hydratedToken.recursivePath).toStrictEqual(
            "primitives/" + primitiveTokens[0].name,
        );
        expect(hydratedToken.relativePath).toStrictEqual(
            "primitives/" + primitiveTokens[0].name,
        );
        expect(hydratedToken.primitiveToken).toStrictEqual(primitiveTokens[0]);
    });
});
