import { describe, test } from "vitest";
import { generateTokenNode } from "../utils/Generators";

describe("Design System: Hydrate Token", () => {
    const tokens = Array(10)
        .fill(0)
        .map(() => generateTokenNode(undefined, "token", "number"));

    test("throws illegal argument error, if primitive token is hydrated", () => {});
});
