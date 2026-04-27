import {
    RouterProvider,
    createMemoryHistory,
    createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "../routeTree.gen";

// import "./styles/styles.css";

const memoryHistory = createMemoryHistory({
    initialEntries: ["/ds-config/stackview/"], // TODO: Update to root route
});

const router = createRouter({ routeTree, history: memoryHistory });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    );
}
