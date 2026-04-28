import type { ReferenceID } from "./ReferenceID";

/**
 * Define a typography token.
 */
class TypographyToken {
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
}

/**
 * Complete list of all font decoration.
 */
const FontDecoration = {
    None: "None",
    Underline: "Underline",
    LineThrough: "LineThrough",
} as const;
