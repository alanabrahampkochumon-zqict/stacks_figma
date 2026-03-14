import { createGroup } from "@src/common/data/Group";
import { describe, expect, test } from "vitest";

describe("Group Initialization", () => {
    test("creates group, without any parameter", () => {
        // When, a group is created without parameters
        const group = createGroup();

        // Then, a group object is returned with expanded as false and an entityType of group
        expect(group.expanded).toBeFalsy();
        expect(group.entityType).toStrictEqual("group");
    });

    test.each([true, false])(
        "creates group, with expanded as %s",
        (expanded: boolean) => {
            // When, a group is created expanded value
            const group = createGroup(expanded);

            // Then, a group object with correct expanded value is returned
            expect(group.expanded).toBe(expanded);
            expect(group.entityType).toStrictEqual("group");
        },
    );
});
