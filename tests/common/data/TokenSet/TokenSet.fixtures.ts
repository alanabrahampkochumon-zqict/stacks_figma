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

export function setUpTokenSet() {
    const originalTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 10 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-150" },
    ];

    const cleanMergingTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 30 }, name: "size-300" },
        { type: "sizing", valueByMode: { default: 250 }, name: "size-250" },
        { type: "sizing", valueByMode: { default: 120 }, name: "size-200" },
    ];
    const cleanMergingResultTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 10 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-150" },
        { type: "sizing", valueByMode: { default: 30 }, name: "size-300" },
        { type: "sizing", valueByMode: { default: 250 }, name: "size-250" },
        { type: "sizing", valueByMode: { default: 120 }, name: "size-200" },
    ];
    const sortedMergingResultTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 10 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-150" },
        { type: "sizing", valueByMode: { default: 120 }, name: "size-200" },
        { type: "sizing", valueByMode: { default: 250 }, name: "size-250" },
        { type: "sizing", valueByMode: { default: 30 }, name: "size-300" },
    ];
    const valueByNameSortedMergingResultTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 10 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-150" },
        { type: "sizing", valueByMode: { default: 30 }, name: "size-300" },
        { type: "sizing", valueByMode: { default: 120 }, name: "size-200" },
        { type: "sizing", valueByMode: { default: 250 }, name: "size-250" },
    ];
    const conflictMergingTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 25 }, name: "size-150" },
        { type: "sizing", valueByMode: { default: 35 }, name: "size-200" },
    ];
    const conflictMergingReplaceResultTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 25 }, name: "size-150" },
        { type: "sizing", valueByMode: { default: 35 }, name: "size-200" },
    ];
    const conflictMergingIgnoreResultTokens: Token[] = [
        { type: "sizing", valueByMode: { default: 5 }, name: "size-50" },
        { type: "sizing", valueByMode: { default: 10 }, name: "size-100" },
        { type: "sizing", valueByMode: { default: 15 }, name: "size-150" },
        { type: "sizing", valueByMode: { default: 35 }, name: "size-200" },
    ];
    const differentTokens: Token[] = [
        { type: "spacing", valueByMode: { default: 25 }, name: "spacing-250" },
        { type: "spacing", valueByMode: { default: 35 }, name: "spacing-350" },
        { type: "spacing", valueByMode: { default: 45 }, name: "spacing-450" },
    ];

    const originalTokenSet = new TokenSet("ts", "sizing", 2, originalTokens);
    const originalTokenSetString = JSON.stringify(originalTokenSet);

    const emptyTokenSet = new TokenSet("empty", "animation", 4);
    const emptyTokenSetString = JSON.stringify(emptyTokenSet);

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
