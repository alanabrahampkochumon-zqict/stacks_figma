import { faker } from "@faker-js/faker";
import type { Group } from "@src/common/data/Group";
import type {
    ExtendedToken,
    ExtendedTokenTypes,
    Token_depr,
} from "@src/common/data/Token";
import type { TokenNode } from "../../../../src/common/data/TokenNode";
import { v4 } from "uuid";

function _generateTokenByType(
    type: ExtendedTokenTypes,
    randomLimit: number = 10000,
) {
    switch (type) {
        case "number":
        case "sizing":
        case "spacing":
        case "corner-radius":
            return Math.round(Math.random() * randomLimit);
        case "string":
            return faker.word.words();
        case "boolean":
            return Math.random() > 0.5;
        case "color":
            return faker.color.rgb({ format: "hex" });
        case "gradient":
        // TODO: Implementation
        case "box-shadow":
        // TODO: Implementation
        case "animation":
        // TODO: Implementation
    }
}

export function generateToken(
    type: ExtendedTokenTypes,
    modes: string[] = ["default"],
): Token_depr {
    return {
        type: type,
        valueByMode: Object.fromEntries(
            modes.map((mode) => [mode, _generateTokenByType(type)]),
        ),
        entityType: "token",
    };
}

export function generateGroup(): Group {
    return {
        expanded: Math.random() > 0.5,
        entityType: "group",
    };
}

// const usedNames = new Set();
// let index = 0;
// const words = faker.word.words({ count: 5000 }).split(" ");
// function generateUniqueName() {
//     let name = words[index];
//     index++;
//     while (usedNames.has(name)) {
//         name = words[index];
//         index++;
//         usedNames.add(name);
//     }
//     return name;
// }

/**
 * Generates a {@link TokenNode} for testing.
 *
 * @export
 * @param name        The name of the generated token node.
 *                    Generates a random name by default.
 * @param type        The type of TokenNode to generate.
 *                    Available options are "value", "group", "reference"
 * @param nodeType    The type of node. Only applicable for {@link ValueNode} and {@link ReferenceNode}.
 *                    @see {@link ExtendedToken} for details.
 * @param uid         The Unique identifier of the token node.
 *                    Generates a random name by default.
 * @param parentId    The parentId of the token node.
 *                    Generates a parent with 50% RNG by default.
 * @param referenceId A reference id for the generated token, only applicable when setting type to "reference".
 * @param modes       The modes to use for generating {@link TokenNode}. Only applicable for {@link ValueNode}.
 *
 * @returns {[TokenNode, string]} The generated token node and its string representation.
 */
export function generateTokenNode<K extends keyof typeof ExtendedToken>(
    name: string | undefined = undefined,
    type: "group" | "token" = "token",
    nodeType: ExtendedTokenTypes = "number",
    uid: string | undefined = undefined,
    parentId: string | undefined = undefined,
    reference: string | undefined = undefined,
    modes: string[] | undefined = undefined,
): TokenNode<K> {
    const tokenName = name || v4();
    const tokenId = uid || v4();
    const tokenReference = reference ? reference : undefined;
    const tokenValue = !tokenReference
        ? type === "group"
            ? generateGroup()
            : generateToken(nodeType, modes)
        : undefined;
    const tokenParentId = parentId || Math.random() > 0.5 ? v4() : undefined;

    return {
        name: tokenName,
        uid: tokenId,
        value: tokenValue,
        parentId: tokenParentId,
        reference: tokenReference,
    };
}
