import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {generateToken} from "../utils/Generators";
import {setUpTokenSet} from "./TokenSet.fixtures";

describe("TokenSet Deserialization Tests", () => {
    test("returns correct TokenSet, when json string with name is passed in", () => {
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

    test("returns correct TokenSet, when json string with name and type is passed in", () => {
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

    test("returns correct TokenSet, when json string with additional properties are passed in", () => {
        // Given a json string with additional properties
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

    test("returns correct TokenSet, when json string with name, type, and level is passed in", () => {
        // Given a json string with name, type and level
        const {emptyTokenSet} = setUpTokenSet();

        // When converted to token set
        const ts = TokenSet.fromJson(emptyTokenSet.toJSON());

        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(emptyTokenSet);
    });

    test("returns correct TokenSet, when json string with name, type, level, and valueByNames is passed in", () => {
        // Given a json string with name only
        const {originalTokenSet} = setUpTokenSet();

        // When converted to token set
        const ts = TokenSet.fromJson(originalTokenSet.toJSON());
        // Then a token set is created with the correct valueByNames
        expect(ts).toBeDefined();
        expect(ts).toStrictEqual(originalTokenSet);
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

    // Non-unique -> Same name and same id
    test("create token, when deserializing a json string with non-unique duplicate values", () => {
        // When a JSON string with duplicate entries is converted to a TokenSet
        const tokenNode1 = generateToken("number", undefined, ["first-group", "second-group"]);
        const tokenNode2 = generateToken("number");

        const json = `
        {
            "name": "test",
            "type": "number",
            "level": 1,
            "tokens": [
                ${JSON.stringify(tokenNode1)},
                ${JSON.stringify(tokenNode2)},
                ${JSON.stringify(tokenNode1)}
            ]
        }
        `;

        const tokenSet = TokenSet.fromJson(json);

        // Then, the token set contains the tokens.
        expect(tokenSet.tokens).toContainEqual(tokenNode1);
        expect(tokenSet.tokens).toContainEqual(tokenNode2);
    });

    test("throws error, when deserializing a json string with duplicate values", () => {
        // When a JSON string with duplicate entries is converted to a TokenSet
        const tokenNode1 = generateToken("number");
        const tokenNode2 = generateToken("number");
        const dupTokenNode = generateToken("number", tokenNode1.name);
        const json = `
        {
            "name": "test",
            "type": "number",
            "level": 1,
            "tokens": [
                ${JSON.stringify(tokenNode1)},
                ${JSON.stringify(tokenNode2)},
                ${JSON.stringify(dupTokenNode)}
            ]
        }
        `;

        // Then, it throws an error
        expect(() => TokenSet.fromJson(json)).toThrow();
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
