import { DesignSystem } from "@src/common/data/DesignSystem";
import { createToken, type Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";

export function setUpDesignSystem() {
    const tokenType1 = "number";
    const tokens1: Token[] = [
        createToken("size-0", { default: 0 }, tokenType1),
        createToken("size-150", { default: 150 }, tokenType1),
        createToken("size-50", { default: 50 }, tokenType1),
        createToken("size-1000", { default: 100 }, tokenType1),
    ];
    const sortedTokens1: Token[] = [
        createToken("size-0", { default: 0 }, tokenType1),
        createToken("size-50", { default: 50 }, tokenType1),
        createToken("size-150", { default: 150 }, tokenType1),
        createToken("size-1000", { default: 100 }, tokenType1),
    ];
    const tokenType2 = "string";
    const tokens2: Token[] = [
        createToken("light", { default: "light" }, tokenType2),
        createToken("regular", { default: "regular" }, tokenType2),
        createToken("bold", { default: "bold" }, tokenType2),
    ];
    const tokens3: Token[] = [
        createToken("size-0", { default: 0 }, tokenType1),
        createToken("size-100", { default: 1000 }, tokenType1),
        createToken("size-150", { default: 15 }, tokenType1),
        createToken("size-350", { default: 35 }, tokenType1),
    ];
    const mergedToken: Token[] = [
        createToken("size-0", { default: 0 }, tokenType1),
        createToken("size-150", { default: 150 }, tokenType1),
        createToken("size-50", { default: 50 }, tokenType1),
        createToken("size-1000", { default: 100 }, tokenType1),
        createToken("size-100", { default: 1000 }, tokenType1),
        createToken("size-350", { default: 35 }, tokenType1),
    ];
    const sortedMergedToken: Token[] = [
        createToken("size-0", { default: 0 }, tokenType1),
        createToken("size-50", { default: 50 }, tokenType1),
        createToken("size-100", { default: 1000 }, tokenType1),
        createToken("size-150", { default: 150 }, tokenType1),
        createToken("size-350", { default: 35 }, tokenType1),
        createToken("size-1000", { default: 100 }, tokenType1),
    ];
    const sortedMergedTokenByValue: Token[] = [
        createToken("size-0", { default: 0 }, tokenType1),
        createToken("size-350", { default: 35 }, tokenType1),
        createToken("size-50", { default: 50 }, tokenType1),
        createToken("size-1000", { default: 100 }, tokenType1),
        createToken("size-150", { default: 150 }, tokenType1),
        createToken("size-100", { default: 1000 }, tokenType1),
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
