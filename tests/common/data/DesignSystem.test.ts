import { expect, test } from "vitest";
// import {
//     InsertConflictPolicy,
//     UpdatePolicy,
// } from "../../../src/common/data/Common";
// import { DesignSystem } from "../../../src/common/data/DesignSystem";
// import { type Token } from "../../../src/common/data/Token";
// import { TokenSet } from "../../../src/common/data/TokenSet";

// describe("Design System Get TokenSet Index", () => {
//     test("returns correct index, when queried for existing token", () => {
//         // Given a design system with non-empty tokensets
//         const expectedIndex = 0;
//         const { dsName, tokenSets } = setUpDesignSystem();
//         const designSystem = new DesignSystem(dsName, tokenSets);

//         // When queried for index of the tokenset
//         const index = designSystem.getIndex(tokenSets[expectedIndex].name);

//         // Then it returns the correct index
//         expect(index).toBe(expectedIndex);
//     });

//     test("returns -1, when queried for non-existing token", () => {
//         // Given a design system with non-empty tokensets
//         const { dsName, tokenSets } = setUpDesignSystem();
//         const designSystem = new DesignSystem(dsName, tokenSets);

//         // When queried for index of the non-existing tokenset
//         const index = designSystem.getIndex("Non-existing TS");

//         // Then it returns -1
//         expect(index).toBe(-1);
//     });
// });

// describe("Design System GetTokenSet", () => {
//     test("returns tokenset, when queried with existing name", () => {
//         // Given a non empty design system
//         const { tokenSets } = setUpDesignSystem();
//         const ds = new DesignSystem("ds", tokenSets);

//         // When queried for a tokenset in the design system
//         const ts = ds.getTokenSet(tokenSets[0].name);

//         // Then, it returns the same token in the design system
//         expect(ts).toBe(ds.getTokenSets()[0]);
//     });

//     test("returns undefined, when queried with non-existing name", () => {
//         // Given a non empty design system
//         const { tokenSets } = setUpDesignSystem();
//         const ds = new DesignSystem("ds", tokenSets);

//         // When queried for a non-existent tokenset
//         const ts = ds.getTokenSet("non-existent name");

//         // Then, it returns undefined
//         expect(ts).toBeUndefined();
//     });

//     test("returns undefined, when queried on empty design system", () => {
//         // Given a  empty design system
//         const ds = new DesignSystem("ds");

//         // When queried for a tokenset
//         const ts = ds.getTokenSet("non-existent name");

//         // Then, it returns undefined
//         expect(ts).toBeUndefined();
//     });

//     test("mutates design system, when tokenset is mutated", () => {
//         // Given a non empty design system
//         const { tokenSets } = setUpDesignSystem();
//         const ds = new DesignSystem("ds", tokenSets);

//         // When queried for a tokenset in the design system
//         let ts = ds.getTokenSet(tokenSets[0].name);
//         // and mutated
//         ts!!.name = "Updated name";

//         // Then, it updates the design system
//         expect(ds.getTokenSets()[0]).toBe(ts);
//     });
// });

// describe("TokenSet Name Update", () => {
//     test("updates name, when given an existing token", () => {
//         // Given a non empty design system
//         const { tokenSets } = setUpDesignSystem();
//         const ds = new DesignSystem("ds", tokenSets);
//         const newName = "updated name";

//         // When the name of the first token is mutated
//         ds.updateTokenSetName(tokenSets[0].name, newName);

//         // Then, the name is updated
//         expect(ds.getTokenSets()[0].name).toStrictEqual(newName);
//     });

//     test("throws error, when given a non-existing token", () => {
//         // Given a non empty design system
//         const { tokenSets } = setUpDesignSystem();
//         const ds = new DesignSystem("ds", tokenSets);
//         const newName = "updated name";

//         // When updating with a non-existant name
//         // Then, it throws an error
//         expect(() => ds.updateTokenSetName("unknown name", newName)).toThrow();

//         // The design system is intact
//         expect(ds.getTokenSets()).toStrictEqual(tokenSets);
//     });

//     test("throws error, when the new name already exists", () => {
//         // Given a non empty design system
//         const { tokenSets } = setUpDesignSystem();
//         const ds = new DesignSystem("ds", tokenSets);

//         // When updating with a colliding name
//         // Then, it throws an error
//         expect(() =>
//             ds.updateTokenSetName(tokenSets[0].name, tokenSets[1].name),
//         ).toThrow();
//     });
// });

// describe("Design System Get TokenSets", () => {
//     test("returns tokenset, if the design system is not empty", () => {
//         // Given a non empty design system
//         const { designSystem, tokenSets } = setUpDesignSystem();

//         // When the token sets are retrieved
//         const ts = designSystem.getTokenSets();

//         // Then, it contains all the tokensets
//         expect(ts).toStrictEqual(tokenSets);
//     });
//     test("returns [], if the design system is empty", () => {
//         // Given an empty design system
//         const ds = new DesignSystem("ds");

//         // When the token sets are retrieved
//         const ts = ds.getTokenSets();

//         // Then, it is an empty []
//         expect(ts).toStrictEqual([]);
//     });
// });

// describe("Design System Serialization", () => {
//     test("returns serialized output, when provided with non-empty design system", () => {
//         // Given, a non-empty design system
//         const { designSystem, serializedDesignSystem } = setUpDesignSystem();

//         // When serialized
//         const serialized = designSystem.toJson();

//         // Then, it matches the serialized string
//         expect(serialized).toStrictEqual(serializedDesignSystem);
//     });

//     test("returns serialized output, when provided with empty design system", () => {
//         // When an empty design system is serialized
//         const emptyDesignSystem = new DesignSystem("Falcon");
//         const serializedDesignSystem = `
//         {
//             "name": "Falcon",
//             "tokenSets": []
//         }
//         `.replace(/\s/g, "");

//         const serialized = emptyDesignSystem.toJson();

//         // Then it output string is correct
//         expect(serialized).toStrictEqual(serializedDesignSystem);
//     });
// });

// describe("Design System Deserialization", () => {
//     test("returns emtpy design system, when name only string is passed in", () => {
//         // When an json string with name is deserialized
//         const jsonString = `
//         {
//             "name": "Falcon"
//         }
//         `.replace(/\s/g, "");
//         const result = DesignSystem.fromJson(jsonString);

//         // Then, it creates an empty design system
//         expect(result).toBeDefined();
//         expect(result?.name).toStrictEqual("Falcon");
//         expect(result?.getTokenSets()).toStrictEqual([]);
//     });

//     test("returns emtpy design system, when name and [] string is passed in", () => {
//         // When an json string with name and empty tokenset is deserialized
//         const jsonString = `
//         {
//             "name": "Falcon",
//             "tokenSets": []
//         }
//         `.replace(/\s/g, "");
//         const result = DesignSystem.fromJson(jsonString);

//         // Then, it creates an empty design system
//         expect(result).toBeDefined();
//         expect(result?.name).toStrictEqual("Falcon");
//         expect(result?.getTokenSets()).toStrictEqual([]);
//     });

//     test("returns correct design system, when value string is passed in", () => {
//         // When an json string with name and empty tokenset is deserialized
//         const { serializedDesignSystem, designSystem } = setUpDesignSystem();
//         const result = DesignSystem.fromJson(serializedDesignSystem);

//         // Then, it creates correct design system
//         expect(result).toBeDefined();
//         expect(result?.name).toStrictEqual(designSystem.name);
//         expect(result?.getTokenSets()).toStrictEqual(
//             designSystem.getTokenSets(),
//         );
//     });

//     test("returns correct design system, when passed in values has extra parameters", () => {
//         // When a json string with additional parameters are passed in
//         const jsonString = `
//         {
//             "name": "Falcon",
//             "tokenSets": [],
//             "add": "props"
//         }
//         `.replace(/\s/g, "");
//         const result = DesignSystem.fromJson(jsonString);

//         // Then, it creates a correct design system
//         expect(result).toBeDefined();
//         expect(result?.name).toStrictEqual("Falcon");
//         expect(result?.getTokenSets()).toStrictEqual([]);
//     });

//     test("throws error, when json string without name is passed in", () => {
//         // When a json string without name is serialized
//         const jsonString = `
//         {
//             "tokenSets": [
//                 { type: tokenType1, value: 0, name: "size-0" },
//                 { type: tokenType1, value: 150, name: "size-150" },
//                 { type: tokenType1, value: 50, name: "size-50" },
//                 { type: tokenType1, value: 100, name: "size-1000" },
//             ]
//         }
//         `;
//         // Then, it throws an error
//         expect(() => DesignSystem.fromJson(jsonString)).toThrow();
//     });
//     test("throws error, when malformed json string is passed in", () => {
//         // Given a json string without an name
//         const jsonString = `
//         {
//             "name": "Falcon",
//             "tokenSets"
//         }
//         `;
//         // Then, it throws an error
//         expect(() => DesignSystem.fromJson(jsonString)).toThrow();
//     });
// });
test("TODO: REMOVE TEST", () => {
    expect(true).toBeTruthy();
});
