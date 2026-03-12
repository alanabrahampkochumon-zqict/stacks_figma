import { Group } from "@src/common/data/Group";
import { describe, expect, test } from "vitest";

describe("Group Initialization", () => {
    test("creates group, when initialized with name only", () => {
        // When, a group is initialized with name
        const name = "Group";
        const group = new Group(name);

        // Then, a group object is returned with name and default value for expanded
        expect(group.name).toStrictEqual(name);
        expect(group.expanded).toBeFalsy();
    });
    test("creates group, when initialized with name and expanded", () => {
        // When, a group is initialized with name and expanded to true
        const name = "Group";
        const group = new Group(name, true);

        // Then, a group object is returned with name and expanded as true
        expect(group.name).toStrictEqual(name);
        expect(group.expanded).toBeTruthy();
    });
    test("throws error, when initialized with empty string", () => {
        // When, a group is initialized with empty name
        const name = "";

        // Then, it throws an error
        expect(() => new Group(name)).toThrow();
    });
});
