import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Serialization", () => {
    test("returns serialized output, when provided with non-empty design system", () => {
        // Given, a non-empty design system
        const { designSystem, serializedDesignSystem } = setUpDesignSystem();

        // When serialized
        const serialized = designSystem.toJson();

        // Then, it matches the serialized string
        expect(serialized).toStrictEqual(serializedDesignSystem);
    });

    test("returns serialized output, when provided with empty design system", () => {
        // When an empty design system is serialized
        const emptyDesignSystem = new DesignSystem("Falcon");
        const serializedDesignSystem = `
        {
            "name": "Falcon",
            "tokenSets": []
        }
        `.replace(/\s/g, "");

        const serialized = emptyDesignSystem.toJson();

        // Then it output string is correct
        expect(serialized).toStrictEqual(serializedDesignSystem);
    });
});
