import { DesignSystem } from "@src/common/data/DesignSystem";
import { createToken } from "@src/common/data/Token";
import { createTokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";

export function setUpDesignSystem() {
    const tokenType1 = "number";
    const tokens1 = [
        createTokenNode("size-0", createToken({ default: 0 }, tokenType1), "1"),
        createTokenNode(
            "size-150",
            createToken({ default: 150 }, tokenType1),
            "2",
        ),
        createTokenNode(
            "size-50",
            createToken({ default: 50 }, tokenType1),
            "3",
        ),
        createTokenNode(
            "size-1000",
            createToken({ default: 100 }, tokenType1),
            "4",
        ),
    ];
    const sortedTokens1 = [
        createTokenNode("size-0", createToken({ default: 0 }, tokenType1), "1"),
        createTokenNode(
            "size-50",
            createToken({ default: 50 }, tokenType1),
            "3",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 150 }, tokenType1),
            "2",
        ),
        createTokenNode(
            "size-1000",
            createToken({ default: 100 }, tokenType1),
            "4",
        ),
    ];
    const tokenType2 = "string";
    const tokens2 = [
        createTokenNode(
            "light",
            createToken({ default: "light" }, tokenType2),
            "11",
        ),
        createTokenNode(
            "regular",
            createToken({ default: "regular" }, tokenType2),
            "22",
        ),
        createTokenNode(
            "bold",
            createToken({ default: "bold" }, tokenType2),
            "33",
        ),
    ];
    const tokens3 = [
        createTokenNode("size-0", createToken({ default: 0 }, tokenType1), "1"),
        createTokenNode(
            "size-100",
            createToken({ default: 1000 }, tokenType1),
            "6",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 15 }, tokenType1),
            "2",
        ),
        createTokenNode(
            "size-350",
            createToken({ default: 35 }, tokenType1),
            "8",
        ),
    ];
    const mergedToken = [
        createTokenNode("size-0", createToken({ default: 0 }, tokenType1), "1"),
        createTokenNode(
            "size-150",
            createToken({ default: 150 }, tokenType1),
            "2",
        ),
        createTokenNode(
            "size-50",
            createToken({ default: 50 }, tokenType1),
            "3",
        ),
        createTokenNode(
            "size-1000",
            createToken({ default: 100 }, tokenType1),
            "4",
        ),

        createTokenNode(
            "size-100",
            createToken({ default: 1000 }, tokenType1),
            "6",
        ),
        createTokenNode(
            "size-350",
            createToken({ default: 35 }, tokenType1),
            "8",
        ),
    ];
    const sortedMergedToken = [
        createTokenNode("size-0", createToken({ default: 0 }, tokenType1), "1"),
        createTokenNode(
            "size-50",
            createToken({ default: 50 }, tokenType1),
            "3",
        ),
        createTokenNode(
            "size-100",
            createToken({ default: 1000 }, tokenType1),
            "6",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 150 }, tokenType1),
            "2",
        ),

        createTokenNode(
            "size-350",
            createToken({ default: 35 }, tokenType1),
            "8",
        ),
        createTokenNode(
            "size-1000",
            createToken({ default: 100 }, tokenType1),
            "4",
        ),
    ];
    const sortedMergedTokenByValue = [
        createTokenNode("size-0", createToken({ default: 0 }, tokenType1), "1"),
        createTokenNode(
            "size-350",
            createToken({ default: 35 }, tokenType1),
            "8",
        ),
        createTokenNode(
            "size-50",
            createToken({ default: 50 }, tokenType1),
            "3",
        ),
        createTokenNode(
            "size-1000",
            createToken({ default: 100 }, tokenType1),
            "4",
        ),
        createTokenNode(
            "size-150",
            createToken({ default: 150 }, tokenType1),
            "2",
        ),
        createTokenNode(
            "size-100",
            createToken({ default: 1000 }, tokenType1),
            "6",
        ),
    ];
    const tokenSet1 = new TokenSet("token-1", tokenType1, 1, tokens1);
    const sortedTokenSet1 = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedTokens1,
    );
    const tokenSet2 = new TokenSet("token-2", tokenType2, 1, tokens2);
    const tokenSet3 = new TokenSet("token-1", tokenType1, 1, tokens3);
    const mergedTokenSet = new TokenSet("token-1", tokenType1, 1, mergedToken);
    const sortedMergedTokenSet = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedMergedToken,
    );

    const sortedByValueMergedTokenSet = new TokenSet(
        "token-1",
        tokenType1,
        1,
        sortedMergedTokenByValue,
    );

    const tokenSets = [tokenSet1, tokenSet2];
    const dsName = "Falcon";

    const designSystem = new DesignSystem(dsName, tokenSets);
    const serializedDesignSystem = JSON.stringify({
        name: designSystem.name,
        tokenSets: designSystem.getTokenSets().map((it) => JSON.stringify(it)),
    })
        .replace(/\\"modes\\":{}/g, `\\"modes\\":[\\"default\\"]`)
        .replace("_tokenSet", "tokenSet");

    return {
        dsName,
        tokenSets,
        tokenSet3,
        sortedTokenSet1,
        mergedTokenSet,
        sortedMergedTokenSet,
        sortedByValueMergedTokenSet,
        serializedDesignSystem,
        designSystem,
    };
}
