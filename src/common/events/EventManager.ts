import type FigmaEvents from "./FigmaEvents";

/**
 * Class that manages all the events for Figma.
 * For defining custom events, modify `FigmaEvents` to include appropriate event name and function type.
 * And use `eventManager.register()` in the main.ts or similar, to attach an event listener. NOTE: Only use this in the files that convert to main.js, which include files imported into main.ts.
 * And emit event use `eventManager.emit("event_name")` to emit events.
 */
class EventManager {
    listeners: Partial<{
        [K in keyof FigmaEvents]: (data: FigmaEvents[K]) => void;
    }> = {};

    constructor() {}

    register<K extends keyof FigmaEvents>(
        eventName: K,
        handler: (data: FigmaEvents[K]) => void,
    ) {
        if (this.listeners[eventName])
            console.log(
                "A listener for this event already exists. Overwritting...",
            );
        this.listeners[eventName] = handler as any;
    }

    emit<K extends keyof FigmaEvents>(eventName: K, data: FigmaEvents[K]) {
        if (typeof figma == "undefined") {
            // Passes the message on to the main thread.
            parent.postMessage(
                {
                    pluginMessage: { type: eventName, data: data },
                },
                "*",
            );
        } else {
            // Main Environment
            const handler = this.listeners[eventName];
            if (handler) {
                (handler as (data: FigmaEvents[K]) => void)(data);
            } else {
                console.log(
                    `No listeners registered for ${eventName}. Register the event using "eventManager.register(${eventName}, ...args)".`,
                );
            }
        }
    }
}

export const eventManager = new EventManager();
