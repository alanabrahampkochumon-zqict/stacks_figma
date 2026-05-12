import {faker} from "@faker-js/faker";
import type {Group} from "@src/common/data/Group";
import type {
    ExtendedToken,
    ExtendedTokenTypes,
    Token_depr,
} from "@src/common/data/Token";
import {GroupNode, ReferenceNode, type TokenNode, ValueNode} from "../../../../src/common/data/TokenNode";
import {v4} from "uuid";

function generateTokenByType(
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
            return faker.color.rgb({format: "hex"});
        case "typography":
            // TODO
        case "gradient":
        // TODO: Implementation
        case "box-shadow":
        // TODO: Implementation
        case "animation":
        // TODO: Implementation
    }
}

export function generateValueTokenNode(
    name: string,
    id: string,
    type: (keyof typeof ExtendedToken)[number],
    modes: string[] = ["default"],
): ValueNode {
    return new ValueNode(
        name,
        Object.fromEntries(
            modes.map((mode) => [mode, generateTokenByType(type)]),
        ),
        id,
    )
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
export function generateTokenNode(
    name: string | undefined = undefined,
    type: "group" | "token" | "reference" = "token",
    nodeType: (keyof typeof ExtendedToken)[number] = "number",
    uid: string | undefined = undefined,
    referenceId: string | undefined = undefined,
    modes: string[] | undefined = undefined, // TODO: Add modes
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
