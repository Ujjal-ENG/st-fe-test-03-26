import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../services/api";

const LIMIT = 12;

export function useProducts() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["products", page, category, search],
    queryFn: () =>
      api.fetchProducts({
        page,
        limit: LIMIT,
        category: category || undefined,
        search: search || undefined,
      }),

    placeholderData: (prev) => prev,
  });

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchSubmit = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
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
    setSearchInput: (val: string) => setSearchInput(val),
    handleCategoryChange,
    handleSearchSubmit,
    handleClearSearch,
    retry: refetch,
  };
}
