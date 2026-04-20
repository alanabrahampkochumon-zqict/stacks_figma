import SelectionPage from "@src/ui/features/ds-selection/SelectionPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: SelectionPage,
});
