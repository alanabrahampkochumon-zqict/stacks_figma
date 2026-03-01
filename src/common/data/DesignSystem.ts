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

    /**
     * Adds a token set to a design system. If the tokenset already exist, the insertion policy is used to determine what to do with the duplicate.
     * @param tokenSet The token set to be inserted.
     * @param options Sets the insertion policy(Defaults to IGNORE), and sorting option.
     * @throws error if tokens don't match level and type when merging on conflict.
     */
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

    /**
     * Returns the index of a token set if it exists else -1
     * @param tokenSetName name of the token set to match for
     * @returns -1 if not found else index of tokenset
     */
    getIndex(tokenSetName: string) {
        return this.tokenSets.findIndex((ts) => ts.name === tokenSetName);
    }

    /**
     * Removes a tokenset if it exists
     * @param tokenSet to be removed
     */
    removeTokenSet(tokenSet: TokenSet) {
        this.tokenSets = this.tokenSets.filter((curTS) => curTS != tokenSet);
    }

    updateTokenSet(tokenSetName: string, newTokenSet, options: {} = {}) {
        const tokenIndex = this.getIndex(tokenSetName);
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
