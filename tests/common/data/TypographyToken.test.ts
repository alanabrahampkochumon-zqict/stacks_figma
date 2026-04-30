import { generateReferenceID } from "@src/common/data/ReferenceID";
import {
    isValidFontDecoration,
    TypographyToken,
} from "@src/common/data/TypographyToken";
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

describe("Typography", () => {
    const id = generateReferenceID();
    const vFontFamily = "Roboto";
    const vFontSize = 24;
    const vFontWeight = "Bold";
    const vLineHeight = 5;
    const vLetterSpacing = 0.1;
    const vFontDecoration = "None";

    const invFontFamily = 0xfff;
    const invFontSize = "font-size";
    const invFontWeight = 1234;
    const invLineHeight = "line-height";
    const invLetterSpacing = "letter-spacing";
    const invFontDecoration = "font-decoration";

    type TestCase = {
        name: string;
        value: TypographyToken | number | string;
        expected: boolean;
    };

    const testCases: TestCase[] = [
        // Valid scenarios
        {
            name: "returns true, when passing a valid typography instance",
            value: new TypographyToken(id, id, id, id, id, id),
            expected: true,
        },
        {
            name: "returns true, when passing instance with valid values",
            value: new TypographyToken(
                vFontFamily,
                vFontSize,
                vFontWeight,
                vLineHeight,
                vLetterSpacing,
                vFontDecoration,
            ),
            expected: true,
        },
        {
            name: "returns true, when passing instance with reference id",
            value: new TypographyToken(id, id, id, id, id, id),
            expected: true,
        },
        {
            name: "returns true, when passing instance with reference id and valid values",
            value: new TypographyToken(
                id,
                id,
                vFontWeight,
                vLineHeight,
                vLetterSpacing,
                vFontDecoration,
            ),
            expected: true,
        },

        // Invalid scenarios
        {
            name: "returns false, when passing a number",
            value: 5,
            expected: false,
        },

        {
            name: "returns false, when passing a string",
            value: "Typography Token",
            expected: false,
        },
        {
            name: "returns false, when passing instance with invalid font family",
            value: new TypographyToken(
                invFontFamily as any,
                vFontSize,
                vFontWeight,
                vLineHeight,
                vLetterSpacing,
                vFontDecoration,
            ),
            expected: false,
        },
        {
            name: "returns false, when passing instance with invalid font size",
            value: new TypographyToken(
                vFontFamily,
                invFontSize as any,
                vFontWeight,
                vLineHeight,
                vLetterSpacing,
                vFontDecoration,
            ),
            expected: false,
        },
        {
            name: "returns false, when passing instance with invalid font weight",
            value: new TypographyToken(
                vFontFamily,
                vFontSize,
                invFontWeight as any,
                vLineHeight,
                vLetterSpacing,
                vFontDecoration,
            ),
            expected: false,
        },
        {
            name: "returns false, when passing instance with invalid line height",
            value: new TypographyToken(
                vFontFamily,
                vFontSize,
                vFontWeight,
                invLineHeight as any,
                vLetterSpacing,
                vFontDecoration,
            ),
            expected: false,
        },
        {
            name: "returns false, when passing instance with invalid letter spacing",
            value: new TypographyToken(
                vFontFamily,
                vFontSize,
                vFontWeight,
                vLineHeight,
                invLetterSpacing as any,
                vFontDecoration,
            ),
            expected: false,
        },
        {
            name: "returns false, when passing instance with invalid font decoration",
            value: new TypographyToken(
                vFontFamily,
                vFontSize,
                vFontWeight,
                vLineHeight,
                vLetterSpacing,
                invFontDecoration as any,
            ),
            expected: false,
        },
    ];

    test.each(testCases)("$name", ({ value, expected }: TestCase) => {
        expect(TypographyToken.validate(value)).toStrictEqual(expected);
    });
});
