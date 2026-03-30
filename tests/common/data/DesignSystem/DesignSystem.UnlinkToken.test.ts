import { DesignSystem } from "@src/common/data/DesignSystem";
import type { TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Design System: Unlink Token", () => {
    function setUp() {
        const primitiveToken = generateTokenNode(
            undefined,
            "token",
            "number",
            undefined,
            undefined,
            false,
        );
        const updatedPrimitiveToken = generateTokenNode(
            undefined,
            "token",
            "number",
            primitiveToken.uid,
            undefined,
            false,
        );
        const level2Token: TokenNode = {
            ...primitiveToken,
            name: v4(),
            uid: v4(),
            reference: primitiveToken.uid,
            value: undefined,
        };
        const level3Token: TokenNode = {
            ...level2Token,
            name: v4(),
            uid: v4(),
            reference: level2Token.uid,
            value: undefined,
        };
        const level4Token: TokenNode = {
            ...level3Token,
            name: v4(),
            uid: v4(),
            reference: level3Token.uid,
            value: undefined,
        };

        const designSystem = new DesignSystem("ds", [
            new TokenSet("primitive", "number", 1, [primitiveToken]),
            new TokenSet("level 2", "number", 2, [level2Token]),
            new TokenSet("level 3", "number", 3, [level3Token]),
            new TokenSet("level 4", "number", 4, [level4Token]),
        ]);

        return {
            primitiveToken,
            updatedPrimitiveToken,
            level2Token,
            level3Token,
            level4Token,
            designSystem,
        };
    }

    test("returns the same token, when passing in level 1 token", () => {
        // Given a design system
        const { primitiveToken, designSystem } = setUp();

        // When a level 1 token is unlinked
        const unlinked = designSystem.unlinkToken(primitiveToken);

        // Then it returns the same tokenset
        expect(unlinked).toStrictEqual(primitiveToken);
        expect(unlinked).toBe(primitiveToken); // Reference checking
    });

    test("returns the same token as a primitive, when passing in level 2 token", () => {
        // Given a design system
        const { primitiveToken, level2Token, designSystem } = setUp();

        // When a level 2 token is unlinked
        const unlinked = designSystem.unlinkToken(level2Token);

        // Then it returns the same tokenset with primitive value
        expect(unlinked.reference).toBeUndefined();
        expect(unlinked.value).toStrictEqual(primitiveToken.value);
        expect(unlinked).toBe(level2Token); // Reference checking
    });

    test("returns the same token as a primitive, when passing in level 3 token", () => {
        // Given a design system
        const { primitiveToken, level3Token, designSystem } = setUp();

        // When a level 3 token is unlinked
        const unlinked = designSystem.unlinkToken(level3Token);

        // Then it returns the same tokenset with primitive value
        expect(unlinked.reference).toBeUndefined();
        expect(unlinked.value).toStrictEqual(primitiveToken.value);
        expect(unlinked).toBe(level3Token); // Reference checking
    });

    test("returns the same token as a primitive, when passing in level 4 token", () => {
        // Given a design system
        const { primitiveToken, level2Token, level3Token, level4Token } =
            setUp();
        const designSystem = new DesignSystem("ds", [
            new TokenSet("primitive", "number", 1, [primitiveToken]),
            new TokenSet("level 2", "number", 2, [level2Token]),
            new TokenSet("level 3", "number", 3, [level3Token]),
        ]);
        // And a tokenset is added
        designSystem.addTokenSet(
            new TokenSet("level 4", "number", 4, [level4Token]),
        );
        // When a level 4 token is unlinked
        const unlinked = designSystem.unlinkToken(level4Token);

        // Then it returns the same tokenset with primitive value
        expect(unlinked.reference).toBeUndefined();
        expect(unlinked.value).toStrictEqual(primitiveToken.value);
        expect(unlinked).toBe(level4Token); // Reference checking
    });

    test("returns correct token primitive, when an added token is unlinked", () => {
        // Given a design system
        const { primitiveToken, level2Token, level3Token, level4Token } =
            setUp();
        const designSystem = new DesignSystem("ds", [
            new TokenSet("primitive", "number", 1, [primitiveToken]),
            new TokenSet("level 2", "number", 2, [level2Token]),
            new TokenSet("level 3", "number", 3, [level3Token]),
        ]);
        // And a tokenset is added
        designSystem.addTokenSet(
            new TokenSet("level 4", "number", 4, [level4Token]),
        );
        // When a level 4 token is unlinked
        const unlinked = designSystem.unlinkToken(level4Token);

        // Then it returns the same tokenset with primitive value
        expect(unlinked.reference).toBeUndefined();
        expect(unlinked.value).toStrictEqual(primitiveToken.value);
        expect(unlinked).toBe(level4Token); // Reference checking
    });

    test("returns correct token primitive, when an updated token is unlinked", () => {
        // Given a design system
        const { primitiveToken, level2Token, level3Token, level4Token } =
            setUp();
        const designSystem = new DesignSystem("ds", [
            new TokenSet("primitive", "number", 1, [primitiveToken]),
            new TokenSet("level 2", "number", 2, [level2Token]),
            new TokenSet("level 3", "number", 3, [level3Token]),
            new TokenSet("level 4", "number", 4, [level4Token]),
        ]);
        // And a tokenset is updated
        designSystem.updateTokenSet(
            "level 4",
            new TokenSet("new level", "number", 4, [
                { ...level4Token, name: v4() },
            ]),
        );
        // When a level 4 token is unlinked
        const unlinked = designSystem.unlinkToken(level4Token);

        // Then it returns the same tokenset with primitive value
        expect(unlinked.reference).toBeUndefined();
        expect(unlinked.value).toStrictEqual(primitiveToken.value);
        expect(unlinked).toBe(level4Token); // Reference checking
    });

    test("returns updated primitive, when a primitive is updated", () => {
        // Given a design system
        const {
            primitiveToken,
            updatedPrimitiveToken,
            level2Token,
            level3Token,
            level4Token,
        } = setUp();
        const designSystem = new DesignSystem("ds", [
            new TokenSet("primitive", "number", 1, [primitiveToken]),
            new TokenSet("level 2", "number", 2, [level2Token]),
            new TokenSet("level 3", "number", 3, [level3Token]),
            new TokenSet("level 4", "number", 4, [level4Token]),
        ]);
        // And a primitive is updated
        designSystem.updateTokenSet(
            "primitive",
            new TokenSet("new primitive", "number", 1, [updatedPrimitiveToken]),
        );
        // When a level 4 token is unlinked
        const unlinked = designSystem.unlinkToken(level4Token);

        // Then it returns the same tokenset with primitive value
        expect(unlinked.reference).toBeUndefined();
        expect(unlinked.value).toStrictEqual(updatedPrimitiveToken.value);
        expect(unlinked).toBe(level4Token); // Reference checking
    });

    // TODO: Add back test after implementing reverse cache.
    // test("returns non-primitive token, when a primitive is deleted", () => {
    //     // Given a design system
    //     const {
    //         primitiveToken,
    //         updatedPrimitiveToken,
    //         level2Token,
    //         level3Token,
    //         level4Token,
    //     } = setUp();
    //     const primitiveTokenSet = new TokenSet("primitive", "number", 1, [
    //         primitiveToken,
    //     ]);
    //     const designSystem = new DesignSystem("ds", [
    //         primitiveTokenSet,
    //         new TokenSet("level 2", "number", 2, [level2Token]),
    //         new TokenSet("level 3", "number", 3, [level3Token]),
    //         new TokenSet("level 4", "number", 4, [level4Token]),
    //     ]);

    //     // And a primitive is deleted
    //     designSystem.removeTokenSet(primitiveTokenSet);

    //     // When a level 4 token is unlinked
    //     const unlinked = designSystem.unlinkToken(level4Token);

    //     // Then it returns the same tokenset with primitive value
    //     expect(unlinked.reference).toBeUndefined();
    //     expect(unlinked.value).toStrictEqual(updatedPrimitiveToken.value);
    //     expect(unlinked).toBe(level4Token); // Reference checking
    // });

    test("throws error, when a token with no reference is passed-in", () => {
        // Given a primitive token
        const { level4Token, designSystem } = setUp();
        level4Token.reference = v4();

        // When unlinked
        // Then it throws an error
        expect(() => designSystem.unlinkToken(level4Token)).toThrow();
    });
});
