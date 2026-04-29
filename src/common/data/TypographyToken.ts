import { isReferenceID, type ReferenceID } from "./ReferenceID";

/**
 * Define a typography token.
 */
export class TypographyToken {
    fontFamily: string | ReferenceID;
    fontSize: number | ReferenceID;
    fontWeight: string | ReferenceID;
    lineHeight: number | ReferenceID;
    letterSpacing: number | ReferenceID;
    fontDecoration: keyof typeof FontDecoration | ReferenceID;

    constructor(
        fontFamily: string | ReferenceID,
        fontSize: number | ReferenceID,
        fontWeight: string | ReferenceID,
        lineHeight: number | ReferenceID,
        letterSpacing: number | ReferenceID,
        fontDecoration: keyof typeof FontDecoration | ReferenceID,
    ) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.lineHeight = lineHeight;
        this.letterSpacing = letterSpacing;
        this.fontDecoration = fontDecoration;
    }

    static validate(token: TypographyToken): boolean {
        if (!(token instanceof TypographyToken)) return false;
        if (
            !(
                typeof token.fontFamily === "string" ||
                isReferenceID(token.fontFamily)
            )
        )
            return false;
        if (
            !(
                typeof token.fontSize === "number" ||
                isReferenceID(token.fontSize)
            )
        )
            return false;
        if (
            !(
                typeof token.fontWeight === "string" ||
                isReferenceID(token.fontWeight)
            )
        )
            return false;
        if (
            !(
                typeof token.lineHeight === "number" ||
                isReferenceID(token.lineHeight)
            )
        )
            return false;
        if (
            !(
                typeof token.letterSpacing === "number" ||
                isReferenceID(token.letterSpacing)
            )
        )
            return false;

        if (
            !(
                isValidFontDecoration(token.fontDecoration) ||
                isReferenceID(token.fontDecoration)
            )
        )
            return false;
    }
}

/**
 * Complete list of all font decoration.
 */
export const FontDecoration = {
    None: "None",
    Underline: "Underline",
    LineThrough: "LineThrough",
} as const;

function isValidFontDecoration(fontDecoration: any): boolean {
    return Object.values(FontDecoration).includes(fontDecoration);
}
