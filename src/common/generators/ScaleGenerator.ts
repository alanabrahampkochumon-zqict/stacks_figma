// enum Scale {
//     Twos,
//     Fours,
//     Eights,
//     Hundreds,
//     TShirt,
//     Fiftys,
// }
interface NumericScale {
    name: string;
    upperLimit: number;
    lowerLimit: number;
}

interface NonNumericScale {
    values: string[];
}

export type Scales =
    | ({ kind: "numeric" } & NumericScale)
    | ({ kind: "non-numeric" } & NonNumericScale);

export enum Interpolator {
    Linear,
    Geometric,
}

type Cutoff<T> = { T: Interpolator };
// const Interpolator = ["Linear", "Geometric"] as const

export function generateScale<T extends NumericScale | NonNumericScale>(
    scale: T,
    interpolator: Interpolator = Interpolator.Linear,
    interpolatorCutoffs: Cutoff<T>[] | undefined = undefined,
): Array<String> {
    return [];
}
