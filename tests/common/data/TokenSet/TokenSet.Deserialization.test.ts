import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { setUpTokenSet } from "./TokenSet.fixtures";

describe("TokenSet Deserialization Tests", () => {
    test("returns correct tokenset, when json string with name is passed in", () => {
        // Given a json string with name only
        const nameOnlyTokenJSON = `
        {
            "name": "test"
        }
        `;

        // When converted to token set
        const ts = TokenSet.fromJson(nameOnlyTokenJSON);

        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts?.name).toStrictEqual("test");
        expect(ts?.type).toStrictEqual("number");
        expect(ts?.level).toStrictEqual(1);
        expect(ts?.tokens).toStrictEqual([]);
    });

    test("returns correct tokenset, when json string with name and type is passed in", () => {
        // Given a json string with name and type
        const nameAndTypeTokenJSON = `
        {
            "name": "test",
            "type": "animation"
        }
        `;

        // When converted to token set
        const ts = TokenSet.fromJson(nameAndTypeTokenJSON);

        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts?.name).toStrictEqual("test");
        expect(ts?.type).toStrictEqual("animation");
        expect(ts?.level).toStrictEqual(1);
        expect(ts?.tokens).toStrictEqual([]);
    });

    test("returns correct tokenset, when json string with additional properties are passed in", () => {
        // Given a json string with additioanl properties
        const nameAndTypeTokenJSON = `
        {
            "name": "test",
            "type": "animation",
            "add": "property"
        }
        `;

        // When converted to token set
        const ts = TokenSet.fromJson(nameAndTypeTokenJSON);

        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts?.name).toStrictEqual("test");
        expect(ts?.type).toStrictEqual("animation");
        expect(ts?.level).toStrictEqual(1);
        expect(ts?.tokens).toStrictEqual([]);
    });

    test("returns correct tokenset, when json string with name, type, and level is passed in", () => {
        // Given a json string with name, type and level
        const { emptyTokenSet, emptyTokenSetString } = setUpTokenSet();

        // When converted to token set
        const ts = TokenSet.fromJson(emptyTokenSetString);

        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(emptyTokenSet);
    });

    test("returns correct tokenset, when json string with name, type, level, and valueByNames is passed in", () => {
        // Given a json string with name only
        const { originalTokenSet, originalTokenSetString } = setUpTokenSet();

        // When converted to token set
        const ts = TokenSet.fromJson(originalTokenSetString);
        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(originalTokenSet);
    });

    test("returns correct tokenset, when json string with name, type, and group is passed in is passed in", () => {
        // Given a json string with name only
        const { groupJson, groupTokenSet } = setUpTokenSet();

        // When converted to token set
        const ts = TokenSet.fromJson(groupJson);
        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(groupTokenSet);
    });

    test("throws error, when json string with no name is passed in", () => {
        // Given a JSON string with level only
        const levelOnlyTokenString = `
        {
            "level": 2
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.fromJson(levelOnlyTokenString)).toThrow();
    });

    test("throws error, when json string with invalid level is passed in", () => {
        // Given a JSON string with invalid level
        const invalidLevelTokenString = `
        {
            "name": "ts",
            "level": 5
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.fromJson(invalidLevelTokenString)).toThrow();
    });

    test("throws error, when json string with invalid type is passed in", () => {
        // Given a JSON string with invalid type
        const invalidTypeTokenString = `
        {
            "name": "ts",
            "type": "testing..."
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.fromJson(invalidTypeTokenString)).toThrow();
    });

    test("throws error, when malformed json string is passed in", () => {
        // Given a JSON string with invalid type
        const malformedTokenSetString = `
        {
            "abc": 1234
        }
        `;

        // When converted to token set
        // Then, it throws and error
        expect(() => TokenSet.fromJson(malformedTokenSetString)).toThrow();
    });
});
