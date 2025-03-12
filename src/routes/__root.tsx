import { AutoLogoutCountdown } from "@/components/AutoLogout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { getOidc } from "@/oidc";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const oidc = await getOidc();
    return {
      isUserLoggedIn: oidc.isUserLoggedIn,
    };
  },
  component: () => (
    <>
      <Outlet />
      <AutoLogoutCountdown />
    </>
  ),
});
