import { createGroup } from "@src/common/data/Group";
import { createTokenNode } from "@src/common/data/TokenNode";
import { TokenSet } from "@src/common/data/TokenSet";
import { describe, expect, test } from "vitest";
import { setUpDesignSystem } from "./DesignSystem.fixtures";

describe("Design System Cloning", () => {
    test("returns new design system, when cloned", () => {
        // Given a  design system
        const { dsName, tokenSets, designSystem } = setUpDesignSystem();

        // When cloned
        const newDS = designSystem.clone();
        // And the new design system modified
        newDS.name = "Jetlag";
        const newTokenSet = new TokenSet("groups", "group", 2, [
            createTokenNode("group-1", createGroup()),
        ]);
        newDS.addTokenSet(newTokenSet);

        // Then, the old design system is untouched
        expect(designSystem.name).toStrictEqual(dsName);
        expect(designSystem.getTokenSets()).toStrictEqual(tokenSets);
        console.log(newDS);
        // And, new one is updated.
        expect(newDS.name).toStrictEqual("Jetlag");
        expect(newDS.getTokenSet("groups")).toBeDefined();
        expect(newDS.getTokenSet("groups")).toStrictEqual(newTokenSet);
    });
});
