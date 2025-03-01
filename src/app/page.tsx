"use client";

import { useEffect, useState } from "react";
import { Product, fetchProducts } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import ProductSearch from "@/components/ProductSearch";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const lowercaseQuery = query.toLowerCase();
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            (product.description &&
              product.description.toLowerCase().includes(lowercaseQuery))
        )
      );
    }
  };

  const handlePriceFilter = (min: number | null, max: number | null) => {
    setFilteredProducts(
      products.filter((product) => {
        const price = Number(product.price);
        if (min === null && max === null) return true;
        if (min !== null && max !== null) return price >= min && price <= max;
        if (min !== null) return price >= min;
        if (max !== null) return price <= max;
        return true;
      })
    );
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>

        <ProductSearch
          onSearch={handleSearch}
          onPriceFilter={handlePriceFilter}
        />

        {loading && <p>Loading products...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <p>
            No products found. Adjust your search or add some products to get
            started!
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={loadProducts}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
