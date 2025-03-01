import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Set up axios interceptors for authentication
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 Unauthorized responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  description?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};

export const createProduct = async (
  data: CreateProductData
): Promise<Product> => {
  const response = await axios.post<Product>(`${API_URL}/products`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/products/${id}`);
};
