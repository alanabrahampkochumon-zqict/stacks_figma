import { expect, test } from "vitest";
import {
    generateScale,
    Interpolator,
    ScaleConfig,
    ScalePresets,
} from "./ScaleGenerator";

test("generateScale 2px-grid generates scale from 0..20", () => {
    const expectedGeneration = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    expect(generateScale(ScalePresets["2px_grid"])).toStrictEqual(
        expectedGeneration,
    );
});

test("generateScale 4px-grid generates scale from 0..40", () => {
    const expectedGeneration = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
    expect(generateScale(ScalePresets["4px_grid"])).toStrictEqual(
        expectedGeneration,
    );
});

test("generateScale 4px-ease generates scale in 0,2,4,..,16,20,24,..40, 48, 56,..96", () => {
    const expectedGeneration = [
        0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 56, 64, 72, 80, 88,
        96,
    ];
    expect(generateScale(ScalePresets["4px_ease"])).toStrictEqual(
        expectedGeneration,
    );
});

test("generateScale 8px generates scale in 0..80", () => {
    const expectedGeneration = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
    expect(generateScale(ScalePresets["8px_grid"])).toStrictEqual(
        expectedGeneration,
    );
});

test("generateScale 8px-ease generates scale in 0,4,8,..,32,40,48,..80, 96, 112,..192", () => {
    const expectedGeneration = [
        0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128, 134,
        160, 176, 192,
    ];
    expect(generateScale(ScalePresets["8px_ease"])).toBe(expectedGeneration);
});

test("generateScale geometric-base2 generates scales in the form 0, 2, 4, 8, 16...", () => {
    const expectedGeneration = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
    expect(generateScale(ScalePresets.geometric_base2)).toStrictEqual(
        expectedGeneration,
    );
});

test("generatesScale fifties generates scales in the range 0, 50, 100, 150, .., 950", () => {
    const expectedGeneration = [
        0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
        750, 800, 850, 900, 950,
    ];
    expect(generateScale(ScalePresets.fifties)).toStrictEqual(
        expectedGeneration,
    );
});

test("generatesScale hundreds generates scales in the range 0, 50, 100, 200, .., 950", () => {
    const expectedGeneration = [
        0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
    ];
    expect(generateScale(ScalePresets.hundreds)).toStrictEqual(
        expectedGeneration,
    );
});

test("generateScale with start end values with lower, interpolates between start and end", () => {
    const steps = 10; // Should get ignored
    const startValues = [0, 5, 10, 15, 20, 25, 30];
    const endValues = [50, 55, 60, 65, 70, 75, 80];
    const config: ScaleConfig = {
        base: 5,
        interpolator: Interpolator.Linear,
        steps: steps,
        startValues: startValues,
        endValues: endValues,
    };
    const expectedGeneration = [...startValues, 35, 40, 45, ...endValues];
    expect(generateScale(config)).toStrictEqual(expectedGeneration);
});

test("generateScale with start end values with higher step, but lower interpolating points, interpolates only missing points based on the base", () => {
    const steps = 10;
    const startValues = [0, 5, 10, 15, 20, 25, 30];
    const endValues = [50, 55, 60, 65, 70, 75, 80];
    const config: ScaleConfig = {
        base: 5,
        interpolator: Interpolator.Linear,
        steps: steps,
        startValues: startValues,
        endValues: endValues,
    };
    const expectedGeneration = [...startValues, 35, 40, 45, ...endValues];
    expect(generateScale(config)).toStrictEqual(expectedGeneration);
});

test("generateScale with custom config generates correct values", () => {
    const expectedGeneration = [
        0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
        38, 40,
    ];
    const custom2Px = { ...ScalePresets["2px_grid"], steps: 21 };

    expect(generateScale(custom2Px)).toStrictEqual(expectedGeneration);
});

test("generateScale with no steps or endValues, throwsError", () => {
    const config: ScaleConfig = {
        base: 2,
        interpolator: Interpolator.Linear,
    };
    expect(() => generateScale(config)).toThrow();
});

// TESTCASES: Config with start, end and interpolation steps
// TESTCASES: Config with start, and interpolation steps, and stepscount
// TESTCASES: Config with start, and interpolation steps, and stepscount
