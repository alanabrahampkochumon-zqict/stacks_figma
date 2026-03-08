import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Get TokenSet Index", () => {
    test("returns correct index, when queried for existing token", () => {
        // Given a design system with non-empty tokensets
        const expectedIndex = 0;
        const { dsName, tokenSets } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When queried for index of the tokenset
        const index = designSystem.getIndex(tokenSets[expectedIndex].name);

        // Then it returns the correct index
        expect(index).toBe(expectedIndex);
    });

    test("returns -1, when queried for non-existing token", () => {
        // Given a design system with non-empty tokensets
        const { dsName, tokenSets } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // When queried for index of the non-existing tokenset
        const index = designSystem.getIndex("Non-existing TS");

        // Then it returns -1
        expect(index).toBe(-1);
    });
});
