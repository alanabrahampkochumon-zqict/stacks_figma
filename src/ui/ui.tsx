import { render } from "@create-figma-plugin/ui";
import { h } from "preact";
import {
    generateScale,
    ScalePresets,
} from "../common/generators/ScaleGenerator";
import SelectionPage from "./features/ds-selection/SelectionPage";
import "./styles/styles.css";

function UI() {
    console.log(generateScale(ScalePresets["2px_grid"]));
    return (
        <body>
            <SelectionPage />
        </body>
    );
}

export default render(UI);
