import { createToken, type ExtendedTokenTypes } from "@src/common/data/Token";
import { createTokenNode, type TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { generateTokenNode } from "../utils/Generators";

// REGEX
// createToken\(\s*(".*"),\s*(\{.*\}),\s*(".*|)\)
// createTokenNode($1, createToken($2, $3))

export default function setUpTokens() {
    const numberTokenModes = ["default"];
    const numberTokenType: ExtendedTokenTypes = "number";
    const numberTokens: TokenNode[] = Array(10)
        .fill(0)
        .map(() =>
            generateTokenNode(
                undefined,
                undefined,
                numberTokenType,
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

    const colorTokenType: ExtendedTokenTypes = "color";
    const colorTokenModes = ["dark", "light"];
    const colorTokens = Array(10)
        .fill(0)
        .map(() =>
            generateTokenNode(
                undefined,
                undefined,
                colorTokenType,
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
        numberTokenType,
        colorTokenType,
    };
}

export function setUpTokenSet() {
    const originalTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 10 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 15 }, "sizing"),
            "3",
        ),
    ];

    const cleanMergingTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-300",
            createToken({ default: 30 }, "sizing"),
            "5",
        ),
        createTokenNode(
            "size-250",
            createToken({ default: 250 }, "sizing"),
            "6",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 120 }, "sizing"),
            "7",
        ),
    ];
    const cleanMergingResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 10 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 15 }, "sizing"),
            "3",
        ),
        createTokenNode(
            "size-300",
            createToken({ default: 30 }, "sizing"),
            "5",
        ),
        createTokenNode(
            "size-250",
            createToken({ default: 250 }, "sizing"),
            "6",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 120 }, "sizing"),
            "7",
        ),
    ];
    const sortedMergingResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 10 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 15 }, "sizing"),
            "3",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 120 }, "sizing"),
            "7",
        ),
        createTokenNode(
            "size-250",
            createToken({ default: 250 }, "sizing"),
            "6",
        ),
        createTokenNode(
            "size-300",
            createToken({ default: 30 }, "sizing"),
            "5",
        ),
    ];
    const valueByNameSortedMergingResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 10 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 15 }, "sizing"),
            "3",
        ),
        createTokenNode(
            "size-300",
            createToken({ default: 30 }, "sizing"),
            "5",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 120 }, "sizing"),
            "7",
        ),
        createTokenNode(
            "size-250",
            createToken({ default: 250 }, "sizing"),
            "6",
        ),
    ];
    const conflictMergingTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 15 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 25 }, "sizing"),
            "3",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 35 }, "sizing"),
            "4",
        ),
    ];
    const conflictMergingReplaceResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 15 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 25 }, "sizing"),
            "3",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 35 }, "sizing"),
            "4",
        ),
    ];
    const conflictMergingIgnoreResultTokens: TokenNode[] = [
        createTokenNode("size-50", createToken({ default: 5 }, "sizing"), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 10 }, "sizing"),
            "2",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 15 }, "sizing"),
            "3",
        ),
        createTokenNode(
            "size-200",
            createToken({ default: 35 }, "sizing"),
            "4",
        ),
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
