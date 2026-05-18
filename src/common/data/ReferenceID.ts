import {v4, validate as isValidUUID} from "uuid";
import {IllegalArgumentError} from "@src/common/error/IllegalArgumentError.ts";

/** ID used by the design system to uniquely identify a {@link Token}. */
export class ReferenceID {

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
    static fromUUID(uid: string): ReferenceID {
        return new ReferenceID(uid)
    }

    /**
     * Validates whether a given string is a {@link ReferenceID}
     * @param uid The string to validate.
     *
     * @returns True if the given string is valid {}
     */
    static validate(uid: string): boolean {
        const extractedUUID = uid.substring(ReferenceID.#prefix.length)
        return isValidUUID(extractedUUID)
    }


    /**
     * Returns the underlying unique identifier of the reference ID.
     */
    toUUID(): string {
        return this.#uid
    }

    /**
     * Return a string representation of {@link ReferenceID}.
     */
    toString(): string {
        return ReferenceID.#prefix + this.#uid
    }

    /**
     * Generate a JSON string representation of {@link ReferenceID}.
     */
    toJSON(): string {
        return JSON.stringify({
            prefix: ReferenceID.#prefix,
            uid: this.#uid
        })
    }

    /**
     * Creates a {@link ReferenceID} from a JSON object.
     *
     * @param data The parsed JSON data.
     *
     * @returns The {@link ReferenceID} instance.
     *
     * @throws {@link IllegalArugmentError} if the passed-in data is not a valid {@link ReferenceID}.
     */
    static fromJSON(data: any): ReferenceID {
        if(typeof data === "object" && Object.keys(data).includes("uid"))
            return ReferenceID.fromUUID(data.uid)
        throw new IllegalArgumentError("The object cannot be parsed to a ReferenceID")
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
