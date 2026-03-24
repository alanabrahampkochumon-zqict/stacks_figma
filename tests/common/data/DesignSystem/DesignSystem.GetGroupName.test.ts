import { DesignSystem } from "@src/common/data/DesignSystem";
import { TokenSet } from "@src/common/data/TokenSet";
import { v4 } from "uuid";
import { describe, expect, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Design System: Get Group Name", () => {
    test("returns group name, when passed in with valid id", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const designSystem = new DesignSystem("ds", [
            new TokenSet("groups", "group", 1, tokenNodes),
        ]);
        const searchID = tokenNodes[0].uid;

        // When searched for a group name using id
        const tokenName = designSystem.getGroupName(searchID);

        // Then, it matches the group name
        expect(tokenName).toStrictEqual(tokenNodes[0].name);
    });

    test("returns undefined, when passed-in with invalid id", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const designSystem = new DesignSystem("ds", [
            new TokenSet("groups", "group", 1, tokenNodes),
        ]);
        const searchID = v4();

        // When searched for a group name using with non-existant ID
        const tokenName = designSystem.getGroupName(searchID);

        // Then, it returns undefined
        expect(tokenName).toBeUndefined();
    });

    test("invalidates cache, after name is updated", () => {
        // TODO:
    });
});
