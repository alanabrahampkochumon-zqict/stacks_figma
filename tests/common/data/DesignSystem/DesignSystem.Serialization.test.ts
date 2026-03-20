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
            "tokenSets": [],
            "isHardened": false
        }
        `.replace(/\s/g, "");

        const serialized = emptyDesignSystem.toJson();

        // Then it output string is correct
        expect(serialized).toStrictEqual(serializedDesignSystem);
    });

    test("returns serialized output with hardened = true, when serializing hardened design system", () => {
        // Given, a hardened design system
        const { designSystem, serializedDesignSystem } = setUpDesignSystem();
        designSystem.harden();

        // When serialized
        const serialized = designSystem.toJson();

        // Then, it matches the hardened design system serialization output
        expect(serialized).toStrictEqual(
            serializedDesignSystem.replace(
                '"isHardened":false',
                '"isHardened":true',
            ),
        );
    });
});
