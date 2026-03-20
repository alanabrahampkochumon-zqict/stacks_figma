import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Hardening", () => {
    test("throws error, when trying to mutate name", () => {
        // Given a design system
        const { designSystem } = setUpDesignSystem();

        // When hardened
        designSystem.harden();

        // Then, it throws an error when trying to mutate its name
        expect(() => (designSystem.name = "new name")).toThrow();
    });

    test("throws error, when trying to add tokenset", () => {
        // Given a design system
        const { designSystem, tokenSet3 } = setUpDesignSystem();

        // When hardened
        designSystem.harden();

        // Then, it throws an error when trying to add a tokenset
        expect(() => designSystem.addTokenSet(tokenSet3)).toThrow();
    });

    test("throws error, when trying to remove a tokenset", () => {
        // Given a design system
        const { designSystem, tokenSets } = setUpDesignSystem();

        // When hardened
        designSystem.harden();

        // Then, it throws an error when trying to remove a tokenset
        expect(() => designSystem.removeTokenSet(tokenSets[0])).toThrow();
    });

    test("throws error, when trying to update tokenset", () => {
        // Given a design system
        const { designSystem, tokenSets } = setUpDesignSystem();

        // When hardened
        designSystem.harden();

        // Then, it throws an error when trying to update a tokenset
        expect(() =>
            designSystem.updateTokenSet(tokenSets[0].name, tokenSets[0]),
        ).toThrow();
    });

    test("throws error, when trying to update tokenset name", () => {
        // Given a design system
        const { designSystem, tokenSets } = setUpDesignSystem();

        // When hardened
        designSystem.harden();

        // Then, it throws an error when trying to update a tokenset name
        expect(() =>
            designSystem.updateTokenSetName(tokenSets[0].name, "new name"),
        ).toThrow();
    });
});
