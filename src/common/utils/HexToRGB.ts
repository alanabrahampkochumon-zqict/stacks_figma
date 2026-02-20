export default function HexToRGB(hexString: string): {
    r: number;
    g: number;
    b: number;
} {
    const rgbPattern = new RegExp(
        /^#(?<red>[0-9A-F]{2})(?<green>[0-9A-F]{2})(?<blue>[0-9A-F]{2})$/i,
    );
    const groups = hexString.match(rgbPattern);
    if (!groups) throw new Error("Invalid Hex pattern. Sample pattern #FFFFFF");
    return {
        r: parseInt(groups[1], 16) / 255,
        g: parseInt(groups[2], 16) / 255,
        b: parseInt(groups[3], 16) / 255,
    };
}
