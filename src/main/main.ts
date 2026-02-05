import { on, showUI } from "@create-figma-plugin/utilities";

import { Events, WINDOW_HEIGHT, WINDOW_WIDTH } from "../common/constants";
import { GenerateCircleHandler } from "../common/event-handlers/SampleEventHandler";

export default function () {
    on<GenerateCircleHandler>(Events.GenCirlce, async function (code: string) {
        console.log(code);
        const circle = figma.createEllipse();
        figma.currentPage.selection = [circle];
        figma.viewport.scrollAndZoomIntoView([circle]);
    });
    showUI({ height: WINDOW_HEIGHT, width: WINDOW_WIDTH });
}
