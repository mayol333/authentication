import { createFileRoute, redirect } from "@tanstack/react-router";
import { Protected } from "../views/Protected";
import Cookies from "js-cookie";
export const Route = createFileRoute("/protected")({
    component: () => <Protected />,
    beforeLoad: async () => {
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            throw redirect({ to: "/auth", replace: true });
        }
    },
});
