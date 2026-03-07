import { InsertConflictPolicy } from "@src/common/data/Common";
import { describe, expect, test } from "vitest";
import { setUp } from "./TokenSet.fixtures";

describe("TokenSet Merge Tests", () => {
    test("throws error, when tokensets don't have the same name", () => {
        // When two tokenset of different names are merged
        const { originalTokenSet, cleanMergingTokenSet } = setUp();
        cleanMergingTokenSet.name = "bad name";

        // Then, error is thrown
        expect(() =>
            originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
        ).toThrow();
    });

    test("throws error, when tokensets don't have the same type", () => {
        // When two tokenset of different types are merged
        const { originalTokenSet, cleanMergingTokenSet } = setUp();
        cleanMergingTokenSet.type = "color";

        // Then, error is thrown
        expect(() =>
            originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
        ).toThrow();
    });

    test("throws error, when tokensets don't have the same level", () => {
        // When two tokenset of different levels are merged
        const { originalTokenSet, cleanMergingTokenSet } = setUp();
        cleanMergingTokenSet.level = 3;

        // Then, error is thrown
        expect(() =>
            originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
        ).toThrow();
    });

    test("merged without duplicates, when tokensets are of same name, type, and level", () => {
        // When two tokenset are merged
        const {
            originalTokenSet,
            cleanMergingTokenSet,
            cleanMergingResultTokenSet,
        } = setUp();
        originalTokenSet.mergeTokenSet(cleanMergingTokenSet);

        // Then, the token sets contains elements without duplicates
        expect(originalTokenSet).toStrictEqual(cleanMergingResultTokenSet);
    });

    test("merged with conflicting elements replaced, policy set to replace", () => {
        // When two tokenset are merged with insertion policy set to replace
        const {
            originalTokenSet,
            conflictMergingTokenSet,
            conflictMergingReplaceResultTokenSet,
        } = setUp();

        originalTokenSet.mergeTokenSet(conflictMergingTokenSet, {
            insertPolicy: InsertConflictPolicy.REPLACE,
        });

        // Then, the old token set's duplicate elements are replaced with new elements
        expect(originalTokenSet).toStrictEqual(
            conflictMergingReplaceResultTokenSet,
        );
    });

    test("merged with conflicting elements ignored, policy set to ignore", () => {
        // When two tokenset are merged
        const {
            originalTokenSet,
            conflictMergingTokenSet,
            conflictMergingIgnoreResultTokenSet,
        } = setUp();
        originalTokenSet.mergeTokenSet(conflictMergingTokenSet, {
            insertPolicy: InsertConflictPolicy.IGNORE,
        });

        // Then, the old token set's duplicate elements persists
        expect(originalTokenSet).toStrictEqual(
            conflictMergingIgnoreResultTokenSet,
        );
    });

    test("merged with sorting, when sort is turned on", () => {
        // When two tokenset are merged with sorting on
        const { originalTokenSet, cleanMergingTokenSet, sortedResultTokenSet } =
            setUp();
        originalTokenSet.mergeTokenSet(cleanMergingTokenSet, {
            sortToken: true,
        });

        // Then, the token sets contains elements sorted by name
        expect(originalTokenSet).toStrictEqual(sortedResultTokenSet);
    });

    test("merged with sorting by valueByName, a sort function is provided", () => {
        // When two tokenset are merged with sorting on and a function provided
        const {
            originalTokenSet,
            cleanMergingTokenSet,
            valueByNameSortedResultTokenSet,
        } = setUp();
        originalTokenSet.mergeTokenSet(cleanMergingTokenSet, {
            sortToken: true,
            compareFn: (a, b) =>
                Object.values(a.valueByMode)[0] -
                Object.values(b.valueByMode)[0],
        });

        // Then, the token sets contains elements sorted by valueByName.
        expect(originalTokenSet).toStrictEqual(valueByNameSortedResultTokenSet);
    });
});
