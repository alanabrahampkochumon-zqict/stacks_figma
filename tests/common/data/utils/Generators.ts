import {faker} from "@faker-js/faker";
import {
    ExtendedToken, type ExtendedTokenType, Token, type TokenTypeMap,
} from "@src/common/data/Token";
import {v4} from "uuid";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";
import {TypographyToken} from "@src/common/data/TypographyToken.ts";

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
            return new TypographyToken("roboto", Math.round(Math.random() * 100), ["bold", "light", "normal"][Math.round(Math.random() * 3)], Math.round(Math.random() * 100), Math.round(Math.random() * 100), "None") as TokenTypeMap[K]
        case "gradient":
        // TODO: Implementation
        case "boxShadow":
        // TODO: Implementation
        case "animation":
            // TODO: Implementation
            return 0 as never;
    }
}

// export function generateValueTokenNode<K extends ExtendedTokenType>(
//     name: string,
//     id: string,
//     type: K,
// ): ValueNode<K> {
//     return new ValueNode(
//         type,
//         name,
//         generateTokenByType(type),
//         id,
//     )
// }


/**
 * Generates a {@link Token} for testing.
 *
 * @export
 * @param type        The type of node.
 *                    See {@link ExtendedToken} for details.
 * @param name        The name of the generated token node.
 *                    Generates a random name by default.
 * @param valueByMode A key-value pair of mode to specific value.
 * @param groups      A list having the grouping of the current token.
 * @param uid         The Unique identifier of the token node.
 *                    Generates a random name by default.
 *
 * @returns {Token} The generated token.
 */
export function generateToken<T extends ExtendedTokenType>(
    type: T = ExtendedToken.number as T,
    name: string | undefined = undefined,
    groups: string[] = [],
    valueByMode: Record<string, TokenTypeMap[T] | ReferenceID> | undefined = undefined,
    uid: ReferenceID | undefined = ReferenceID.generate(),
): Token<T> {
    const tokenName = name || v4();
    const value = valueByMode || {"default": generateTokenByType(type)}
    return new Token<T>(type, tokenName, value, groups, uid)
}