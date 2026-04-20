import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config/canvasview/")({
    component: Index,
});

function Index() {
    return (
        <div className="p-2">
            <h3>Canvas View</h3>
        </div>
    );
}
