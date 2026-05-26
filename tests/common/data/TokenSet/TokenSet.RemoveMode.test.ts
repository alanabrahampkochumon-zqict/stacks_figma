import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {generateToken} from "../utils/Generators";

describe("TokenSet: Remove Mode", () => {
    test("removes mode, when a valid mode is passed-in", () => {
        // Given a TokenSet with more than 1 mode
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default", "small", "large"];
        const tokens = [
            generateToken(
                type,
                undefined,
                undefined,
                undefined,
                undefined,
                modes,
            ),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a mode is removed
        tokenSet.removeMode(modes[2]);

        // Then, the mode has been removed from existing token
        const value = tokenSet.tokens[0];
        expect(Object.keys(value.valueByMode)).toContain(modes[0]);
        expect(Object.keys(value.valueByMode)).toContain(modes[1]);
        expect(Object.keys(value.valueByMode)).not.toContain(modes[2]);
    });

    test("throws error, when trying to remove the last mode", () => {
        // Given a TokenSet with more than 1 mode
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default"];
        const tokens = [
            generateToken(
                type,
                undefined,
                undefined,
                undefined,
                undefined,
                modes,
            ),
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a mode is removed
        // Then, it throws an error
        expect(() => tokenSet.removeMode(modes[0])).toThrow();
    });

    test("throws error, when a invalid mode is passed-in", () => {
        // Given a TokenSet with more than 1 mode
        const name = "TokenSet";
        const type = "number";
        const level = 1;
        const modes = ["default"];
        const tokens = [
            generateToken(
                type,
                undefined,
                undefined,
                undefined,
                undefined,
                modes,
            )
        ];
        const tokenSet = new TokenSet(name, type, level, tokens);

        // When a mode is removed
        // Then, it throws an error
        expect(() => tokenSet.removeMode("non-existant-mode")).toThrow();
    });
});
