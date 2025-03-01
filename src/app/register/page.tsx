"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  const { register: registerUser, error, loading } = useAuth();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setRegisterError(null);
      await registerUser(data.username, data.password);
      router.push("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setRegisterError("Failed to register. Username may already exist.");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-4 max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {(registerError || error) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {registerError || error}
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
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.password && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
