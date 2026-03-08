import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("TokenSet Name Update", () => {
    test("updates name, when given an existing token", () => {
        // Given a non empty design system
        const { tokenSets } = setUpDesignSystem();
        const ds = new DesignSystem("ds", tokenSets);
        const newName = "updated name";

        // When the name of the first token is mutated
        ds.updateTokenSetName(tokenSets[0].name, newName);

        // Then, the name is updated
        expect(ds.getTokenSets()[0].name).toStrictEqual(newName);
    });

    test("throws error, when given a non-existing token", () => {
        // Given a non empty design system
        const { tokenSets } = setUpDesignSystem();
        const ds = new DesignSystem("ds", tokenSets);
        const newName = "updated name";

        // When updating with a non-existant name
        // Then, it throws an error
        expect(() => ds.updateTokenSetName("unknown name", newName)).toThrow();

        // The design system is intact
        expect(ds.getTokenSets()).toStrictEqual(tokenSets);
    });

    test("throws error, when the new name already exists", () => {
        // Given a non empty design system
        const { tokenSets } = setUpDesignSystem();
        const ds = new DesignSystem("ds", tokenSets);

        // When updating with a colliding name
        // Then, it throws an error
        expect(() =>
            ds.updateTokenSetName(tokenSets[0].name, tokenSets[1].name),
        ).toThrow();
    });
});
