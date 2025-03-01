import { Product, deleteProduct } from "@/services/api";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      onDelete();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
      {product.description && (
        <p className="text-gray-600 mt-2">{product.description}</p>
      )}
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
