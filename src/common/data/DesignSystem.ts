import { InsertConflictPolicy, UpdatePolicy } from "./Common";
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

type TokenSetUpdateOptions = {
    updatePolicy?: UpdatePolicy;
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
        let tokenSetIndex = this.getIndex(tokenSet.name);
        console.log(tokenSetIndex);
        if (tokenSetIndex === -1) {
            this.tokenSets.push(tokenSet);
            tokenSetIndex = this.tokenSets.length - 1;
        } else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this.tokenSets[tokenSetIndex] = tokenSet;
        else if (insertPolicy === InsertConflictPolicy.MERGE)
            this.tokenSets[tokenSetIndex].mergeTokenSet(tokenSet);
        else
            return console.log(
                "Duplicate token found, and insertion policy is set `InsertionConflictPolicy.IGNORE`",
            );
        if (sortToken) this.tokenSets[tokenSetIndex].sort(compareFn);
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

    /**
     * Updates a tokenset with the given token set, if it exists,
     * else it gets inserted if UpdatePolicy is set to UpdatePolicy.INSERT,
     * else nothing gets updated/inserted
     * @param tokenSetName key used for updating tokenset
     * @param newTokenSet tokenset to be updated with
     * @param option update options: UpdatePolicy(Defaults to IGNORE), sortToken: Sorts the updated/inserted tokenset
     */
    updateTokenSet(
        tokenSetName: string,
        newTokenSet: TokenSet,
        {
            updatePolicy = UpdatePolicy.IGNORE,
            sortToken = false,
            compareFn,
        }: TokenSetUpdateOptions = {},
    ) {
        const tokenSetIndex = this.getIndex(tokenSetName);
        console.log(tokenSetIndex);
        if (tokenSetIndex !== -1) {
            this.tokenSets[tokenSetIndex] = newTokenSet;
            this.tokenSets[tokenSetIndex].sort(compareFn);
        } else if (updatePolicy === UpdatePolicy.INSERT)
            this.addTokenSet(newTokenSet, { sortToken, compareFn });
        else
            console.log(
                "No matching token found! Update policy set to IGNORE. Aborting operation.",
            );
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
