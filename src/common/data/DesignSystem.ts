import { InsertConflictPolicy, UpdatePolicy } from "./Common";
import type { Token, TokenComparator } from "./Token";
import { TokenSet } from "./TokenSet";

type DesignSystemUpdateOptions = {
    updatePolicy?: UpdatePolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

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
        }: DesignSystemUpdateOptions = {},
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

    /**
     * Get's a token set fromt the design system.
     * Any mutations if applied to the tokenset will be applied to the design system.
     * @param name the name of the token set to get return.
     * @returns tokenset if it exists or undefined.
     */
    getTokenSet(name: string): TokenSet | undefined {
        const index = this.getIndex(name);
        return index === -1 ? undefined : this.tokenSets[index];
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

    /**
     * Updates the name of the tokenset in the design system.
     * Direct mutation with tokensets is not recommended as it does not check for collisions.
     * @param name the name used to reference the tokenset
     * @param newName the new name to assign to.
     * @throws error if new name is a duplicate name, or when a tokenset with given name does not exist.
     */
    updateTokenSetName(name: string, newName: string) {
        const tokenSetIndex = this.getIndex(name);
        if (tokenSetIndex === -1)
            throw new Error(`TokenSet with ${name} doesn't exist.`);
        if (this.tokenSets.some((tk) => tk.name === newName))
            throw new Error(
                `Name collision: TokenSet with ${newName} already exists`,
            );
        this.tokenSets[tokenSetIndex].name = newName;
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
