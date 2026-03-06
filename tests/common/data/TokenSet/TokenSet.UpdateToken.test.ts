// import type { Token } from "@src/common/data/Token";
// import { TokenSet } from "@src/common/data/TokenSet";
// import { describe, expect, test } from "vitest";

// describe("TokenSet Update Tests", () => {
//     test("token gets added to a token set if the token set is empty and policy is set to insert", () => {
//         // Given a empty token set
//         const name = "TokenSet";
//         const type = "number";
//         const level = 1;
//         const tokens: Token[] = [];
//         const tokenSet = new TokenSet(name, type, level, tokens);

//         // When a token is updated with policy set to insert
//         const validToken: Token = { name: "50", valueByName: 10, type: type };
//         tokenSet.updateToken(validToken.name, validToken, {
//             updatePolicy: UpdatePolicy.INSERT,
//         });

//         // Then, the token is added to the set
//         expect(tokenSet.tokens.at(0)).toBe(validToken);
//     });

//     test("token doesn't get added to a token set if the token set is empty and policy is set to ignore", () => {
//         // Given a empty token set
//         const name = "TokenSet";
//         const type = "number";
//         const level = 1;
//         const tokens: Token[] = [];
//         const tokenSet = new TokenSet(name, type, level, tokens);

//         // When a token is updated with policy set to ignore
//         const validToken: Token = { name: "50", valueByName: 10, type: type };
//         tokenSet.updateToken(validToken.name, validToken, {
//             updatePolicy: UpdatePolicy.IGNORE,
//         });

//         // Then, the token is not added
//         expect(tokenSet.tokens).toStrictEqual([]);
//     });

//     test("token gets added to a token set if the token set is non-empty and policy is set to insert", () => {
//         // Given a non-empty token set
//         const name = "TokenSet";
//         const type = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { name: "25", valueByName: 5, type: type },
//             { name: "75", valueByName: 15, type: type },
//         ];
//         const expectedTokens: Token[] = [
//             { name: "25", valueByName: 5, type: type },
//             { name: "75", valueByName: 15, type: type },
//             { name: "50", valueByName: 10, type: type },
//         ];
//         const tokenSet = new TokenSet(name, type, level, tokens);

//         // When a token is updated with policy set to insert
//         const validToken: Token = { name: "50", valueByName: 10, type: type };
//         tokenSet.updateToken(validToken.name, validToken, {
//             updatePolicy: UpdatePolicy.INSERT,
//         });

//         // Then, the token is added to the set
//         expect(tokenSet.tokens).toStrictEqual(expectedTokens);
//     });

//     test("token doesn't get added to a token set if the token set is non-empty and policy is set to ignore", () => {
//         // Given a non-empty token set
//         const name = "TokenSet";
//         const type = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { name: "25", valueByName: 5, type: type },
//             { name: "75", valueByName: 15, type: type },
//         ];
//         const expectedTokens: Token[] = [
//             { name: "25", valueByName: 5, type: type },
//             { name: "75", valueByName: 15, type: type },
//         ];
//         const tokenSet = new TokenSet(name, type, level, tokens);

//         // When a token is updated with policy set to ignore
//         const validToken: Token = { name: "50", valueByName: 10, type: type };
//         tokenSet.updateToken(validToken.name, validToken, {
//             updatePolicy: UpdatePolicy.IGNORE,
//         });

//         // Then, the token is not added to the set
//         expect(tokenSet.tokens).toStrictEqual(expectedTokens);
//     });

//     test("valid with different type when updated to empty set throws error", () => {
//         // Given a empty token set
//         const name = "TokenSet";
//         const type = "number";
//         const level = 1;
//         const tokens: Token[] = [];
//         const tokenSet = new TokenSet(name, type, level, tokens);

//         // When a token is updated(upserted)
//         const differentToken: Token = {
//             name: "50",
//             valueByName: 10,
//             type: "spacing",
//         };
//         // Then, an error is thrown
//         expect(() =>
//             tokenSet.updateToken(differentToken.name, differentToken),
//         ).toThrow();
//     });

//     test("valid with different type when updated to non-empty set throws error", () => {
//         // Given a empty token set
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//             { type: tokenType, valueByName: 0, name: "size-0" },
//         ];
//         const tokenSet = new TokenSet(name, tokenType, level, tokens);

//         // When a token is updated(upserted)
//         const differentToken: Token = {
//             name: "50",
//             valueByName: 10,
//             type: "spacing",
//         };
//         // Then, an error is thrown
//         expect(() =>
//             tokenSet.updateToken(differentToken.name, differentToken),
//         ).toThrow();
//     });

//     test("non-existant valid token gets added when updated", () => {
//         // Given a empty token set
//         const name = "TokenSet";
//         const type = "number";
//         const level = 1;
//         const tokens: Token[] = [];
//         const tokenSet = new TokenSet(name, type, level, tokens);

//         // When a token is added
//         const invalidToken: Token = {
//             name: "50",
//             valueByName: 10,
//             type: "string",
//         };
//         // Then, an error is thrown
//         expect(() => tokenSet.addToken(invalidToken)).toThrow();
//     });

//     test("invalid token update throws error", () => {
//         // Given a non-empty token set
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-50" },
//             { type: tokenType, valueByName: 0, name: "size-0" },
//         ];

//         const tokenSet = new TokenSet(name, tokenType, level, tokens);

//         // When a token is updated(upserted) with invalid valueByNames
//         const updatedToken: Token = {
//             name: "size-65",
//             valueByName: "test",
//             type: tokenType,
//         };
//         // Then, an error is thrown
//         expect(() => tokenSet.updateToken("size-50", updatedToken)).toThrow();
//     });

//     test("token upserted and sorted when sort is turned on", () => {
//         // Given a non-empty token set
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const initialToken: Token[] = [
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//             { type: tokenType, valueByName: 0, name: "size-0" },
//         ];
//         const sortedTokens: Token[] = [
//             { type: tokenType, valueByName: 0, name: "size-0" },
//             { type: tokenType, valueByName: 5, name: "size-50" },
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//         ];
//         const token: Token = {
//             type: tokenType,
//             valueByName: 5,
//             name: "size-50",
//         };
//         const tokenSet = new TokenSet(name, tokenType, level, initialToken);

//         // When a token is updated(upserted) and sorted
//         tokenSet.updateToken(token.name, token, { sortToken: true });
//         // Then, the token is in sorted order
//         expect(tokenSet.tokens).toStrictEqual(sortedTokens);
//     });

//     test("token upserted and sorted when sort is turned on based on comparator", () => {
//         // Given a non-empty token set
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const initialToken: Token[] = [
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 150, name: "size-150" },
//             { type: tokenType, valueByName: 20, name: "size-0" },
//         ];
//         const sortedTokens: Token[] = [
//             { type: tokenType, valueByName: 5, name: "size-50" },
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 20, name: "size-0" },
//             { type: tokenType, valueByName: 150, name: "size-150" },
//         ];
//         const token: Token = {
//             type: tokenType,
//             valueByName: 5,
//             name: "size-50",
//         };
//         const tokenSet = new TokenSet(name, tokenType, level, initialToken);

//         // When a token is updated(upserted) and sorted with comparator
//         tokenSet.updateToken(token.name, token, {
//             sortToken: true,
//             compareFn: (a, b) => a.valueByName - b.valueByName,
//         });
//         // Then, the token is in sorted order
//         expect(tokenSet.tokens).toStrictEqual(sortedTokens);
//     });

//     test("token upserted into an empty token set and sorted when sort is turned on", () => {
//         // Given a empty token set
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const initialToken: Token[] = [];
//         const token1: Token = {
//             type: tokenType,
//             valueByName: 5,
//             name: "size-50",
//         };
//         const token2: Token = {
//             type: tokenType,
//             valueByName: 0,
//             name: "size-0",
//         };
//         const tokenSet = new TokenSet(name, tokenType, level, initialToken);
//         const sortedTokens: Token[] = [
//             { type: tokenType, valueByName: 0, name: "size-0" },
//             { type: tokenType, valueByName: 5, name: "size-50" },
//         ];

//         // When a token is updated(upserted) and sorted
//         tokenSet.updateToken(token1.name, token1, { sortToken: true });
//         tokenSet.updateToken(token2.name, token2, { sortToken: true });

//         // Then, the token is in sorted order
//         expect(tokenSet.tokens).toStrictEqual(sortedTokens);
//     });

//     test("token added and sorted when sort is turned on and comparator is provided", () => {
//         // Given a non-empty token set
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const initialToken: Token[] = [
//             { type: tokenType, valueByName: 100, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//             { type: tokenType, valueByName: 50, name: "size-0" },
//         ];
//         const sortedTokens: Token[] = [
//             { type: tokenType, valueByName: 0, name: "size-50" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//             { type: tokenType, valueByName: 50, name: "size-0" },
//             { type: tokenType, valueByName: 100, name: "size-100" },
//         ];
//         const token: Token = {
//             type: tokenType,
//             valueByName: 0,
//             name: "size-50",
//         };
//         const tokenSet = new TokenSet(name, tokenType, level, initialToken);

//         // When a token is added with sorting on
//         tokenSet.addToken(token, {
//             sortToken: true,
//             compareFn: (a, b) => a.valueByName - b.valueByName,
//         });
//         // Then, the token is in sorted order
//         expect(tokenSet.tokens).toStrictEqual(sortedTokens);
//     });
// });

// describe("TokenSet Remove Tests", () => {
//     test("removes a token that is present", () => {
//         // Given a tokenset initialized tokens
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { type: tokenType, valueByName: 5, name: "size-50" },
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//         ];
//         const tokenSet = new TokenSet(name, tokenType, level, tokens);

//         // When a token in the set is removed
//         tokenSet.removeToken(tokens[0]);

//         // Then, the object does not contain the removed token, but has the rest of the tokens
//         expect(tokenSet.tokens).not.toContain(tokens[0]);
//         expect(tokenSet.tokens).toHaveLength(2);
//         expect(tokenSet.tokens).toContain(tokens[1]);
//         expect(tokenSet.tokens).toContain(tokens[2]);
//     });

//     test("doesnot removes a non-existant token", () => {
//         // Given a tokenset initialized tokens
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { type: tokenType, valueByName: 5, name: "size-50" },
//             { type: tokenType, valueByName: 10, name: "size-100" },
//             { type: tokenType, valueByName: 15, name: "size-150" },
//         ];
//         const tokenSet = new TokenSet(name, tokenType, level, tokens);

//         // When a token in the set is removed
//         tokenSet.removeToken({
//             type: tokenType,
//             valueByName: 4,
//             name: "size-25",
//         });

//         // Then, the object does not contain the removed token, but has the rest of the tokens
//         expect(tokenSet.tokens).toHaveLength(3);
//         expect(tokenSet.tokens).toContain(tokens[0]);
//         expect(tokenSet.tokens).toContain(tokens[1]);
//         expect(tokenSet.tokens).toContain(tokens[2]);
//     });
// });
