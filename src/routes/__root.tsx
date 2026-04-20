import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
    <>
        <div
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
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
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </>
);

export const Route = createRootRoute({ component: RootLayout });
