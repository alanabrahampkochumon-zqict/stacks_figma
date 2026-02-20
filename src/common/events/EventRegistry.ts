import HexToRGB from "../utils/HexToRGB";
import { eventManager } from "./EventManager";

// Register all the handlers for the user events here
export const registerAllEvents = () => {
    eventManager.register("createCircle", ({ count, radius, color }) => {
        if (typeof figma === "undefined") {
            console.error(
                "[EventRegistery] You are trying to include to main files in the UI package. Remove any import to EventRegistry from your [.tsx/.ts] that compiles to index.html",
            );
        } else {
            const nodes: SceneNode[] = [];
            const frame = figma.createFrame();
            const ellipse = figma.createEllipse();
            ellipse.resize(radius || 12, radius || 12);
            ellipse.fills = [
                {
                    type: "SOLID",
                    color: HexToRGB(color || "#ffffff"),
                },
            ];
            frame.appendChild(ellipse);
            for (let i = 0; i < count - 1; ++i) {
                frame.appendChild(ellipse.clone());
            }
            frame.layoutMode = "HORIZONTAL";
            frame.layoutSizingVertical = "HUG"; // Hug content
            frame.layoutSizingHorizontal = "HUG"; // Hug content
            frame.gridRowGap = 12;
            frame.name = "Sample Circles";
            nodes.push(frame);

            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
        }
    });
};
