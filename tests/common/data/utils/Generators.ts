import { faker } from "@faker-js/faker";
import type { Group } from "@src/common/data/Group";
import type { ExtendedTokenTypes, Token } from "@src/common/data/Token";
import type { TokenNode } from "@src/common/data/TokenNode";
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
): Token {
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
 * Generates a @see TokenNode for testing.
 *
 * @export
 * @param {(string | undefined)} [name=undefined] The name of the generated token node.
 *                                                Generates a random name by default.
 * @param {("group" | "token")} [type="token"] The type of token node to generate.
 *                                             Default "token".
 * @param {ExtendedTokenTypes} [nodeType="number"] The type of node. Only applicable for "token".
 *                                                 @see ExtendedTokenTypes for details.
 * @param {(string | undefined)} [uid=undefined] The ID of the token node.
 *                                               Generates a random name by default.
 * @param {(string | undefined)} [parentId=undefined] The parentId of the token node.
 *                                                    Generates a parent with 50% RNG by default.
 * @param {boolean} [reference=false] A flag, whether to have a reference.
 *                                    <p>Note: Setting a flag will make value undefined.</p>
 * @param {(string[] | undefined)} [modes=undefined] The modes to use for generating @see Token. Not applicable for @see Group.
 * @returns {[TokenNode, json]} The generated token node and its string representation.
 */
export function generateTokenNode(
    name: string | undefined = undefined,
    type: "group" | "token" = "token",
    nodeType: ExtendedTokenTypes = "number",
    uid: string | undefined = undefined,
    parentId: string | undefined = undefined,
    reference: string | undefined = undefined,
    modes: string[] | undefined = undefined,
): TokenNode {
    const tokenName = name || v4();
    const tokenId = uid || v4();
    const tokenReference = reference
        ? reference
        : Math.random() > 0.5
          ? v4()
          : undefined;
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
