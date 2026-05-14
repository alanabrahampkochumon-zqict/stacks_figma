import {describe, expect, test} from "vitest";
import {ValueNode} from "@src/common/data/TokenNode.ts";
import {JSON_IDENTIFIERS} from "@src/common/utils/Constants.ts";
import {ExtendedToken} from "@src/common/data/Token.ts";

describe("ValueNode: Instantiation", () => {

    // Common test variables
    const name = "Value Node"
    const value = "#316316"
    const type = ExtendedToken.color
    const id = "ID-12342-abcdef"

    test("returns ValueNode with correct values, when constructed with name and valueByMode", () => {
        const valueNode = new ValueNode(type, name, value)

        expect(valueNode.name).toStrictEqual(name)
        expect(valueNode.value).toStrictEqual(value)
    })

    test("returns ValueNode with correct identifier, when instantiated", () => {
        const valueNode = new ValueNode(type, name, value)

        expect(valueNode.__identifier).toStrictEqual(JSON_IDENTIFIERS.VALUE_NODE)
    })

    test("returns ValueNode with a default ID, when instantiated without an id", () => {
        const valueNode = new ValueNode(type, name, value)

        expect(valueNode.id).toBeDefined()
        expect(valueNode.id.length).toBeGreaterThan(0)
    })

    test("returns ValueNode with passed-in ID, when instantiated with an id", () => {
        const valueNode = new ValueNode(type, name, value, id)

        expect(valueNode.id).toStrictEqual(id)
    })

})
