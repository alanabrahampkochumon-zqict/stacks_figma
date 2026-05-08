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

describe("GroupNode: addChild", () => {

    const child1 = new ValueNode("value", {"dark": "#316316"})
    const child2 = new GroupNode("group")

    const groupNode= new GroupNode("parent")

    test("adds child, when a ValueNode instance is passed-in", () => {
        groupNode.addChild(child1)

        expect(groupNode.children).toContain(child1)
    })

    test("adds child, when a GroupNode instance is passed-in", () => {
        groupNode.addChild(child2)

        expect(groupNode.children).toContain(child2)
    })

    // TODO: add test for ReferenceNode
})


describe("GroupNode: removeChild", () => {

    const child1 = new ValueNode("value", {"dark": "#316316"})
    const child2 = new GroupNode("group")


    test("removes child, when an existing node is passed-in", () => {
        const groupNode= new GroupNode("parent", [child1, child1])
        groupNode.removeChild(child1)

        expect(groupNode.children).not.toContain(child1)
    })

    test("returns removed child, when an existing node is passed-in", () => {
        const groupNode= new GroupNode("parent", [child1, child1])
        const removed = groupNode.removeChild(child2)

        expect(removed).toStrictEqual(child2)
    })

    test("doesn't modify children, when a non-existing node is passed-in", () => {
        const node = new GroupNode("DNE")
        const groupNode= new GroupNode("parent", [child1, child1])
        groupNode.removeChild(node)

        expect(groupNode.children).toContain(child1)
        expect(groupNode.children).toContain(child2)
    })

    test("returns null, when a non-existing node is passed-in", () => {
        const node = new GroupNode("DNE")
        const groupNode= new GroupNode("parent", [child1, child1])
        const removed = groupNode.removeChild(node)

        expect(removed).toBeNull()
    })
    // TODO: add test for ReferenceNode
})