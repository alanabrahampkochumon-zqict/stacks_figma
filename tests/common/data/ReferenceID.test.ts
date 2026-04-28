import {
    generateReferenceID,
    isReferenceID,
    ReferenceIDPrefix,
} from "@src/common/data/ReferenceID";
import { describe, expect, test } from "vitest";

describe("ReferenceIDGenerator", () => {
    test("Generates a UID with correct prefix", () => {
        const refID = generateReferenceID();

        expect(refID.startsWith(ReferenceIDPrefix)).toBeTruthy();
    });
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
