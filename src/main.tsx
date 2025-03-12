import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { OidcProvider } from "./oidc";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./index.css";

// Create a new router instance
const router = createRouter({ routeTree });

const queryClient = new QueryClient();

// Register the router instance for type safety
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
      <OidcProvider>
        <ThemeProvider attribute="class">
          <TooltipProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              {/* <TanStackRouterDevtools position="bottom-left" /> */}
            </QueryClientProvider>
          </TooltipProvider>
        </ThemeProvider>
      </OidcProvider>
    </StrictMode>,
  );
}
