import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
    <>
        <div
            style={{
                position: "absolute",
                left: 20,
                bottom: 0,
                background: "gray",
                padding: "12px",
            }}
        >
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{" "}
            <Link to="/ds-config" className="[&.active]:font-bold">
                Config
            </Link>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
