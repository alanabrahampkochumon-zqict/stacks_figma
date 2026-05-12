import {expect, test} from "vitest";
import {ReferenceNode} from "@src/common/data/TokenNode.ts";
import {JSON_IDENTIFIERS} from "@src/common/utils/Constants.ts";

describe("ReferenceNode: Instantiation", () => {
    // Common test variables
    const name = "Reference Node"
    const reference = "REF-1234-abcdef"
    const id = "ID-12342-abcdef"

    test("returns ReferenceNode with correct values, when constructed with name and reference", () => {
        const referenceNode = new ReferenceNode(name, reference)

        expect(referenceNode.name).toStrictEqual(name)
        expect(referenceNode.reference).toStrictEqual(reference)
    })

    test("returns ReferenceNode with correct identifier, when instantiated", () => {
        const referenceNode = new ReferenceNode(name, reference)

        expect(referenceNode.__identifier).toStrictEqual(JSON_IDENTIFIERS.REFERENCE_NODE)
    })

    test("returns ReferenceNode with a default ID, when instantiated without an id", () => {
        const referenceNode = new ReferenceNode(name, reference)

        expect(referenceNode.id).toBeDefined()
        expect(referenceNode.id.length).toBeGreaterThan(0)
    })

    test("returns ReferenceNode with passed-in ID, when instantiated with an id", () => {
        const referenceNode = new ReferenceNode(name, reference, id)
        expect(referenceNode.id).toStrictEqual(id)
    })
})