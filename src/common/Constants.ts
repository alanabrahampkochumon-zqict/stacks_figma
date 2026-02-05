export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;

export const Events = {
    SampleEvent: "Sample Event",
    GenCirlce: "Generate Circle",
} as const;

type EventKeys = keyof typeof Events;
export type EventTypes = (typeof Events)[EventKeys];
