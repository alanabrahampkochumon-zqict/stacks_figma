import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config/stackview/")({
    component: Index,
});

function Index() {
    return (
        <div className="p-2">
            <h3>Stack View</h3>
        </div>
    );
}
