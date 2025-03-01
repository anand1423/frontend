"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

interface LoginFormData {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { login, error, loading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(null);
      await login(data.username, data.password);
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setLoginError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {(loginError || error) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {loginError || error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.username && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.password && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm mt-4">
            Don`t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
