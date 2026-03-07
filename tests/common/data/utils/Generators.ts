import { faker } from "@faker-js/faker";
import type { ExtendedTokenTypes, Token } from "@src/common/data/Token";

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
    name?: string,
    modes: string[] = ["default"],
): Token {
    return {
        name: name || faker.word.words(),
        type: type,
        valueByMode: Object.fromEntries(
            modes.map((mode) => [mode, _generateTokenByType(type)]),
        ),
    };
}
