import { createToken } from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { generateTokenNode } from "../utils/Generators";

export default function setUpTokens() {
    const numberTokenModes = ["default"];
    const numberTokens: TokenNode[] = Array(10)
        .fill(0)
        .map(() =>
            generateTokenNode(
                undefined,
                undefined,
                "number",
                undefined,
                undefined,
                undefined,
            ),
        );
    const sortedNumberToken = numberTokens.sort(
        (t, u) =>
            t &&
            u &&
            t.name.localeCompare(u.name, undefined, { numeric: true }),
    );

    const colorTokenModes = ["dark", "light"];
    const colorTokens = Array(10)
        .fill(0)
        .map(() =>
            generateTokenNode(
                undefined,
                undefined,
                "color",
                undefined,
                undefined,
                undefined,
                colorTokenModes,
            ),
        );

    const numberTokenSet = new TokenSet("Number", "number", 1, numberTokens);

    return {
        numberTokenModes,
        numberTokens,
        colorTokenModes,
        colorTokens,
        numberTokenSet,
        sortedNumberToken,
    };
}

// REGEX
// createToken\(\s*(".*"),\s*(\{.*\}),\s*(".*|)\)
// createTokenNode($1, createToken($2, $3))
export function setUpTokenSet() {
    const originalTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        // createToken((".*"),\s*(\{.*\}),/s*(".*))
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
    ];

    const cleanMergingTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-300", createToken({ default: 30 }, "sizing")),
        createTokenNode("size-250", createToken({ default: 250 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 120 }, "sizing")),
    ];
    const cleanMergingResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
        createTokenNode("size-300", createToken({ default: 30 }, "sizing")),
        createTokenNode("size-250", createToken({ default: 250 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 120 }, "sizing")),
    ];
    const sortedMergingResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 120 }, "sizing")),
        createTokenNode("size-250", createToken({ default: 250 }, "sizing")),
        createTokenNode("size-300", createToken({ default: 30 }, "sizing")),
    ];
    const valueByNameSortedMergingResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
        createTokenNode("size-300", createToken({ default: 30 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 120 }, "sizing")),
        createTokenNode("size-250", createToken({ default: 250 }, "sizing")),
    ];
    const conflictMergingTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 15 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 25 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 35 }, "sizing")),
    ];
    const conflictMergingReplaceResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 15 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 25 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 35 }, "sizing")),
    ];
    const conflictMergingIgnoreResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing")),
        createTokenNode("size-100", createToken({ default: 10 }, "sizing")),
        createTokenNode("size-150", createToken({ default: 15 }, "sizing")),
        createTokenNode("size-200", createToken({ default: 35 }, "sizing")),
    ];
    const differentTokenType = "spacing";
    const differentTokens: TokenNode[] = [
        createTokenNode(
            "spacing-250",
            createToken({ default: 25 }, differentTokenType),
        ),
        createTokenNode(
            "spacing-350",
            createToken({ default: 35 }, differentTokenType),
        ),
        createTokenNode(
            "spacing-450",
            createToken({ default: 45 }, differentTokenType),
        ),
    ];

    const originalTokenSet = new TokenSet("ts", "sizing", 2, originalTokens);
    const originalTokenSetString = JSON.stringify(originalTokenSet).replace(
        `"modes":{}`,
        `"modes":["default"]`,
    );

    const emptyTokenSet = new TokenSet("empty", "animation", 4);
    const emptyTokenSetString = JSON.stringify(emptyTokenSet).replace(
        `"modes":{}`,
        `"modes":["default"]`,
    );

    const cleanMergingTokenSet = new TokenSet(
        "ts",
        "sizing",
        2,
        cleanMergingTokens,
    );
    const cleanMergingResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        cleanMergingResultTokens,
    );
    const conflictMergingTokenSet = new TokenSet(
        "ts",
        "sizing",
        2,
        conflictMergingTokens,
    );
    const differentTokenSet = new TokenSet(
        "ts",
        differentTokenType,
        1,
        differentTokens,
    );
    const conflictMergingReplaceResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        conflictMergingReplaceResultTokens,
    );
    const conflictMergingIgnoreResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        conflictMergingIgnoreResultTokens,
    );
    const sortedResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        sortedMergingResultTokens,
    );
    const valueByNameSortedResultTokenSet = new TokenSet(
        originalTokenSet.name,
        originalTokenSet.type,
        originalTokenSet.level,
        valueByNameSortedMergingResultTokens,
    );

    return {
        originalTokenSet,
        cleanMergingTokenSet,
        conflictMergingTokenSet,
        differentTokenSet,
        cleanMergingResultTokenSet,
        conflictMergingReplaceResultTokenSet,
        conflictMergingIgnoreResultTokenSet,
        sortedResultTokenSet,
        valueByNameSortedResultTokenSet,
        originalTokenSetString,
        emptyTokenSet,
        emptyTokenSetString,
    };
}
