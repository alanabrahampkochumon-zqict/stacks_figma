export const EventHandlers = {
    GenerateCircle: {
        name: "generate_circle",
        handler: async (code: string) => {
            console.log(code);
            const circle = figma.createEllipse();
            figma.currentPage.selection = [circle];
            figma.viewport.scrollAndZoomIntoView([circle]);
        },
    },
    SampleEvent: {
        name: "sample_event",
        handler: async (code: string) => Promise<any>,
    },
} as const;

type Events = keyof typeof EventHandlers;
export type _Events = (typeof EventHandlers)[Events]["name"];

EventHandlers.GenerateCircle;

class Events {}
