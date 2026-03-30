import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../services/api";

function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const LIMIT = 12;

export function useProducts() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["products", page, category, debouncedSearch],
    queryFn: () =>
      api.fetchProducts({
        page,
        limit: LIMIT,
        category: category || undefined,
        search: debouncedSearch || undefined,
      }),
    placeholderData: (prev) => prev,
  });

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  // Kept for backwards compatibility — debounce fires automatically now
  const handleSearchSubmit = () => setPage(1);

  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const startItem = (page - 1) * LIMIT + 1;
  const endItem = Math.min(page * LIMIT, total);

  return {
    products: data?.data ?? [],
    loading: isFetching,
    error: isError
      ? error instanceof Error
        ? error.message
        : "Something went wrong."
      : null,
    page,
    total,
    totalPages,
    category,
    searchInput,
    startItem,
    endItem,
    setPage,
    setSearchInput: (val: string) => {
      setSearchInput(val);
      setPage(1);
    },
    handleCategoryChange,
    handleSearchSubmit,
    handleClearSearch,
    retry: refetch,
  };
}
