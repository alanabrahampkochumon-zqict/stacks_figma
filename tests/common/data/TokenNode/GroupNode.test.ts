import {describe, expect, test} from "vitest"
import {GroupNode, ReferenceNode, ValueNode} from "@src/common/data/TokenNode.ts";
import {JSON_IDENTIFIERS} from "@src/common/utils/Constants.ts";
import {ExtendedToken} from "@src/common/data/Token.ts";

describe("GroupNode: Instantiation", () => {

    const name = "Group"
    const childNode1 = new ValueNode(ExtendedToken.number, "node-1", 1234)
    const childNode2 = new GroupNode("group-1")
    const children = [childNode1, childNode2]
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


    test("returns GroupNode without duplicates, when instantiated with duplicate children", () => {
        const groupNode = new GroupNode(name, [...children, childNode1])
        expect(groupNode.children.length).toStrictEqual(2)
        expect(groupNode.children).toContain(childNode1)
        expect(groupNode.children).toContain(childNode2)
    })
})

describe("GroupNode: addChild", () => {

    const child1 = new ValueNode(ExtendedToken.color, "value", "#316316")
    const child2 = new GroupNode("group")
    const child3 = new ReferenceNode("reference", "1234")

    const groupNode = new GroupNode("parent")

    test("adds child, when a ValueNode instance is passed-in", () => {
        groupNode.addChild(child1)

        expect(groupNode.children).toContain(child1)
    })

    test("adds child, when a GroupNode instance is passed-in", () => {
        groupNode.addChild(child2)
        expect(groupNode.children).toContain(child2)
    })


    test("do not add child , when a child already exists in memory", () => {
        // Duplicate entries are added only once
        const initialSize = groupNode.children.length
        groupNode.addChild(child3)
        groupNode.addChild(child3)
        expect(groupNode.children.length).toStrictEqual(initialSize + 1)
        expect(groupNode.children).toContain(child2)
    })
})


describe("GroupNode: removeChild", () => {

    const child1 = new ValueNode(ExtendedToken.color, "value", "#316316")
    const child2 = new GroupNode("group")
    const child3 = new ReferenceNode("reference", "1234")


    test("removes child, when an existing node is passed-in", () => {
        const groupNode = new GroupNode("parent", [child1, child2, child3])
        groupNode.removeChild(child1)

        expect(groupNode.children).not.toContain(child1)
    })

    test("returns removed child, when an existing node is passed-in", () => {
        const groupNode = new GroupNode("parent", [child1, child2, child3])
        const removed = groupNode.removeChild(child2)

        expect(removed).toStrictEqual(child2)
    })

    test("doesn't modify children, when a non-existing node is passed-in", () => {
        const node = new GroupNode("DNE")
        const groupNode = new GroupNode("parent", [child1, child2, child3])
        groupNode.removeChild(node)

        expect(groupNode.children).toContain(child1)
        expect(groupNode.children).toContain(child2)
    })

    test("returns null, when a non-existing node is passed-in", () => {
        const node = new GroupNode("DNE")
        const groupNode = new GroupNode("parent", [child1, child2, child3])
        const removed = groupNode.removeChild(node)

        expect(removed).toBeNull()
    })

    test("clears cache, when a child is removed", () => {
        // Given a group node with 2 children
        const groupNode = new GroupNode("parent", [child1, child2, child3])

        // When one child is removed
        groupNode.removeChild(child1)
        // Initial assertion: Child is removed
        expect(groupNode.children).not.toContain(child1)

        // And the same node is added
        groupNode.addChild(child1)
        // Then, the child is re-added
        expect(groupNode.children).toContain(child1)
    })
})

describe("GroupNode: toJson", () => {
    const child1 = new ValueNode(ExtendedToken.color, "value", "#316316")
    const child2 = new GroupNode("group")
    const child3 = new ReferenceNode("reference", "1234")
    const groupNode = new GroupNode("parent", [child1, child2, child3])

    test("returns a JSON string, when converted to JSON", () => {
        const jsonString = groupNode.toJson()
        const parsedObject = JSON.parse(jsonString)

        expect(parsedObject.name).toStrictEqual("parent")
        expect(parsedObject.id).toStrictEqual(groupNode.id)
        expect(parsedObject.__identifier).toStrictEqual(groupNode.__identifier)
        // Since JSON parse only returns a plain object instead of class instance,
        // we need to make sure that groupNode.children are the Object literals.
        expect(parsedObject.children).toStrictEqual(JSON.parse(JSON.stringify(groupNode.children)))
    })
})