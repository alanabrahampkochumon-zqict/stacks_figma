import { describe, expect, test } from "vitest";
import { setUpTokenSet } from "./TokenSet.fixtures";

describe("TokenSet Serialization Tests", () => {
    test("returns serialized string, when provided with correct tokenset", () => {
        // Given a token set
        const { originalTokenSet, originalTokenSetString } = setUpTokenSet();

        // When serialized to JSON
        const jsonString = originalTokenSet.toJsonString();

        // Then the serialized string contains all the properties
        expect(jsonString).toStrictEqual(originalTokenSetString);
    });

    test("returns serialized string, when provided with correct tokenset", () => {
        // Given an empty token set
        const { emptyTokenSetString, emptyTokenSet } = setUpTokenSet();

        // When serialized to JSON
        const jsonString = emptyTokenSet.toJsonString();

        // Then the serialized string contains all the properties
        expect(jsonString).toStrictEqual(emptyTokenSetString);
    });
});
