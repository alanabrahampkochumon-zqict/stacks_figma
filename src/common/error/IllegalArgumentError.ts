/**
 * Class representation of Illegal Argument.
 *
 * @export
 * @class IllegalArgumentError
 * @typedef {IllegalArgumentError}
 * @extends {Error}
 */
export class IllegalArgumentError extends Error {
    constructor(message: string | undefined = undefined) {
        super(message);
    }
}
