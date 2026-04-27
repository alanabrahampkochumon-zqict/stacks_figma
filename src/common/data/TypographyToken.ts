/**
 * Define a typography token.
 */
export type TypographyToken = {
    fontFamily: string;
    fontSize: number | string;
    fontWeight: string;
    lineHeight: number | string;
    letterSpacing: number | string;
    fontDecoration: keyof typeof FontDecoration;
};

/**
 * Complete list of all font decoration.
 */
const FontDecoration = {
    None: "None",
    Underline: "Underline",
    LineThrough: "LineThrough",
} as const;
