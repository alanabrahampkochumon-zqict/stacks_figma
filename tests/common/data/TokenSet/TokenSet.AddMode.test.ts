import { describe, expect, test } from "vitest";
import setUpTokens from "./TokenSet.fixtures";

describe("TokenSet Add Mode", () => {
    test("adds mode, if the mode does not exist", () => {
        // When a non-existing mode is add
        const { numberTokenSet } = setUpTokens();
        const newMode = "brightness";
        const result = numberTokenSet.addMode(newMode);

        // Then, it is added to the mode
        expect(result).toBeTruthy();
        expect(numberTokenSet.modes).toContain(newMode);
    });

    test("does not add mode, if the mode already exists exist", () => {
        // When an existing mode is added
        const { numberTokenSet } = setUpTokens();
        const result = numberTokenSet.addMode(
            numberTokenSet.modes.values().next().value || "",
        );

        // Then, it is not added to the mode
        expect(result).toBeFalsy();
    });
});
