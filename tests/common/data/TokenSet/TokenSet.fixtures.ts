import {ExtendedToken, type ExtendedTokenType} from "@src/common/data/Token";
import {
    GroupNode, TokenNode,
    ValueNode,
} from "@src/common/data/TokenNode.ts";
import {TokenSet} from "@src/common/data/TokenSet";
import {generateTokenNode} from "../utils/Generators";

// createTokenNode\(\s*(".*"),\s*createToken\((\{.*\}),\s*"[a-z-]+"\),\s*(".*"),{0,1}\s*\) -> new ValueNode($1, $2, $3)

export default function setUpTokens() {
    const numberTokenModes = ["default"];
    const numberTokenType: ExtendedTokenType = "number";
    const numberTokens: TokenNode[] = Array(10)
        .fill(0)
        .map(() =>
            generateTokenNode(
                undefined,
                undefined,
                numberTokenType,
                undefined,
                undefined,
            ),
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
            generateTokenNode(
                undefined,
                undefined,
                colorTokenType,
                undefined,
                undefined,
            ),
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
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 5, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 5, "3"),
    ];

    const cleanMergingTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-300", 30, "5"),
        new ValueNode(ExtendedToken.sizing, "size-250", 250, "6"),
        new ValueNode(ExtendedToken.sizing, "size-200", 120, "7"),
    ];
    const cleanMergingResultTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 10, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 15, "3"),
        new ValueNode(ExtendedToken.sizing, "size-300", 30, "5"),
        new ValueNode(ExtendedToken.sizing, "size-250", 250, "6"),
        new ValueNode(ExtendedToken.sizing, "size-200", 120, "7"),
    ];

    const sortedMergingResultTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 10, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 15, "3"),
        new ValueNode(ExtendedToken.sizing, "size-200", 120, "7"),
        new ValueNode(ExtendedToken.sizing, "size-250", 250, "6"),
        new ValueNode(ExtendedToken.sizing, "size-300", 30, "5"),
    ];
    const valueByNameSortedMergingResultTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 10, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 15, "3"),
        new ValueNode(ExtendedToken.sizing, "size-300", 30, "5"),
        new ValueNode(ExtendedToken.sizing, "size-200", 120, "7"),
        new ValueNode(ExtendedToken.sizing, "size-250", 250, "6"),
    ];
    const conflictMergingTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 15, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 25, "3"),
        new ValueNode(ExtendedToken.sizing, "size-200", 35, "4"),
    ];
    const conflictMergingReplaceResultTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 15, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 25, "3"),
        new ValueNode(ExtendedToken.sizing, "size-200", 35, "4"),
    ];
    const conflictMergingIgnoreResultTokens = [
        new ValueNode(ExtendedToken.sizing, "size-50", 5, "1"),
        new ValueNode(ExtendedToken.sizing, "size-100", 10, "2"),
        new ValueNode(ExtendedToken.sizing, "size-150", 15, "3"),
        new ValueNode(ExtendedToken.sizing, "size-200", 35, "4"),
    ];
    const differentTokenType = "spacing";
    const differentTokens = [
        new ValueNode(ExtendedToken.spacing, "spacing-250", 25),
        new ValueNode(ExtendedToken.spacing, "spacing-350", 35),
        new ValueNode(ExtendedToken.spacing, "spacing-450", 45),
    ];
    const groupTokenSet = new TokenSet("groups", ExtendedToken.number, 1, [
        new GroupNode("group-1", [], true, "1"),
        new GroupNode("group-2", [], true, "2"),
        new GroupNode("group-3", [], true, "3"),
    ]);
    const groupJson = JSON.stringify(groupTokenSet);

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
        emptyTokenSetString,
        groupTokenSet,
        groupJson,
    };
}
