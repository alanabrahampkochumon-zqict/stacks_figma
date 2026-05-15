import {v4} from "uuid"
import {
    generateReferenceID,
    isReferenceID, ReferenceID,
    ReferenceIDPrefix,
} from "@src/common/data/ReferenceID";
import {describe, expect, test} from "vitest";

describe("ReferenceID: validate", () => {
    test("Validates a generate ID", () => {
        const refId = ReferenceID.generate()

        expect(ReferenceID.validate(refId.toString())).toBeTruthy();
    });

    test("Does not validate a UUID", () => {
        const refId = v4()
        expect(ReferenceID.validate(refId)).toBeFalsy();
    })

    test("Does not validate a random string", () => {
        const refId = "some random string"
        expect(ReferenceID.validate(refId)).toBeFalsy();
    })
});

describe("ReferenceIDValidator", () => {
    test("Validates RefID with prefix as true", () => {
        const refID = ReferenceIDPrefix + "123845925914-1239482134";

        expect(isReferenceID(refID)).toBeTruthy();
    });

    test("Validates RefID without prefix as false", () => {
        const refID = "123845925914-1239482134";

        expect(isReferenceID(refID)).toBeFalsy();
    });
});
