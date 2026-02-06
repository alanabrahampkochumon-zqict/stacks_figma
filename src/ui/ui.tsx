import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import SelectionPage from "./features/ds-selection/SelectionPage";
import "./styles/styles.css";

function UI() {
    return (
        <body>
            <SelectionPage />
        </body>
    );
}

export default render(UI);
