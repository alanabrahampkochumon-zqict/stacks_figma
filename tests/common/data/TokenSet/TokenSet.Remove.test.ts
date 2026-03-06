// describe("TokenSet Remove Tests", () => {
//     test("removes a token that is present", () => {
//         // Given a tokenset initialized tokens
//         const name = "TokenSet";
//         const tokenType = "number";
//         const level = 1;
//         const tokens: Token[] = [
//             { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
//             { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
//             { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
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
//             { type: tokenType, valueByMode: { default: 5 }, name: "size-50" },
//             { type: tokenType, valueByMode: { default: 10 }, name: "size-100" },
//             { type: tokenType, valueByMode: { default: 15 }, name: "size-150" },
//         ];
//         const tokenSet = new TokenSet(name, tokenType, level, tokens);

//         // When a token in the set is removed
//         tokenSet.removeToken({
//             type: tokenType,
//             valueByMode: { default: 4 },
//             name: "size-25",
//         });

//         // Then, the object does not contain the removed token, but has the rest of the tokens
//         expect(tokenSet.tokens).toHaveLength(3);
//         expect(tokenSet.tokens).toContain(tokens[0]);
//         expect(tokenSet.tokens).toContain(tokens[1]);
//         expect(tokenSet.tokens).toContain(tokens[2]);
//     });
// });
