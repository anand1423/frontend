"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateProductData, createProduct } from "@/services/api";

interface ProductFormProps {
  onProductCreated: () => void;
}

export default function ProductForm({ onProductCreated }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductData>();

  const onSubmit = async (data: CreateProductData) => {
    try {
      setIsSubmitting(true);
      // Convert price to number
      const formattedData = {
        ...data,
        price: parseFloat(data.price as unknown as string),
      };

      await createProduct(formattedData);
      reset();
      onProductCreated();
    } catch (error) {
      console.error("Failed to create product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.name && (
          <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
        />
        {errors.price && (
          <p className="mt-1 text-red-600 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description (Optional)
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
}
