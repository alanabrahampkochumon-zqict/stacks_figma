import {describe, expect, test} from "vitest";
import {ValueNode} from "@src/common/data/TokenNode.ts";
import {JSON_IDENTIFIERS} from "@src/common/utils/Constants.ts";

describe("ValueNode: Instantiation", () => {

    // Common test variables
    const name = "Value Node"
    const valueByMode: Record<string, string> = {"dark": '#316316'}
    const id = "ID-12342-abcdef"

    test("returns ValueNode with correct values, when constructed with name and valueByMode", () => {
        const valueNode = new ValueNode(name, valueByMode)

        expect(valueNode.name).toStrictEqual(name)
        expect(valueNode.valueByMode).toStrictEqual(valueByMode)
    })

    test("returns ValueNode with correct identifier, when instantiated", () => {
        const valueNode = new ValueNode(name, valueByMode)

        expect(valueNode.__identifier).toStrictEqual(JSON_IDENTIFIERS.VALUE_NODE)
    })

    test("returns ValueNode with a default ID, when instantiated without an id", () => {
        const valueNode = new ValueNode(name, valueByMode)

        expect(valueNode.id).toBeDefined()
        expect(valueNode.id.length).toBeGreaterThan(0)
    })

    test("returns ValueNode with passed-in ID, when instantiated with an id", () => {
        const valueNode = new ValueNode(name, valueByMode, id)

        expect(valueNode.id).toStrictEqual(id)
    })

})
