"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductForm from "@/components/ProductForm";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddProduct() {
  const router = useRouter();

  const handleProductCreated = () => {
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <main>
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
          <ProductForm onProductCreated={handleProductCreated} />
        </div>
      </main>
    </ProtectedRoute>
  );
}
