import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";

const LIMIT = 12;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (pg: number, cat: string, q: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.fetchProducts({
        page: pg,
        limit: LIMIT,
        category: cat || undefined,
        search: q || undefined,
      });
      setProducts(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(page, category, search);
  }, [page, category, search, fetchData]);

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

  const retry = () => fetchData(page, category, search);

  const startItem = (page - 1) * LIMIT + 1;
  const endItem = Math.min(page * LIMIT, total);

  return {
    products,
    loading,
    error,
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
    retry,
  };
}
