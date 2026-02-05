import { EventHandler } from "@create-figma-plugin/utilities";
import { EventTypes } from "../constants";

export interface GenerateCircleHandler extends EventHandler {
    name: EventTypes;
    handler: (args: any) => void;
}
