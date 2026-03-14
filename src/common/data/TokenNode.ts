import type { Group } from "./Group";
import type { Token } from "./Token";

/**
 * Type encapsulating the atomic unit of Design System.
 * @note Although you can create Groups and Tokens, it is discouraged
 *
 * @export
 * @typedef {TokenNode}
 * @property {string} name - Name of the token
 * @property {string} uid - ID of then token
 * @property {Group|Token} value - Value of the token. @see Group and @see Token for more details
 * @property {string} parentId - A reference to the enclosing group. Can be kept undefined if this token is standalone.
 * @property {string} reference - A reference to another token. Can be kept undefined if this token is the base token.
 *
 * @example
 * {
 *  name: "red-500",
 *  uid: "91940fc4-8e7a-43f5-96be-a9f363328590"
 *  value: { valueByMode: { default: "#770000" }, type: "color" }
 *  parentId: "305748a4-6ff4-4f77-b05d-e81397e694ad" // Reference to a primitive group
 *  reference: undefined // Primitive token
 * }
 */
export type TokenNode = {
    name: string;
    uid: string;
    value: Group | Token;
    parentId?: string;
    reference?: string;
};

/**
 * Generates a token node based on the
 *
 * @export
 * @param {string} name
 * @param {string} uid
 * @param {(Group|Token)} value
 * @param {?string} [parentId]
 * @param {?string} [reference]
 * @returns {TokenNode}
 */
export function createTokenNode(
    name: string,
    uid: string,
    value: Group | Token,
    parentId?: string,
    reference?: string,
): TokenNode {}
