import { describe, expect, test } from "vitest";
import { DesignSystem } from "../../../src/common/data/DesignSystem";
import { type Token } from "../../../src/common/data/Token";
import { TokenSet } from "../../../src/common/data/TokenSet";

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
const dsName = "Falcon";

describe("Design System Initialization", () => {
    test("can be initialized with name only", () => {
        // When a design system is initialized with name only

        const designSystem = new DesignSystem(dsName);

        // Then, it is correct initialized with default values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.tokenSets.length).toBe(0);
    });

    test("can be initialized with name and tokenset", () => {
        // When a design system is initialized with name and tokenset
        const designSystem = new DesignSystem(dsName, tokenSets);

        // Then, the design system is initialized with those values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.tokenSets).toStrictEqual([...tokenSets]);
    });
});

describe("Design System Add Token", () => {
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

    test("tokenset is added ");
});
