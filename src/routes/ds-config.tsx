import Header from "@src/ui/components/Header/Header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config")({
    component: () => (
        <div className="config-panel">
            <Header />
            <Outlet />
        </div>
    ),
});
