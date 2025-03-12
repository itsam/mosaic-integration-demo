import { createFileRoute } from "@tanstack/react-router";
import { useOidc } from "@/oidc";
import { jwtDecode } from "jwt-decode"; // Ensure you have jwt-decode installed

export const Route = createFileRoute("/_authed/token-details")({
  component: DetailsComponent,
});

// Define the expected structure of the decoded token
interface DecodedToken {
  sub: string;
  email?: string;
  name?: string;
  exp: number;
  iat: number;
  [key: string]: unknown; // Allow other optional properties
}

function DetailsComponent() {
  const { oidcTokens } = useOidc();

  // Decode the access token with explicit type
  let decodedAccessToken: DecodedToken | null = null;
  if (oidcTokens?.accessToken) {
    try {
      decodedAccessToken = jwtDecode<DecodedToken>(oidcTokens.accessToken);
    } catch (error) {
      console.error("Failed to decode access token:", error);
    }
  }

  return (
    <main className="flex flex-col items-start justify-center gap-6 p-4 md:flex-row">
      <div className="max-w-3xl rounded-xl bg-secondary p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Raw OIDC Token</h2>
        <pre className="whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-green-400 shadow-inner">
          {JSON.stringify(oidcTokens, null, 2)}
        </pre>
      </div>

      {decodedAccessToken && (
        <div className="rounded-xl bg-secondary p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Decoded Access Token</h2>
          <pre className="whitespace-pre-wrap break-words rounded-lg bg-gray-900 p-4 text-sm text-green-400 shadow-inner">
            {JSON.stringify(decodedAccessToken, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
