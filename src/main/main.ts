import { on, showUI } from "@create-figma-plugin/utilities";

import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../common/Constants";
import { EventHandlers } from "../common/event-handlers/Events";
import { GenerateCircleHandler } from "../common/event-handlers/SampleEventHandler";

export default function () {
    on<GenerateCircleHandler>(
        EventHandlers.GenerateCircle.name,
        EventHandlers.GenerateCircle.handler,
    );
    showUI({ height: WINDOW_HEIGHT, width: WINDOW_WIDTH });
}
