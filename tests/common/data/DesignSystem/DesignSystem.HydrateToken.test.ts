import { DesignSystem } from "@src/common/data/DesignSystem";
import { TokenSet } from "@src/common/data/TokenSet";
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
    const aliasTokens = primitiveTokens.map(token => {
        
    })

    const primitiveTKS = new TokenSet("primitives", "number", 1, primitiveTokens);
    const aliasTKS = new TokenSet("alias", "number", 2, )

    test("throws illegal argument error, if primitive token is hydrated", () => {
        // Given a design system
        const designSystem = new DesignSystem("ds", [primitiveTKS]);

        // When hydrating a primitive
        // Then it throws an error
        expect(() => designSystem.hydrateToken(primitiveTokens[0])).toThrow();
    });


});
