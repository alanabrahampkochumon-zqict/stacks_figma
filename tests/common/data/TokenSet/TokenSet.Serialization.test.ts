import { describe, expect, test } from "vitest";
import { setUpTokenSet } from "./TokenSet.fixtures";

describe("TokenSet Serialization Tests", () => {
    test("returns serialized string, when provided with correct tokenset", () => {
        // Given a token set
        const { originalTokenSet, originalTokenSetObject } = setUpTokenSet();

        // When serialized to JSON
        const jsonString = originalTokenSet.toJSON();
        const result = JSON.parse(jsonString)

        // Then the serialized string contains all the properties
        expect(result).toEqual(originalTokenSetObject);
    });

    test("returns serialized string, when provided with correct tokenset", () => {
        // Given an empty token set
        const { emptyTokenSetObject, emptyTokenSet } = setUpTokenSet();

        // When serialized to JSON
        const jsonString = emptyTokenSet.toJSON();
        const result = JSON.parse(jsonString)


        // Then the serialized string contains all the properties
        expect(result).toStrictEqual(emptyTokenSetObject);
    });
});
