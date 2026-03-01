import { InsertConflictPolicy } from "./Common";
import type { Token, TokenComparator } from "./Token";
import { TokenSet } from "./TokenSet";

// type DesignSystemUpdateOptions = {
//     updatePolicy?: UpdatePolicy;
//     sortToken?: boolean;
//     // compareFn?: TokenSetComparator;
// };

type DesignSystemAddOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};
export class DesignSystem {
    name: string;
    tokenSets: TokenSet[];

    constructor(name: string, tokenSets: TokenSet[] = []) {
        this.name = name;
        this.tokenSets = tokenSets;
    }

    addTokenSet(
        tokenSet: TokenSet,
        {
            insertPolicy = InsertConflictPolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: DesignSystemAddOptions = {},
    ) {
        const tokenIndex = this.getIndex(tokenSet.name);
        if (tokenIndex === -1) this.tokenSets.push(tokenSet);
        else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this.tokenSets[tokenIndex] = tokenSet;
        else if (insertPolicy === InsertConflictPolicy.MERGE)
            this.tokenSets[tokenIndex].mergeTokenSet(tokenSet);
        else
            console.log(
                "Duplicate token found, and insertion policy is set `InsertionConflictPolicy.IGNORE`",
            );
        if (sortToken) this.tokenSets[tokenIndex].sort(compareFn);
    }

    getIndex(tokenSetName: string) {
        return this.tokenSets.findIndex((ts) => ts.name === tokenSetName);
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
