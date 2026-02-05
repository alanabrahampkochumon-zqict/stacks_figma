import { render } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { EventHandlers } from "../common/event-handlers/Events";

function UI() {
    return (
        <div>
            <p>Sample Generate Circle</p>
            <button
                style={{ background: "white", color: "black", padding: "1rem" }}
                onClick={() => emit(EventHandlers.GenerateCircle.name)}
            >
                Generate Circle
            </button>
        </div>
    );
}

export default render(UI);
