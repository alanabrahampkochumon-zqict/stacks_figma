export type BasicTokenTypes = "number" | "string" | "boolean" | "color";
export type ExtendedTokenTypes =
    | BasicTokenTypes
    | (
          | "typography"
          | "sizing"
          | "spacing"
          | "animation"
          | "corner-radius"
          | "box-shadow"
          | "gradient"
      );

export type Levels = 1 | 2 | 3 | 4;

export interface Token {
    name: string;
    value: any;
    type: BasicTokenTypes;
}

export class TokenSet {
    name: string;
    type: ExtendedTokenTypes;
    level: Levels;
    tokens: Token[];

    constructor(
        name: string,
        type: ExtendedTokenTypes = "number",
        level: Levels = 1,
        tokens: Token[] = [],
    ) {
        this.name = name;
        this.type = type;
        this.level = level;
        this.tokens = tokens;
    }
}

export class DesignSystem {
    name: string;
    tokenSets: TokenSet[];

    constructor(name: string, tokenSets: TokenSet[] = []) {
        this.name = name;
        this.tokenSets = tokenSets;
    }

    addTokenSet(tokenSet: TokenSet) {
        this.tokenSets.push(tokenSet);
    }

    removeTokenSet(tokenSet: TokenSet) {
        this.tokenSets = this.tokenSets.filter((curTS) => curTS != tokenSet);
    }

    addToken(token: Token, tokenSetName: string) {
        this.tokenSets
            .find((tokenSet) => tokenSet.name == tokenSetName)
            ?.tokens.push(token);
    }

    removeToken(token: Token, tokenSetName: string) {
        const foundTokenSet = this.tokenSets.find(
            (tokenSet) => tokenSet.name == tokenSetName,
        );
        foundTokenSet?.tokens.filter((curToken) => curToken != token);
    }

    // static toJson(ds: DesignSystem): string {
    //     return JSON.stringify({
    //         name: ds.name,
    //         tokens: ds.tokens,
    //     });
    // }

    // static fromJson(jsonString: string): DesignSystem {
    //     try {
    //         const parsedData = JSON.parse(jsonString);
    //         return new DesignSystem(parsedData.name, parsedData.tokens);
    //     } catch (error) {
    //         console.error("Failed to create design system from JSON", error);
    //         return new DesignSystem("Untitled");
    //     }
    // }
}
