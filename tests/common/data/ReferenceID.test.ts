import {v4} from "uuid"
import {
    ReferenceID,
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

describe("ReferenceID: generate", () => {
    test("returns a ReferenceID instance", () => {
        expect(ReferenceID.generate()).toBeInstanceOf(ReferenceID)
    });

    test("returns a non-empty id", () => {
        expect(ReferenceID.generate().toString()).toBeDefined()
        expect(ReferenceID.generate().toString().length).toBeGreaterThan(0)
    })
});


describe("ReferenceID: fromUUID/toUUID", () => {
    test("returns a ReferenceID with the passed in UUID", () => {
        const uuid = v4()
        const refId = ReferenceID.fromUUID(uuid)
        expect(refId.toUUID()).toStrictEqual(uuid)
    })
})

describe("ReferenceID: toJSON", () => {
    test("returns a valid JSON string", () => {
        const uuid = v4()
        const refId = ReferenceID.fromUUID(uuid)
        const json = refId.toJSON()

        expect(JSON.parse(json).uid).toStrictEqual(uuid)
    })
})