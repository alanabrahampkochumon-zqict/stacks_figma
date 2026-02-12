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

/**
 * Generates a scale given the right configuration.
 * @param config Configuration on how to generate scales.
 *               Use `ScalePresets` if you don't want to make your own cuomst preset.
 * @returns an array of scales.
 */
export function generateScale(config: ScaleConfig): Array<Number> {
    if (!config.steps && !config.endValues)
        throw Error(
            "[Generate Error]: Either steps or end values must be specified",
        );
    const start = config.startValues
        ? config.startValues
        : config.minLimit
          ? [config.minLimit]
          : [0];

    let cutoffIndex = 0;
    const generatedSteps: number[] = [...start];

    config.cutoffConfig?.sort(({ cutoff: a }, { cutoff: b }) => a - b);

    // Calculate the actual start index, ie, if a sequence has startValues of [0, 5, 10] for base-10
    // Then, the start is 10. But if the startValues are [0, 5], the start values is 0, not 5.
    // By iterating backwards, we are hitting the last value in the sequence that is multiple of base.
    // Eg: [0, 5, 10] -> We'll hit 10, which we can use as our starting value, compared to 0, which needs generation from 0..10, then from there, which is duplicated work.
    let sequenceStartIndex = start.length - 1;
    let base =
        config.cutoffConfig && config.cutoffConfig[0].cutoffType == "pre"
            ? config.cutoffConfig[0].base
            : config.base;
    for (let i = start.length - 1; i >= 0 && start[i] % base != 0; i--)
        sequenceStartIndex--;

    while (config.cutoffConfig && cutoffIndex < config.cutoffConfig.length) {
        const currentConfig = config.cutoffConfig[cutoffIndex];

        let endGen = currentConfig.cutoff;
        base = config.base;
        let interpolator = config.interpolator;

        if (currentConfig.cutoffType == "pre") {
            endGen = currentConfig.cutoff;
            base = currentConfig.base;
            interpolator = currentConfig.interpolator || config.interpolator;
        }

        generatedSteps.push(
            ...interpolateBetween(
                generatedSteps[sequenceStartIndex],
                base,
                interpolator,
                endGen,
            ),
        );

        sequenceStartIndex = generatedSteps.length - 1;
        cutoffIndex++;
    }

    // Calculates the cutOffConfig, or if there are no cutOff config then that.
    base = config.base;
    let end = config.endValues && config.endValues[0];
    let lastConfig =
        config.cutoffConfig &&
        config.cutoffConfig[config.cutoffConfig.length - 1];
    let interpolator = config.interpolator;
    if (lastConfig && lastConfig.cutoffType == "post") {
        base = lastConfig.base;
        interpolator = lastConfig.interpolator || config.interpolator;
    }

    // Calculates the remaining steps by taking the difference between generate values last value and `endValue`s first value.
    // If endValues are not provided steps are considered.
    // NOTE: endValues takes precendece for calculating remaining steps.
    const remainingSteps = config.endValues
        ? Math.round(
              (config.endValues[0] - generatedSteps[sequenceStartIndex]) / base,
          )
        : config.steps
          ? config.steps - generatedSteps.length
          : 0;

    if (remainingSteps > 0) {
        const _gen = interpolateBetween(
            generatedSteps[sequenceStartIndex],
            base,
            interpolator,
            end,
            remainingSteps,
        );
        // If the generate values contains duplicates, [1, 2, 4] and generated is [4, 6, 8], then 4 from the generated value is ignored.
        if (config.endValues && _gen[_gen.length - 1] === config.endValues[0])
            generatedSteps.push(..._gen.slice(0, _gen.length - 1));
        else generatedSteps.push(..._gen);
    }

    return [...generatedSteps, ...(config.endValues ? config.endValues : [])];
}

function interpolateBetween(
    start: number, // Exclusive
    base: number,
    interpolator: Interpolator,
    end?: number, // Inclusive
    steps?: number,
): Array<number> {
    // Values are interpolated between start and end values or steps.
    const maxValuesToBeFilled = end ? (end - start) / base : steps ? steps : 0;
    const interpolatedValues = Array.from(
        { length: maxValuesToBeFilled },
        (_, index) => {
            return interpolate(interpolator, start, base, index + 1);
        },
    );
    return interpolatedValues;
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
