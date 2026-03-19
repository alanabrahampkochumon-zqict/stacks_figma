import { InsertConflictPolicy, UpdatePolicy } from "./Common";
import type { Token, TokenComparator } from "./Token";
import { TokenSet } from "./TokenSet";

/**
 * Options for adding contents to a {@link DesignSystem}.
 * @property {?InsertConflictPolicy} insertPolicy Policy to handle conflicts if a token with the same UID exists.
 * @property {?boolean} sortToken Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type DesignSystemAddOptions = {
    insertPolicy?: InsertConflictPolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

/**
 * Options for updating the contents of a {@link DesignSystem}.
 * @property {?UpdatePolicy} updatePolicy Policy to handle conflicts if a tokenset does not exist.
 * @property {?boolean} sortToken Whether to re-sort the collection after the operation.
 * @property {?TokenComparator} compareFn Custom sorting logic. Defaults to alphanumeric by name.
 */
type DesignSystemUpdateOptions = {
    updatePolicy?: UpdatePolicy;
    sortToken?: boolean;
    compareFn?: TokenComparator;
};

export class DesignSystem {
    name: string;
    private _tokenSets: TokenSet[];

    constructor(name: string, tokenSets: TokenSet[] = []) {
        if (!name)
            throw new Error("Design system needs a name to be initialized!");
        this.name = name;
        this._tokenSets = tokenSets;
    }

    // TODO: Add name uniqueness validator for tokensets

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
        if (tokenSetIndex === -1) {
            this._tokenSets.push(tokenSet);
            tokenSetIndex = this._tokenSets.length - 1;
        } else if (insertPolicy === InsertConflictPolicy.REPLACE)
            this._tokenSets[tokenSetIndex] = tokenSet;
        else if (insertPolicy === InsertConflictPolicy.MERGE)
            // TODO: Add test for merge policy
            this._tokenSets[tokenSetIndex].mergeTokenSet(tokenSet, {
                insertPolicy,
            });
        else
            return console.warn(
                "Duplicate token found, and insertion policy is set `InsertionConflictPolicy.IGNORE`",
            );
        if (sortToken) this._tokenSets[tokenSetIndex].sort(compareFn);
    }

    /**
     * Returns the index of a token set if it exists else -1
     * @param tokenSetName name of the token set to match for
     * @returns -1 if not found else index of tokenset
     */
    getIndex(tokenSetName: string) {
        return this._tokenSets.findIndex((ts) => ts.name === tokenSetName);
    }

    /**
     * Removes a tokenset if it exists
     * @param tokenSet to be removed
     */
    removeTokenSet(tokenSet: TokenSet) {
        this._tokenSets = this._tokenSets.filter((curTS) => curTS != tokenSet);
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
        if (tokenSetIndex !== -1) {
            this._tokenSets[tokenSetIndex] = newTokenSet;
            this._tokenSets[tokenSetIndex].sort(compareFn);
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
        return index === -1 ? undefined : this._tokenSets[index];
    }

    addToken(token: Token, tokenSetName: string) {
        this._tokenSets
            .find((tokenSet) => tokenSet.name == tokenSetName)
            ?.tokens.push(token);
    }

    removeToken(token: Token, tokenSetName: string) {
        const foundTokenSet = this._tokenSets.find(
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
        if (this._tokenSets.some((tk) => tk.name === newName))
            throw new Error(
                `Name collision: TokenSet with ${newName} already exists`,
            );
        this._tokenSets[tokenSetIndex].name = newName;
    }

    /**
     * Accessor for tokensets.
     * @returns tokensets that make up the design system
     */
    getTokenSets(): TokenSet[] {
        return this._tokenSets;
    }

    /**
     * Parses the calling design system instance to a JSON string
     * @returns Json string representation of the current design system
     */
    toJson(): string {
        return JSON.stringify({
            name: this.name,
            tokenSets: this._tokenSets.map((tks) => tks.toJsonString()),
        });
    }

    /**
     * Parses a JSON string to a `DesignSystem`.
     * @param jsonString jsonstring to be parsed
     * @returns a `DesignSystem` instance created from the passed in string, if it is valid.
     * @throws Error if the design system is invalid.
     */
    static fromJson(jsonString: string): DesignSystem | undefined {
        const parsedData = JSON.parse(jsonString, (key, value) => {
            if (key === "tokenSets") {
                const tokenSets: TokenSet[] = [];
                for (const tokenSetStr of value) {
                    const tokenSet = TokenSet.fromJson(tokenSetStr);
                    tokenSet && tokenSets.push(tokenSet);
                }
                return tokenSets;
            }
            return value;
        });
        return new DesignSystem(parsedData?.name, parsedData?.tokenSets || []);
    }
}
