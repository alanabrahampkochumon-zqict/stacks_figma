import { createGroup } from "@src/common/data/Group";
import { describe, expect, test } from "vitest";

describe("Group Initialization", () => {
    test("creates group, when a created with name only", () => {
        // When, a group is created with name
        const name = "Group";
        const group = createGroup(name);

        // Then, a group object is returned with name and default value for expanded
        expect(group.name).toStrictEqual(name);
        expect(group.expanded).toBeFalsy();
    });
    test("creates group, when created with name and expanded", () => {
        // When, a group is created with name and expanded to true
        const name = "Group";
        const group = createGroup(name, true);

        // Then, a group object is returned with name and expanded as true
        expect(group.name).toStrictEqual(name);
        expect(group.expanded).toBeTruthy();
    });
    test("throws error, when created with empty string", () => {
        // When, a group is created with empty name
        const name = "";

        // Then, it throws an error
        expect(() => createGroup(name)).toThrow();
    });
});
