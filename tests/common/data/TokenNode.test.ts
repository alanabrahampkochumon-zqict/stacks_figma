import {
    createGroupNode,
    createReferenceNode,
    createValueNode,
} from "@src/common/data/TokenNode";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";

describe("createValueNode", () => {
    const name = "value-node";
    const valueByMode = { default: 24 };
    const type = "number";
    const id = v4();

    test("returns valueNode, when createValueNode is invoked", () => {
        const valueNode = createValueNode(name, valueByMode, type);
        expect(valueNode.entityType).toStrictEqual("token");
        expect(valueNode.name).toStrictEqual(name);
        expect(valueNode.valueByMode).toStrictEqual(valueByMode);
        expect(valueNode.type).toStrictEqual(type);

        expect(valueNode.uid.length).greaterThan(0); // UID is generated
    });

    test("returns valueNode with passed-in id, when createValueNode is invoked with parameters", () => {
        const valueNode = createValueNode(name, valueByMode, type, id);

        expect(valueNode.uid).toStrictEqual(id);
    });
});

describe("createReferenceNode", () => {
    const name = "ref-node";
    const referenceId = v4();
    const id = v4();

    test("returns valueNode, when createValueNode is invoked", () => {
        const refNode = createReferenceNode(name, referenceId);
        expect(refNode.entityType).toStrictEqual("reference");
        expect(refNode.name).toStrictEqual(name);
        expect(refNode.referenceId).toStrictEqual(referenceId);

        expect(refNode.uid.length).greaterThan(0); // UID is generated
    });

    test("returns valueNode with passed-in id, when createValueNode is invoked with parameters", () => {
        const refNode = createReferenceNode(name, referenceId, id);

        expect(refNode.uid).toStrictEqual(id);
    });
});

describe("createGroupNode", () => {
    const name = "group-node";
    const expanded = false;
    const id = v4();

    test("returns valueNode, when createValueNode is invoked", () => {
        const groupNode = createGroupNode(name, expanded);
        expect(groupNode.entityType).toStrictEqual("group");
        expect(groupNode.name).toStrictEqual(name);
        expect(groupNode.expanded).toStrictEqual(expanded);

        expect(groupNode.uid.length).greaterThan(0); // UID is generated
    });

    test("returns valueNode with passed-in id, when createValueNode is invoked with parameters", () => {
        const groupNode = createGroupNode(name, expanded, id);

        expect(groupNode.uid).toStrictEqual(id);
    });
});
