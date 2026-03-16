import { createToken, type Token } from "@src/common/data/Token";
import type { TokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { generateToken, generateTokenNode } from "../utils/Generators";

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

export function setUpTokenSet() {
    const originalTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
    ];

    const cleanMergingTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-300", { default: 30 }, "sizing"),
        createToken("size-250", { default: 250 }, "sizing"),
        createToken("size-200", { default: 120 }, "sizing"),
    ];
    const cleanMergingResultTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
        createToken("size-300", { default: 30 }, "sizing"),
        createToken("size-250", { default: 250 }, "sizing"),
        createToken("size-200", { default: 120 }, "sizing"),
    ];
    const sortedMergingResultTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
        createToken("size-200", { default: 120 }, "sizing"),
        createToken("size-250", { default: 250 }, "sizing"),
        createToken("size-300", { default: 30 }, "sizing"),
    ];
    const valueByNameSortedMergingResultTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
        createToken("size-300", { default: 30 }, "sizing"),
        createToken("size-200", { default: 120 }, "sizing"),
        createToken("size-250", { default: 250 }, "sizing"),
    ];
    const conflictMergingTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 15 }, "sizing"),
        createToken("size-150", { default: 25 }, "sizing"),
        createToken("size-200", { default: 35 }, "sizing"),
    ];
    const conflictMergingReplaceResultTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 15 }, "sizing"),
        createToken("size-150", { default: 25 }, "sizing"),
        createToken("size-200", { default: 35 }, "sizing"),
    ];
    const conflictMergingIgnoreResultTokens: Token[] = [
        createToken("size-50", { default: 5 }, "sizing"),
        createToken("size-100", { default: 10 }, "sizing"),
        createToken("size-150", { default: 15 }, "sizing"),
        createToken("size-200", { default: 35 }, "sizing"),
    ];
    const differentTokens: Token[] = [
        createToken("spacing-250", { default: 25 }, "spacing"),
        createToken("spacing-350", { default: 35 }, "spacing"),
        createToken("spacing-450", { default: 45 }, "spacing"),
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
        differentTokens[0].type,
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
