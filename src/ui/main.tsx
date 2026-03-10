import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EditorPage from "./features/ds-editor/EditorPage";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <EditorPage />
        {/* <SelectionPage /> */}
    </StrictMode>,
);
