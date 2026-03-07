

// describe("TokenSet Find Tests", () => {
//     const tokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//     ];
//     const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

//     test("existing token when queried for index, returns correct index", () => {
//         // Given a token set
//         const expectedIndex = 0;

//         // When an index of existing token is queried
//         const index = tokenSet.getTokenIndex(tokens[expectedIndex].name);

//         // Then, it returns correct index
//         expect(index).toBe(expectedIndex);
//     });

//     test("non-existing token when queried for index, returns -1", () => {
//         // Given a token set

//         // When an index of non-existing token is queried
//         const index = tokenSet.getTokenIndex("random-token");

//         // Then, it returns -1
//         expect(index).toBe(-1);
//     });

//     test("token index when queried on empty token set, returns -1", () => {
//         // Given an empty token set
//         const emptyTokenSet = new TokenSet("empty", "string");

//         // When an index of non-existing token is queried
//         const index = emptyTokenSet.getTokenIndex("random-token");

//         // Then, it returns -1
//         expect(index).toBe(-1);
//     });
// });

// describe("TokenSet Size Tests", () => {
//     const tokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//     ];
//     const tokenSet = new TokenSet("ts", "sizing", 2, tokens);

//     test("return correct size when set is non-empty", () => {
//         // Given a token set

//         // When the length is queried
//         const length = tokenSet.size();

//         // Then, it returns correct length
//         expect(length).toBe(tokens.length);
//     });

//     test("returns 0 when set is empty", () => {
//         // Given an empty token set
//         const emptyTokenSet = new TokenSet("empty", "string");

//         // When the length is queried
//         const length = emptyTokenSet.size();

//         // Then, it returns 0
//         expect(length).toBe(0);
//     });
// });

// function setUp() {
//     const originalTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//     ];

//     const cleanMergingTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 30, name: "size-300" },
//         { type: "sizing", valueByName: 250, name: "size-250" },
//         { type: "sizing", valueByName: 120, name: "size-200" },
//     ];
//     const cleanMergingResultTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//         { type: "sizing", valueByName: 30, name: "size-300" },
//         { type: "sizing", valueByName: 250, name: "size-250" },
//         { type: "sizing", valueByName: 120, name: "size-200" },
//     ];
//     const sortedMergingResultTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//         { type: "sizing", valueByName: 120, name: "size-200" },
//         { type: "sizing", valueByName: 250, name: "size-250" },
//         { type: "sizing", valueByName: 30, name: "size-300" },
//     ];
//     const valueByNameSortedMergingResultTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//         { type: "sizing", valueByName: 30, name: "size-300" },
//         { type: "sizing", valueByName: 120, name: "size-200" },
//         { type: "sizing", valueByName: 250, name: "size-250" },
//     ];
//     const conflictMergingTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 15, name: "size-100" },
//         { type: "sizing", valueByName: 25, name: "size-150" },
//         { type: "sizing", valueByName: 35, name: "size-200" },
//     ];
//     const conflictMergingReplaceResultTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 15, name: "size-100" },
//         { type: "sizing", valueByName: 25, name: "size-150" },
//         { type: "sizing", valueByName: 35, name: "size-200" },
//     ];
//     const conflictMergingIgnoreResultTokens: Token[] = [
//         { type: "sizing", valueByName: 5, name: "size-50" },
//         { type: "sizing", valueByName: 10, name: "size-100" },
//         { type: "sizing", valueByName: 15, name: "size-150" },
//         { type: "sizing", valueByName: 35, name: "size-200" },
//     ];
//     const differentTokens: Token[] = [
//         { type: "spacing", valueByName: 25, name: "spacing-250" },
//         { type: "spacing", valueByName: 35, name: "spacing-350" },
//         { type: "spacing", valueByName: 45, name: "spacing-450" },
//     ];

//     const originalTokenSet = new TokenSet("ts", "sizing", 2, originalTokens);
//     const originalTokenSetString = `
//     {
//         "name": "ts",
//         "type": "sizing",
//         "level": 2,
//         "tokens": [
//             { "type": "sizing", "valueByName": 5, "name": "size-50" },
//             { "type": "sizing", "valueByName": 10, "name": "size-100" },
//             { "type": "sizing", "valueByName": 15, "name": "size-150" }
//         ]
//     }
//     `.replace(/\s/g, "");
//     const emptyTokenSet = new TokenSet("empty", "animation", 4);
//     const emptyTokenSetString = `
//     {
//         "name": "empty",
//         "type": "animation",
//         "level": 4,
//         "tokens": []
//     }
//     `.replace(/\s/g, "");

//     const cleanMergingTokenSet = new TokenSet(
//         "ts",
//         "sizing",
//         2,
//         cleanMergingTokens,
//     );
//     const cleanMergingResultTokenSet = new TokenSet(
//         originalTokenSet.name,
//         originalTokenSet.type,
//         originalTokenSet.level,
//         cleanMergingResultTokens,
//     );
//     const conflictMergingTokenSet = new TokenSet(
//         "ts",
//         "sizing",
//         2,
//         conflictMergingTokens,
//     );
//     const differentTokenSet = new TokenSet(
//         "ts",
//         differentTokens[0].type,
//         1,
//         differentTokens,
//     );
//     const conflictMergingReplaceResultTokenSet = new TokenSet(
//         originalTokenSet.name,
//         originalTokenSet.type,
//         originalTokenSet.level,
//         conflictMergingReplaceResultTokens,
//     );
//     const conflictMergingIgnoreResultTokenSet = new TokenSet(
//         originalTokenSet.name,
//         originalTokenSet.type,
//         originalTokenSet.level,
//         conflictMergingIgnoreResultTokens,
//     );
//     const sortedResultTokenSet = new TokenSet(
//         originalTokenSet.name,
//         originalTokenSet.type,
//         originalTokenSet.level,
//         sortedMergingResultTokens,
//     );
//     const valueByNameSortedResultTokenSet = new TokenSet(
//         originalTokenSet.name,
//         originalTokenSet.type,
//         originalTokenSet.level,
//         valueByNameSortedMergingResultTokens,
//     );

//     return {
//         originalTokenSet,
//         cleanMergingTokenSet,
//         conflictMergingTokenSet,
//         differentTokenSet,
//         cleanMergingResultTokenSet,
//         conflictMergingReplaceResultTokenSet,
//         conflictMergingIgnoreResultTokenSet,
//         sortedResultTokenSet,
//         valueByNameSortedResultTokenSet,
//         originalTokenSetString,
//         emptyTokenSet,
//         emptyTokenSetString,
//     };
// }

// describe("TokenSet Merge Tests", () => {
//     test("throws error when tokensets don't have the same name", () => {
//         // When two tokenset of different names are merged
//         const { originalTokenSet, cleanMergingTokenSet } = setUp();
//         cleanMergingTokenSet.name = "bad name";

//         // Then, error is thrown
//         expect(() =>
//             originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
//         ).toThrow();
//     });

//     test("throws error when tokensets don't have the same type", () => {
//         // When two tokenset of different types are merged
//         const { originalTokenSet, cleanMergingTokenSet } = setUp();
//         cleanMergingTokenSet.type = "color";

//         // Then, error is thrown
//         expect(() =>
//             originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
//         ).toThrow();
//     });

//     test("throws error when tokensets don't have the same level", () => {
//         // When two tokenset of different levels are merged
//         const { originalTokenSet, cleanMergingTokenSet } = setUp();
//         cleanMergingTokenSet.level = 3;

//         // Then, error is thrown
//         expect(() =>
//             originalTokenSet.mergeTokenSet(cleanMergingTokenSet),
//         ).toThrow();
//     });

//     test("merged without duplicates when tokensets are of same name, type, and level", () => {
//         // When two tokenset are merged
//         const {
//             originalTokenSet,
//             cleanMergingTokenSet,
//             cleanMergingResultTokenSet,
//         } = setUp();
//         originalTokenSet.mergeTokenSet(cleanMergingTokenSet);

//         // Then, the token sets contains elements without duplicates
//         expect(originalTokenSet).toStrictEqual(cleanMergingResultTokenSet);
//     });

//     test("merged with conflicting elements replaced, policy set to replace", () => {
//         // When two tokenset are merged with insertion policy set to replace
//         const {
//             originalTokenSet,
//             conflictMergingTokenSet,
//             conflictMergingReplaceResultTokenSet,
//         } = setUp();

//         originalTokenSet.mergeTokenSet(conflictMergingTokenSet, {
//             insertPolicy: InsertConflictPolicy.REPLACE,
//         });

//         // Then, the old token set's duplicate elements are replaced with new elements
//         expect(originalTokenSet).toStrictEqual(
//             conflictMergingReplaceResultTokenSet,
//         );
//     });

//     test("merged with conflicting elements ignored, policy set to ignore", () => {
//         // When two tokenset are merged
//         const {
//             originalTokenSet,
//             conflictMergingTokenSet,
//             conflictMergingIgnoreResultTokenSet,
//         } = setUp();
//         originalTokenSet.mergeTokenSet(conflictMergingTokenSet, {
//             insertPolicy: InsertConflictPolicy.IGNORE,
//         });

//         // Then, the old token set's duplicate elements persists
//         expect(originalTokenSet).toStrictEqual(
//             conflictMergingIgnoreResultTokenSet,
//         );
//     });

//     test("merged with sorting, when sort is turned on", () => {
//         // When two tokenset are merged with sorting on
//         const { originalTokenSet, cleanMergingTokenSet, sortedResultTokenSet } =
//             setUp();
//         originalTokenSet.mergeTokenSet(cleanMergingTokenSet, {
//             sortToken: true,
//         });

//         // Then, the token sets contains elements sorted by name
//         expect(originalTokenSet).toStrictEqual(sortedResultTokenSet);
//     });

//     test("merged with sorting by valueByName, a sort function is provided", () => {
//         // When two tokenset are merged with sorting on and a function provided
//         const {
//             originalTokenSet,
//             cleanMergingTokenSet,
//             valueByNameSortedResultTokenSet,
//         } = setUp();
//         originalTokenSet.mergeTokenSet(cleanMergingTokenSet, {
//             sortToken: true,
//             compareFn: (a, b) => a.valueByName - b.valueByName,
//         });

//         // Then, the token sets contains elements sorted by valueByName.
//         expect(originalTokenSet).toStrictEqual(valueByNameSortedResultTokenSet);
//     });
// });

// describe("TokenSet Serialization Tests", () => {
//     test("returns serialized output, when provided with correct tokenset", () => {
//         // Given a token set
//         const { originalTokenSet, originalTokenSetString } = setUp();

//         // When serialized to JSON
//         const jsonString = originalTokenSet.toJsonString();

//         // Then the serialized string contains all the properties
//         expect(jsonString).toStrictEqual(originalTokenSetString);
//     });

//     test("returns serialized output, when provided with correct tokenset", () => {
//         // Given an empty token set
//         const { emptyTokenSetString, emptyTokenSet } = setUp();

//         // When serialized to JSON
//         const jsonString = emptyTokenSet.toJsonString();

//         // Then the serialized string contains all the properties
//         expect(jsonString).toStrictEqual(emptyTokenSetString);
//     });
// });

// describe("TokenSet Deserialization Tests", () => {
//     test("returns correct tokenset, when json string with name is passed in", () => {
//         // Given a json string with name only
//         const nameOnlyTokenJSON = `
//         {
//             "name": "test"
//         }
//         `;

//         // When converted to token set
//         const ts = TokenSet.fromJson(nameOnlyTokenJSON);

//         // Then a token set is created with the correct valueByNames
//         expect(ts).toBeDefined();
//         expect(ts?.name).toStrictEqual("test");
//         expect(ts?.type).toStrictEqual("number");
//         expect(ts?.level).toStrictEqual(1);
//         expect(ts?.tokens).toStrictEqual([]);
//     });

//     test("returns correct tokenset, when json string with name and type is passed in", () => {
//         // Given a json string with name and type
//         const nameAndTypeTokenJSON = `
//         {
//             "name": "test",
//             "type": "animation"
//         }
//         `;

//         // When converted to token set
//         const ts = TokenSet.fromJson(nameAndTypeTokenJSON);

//         // Then a token set is created with the correct valueByNames
//         expect(ts).toBeDefined();
//         expect(ts?.name).toStrictEqual("test");
//         expect(ts?.type).toStrictEqual("animation");
//         expect(ts?.level).toStrictEqual(1);
//         expect(ts?.tokens).toStrictEqual([]);
//     });

//     test("returns correct tokenset, when json string with additional properties are passed in", () => {
//         // Given a json string with additioanl properties
//         const nameAndTypeTokenJSON = `
//         {
//             "name": "test",
//             "type": "animation",
//             "add": "property"
//         }
//         `;

//         // When converted to token set
//         const ts = TokenSet.fromJson(nameAndTypeTokenJSON);

//         // Then a token set is created with the correct valueByNames
//         expect(ts).toBeDefined();
//         expect(ts?.name).toStrictEqual("test");
//         expect(ts?.type).toStrictEqual("animation");
//         expect(ts?.level).toStrictEqual(1);
//         expect(ts?.tokens).toStrictEqual([]);
//     });

//     test("returns correct tokenset, when json string with name, type, and level is passed in", () => {
//         // Given a json string with name, type and level
//         const { emptyTokenSet, emptyTokenSetString } = setUp();

//         // When converted to token set
//         const ts = TokenSet.fromJson(emptyTokenSetString);

//         // Then a token set is created with the correct valueByNames
//         expect(ts).toBeDefined();
//         expect(ts).toStrictEqual(emptyTokenSet);
//     });

//     test("returns correct tokenset, when json string with name, type, level, and valueByNames is passed in", () => {
//         // Given a json string with name only
//         const { originalTokenSet, originalTokenSetString } = setUp();

//         // When converted to token set
//         const ts = TokenSet.fromJson(originalTokenSetString);

//         // Then a token set is created with the correct valueByNames
//         expect(ts).toBeDefined();
//         expect(ts).toStrictEqual(originalTokenSet);
//     });

//     test("throws error, when json string with no name is passed in", () => {
//         // Given a JSON string with level only
//         const levelOnlyTokenString = `
//         {
//             "level": 2
//         }
//         `;

//         // When converted to token set
//         // Then, it throws and error
//         expect(() => TokenSet.fromJson(levelOnlyTokenString)).toThrow();
//     });

//     test("throws error, when json string with invalid level is passed in", () => {
//         // Given a JSON string with invalid level
//         const invalidLevelTokenString = `
//         {
//             "name": "ts",
//             "level": 5
//         }
//         `;

//         // When converted to token set
//         // Then, it throws and error
//         expect(() => TokenSet.fromJson(invalidLevelTokenString)).toThrow();
//     });

//     test("throws error, when json string with invalid type is passed in", () => {
//         // Given a JSON string with invalid type
//         const invalidTypeTokenString = `
//         {
//             "name": "ts",
//             "type": "testing..."
//         }
//         `;

//         // When converted to token set
//         // Then, it throws and error
//         expect(() => TokenSet.fromJson(invalidTypeTokenString)).toThrow();
//     });

//     test("throws error, when malformed json string is passed in", () => {
//         // Given a JSON string with invalid type
//         const malformedTokenSetString = `
//         {
//             "abc": 1234
//         }
//         `;

//         // When converted to token set
//         // Then, it throws and error
//         expect(() => TokenSet.fromJson(malformedTokenSetString)).toThrow();
//     });
// });
