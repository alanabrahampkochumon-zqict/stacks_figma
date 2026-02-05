import { EventHandler } from "@create-figma-plugin/utilities";
import { EventHandlers, Events } from "./Events";

export interface GenerateCircleHandler extends EventHandler {
    name: (typeof EventHandlers)[Events]["name"];
    handler: (typeof EventHandlers)[Events]["handler"];
}
