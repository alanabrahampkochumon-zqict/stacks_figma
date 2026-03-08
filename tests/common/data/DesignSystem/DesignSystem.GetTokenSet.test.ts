import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System GetTokenSet", () => {
    test("returns tokenset, when queried with existing name", () => {
        // Given a non empty design system
        const { tokenSets } = setUpDesignSystem();
        const ds = new DesignSystem("ds", tokenSets);

        // When queried for a tokenset in the design system
        const ts = ds.getTokenSet(tokenSets[0].name);

        // Then, it returns the same token in the design system
        expect(ts).toBe(ds.getTokenSets()[0]);
    });

    test("returns undefined, when queried with non-existing name", () => {
        // Given a non empty design system
        const { tokenSets } = setUpDesignSystem();
        const ds = new DesignSystem("ds", tokenSets);

        // When queried for a non-existent tokenset
        const ts = ds.getTokenSet("non-existent name");

        // Then, it returns undefined
        expect(ts).toBeUndefined();
    });

    test("returns undefined, when queried on empty design system", () => {
        // Given a  empty design system
        const ds = new DesignSystem("ds");

        // When queried for a tokenset
        const ts = ds.getTokenSet("non-existent name");

        // Then, it returns undefined
        expect(ts).toBeUndefined();
    });

    test("mutates design system, when tokenset is mutated", () => {
        // Given a non empty design system
        const { tokenSets } = setUpDesignSystem();
        const ds = new DesignSystem("ds", tokenSets);

        // When queried for a tokenset in the design system
        let ts = ds.getTokenSet(tokenSets[0].name);
        // and mutated
        ts!!.name = "Updated name";

        // Then, it updates the design system
        expect(ds.getTokenSets()[0]).toBe(ts);
    });
});
