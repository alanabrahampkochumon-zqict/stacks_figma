import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";
import { generateToken } from "../utils/Generators";

export default function setUpTokens() {
    const numberTokenModes = ["default"];
    const numberTokens: Token[] = Array(10)
        .fill(0)
        .map(() => generateToken("number", undefined, numberTokenModes));
    const sortedNumberToken = numberTokens.sort(
        (t, u) =>
            t &&
            u &&
            t.name.localeCompare(u.name, undefined, { numeric: true }),
    );

    const colorTokenModes = ["dark", "light"];
    const colorTokens = Array(10)
        .fill(0)
        .map(() => generateToken("color", undefined, colorTokenModes));

    const numberTokenSet = new TokenSet(
        "Number",
        "number",
        1,
        numberTokens,
        numberTokenModes,
    );

    return {
        numberTokenModes,
        numberTokens,
        colorTokenModes,
        colorTokens,
        numberTokenSet,
        sortedNumberToken,
    };
}
