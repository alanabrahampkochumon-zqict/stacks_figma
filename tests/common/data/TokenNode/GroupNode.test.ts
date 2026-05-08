import {describe, expect, test} from "vitest"
import {GroupNode, ValueNode} from "@src/common/data/TokenNode.ts";
import {JSON_IDENTIFIERS} from "@src/common/utils/Constants.ts";

describe("GroupNode: Instantiation", () => {

    const name = "Group"
    const valueNode = new ValueNode("node-1", {"group": "1234"})
    const groupNode = new GroupNode("group-1")
    const children = [valueNode, groupNode]
    const expanded = true
    const id = "ID-ABCDEF-123456789"

    test("returns GroupNode with passed-in name, when instantiated with name only", () => {
        const groupNode = new GroupNode(name)

        expect(groupNode.name).toStrictEqual(name)
    })

    test("returns GroupNode with default values, when instantiated with name only", () => {
        const groupNode = new GroupNode(name)

        expect(groupNode.children).toStrictEqual([])
        expect(groupNode.expanded).toBeFalsy()
        expect(groupNode.id).toBeDefined()
    })

    test("returns GroupNode with passed-in parameters, when instantiated with optional parameters", () => {
        const groupNode = new GroupNode(name, children, expanded, id)

        expect(groupNode.children).toStrictEqual(children)
        expect(groupNode.expanded).toStrictEqual(expanded)
        expect(groupNode.id).toStrictEqual(id)
    })

    test("returns GroupNode with correct identifier, when instantiated", () => {
        const groupNode = new GroupNode(name)

        expect(groupNode.__identifier).toStrictEqual(JSON_IDENTIFIERS.GROUP_NODE)
    })
})