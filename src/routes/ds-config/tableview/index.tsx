import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config/tableview/")({
    component: Index,
});

function Index() {
    return (
        <div className="p-2">
            <h3>Table View</h3>
        </div>
    );
}
