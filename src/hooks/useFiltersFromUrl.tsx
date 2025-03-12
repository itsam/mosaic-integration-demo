import { useSearch, useNavigate } from "@tanstack/react-router";

export function useFiltersFromUrl() {
  const searchParams = useSearch({ from: "/_authed/" });
  const navigate = useNavigate({ from: "/" });

  const setFilters = (newFilters: Partial<typeof searchParams>) => {
    navigate({
      search: (prev: typeof searchParams) => ({
        ...prev,
        ...newFilters,
      }),
    });
  };

  return { filters: searchParams, setFilters };
}
