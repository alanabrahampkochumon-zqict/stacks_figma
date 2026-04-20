import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ds-config/")({
    beforeLoad: () => {
        redirect({ to: "/ds-config/stackview" });
    },
});
