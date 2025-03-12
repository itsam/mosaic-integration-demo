import { createFileRoute } from "@tanstack/react-router";
import { useOidc } from "@/oidc";
import { MainLayout } from "@/components/MainLayout";
import { LoginLayout } from "@/components/LoginLayout";

export const Route = createFileRoute("/_authed")({
  component: RootPage,
});

function RootPage() {
  const { isUserLoggedIn } = useOidc();

  if (isUserLoggedIn) {
    return <MainLayout />;
  } else {
    return <LoginLayout />;
  }
}
