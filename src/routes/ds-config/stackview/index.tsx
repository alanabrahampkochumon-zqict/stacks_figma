import EditorPage from "@src/ui/features/ds-editor/EditorPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config/stackview/")({
    component: EditorPage,
});

function Index() {
    return (
        <div className="p-2">
            <h3>Stack View</h3>
        </div>
    );
}
