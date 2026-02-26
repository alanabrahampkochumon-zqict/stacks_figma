import { describe, expect, test } from "vitest";
import { DesignSystem } from "../../../src/common/data/DesignSystem";
import { TokenSet, type Token } from "../../../src/common/data/Tokens";

describe("design system initialization test", () => {
    const tokenType1 = "number";
    const tokens1: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 50, name: "size-350" },
        { type: tokenType1, value: 100, name: "size-100" },
    ];
    const tokenType2 = "string";
    const tokens2: Token[] = [
        { type: tokenType2, value: "light", name: "light" },
        { type: tokenType2, value: "regular", name: "regular" },
        { type: tokenType2, value: "bold", name: "bold" },
    ];
    const tokenSet1 = new TokenSet("token-1", tokenType1, 1, tokens1);
    const tokenSet2 = new TokenSet("token-1", tokenType2, 1, tokens2);
    const tokenSets = [tokenSet1, tokenSet2];

    test("valid name and tokenset, initializes design system", () => {
        // Given a valid name and token set
        const name = "design system";

        // When a design system instance is created
        const designSystem = new DesignSystem(name, tokenSets);

        // Then, the design system is initialized with those values
        expect(designSystem.name).toBe(name);
        expect(designSystem.tokenSets).toStrictEqual(tokenSets);
    });

    test("valid name only, initializes design system", () => {
        // Given a valid name and token set
        const name = "design system";

        // When a design system instance is created
        const designSystem = new DesignSystem(name);

        // Then, the design system is initialized with those values
        expect(designSystem.name).toBe(name);
        expect(designSystem.tokenSets).toStrictEqual([]);
    });
});

describe("design system add token tests", () => {
    const tokenType1 = "number";
    const tokens1: Token[] = [
        { type: tokenType1, value: 0, name: "size-0" },
        { type: tokenType1, value: 15, name: "size-150" },
        { type: tokenType1, value: 50, name: "size-350" },
        { type: tokenType1, value: 100, name: "size-100" },
    ];
    const tokenType2 = "string";
    const tokens2: Token[] = [
        { type: tokenType2, value: "light", name: "light" },
        { type: tokenType2, value: "regular", name: "regular" },
        { type: tokenType2, value: "bold", name: "bold" },
    ];

    test("tokenset is added ")
});
