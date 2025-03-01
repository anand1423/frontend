"use client";

import { useState } from "react";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onPriceFilter: (min: number | null, max: number | null) => void;
}

export default function ProductSearch({
  onSearch,
  onPriceFilter,
}: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault();

    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    onPriceFilter(min, max);
  };

  const handleReset = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    onSearch("");
    onPriceFilter(null, null);
  };

  return (
    <div className="mb-6 bg-black-10 p-4 rounded-lg border">
      <h2 className="text-lg font-semibold mb-3">Search & Filter</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by name */}
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-l"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {/* Filter by price */}
        <form onSubmit={handlePriceFilter} className="flex space-x-2">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded"
            min="0"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded"
            min="0"
            step="0.01"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </form>

        {/* Reset filters */}
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
