import { createFileRoute } from "@tanstack/react-router";
import { customAxios } from "@/api/mutator/customAxios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { AxiosError } from "axios";

export const Route = createFileRoute("/_authed/gateway")({
  component: GatewayComponent,
});

function GatewayComponent() {
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null); // Store API response

  const fetchDataWithCustomAxios = async (params: {
    asset_key?: string;
    foo?: string;
  }) => {
    try {
      const response = await customAxios({
        url: `${import.meta.env.VITE_MOSAIC_GATEWAY_URL}/forensics`,
        method: "GET",
        // params: { asset_key: "123" }, // Query params
        params,
      });
      setData(response); // Store successful response
      setError(null); // Clear any previous errors
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        // Capture server error response
        setError(JSON.stringify(axiosError.response.data, null, 2));
      } else {
        // Handle other errors (network, etc.)
        setError(axiosError.message);
      }
    }
  };

  return (
    <main className="flex flex-col items-start justify-center gap-6 p-4 md:flex-row">
      <div className="max-w-3xl rounded-xl bg-secondary p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">
          Call endpoints via API Gateway
        </h2>
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => fetchDataWithCustomAxios({ asset_key: "123" })}
          >
            GET /forensics with param asset_key = 123
          </Button>
          <Button onClick={() => fetchDataWithCustomAxios({ foo: "123" })}>
            GET /forensics with param foo = 123
          </Button>
        </div>
        {data && (
          <pre className="mt-4 rounded-md bg-green-100 p-2 text-green-800">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}

        {/* ✅ Show Error Message */}
        {error && (
          <pre className="mt-4 rounded-md bg-red-100 p-2 text-red-800">
            {error}
          </pre>
        )}
      </div>
    </main>
  );
}
