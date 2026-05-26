import {Token} from "@src/common/data/Token";
import {TokenSet} from "@src/common/data/TokenSet";
import {describe, expect, test} from "vitest";
import {ReferenceID} from "@src/common/data/ReferenceID.ts";

const refIDPool = Array(10).fill(0).map(() => ReferenceID.generate())

describe("TokenSet: Sort", () => {
    test("sort by name, if no comparator is provided", () => {
        // Given an unsorted TokenSet
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            new Token(tokenType, "size-100", {default: 10}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 15}, [], refIDPool[2]),
            new Token(tokenType, "size-0", {default: 0}, [], refIDPool[3]),
            new Token(tokenType, "size-50", {default: 5}, [], refIDPool[4]),
        ];

        const sortedTokens = [
            new Token(tokenType, "size-0", {default: 0}, [], refIDPool[3]),
            new Token(tokenType, "size-50", {default: 5}, [], refIDPool[4]),
            new Token(tokenType, "size-100", {default: 10}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 15}, [], refIDPool[2]),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it
        tokenSet.sort();

        // Then, the tokens are sorted by name
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });

    test("sort by comparator, when comparator is provided", () => {
        // Given an unsorted TokenSet
        const name = "TokenSet";
        const tokenType = "number";
        const level = 1;
        const tokens = [
            new Token(tokenType, "size-100", {default: 55}, [], refIDPool[1]),
            new Token(tokenType, "size-150", {default: 35}, [], refIDPool[2]),
            new Token(tokenType, "size-0", {default: 100}, [], refIDPool[3]),
            new Token(tokenType, "size-50", {default: 50}, [], refIDPool[4]),
        ];
        const sortedTokens = [
            new Token(tokenType, "size-150", {default: 35}, [], refIDPool[2]),
            new Token(tokenType, "size-50", {default: 50}, [], refIDPool[4]),
            new Token(tokenType, "size-100", {default: 55}, [], refIDPool[1]),
            new Token(tokenType, "size-0", {default: 100}, [], refIDPool[3]),
        ];
        const tokenSet = new TokenSet(name, tokenType, level, tokens);

        // When sort function is called on it with a comparator
        tokenSet.sort(
            (a, b) =>
                Object.values(a.valueByMode)[0] - Object.values(b.valueByMode)[0]
        );

        // Then, the tokens are sorted by the comparator(here, valueByName)
        expect(tokenSet.tokens).toStrictEqual(sortedTokens);
    });
});
