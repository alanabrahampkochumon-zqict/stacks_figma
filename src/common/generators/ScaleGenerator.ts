//TODO: Add support for ratios for type like for 1.25, 1.333, 1.618 etc.
export enum Interpolator {
    Linear,
    Geometric,
}

// Configurations Possible: Base Interpololator steps and minlimit
// Previous with cutoffConfig
// Specifying start and end values or either without specifying steps
export type ScaleConfig = {
    base: number;
    interpolator: Interpolator;
    steps?: number;
    minLimit?: number;
    cutoffConfig?: {
        cutoff: number;
        base: number;
        cutoffType: "pre" | "post";
        interpolator?: Interpolator;
    }[];
    startValues?: number[];
    endValues?: number[];
};

export const ScalePresets: Record<string, ScaleConfig> = {
    "2px_grid": {
        base: 2,
        interpolator: Interpolator.Linear,
        steps: 11,
        minLimit: 0,
    },
    "4px_grid": {
        base: 4,
        interpolator: Interpolator.Linear,
        steps: 11,
        minLimit: 0,
    },
    "4px_ease": {
        base: 4,
        interpolator: Interpolator.Linear,
        steps: 21,
        minLimit: 0,
        cutoffConfig: [
            {
                cutoff: 16,
                base: 2,
                cutoffType: "pre",
                interpolator: Interpolator.Linear,
            },
            {
                cutoff: 40,
                base: 8,
                cutoffType: "post",
                interpolator: Interpolator.Linear,
            },
        ],
    },
    "8px_grid": {
        base: 8,
        interpolator: Interpolator.Linear,
        steps: 11,
        minLimit: 0,
    },
    "8px_ease": {
        base: 8,
        interpolator: Interpolator.Linear,
        steps: 21,
        minLimit: 0,
        cutoffConfig: [
            {
                cutoff: 32,
                base: 4,
                cutoffType: "pre",
                interpolator: Interpolator.Linear,
            },
            {
                cutoff: 80,
                base: 16,
                cutoffType: "post",
                interpolator: Interpolator.Linear,
            },
        ],
    },
    geometric_base2: {
        base: 2,
        interpolator: Interpolator.Geometric,
        steps: 11,
        minLimit: 0,
    },
    fifties: {
        base: 50,
        interpolator: Interpolator.Linear,
        steps: 20,
        minLimit: 0,
    },
    hundreds: {
        base: 100,
        interpolator: Interpolator.Linear,
        startValues: [0, 50],
        endValues: [950],
    },
} as const;

export function getConfigPreset(
    presetName: keyof typeof ScalePresets,
): ScaleConfig {
    return ScalePresets[presetName];
}

/**
 * Generates a scale given the right configuration.
 * @param config Configuration on how to generate scales.
 *               Use `ScalePresets` if you don't want to make your own cuomst preset.
 * @returns an array of scales.
 */
export function generateScale(config: ScaleConfig): Array<number> {
    const start = config.startValues
        ? config.startValues
        : config.minLimit
          ? [config.minLimit]
          : [0];
    const end = config.endValues;

    if (!config.steps && !end)
        throw Error(
            "[Generate Error]: Either steps or end values must be specified",
        );

    // Calculate the actual start index, ie, if a sequence has startValues of [0, 5, 10] for base-10
    // Then, the start is 10. But if the startValues are [0, 5], the start values is 0, not 5.
    // By iterating backwards, we are hitting the last value in the sequence that is multiple of base.
    // Eg: [0, 5, 10] -> We'll hit 10, which we can use as our starting value, compared to 0, which needs generation from 0..10, then from there, which is duplicated work.
    let sequenceStartIndex = start.length - 1;
    for (let i = start.length - 1; i >= 0 && start[i] % config.base != 0; i--)
        sequenceStartIndex--;

    // Precedence given for missing values over steps.
    const maxValuesToBeFilled = end
        ? Math.ceil((end[0] - start[sequenceStartIndex]) / config.base - 1)
        : config.steps && config.steps - start.length;
    // Just to make eslint happy. If end is not null this step won't execute.

    if (!maxValuesToBeFilled)
        throw new Error("[Generate Error]: Invalid steps");
    // TODO: Support StepInterpolation
    let startIndex = 0;
    for (let i = 0; i < start.length && start[i] % config.base == 0; i++)
        startIndex++;

    const interpolatedValues = Array.from(
        { length: maxValuesToBeFilled },
        (_, index) => {
            const interpolatedValue = interpolate(
                config.interpolator,
                start[sequenceStartIndex],
                config.base,
                index + 1,
            );
            return interpolatedValue;
        },
    );
    console.log(interpolatedValues);
    return [...start, ...interpolatedValues, ...(end ? end : [])];
}

function interpolate(
    interpolator: Interpolator,
    start: number,
    base: number,
    modifier: number,
): number {
    switch (interpolator) {
        case Interpolator.Linear:
            return start + base * modifier;
        case Interpolator.Geometric:
            return (start || 1) * base ** modifier;
    }
}
