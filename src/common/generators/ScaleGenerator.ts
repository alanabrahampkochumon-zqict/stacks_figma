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
    "2px-grid": {
        base: 2,
        interpolator: Interpolator.Linear,
        steps: 11,
        minLimit: 0,
    },
    "4px-grid": {
        base: 4,
        interpolator: Interpolator.Linear,
        steps: 11,
        minLimit: 0,
    },
    "4px-ease": {
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
    "8px-grid": {
        base: 8,
        interpolator: Interpolator.Linear,
        steps: 11,
        minLimit: 0,
    },
    "8px-ease": {
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
    "geometric-base2": {
        base: 2,
        interpolator: Interpolator.Geometric,
        steps: 10,
        minLimit: 0,
    },
    fifties: {
        base: 50,
        interpolator: Interpolator.Linear,
        steps: 21,
        minLimit: 0,
    },
    hundreds: {
        base: 100,
        interpolator: Interpolator.Linear,
        startValues: [0, 50],
        endValues: [950],
    },
};

/**
 * Generates a scale given the right configuration.
 * @param config Configuration on how to generate scales.
 *               Use `ScalePresets` if you don't want to make your own cuomst preset.
 * @returns an array of scales.
 */
export function generateScale(config: ScaleConfig): Array<number> {
    return [];
}
