import { DesignSystem } from "@src/common/data/DesignSystem";
import type { Token } from "@src/common/data/Token";
import { TokenSet } from "@src/common/data/TokenSet";

export function setUpDesignSystem() {
    const tokenType1 = "number";
    const tokens1: Token[] = [
        { type: tokenType1, valueByMode: { default: 0 }, name: "size-0" },
        { type: tokenType1, valueByMode: { default: 150 }, name: "size-150" },
        { type: tokenType1, valueByMode: { default: 50 }, name: "size-50" },
        { type: tokenType1, valueByMode: { default: 100 }, name: "size-1000" },
    ];
    const sortedTokens1: Token[] = [
        { type: tokenType1, valueByMode: { default: 0 }, name: "size-0" },
        { type: tokenType1, valueByMode: { default: 50 }, name: "size-50" },
        { type: tokenType1, valueByMode: { default: 150 }, name: "size-150" },
        { type: tokenType1, valueByMode: { default: 100 }, name: "size-1000" },
    ];
    const tokenType2 = "string";
    const tokens2: Token[] = [
        { type: tokenType2, valueByMode: { default: "light" }, name: "light" },
        {
            type: tokenType2,
            valueByMode: { default: "regular" },
            name: "regular",
        },
        { type: tokenType2, valueByMode: { default: "bold" }, name: "bold" },
    ];
    const tokens3: Token[] = [
        { type: tokenType1, valueByMode: { default: 0 }, name: "size-0" },
        { type: tokenType1, valueByMode: { default: 1000 }, name: "size-100" },
        { type: tokenType1, valueByMode: { default: 15 }, name: "size-150" },
        { type: tokenType1, valueByMode: { default: 35 }, name: "size-350" },
    ];
    const mergedToken: Token[] = [
        { type: tokenType1, valueByMode: { default: 0 }, name: "size-0" },
        { type: tokenType1, valueByMode: { default: 150 }, name: "size-150" },
        { type: tokenType1, valueByMode: { default: 50 }, name: "size-50" },
        { type: tokenType1, valueByMode: { default: 100 }, name: "size-1000" },
        { type: tokenType1, valueByMode: { default: 1000 }, name: "size-100" },
        { type: tokenType1, valueByMode: { default: 35 }, name: "size-350" },
    ];
    const sortedMergedToken: Token[] = [
        { type: tokenType1, valueByMode: { default: 0 }, name: "size-0" },
        { type: tokenType1, valueByMode: { default: 50 }, name: "size-50" },
        { type: tokenType1, valueByMode: { default: 1000 }, name: "size-100" },
        { type: tokenType1, valueByMode: { default: 150 }, name: "size-150" },
        { type: tokenType1, valueByMode: { default: 35 }, name: "size-350" },
        { type: tokenType1, valueByMode: { default: 100 }, name: "size-1000" },
    ];
    const sortedMergedTokenByValue: Token[] = [
        { type: tokenType1, valueByMode: { default: 0 }, name: "size-0" },
        { type: tokenType1, valueByMode: { default: 35 }, name: "size-350" },
        { type: tokenType1, valueByMode: { default: 50 }, name: "size-50" },
        { type: tokenType1, valueByMode: { default: 100 }, name: "size-1000" },
        { type: tokenType1, valueByMode: { default: 150 }, name: "size-150" },
        { type: tokenType1, valueByMode: { default: 1000 }, name: "size-100" },
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
    const serializedDesignSystem = JSON.stringify(designSystem).replace(
        "_tokenSet",
        "tokenSet",
    );
    // `
    //     {
    //         "name": "Falcon",
    //         "tokenSets": [
    //             "{\\"name\\":\\"token-1\\",\\"type\\":\\"number\\",\\"level\\":1,\\"tokens\\":[{\\"type\\":\\"number\\",\\"value\\":0,\\"name\\":\\"size-0\\"},{\\"type\\":\\"number\\",\\"value\\":150,\\"name\\":\\"size-150\\"},{\\"type\\":\\"number\\",\\"value\\":50,\\"name\\":\\"size-50\\"},{\\"type\\":\\"number\\",\\"value\\":100,\\"name\\":\\"size-1000\\"}]}",
    //             "{\\"name\\":\\"token-2\\",\\"type\\":\\"string\\",\\"level\\":1,\\"tokens\\":[{\\"type\\":\\"string\\",\\"value\\":\\"light\\",\\"name\\":\\"light\\"},{\\"type\\":\\"string\\",\\"value\\":\\"regular\\",\\"name\\":\\"regular\\"},{\\"type\\":\\"string\\",\\"value\\":\\"bold\\",\\"name\\":\\"bold\\"}]}"
    //         ]
    //     }
    // `.replace(/\s/g, "");

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
