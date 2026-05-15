import {v4, validate as isValidUUID } from "uuid";

/** ID used by the design system to uniquely identify a {@link Token}. */
class ReferenceID {

    static readonly #prefix: string = "@ref:"
    readonly #uid: string

    /**
     * Constructs a ReferenceID from a UID.
     *
     * @param uid The unique identifier to use for instantiating a ReferenceID.
     *
     * @private
     */
    private constructor(uid: string) {
        this.#uid = uid
    }

    /**
     * Generate a random {@link ReferenceID}
     *
     * @returns A randomly generated ReferenceID.
     */
    static generate(): ReferenceID {
        return new ReferenceID(v4())
    };

    /**
     * Construct a {@link ReferenceID} from UID string.
     *
     * @param uid The uid to use for ReferenceID instantiation.
     */
    static fromUID(uid: string): ReferenceID {
        return new ReferenceID(uid)
    }

    /**
     * Validates whether a given string is a {@link ReferenceID}
     * @param uid The string to validate.
     *
     * @returns True if the given string is valid {}
     */
    validate(uid: string): boolean {
        const extractedUUID = uid.substring(ReferenceID.#prefix.length - 1)
        return isValidUUID(extractedUUID)
    }


    /**
     * Returns the underlying unique identifier of the reference ID.
     */
    toUID(): string {
        return this.#uid
    }

    /**
     * Overrides the default toString method to ensure logs reflect a ReferenceID.
     */
    toString():string {
        return ReferenceID.#prefix + this.#uid
    }

    /**
     * Generate a JSON string representation of {@link ReferenceID}.
     */
    toJSON(): string {
        return this.toString()
    }

    /**
     * Compares if two {@link ReferenceID} are equal.
     * @remarks
     * Use this method when comparing {@link ReferenceID} for equality,
     * both loose (==) and strict equality(===) will **not work** for equality checks.
     *
     * @param other The other ID to compare.
     */
    equals(other: ReferenceID): boolean {
        return this.#uid === other.#uid
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
