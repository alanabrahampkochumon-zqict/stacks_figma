import { eventManager } from "./events/EventManager";
import { registerAllEvents } from "./events/EventRegistry";
import type FigmaEvents from "./events/FigmaEvents";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../window.config.json";

registerAllEvents();

figma.ui.onmessage = <K extends keyof FigmaEvents>(event: {
    type: K;
    data: FigmaEvents[K];
}) => {
    eventManager.emit(event.type, event.data);
};

figma.showUI(__html__, { width: WINDOW_WIDTH, height: WINDOW_HEIGHT });
