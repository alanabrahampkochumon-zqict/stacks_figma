import {faker} from "@faker-js/faker";
import type {
    ExtendedToken, ExtendedTokenType, TokenTypeMap,
} from "@src/common/data/Token";
import {GroupNode, ReferenceNode, type TokenNode, ValueNode} from "@src/common/data/TokenNode.ts";
import {v4} from "uuid";

function generateTokenByType<K extends ExtendedTokenType>(
    type: K,
    randomLimit: number = 10000,
): TokenTypeMap[K] {
    switch (type) {
        case "number":
        case "sizing":
        case "spacing":
        case "cornerRadius":
            return Math.round(Math.random() * randomLimit) as TokenTypeMap[K];
        case "string":
            return faker.word.words() as TokenTypeMap[K];
        case "boolean":
            return Math.random() > 0.5 as TokenTypeMap[K];
        case "color":
            return faker.color.rgb({format: "hex"}) as TokenTypeMap[K];
        case "typography":
        // TODO: Implementation
        case "gradient":
        // TODO: Implementation
        case "boxShadow":
        // TODO: Implementation
        case "animation":
        // TODO: Implementation
            return 0 as never;
    }
}

export function generateValueTokenNode<K extends ExtendedTokenType>(
    name: string,
    id: string,
    type: K,
): ValueNode<K> {
    return new ValueNode(
        type,
        name,
        generateTokenByType(type),
        id,
    )
}


/**
 * Generates a {@link TokenNode} for testing.
 *
 * @export
 * @param name        The name of the generated token node.
 *                    Generates a random name by default.
 * @param type        The type of TokenNode to generate.
 *                    Available options are "value", "group", "reference"
 * @param nodeType    The type of node. Only applicable for {@link ValueNode} and {@link ReferenceNode}.
 *                    See {@link ExtendedToken} for details.
 * @param uid         The Unique identifier of the token node.
 *                    Generates a random name by default.
 * @param referenceId A reference id for the generated token, only applicable when setting type to "reference".
 *
 * @returns {[TokenNode, string]} The generated token node and its string representation.
 */
export function generateTokenNode(
    name: string | undefined = undefined,
    type: "group" | "token" | "reference" = "token",
    nodeType: ExtendedTokenType = "number",
    uid: string | undefined = undefined,
    referenceId: string | undefined = undefined,
): TokenNode {
    const tokenName = name || v4();
    const tokenId = uid || v4();
    switch (type) {
        case "group":
            const expanded = Math.random() < 0.5;
            const childNodes = new Array(Math.round(Math.random() * 3 + 4)).map(() => generateValueTokenNode(v4(), v4(), nodeType))
            return new GroupNode(tokenName, childNodes, expanded, tokenId)
        case "token":
            return generateValueTokenNode(tokenName, tokenId, nodeType)
        case "reference":
            return new ReferenceNode(tokenName, referenceId || v4(), tokenId)
    }
}