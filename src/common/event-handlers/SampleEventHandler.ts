import { EventHandler } from "@create-figma-plugin/utilities";
import { EventHandlerType, EventType } from "./Events";

export interface GenerateCircleHandler extends EventHandler {
    name: EventType;
    handler: EventHandlerType;
}
