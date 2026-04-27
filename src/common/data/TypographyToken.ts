/**
 * Define a typography token.
 */
class TypographyToken {
    fontFamily: string;
    fontSize: number | string;
    fontWeight: string;
    lineHeight: number | string;
    letterSpacing: number | string;
    fontDecoration: keyof typeof FontDecoration;

    constructor(
        fontFamily: string,
        fontSize: number | string,
        fontWeight: string,
        lineHeight: number | string,
        letterSpacing: number | string,
        fontDecoration: keyof typeof FontDecoration,
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
