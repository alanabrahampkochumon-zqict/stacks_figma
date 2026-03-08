import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Get TokenSets", () => {
    test("returns tokenset, if the design system is not empty", () => {
        // Given a non empty design system
        const { designSystem, tokenSets } = setUpDesignSystem();

        // When the token sets are retrieved
        const ts = designSystem.getTokenSets();

        // Then, it contains all the tokensets
        expect(ts).toStrictEqual(tokenSets);
    });
    test("returns [], if the design system is empty", () => {
        // Given an empty design system
        const ds = new DesignSystem("ds");

        // When the token sets are retrieved
        const ts = ds.getTokenSets();

        // Then, it is an empty []
        expect(ts).toStrictEqual([]);
    });
});
