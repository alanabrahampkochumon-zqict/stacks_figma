/**
 * Represents a Duplication Error.
 * @extends {Error}
 */
export class DuplicationError extends Error {
    constructor(message: string | undefined = undefined) {
        super(message);
    }
}
