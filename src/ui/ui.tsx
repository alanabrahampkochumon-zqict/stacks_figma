import { render } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { Events } from "../common/constants";

function UI() {
    return (
        <div>
            <p>Sample Generate Circle</p>
            <button
                style={{ background: "white", color: "black", padding: "1rem" }}
                onClick={() => emit(Events.GenCirlce)}
            >
                Generate Circle
            </button>
        </div>
    );
}

export default render(UI);
