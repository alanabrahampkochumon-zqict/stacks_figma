import {v4} from "uuid";

/** ID used by the design system to uniquely identify a @see {@link TokenNode}. */
class ReferenceID {

    readonly #prefix: string = "@ref:"
    readonly #uid: string

    private constructor(uid: string) {
        this.#uid = uid
    }

    static generate(): ReferenceID {
        return new ReferenceID(v4())
    };

    static fromUID(uid: string): ReferenceID {
        return new ReferenceID(uid)
    }

    toUID(): string {
        return this.#uid
    }

    toString():string {
        return this.#prefix + this.#uid
    }

    toJSON(): string {
        return this.toString()
    }

    equals(other: ReferenceID): boolean {
        return this.#uid === other.#uid
    }

    valueOf(): string {
        return this.#uid
    }
}

// export type ReferenceID = string & { __brand: "__referenceID" };

export const ReferenceIDPrefix = "reference_";

/**
 * Perform a runtime check to ensure that a given string is a {@link ReferenceID}.
 *
 * @param id The ID to check.
 *
 * @returns True if the id is {@link ReferenceID} else False.
 */
export function isReferenceID(id: any): id is ReferenceID {
    return typeof id === "string" && id.startsWith(ReferenceIDPrefix);
}

/**
 * Generate a {@link ReferenceID} using UUID v4.
 * @remarks Use this method to generate reference ID instead of UUID's v4 as that may break the Design System.
 *
 * @returns A {@link ReferenceID} formed by combining {@link ReferenceIDPrefix} and a generated UUID.
 */
export function generateReferenceID(): ReferenceID {
    return (ReferenceIDPrefix + v4()) as ReferenceID;
}
