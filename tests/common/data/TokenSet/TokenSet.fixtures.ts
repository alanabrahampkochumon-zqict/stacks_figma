import {ExtendedToken, type ExtendedTokenType, Token} from "@src/common/data/Token";
import {TokenSet} from "@src/common/data/TokenSet";
import {generateToken} from "../utils/Generators";

// createTokenNode\(\s*(".*"),\s*createToken\((\{.*\}),\s*"[a-z-]+"\),\s*(".*"),{0,1}\s*\) -> new ValueNode($1, $2, $3)

export default function setUpTokens() {
    const numberTokenModes = ["default"];
    const numberTokenType: ExtendedTokenType = "number";
    const numberTokens = Array(10)
        .fill(0)
        .map(() =>
            generateToken(numberTokenType)
        );
    const sortedNumberToken = numberTokens.sort(
        (t, u) =>
            t &&
            u &&
            t.name.localeCompare(u.name, undefined, {numeric: true}),
    );

    const colorTokenType: ExtendedTokenType = "color";
    const colorTokens = Array(10)
        .fill(0)
        .map(() =>
            generateToken(colorTokenType)
        );

    const numberTokenSet = new TokenSet("Number", "number", 1, numberTokens);

    return {
        numberTokenModes,
        numberTokens,
        colorTokens,
        numberTokenSet,
        sortedNumberToken,
        numberTokenType,
        colorTokenType,
    };
}

export function setUpTokenSet() {
    const originalTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 5}),
        new Token(ExtendedToken.sizing, "size-150", {default: 5}),
    ];

    const cleanMergingTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-300", {default: 30}),
        new Token(ExtendedToken.sizing, "size-250", {default: 250}),
        new Token(ExtendedToken.sizing, "size-200", {default: 120}),
    ];
    const cleanMergingResultTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 10}),
        new Token(ExtendedToken.sizing, "size-150", {default: 15}),
        new Token(ExtendedToken.sizing, "size-300", {default: 30}),
        new Token(ExtendedToken.sizing, "size-250", {default: 250}),
        new Token(ExtendedToken.sizing, "size-200", {default: 120}),
    ];

    const sortedMergingResultTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 10}),
        new Token(ExtendedToken.sizing, "size-150", {default: 15}),
        new Token(ExtendedToken.sizing, "size-200", {default: 120}),
        new Token(ExtendedToken.sizing, "size-250", {default: 250}),
        new Token(ExtendedToken.sizing, "size-300", {default: 30}),
    ];
    const valueByNameSortedMergingResultTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 10}),
        new Token(ExtendedToken.sizing, "size-150", {default: 15}),
        new Token(ExtendedToken.sizing, "size-300", {default: 30}),
        new Token(ExtendedToken.sizing, "size-200", {default: 120}),
        new Token(ExtendedToken.sizing, "size-250", {default: 250}),
    ];
    const conflictMergingTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 15}),
        new Token(ExtendedToken.sizing, "size-150", {default: 25}),
        new Token(ExtendedToken.sizing, "size-200", {default: 35}),
    ];
    const conflictMergingReplaceResultTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 15}),
        new Token(ExtendedToken.sizing, "size-150", {default: 25}),
        new Token(ExtendedToken.sizing, "size-200", {default: 35}),
    ];
    const conflictMergingIgnoreResultTokens = [
        new Token(ExtendedToken.sizing, "size-50", {default: 5}),
        new Token(ExtendedToken.sizing, "size-100", {default: 10}),
        new Token(ExtendedToken.sizing, "size-150", {default: 15}),
        new Token(ExtendedToken.sizing, "size-200", {default: 35}),
    ];
    const differentTokenType = "spacing";
    const differentTokens = [
        new Token(ExtendedToken.sizing, "spacing-250", {default: 25}),
        new Token(ExtendedToken.sizing, "spacing-350", {default: 35}),
        new Token(ExtendedToken.sizing, "spacing-450", {default: 45}),
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
        emptyTokenSetString
    };
}
