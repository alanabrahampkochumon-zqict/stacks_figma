import {
    addToGroup,
    createGroupNode,
    createReferenceNode,
    createValueNode, removeFromGroup, type TokenNode_t,
} from "../../../src/common/data/TokenNode_t";
import {v4} from "uuid";
import {describe, expect, test} from "vitest";

describe("createValueNode", () => {
    const name = "value-node";
    const valueByMode = {default: 24};
    const type = "number";
    const id = v4();

    test("returns ValueNode, when createValueNode is invoked", () => {
        const valueNode = createValueNode(name, valueByMode, type);
        expect(valueNode.entityType).toStrictEqual("token");
        expect(valueNode.name).toStrictEqual(name);
        expect(valueNode.valueByMode).toStrictEqual(valueByMode);
        expect(valueNode.type).toStrictEqual(type);

        expect(valueNode.uid.length).greaterThan(0); // UID is generated
    });

    test("returns ValueNode with passed-in id, when createValueNode is invoked with parameters", () => {
        const valueNode = createValueNode(name, valueByMode, type, id);

        expect(valueNode.uid).toStrictEqual(id);
    });
});

describe("createReferenceNode", () => {
    const name = "ref-node";
    const referenceId = v4();
    const id = v4();

    test("returns ReferenceNode, when createValueNode is invoked", () => {
        const refNode = createReferenceNode(name, referenceId);
        expect(refNode.entityType).toStrictEqual("reference");
        expect(refNode.name).toStrictEqual(name);
        expect(refNode.referenceId).toStrictEqual(referenceId);

        expect(refNode.uid.length).greaterThan(0); // UID is generated
    });

    test("returns ReferenceNode with passed-in id, when createValueNode is invoked with parameters", () => {
        const refNode = createReferenceNode(name, referenceId, id);

        expect(refNode.uid).toStrictEqual(id);
    });
});

describe("createGroupNode", () => {
    const name = "group-node";
    const expanded = false;
    const id = v4();

    test("returns GroupNode, when createValueNode is invoked", () => {
        const groupNode = createGroupNode(name, expanded);
        expect(groupNode.entityType).toStrictEqual("group");
        expect(groupNode.name).toStrictEqual(name);
        expect(groupNode.expanded).toStrictEqual(expanded);

        expect(groupNode.uid.length).greaterThan(0); // UID is generated
    });

    test("returns GroupNode with passed-in id, when createValueNode is invoked with parameters", () => {
        const groupNode = createGroupNode(name, expanded, [], id);

        expect(groupNode.uid).toStrictEqual(id);
    });

    test("returns GroupNode with empty array for default children, when no value is passed-in for children", () => {
        const groupNode = createGroupNode(name, expanded, [], id);

        expect(groupNode.children.length).toStrictEqual(0);
    });

    test("returns GroupNode with children, when no value is passed-in with children", () => {
        const children: TokenNode_t<"color">[] = [
            createGroupNode("child1", false),
            createReferenceNode("child1", "1234"),
            createValueNode("child1", {dark: "#fff"}, "color"),
        ]
        const groupNode = createGroupNode(name, expanded, children, id);


        expect(groupNode.children).toStrictEqual(children);
    });
});

describe("addToGroup", () => {
    const child1 =
        createGroupNode("child1", false)
    const child2 =
        createReferenceNode("child1", "1234")
    const child3 = createValueNode("child1", {dark: "#fff"}, "color")

    test("adds to group, non-duplicate token in an empty group", () => {
        const group = createGroupNode("group1", false)
        // When a child is added to an empty group
        addToGroup(group, child1)

        // Then, it gets added to the group
        expect(group.children).toContain(child1)
    })

    test("adds to group, non-duplicate token in a non-empty group", () => {
        const group = createGroupNode("group1", false, [child1, child2])
        // When a child is added to a non-empty group
        addToGroup(group, child3)

        // Then, it gets added to the group
        expect(group.children).toContain(child3)

    })

    test("does not add to group, a duplicate token", () => {
        const group = createGroupNode("group1", false, [child1, child2, child3])
        // When a duplicate child is added to a non-empty group
        const initialSize = group.children.length
        addToGroup(group, child3)

        // Then, it does not get added
        expect(group.children.length).toStrictEqual(initialSize)
    })
})

describe("removeFromGroup", () => {
    const child1 = createGroupNode<"color">("child1", false)
    const children: TokenNode_t<"color">[] = [
        child1,
        createReferenceNode("child1", "1234"),
        createValueNode("child1", {dark: "#fff"}, "color"),
    ]

    test("removes token from group, given a valid token", () => {
        const groupNode = createGroupNode("group", false, children)
        removeFromGroup(groupNode, child1)

        expect(groupNode.children).not.toContain(child1)
    })

    test("returns token, when a valid token is passed-in", () => {
        const groupNode = createGroupNode("group", false, children)
        const removed = removeFromGroup(groupNode, child1)
        expect(removed).toStrictEqual(child1)
    })

    test("returns null, when a invalid token is passed-in", () => {

        const groupNode = createGroupNode("group", false, children)
        const removed = removeFromGroup(groupNode, createR)
    })
})