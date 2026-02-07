import { expect, test } from "vitest";

test("generateScale 2px-grid generates scale from 0..20", () => {});

test("generateScale 4px-grid generates scale from 0..40", () => {});

//TODO: Recheck range for test name
test("generateScale 4px-ease generates scale in 0,2,4,..,16,20,24,..40, 48, 56,..112", () => {});

test("generateScale 8px generates scale in 0..80", () => {});
//TODO: Recheck range for test name
test("generateScale 8px-ease generates scale in 0,4,8,..,32,40,48,..80, 96, 112,..118", () => {});

test("generateScale geometric-base2 generates scales in the form 0, 2, 4, 8, 16...", () => {});

test("generatesScale fifties generates scales in the range 0, 50, 100, 150, .., 950", () => {});

test("generatesScale hundreds generates scales in the range 0, 50, 100, 200, .., 950", () => {});

test("generateScale with start end values, takes priority over steps", () => {});

test("generateScale with custom config generates correct values", () => {});
