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

    test("returns correct name, after tokenset name is updated", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const designSystem = new DesignSystem("ds", [
            new TokenSet("groups", "group", 1, tokenNodes),
        ]);
        const tokenNode = tokenNodes[2];

        // After the name of a token set is updated
        designSystem.updateTokenSetName("groups", "new groups");

        // When searched for a updated token ID
        const tokenName = designSystem.getGroupName(tokenNode.uid);

        // Then, it the new name
        expect(tokenName).toStrictEqual(tokenNode.name);
    });

    test("invalidates cache, after tokenset is added", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const designSystem = new DesignSystem("ds", [
            new TokenSet("groups", "group", 1, tokenNodes),
        ]);
        const tokenNodes2 = Array(5)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));

        // After the name of a token set is updated
        designSystem.addTokenSet(
            new TokenSet("groups new", "group", 2, tokenNodes2),
        );

        // When searched for a token id in the new set
        const tokenName = designSystem.getGroupName(tokenNodes2[2].uid);

        // Then, it returns the correct name
        expect(tokenName).toStrictEqual(tokenNodes2[2].name);
    });

    test("invalidates cache, after tokenset is updated", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const designSystem = new DesignSystem("ds", [
            new TokenSet("groups", "group", 1, tokenNodes),
        ]);
        const tokenNodes2 = Array(5)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));

        // After the tokenset is updated
        designSystem.updateTokenSet(
            "groups",
            new TokenSet("groups new", "group", 2, tokenNodes2),
        );

        // When searched for a token id in the new set
        const tokenName = designSystem.getGroupName(tokenNodes2[2].uid);

        // Then, it returns the correct name
        expect(tokenName).toStrictEqual(tokenNodes2[2].name);

        // And returns undefined for all tokens in the old token set
        tokenNodes.forEach((tokenNode) =>
            expect(designSystem.getGroupName(tokenNode.uid)).toBeUndefined(),
        );
    });

    test("invalidates cache, after token is removed", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const tks = new TokenSet("groups", "group", 1, tokenNodes);
        const designSystem = new DesignSystem("ds", [tks]);

        // After the tokenset is removed
        designSystem.removeTokenSet(tks);

        // Then search for any name in the token set returns undefined
        tokenNodes.forEach((tokenNode) =>
            expect(designSystem.getGroupName(tokenNode.uid)).toBeUndefined(),
        );
    });

    test("clears all cache, when invalidated", () => {
        // Given token nodes
        const tokenNodes = Array(10)
            .fill(0)
            .map(() => generateTokenNode(undefined, "group"));
        const tks = new TokenSet("groups", "group", 1, tokenNodes);
        const tks2 = new TokenSet(
            "groups new",
            "group",
            1,
            Array(5)
                .fill(0)
                .map(() => generateTokenNode(undefined, "group")),
        );
        const designSystem = new DesignSystem("ds", [tks, tks2]);

        // After the tokenset is cleared
        designSystem.clearAll();

        // Then search for any name in the token set returns undefined
        tokenNodes.forEach((tokenNode) =>
            expect(designSystem.getGroupName(tokenNode.uid)).toBeUndefined(),
        );
        tks2.tokens.forEach((token) =>
            expect(designSystem.getGroupName(token.uid)).toBeUndefined(),
        );
    });
});
