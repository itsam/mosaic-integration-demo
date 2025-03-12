import { createFileRoute } from "@tanstack/react-router";
import { useOidc } from "@/oidc";

export const Route = createFileRoute("/_authed/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { oidcTokens } = useOidc();

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center rounded-xl bg-secondary p-4">
        <h1 className="text-2xl">Welcome {oidcTokens?.decodedIdToken.email}</h1>
      </div>
      <div className="rounded-xl bg-secondary p-4">
        <p className="text-lg">
          You are authenticated in keycloak using a standard OpenID Connect
          redirect based authentication with authorization code.
          <br />
          In terms of OpenID Connect or OAuth2 specifications, this enables
          support of 'Authorization Code Flow' for the client.
        </p>
      </div>
    </main>
  );
}
