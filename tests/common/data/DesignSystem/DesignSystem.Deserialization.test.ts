import { DesignSystem } from "@src/common/data/DesignSystem";
import { describe, expect, test } from "vitest";

describe("Design System Deserialization", () => {
    test("returns emtpy design system, when name only string is passed in", () => {
        // When an json string with name is deserialized
        const jsonString = `
        {
            "name": "Falcon"
        }
        `.replace(/\s/g, "");
        const result = DesignSystem.fromJson(jsonString);

        // Then, it creates an empty design system
        expect(result).toBeDefined();
        expect(result?.name).toStrictEqual("Falcon");
        expect(result?.getTokenSets()).toStrictEqual([]);
    });

    test("returns emtpy design system, when name and [] string is passed in", () => {
        // When an json string with name and empty tokenset is deserialized
        const jsonString = `
        {
            "name": "Falcon",
            "tokenSets": []
        }
        `.replace(/\s/g, "");
        const result = DesignSystem.fromJson(jsonString);

        // Then, it creates an empty design system
        expect(result).toBeDefined();
        expect(result?.name).toStrictEqual("Falcon");
        expect(result?.getTokenSets()).toStrictEqual([]);
    });

    // test("returns correct design system, when value string is passed in", () => {
    //     // When an json string with name and empty tokenset is deserialized
    //     const { serializedDesignSystem, designSystem } = setUpDesignSystem();
    //     const result = DesignSystem.fromJson(serializedDesignSystem);

    //     // Then, it creates correct design system
    //     expect(result).toBeDefined();
    //     expect(result?.name).toStrictEqual(designSystem.name);
    //     expect(result?.getTokenSets()).toStrictEqual(
    //         designSystem.getTokenSets(),
    //     );
    // });

    test("returns correct design system, when passed in values has extra parameters", () => {
        // When a json string with additional parameters are passed in
        const jsonString = `
        {
            "name": "Falcon",
            "tokenSets": [],
            "add": "props"
        }
        `.replace(/\s/g, "");
        const result = DesignSystem.fromJson(jsonString);

        // Then, it creates a correct design system
        expect(result).toBeDefined();
        expect(result?.name).toStrictEqual("Falcon");
        expect(result?.getTokenSets()).toStrictEqual([]);
    });

    test("throws error, when json string without name is passed in", () => {
        // When a json string without name is serialized
        const jsonString = `
        {
            "tokenSets": [
                { type: tokenType1, value: 0, name: "size-0" },
                { type: tokenType1, value: 150, name: "size-150" },
                { type: tokenType1, value: 50, name: "size-50" },
                { type: tokenType1, value: 100, name: "size-1000" },
            ]
        }
        `;
        // Then, it throws an error
        expect(() => DesignSystem.fromJson(jsonString)).toThrow();
    });
    test("throws error, when malformed json string is passed in", () => {
        // Given a json string without an name
        const jsonString = `
        {
            "name": "Falcon",
            "tokenSets"
        }
        `;
        // Then, it throws an error
        expect(() => DesignSystem.fromJson(jsonString)).toThrow();
    });
});
