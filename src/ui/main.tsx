import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SelectionPage from "./features/ds-selection/SelectionPage";
import "./styles/styles.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SelectionPage />
    </StrictMode>,
);
