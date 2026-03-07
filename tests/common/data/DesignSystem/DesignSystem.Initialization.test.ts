import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Initialization", () => {
    test("can be initialized with name only", () => {
        // When a design system is initialized with name only
        const { dsName } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName);

        // Then, it is correct initialized with default values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.getTokenSets().length).toBe(0);
    });

    test("can be initialized with name and tokenset", () => {
        // When a design system is initialized with name and tokenset
        const { dsName, tokenSets } = setUpDesignSystem();
        const designSystem = new DesignSystem(dsName, tokenSets);

        // Then, the design system is initialized with those values
        expect(designSystem.name).toBe(dsName);
        expect(designSystem.getTokenSets()).toStrictEqual([...tokenSets]);
    });

    test("throws error, when initialized with empty name", () => {
        // When a design system is initialized emtpy name
        const { tokenSets } = setUpDesignSystem();

        // Then, it throws an error
        expect(() => new DesignSystem("", tokenSets)).toThrow();
    });
});
