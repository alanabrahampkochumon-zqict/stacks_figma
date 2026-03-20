import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Clear Collection", () => {
    test("clear collection, when clearAll is called", () => {
        // Given a design system with some collections
        const { designSystem } = setUpDesignSystem();
        expect(designSystem.getTokenSets().length).toBeGreaterThan(0);

        // When cleared
        designSystem.clearAll();

        // Then, all the token sets are removed
        expect(designSystem.getTokenSets().length).toStrictEqual(0);
    });
});
