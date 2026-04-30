import { isValidFontDecoration } from "@src/common/data/TypographyToken";
import { describe, expect, test } from "vitest";

describe("Font Decoration", () => {
    const testCases: {
        name: string;
        value: any;
        expected: boolean;
    }[] = [
        {
            name: "returns true, when validating string None",
            value: "None",
            expected: true,
        },

        {
            name: "returns true, when validating string Underline",
            value: "Underline",
            expected: true,
        },
        {
            name: "returns true, when validating string Underline",
            value: "LineThrough",
            expected: true,
        },
        {
            name: "returns false, when validating random string",
            value: "random-string",
            expected: false,
        },
        {
            name: "returns false, when validating number",
            value: 1234,
            expected: false,
        },
    ];

    test.each(testCases)("$name", ({ value, expected }) => {
        expect(isValidFontDecoration(value)).toStrictEqual(expected);
    });
});
