/**
 * An error indicating there was a token mismatch or a token with the identifier cannot be found.
 * @extends {Error}
 */
export class TokenMismatchError extends Error {
    constructor(message: string | undefined = undefined) {
        super(message);
    }
}
