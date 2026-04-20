import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config")({
    component: () => (
        <div className="config-panel">
            <h1>Configuration</h1>
            <nav>
                <Link to="/ds-config/stackview">General</Link>
                <Link to="/ds-config/tableview">Security</Link>
                <Link to="/ds-config/canvasview">Notifications</Link>
            </nav>
            <Outlet />
        </div>
    ),
});
