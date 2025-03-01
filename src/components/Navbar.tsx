"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">Product Catalog</div>
        <div className="space-x-4 flex items-center">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-blue-300" : "text-white"
            } hover:text-blue-300`}
          >
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/add"
                className={`${
                  pathname === "/add" ? "text-blue-300" : "text-white"
                } hover:text-blue-300`}
              >
                Add Product
              </Link>
              <div className="ml-4 flex items-center space-x-4">
                <span className="text-green-300">Hi, {user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`${
                  pathname === "/login" ? "text-blue-300" : "text-white"
                } hover:text-blue-300`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`${
                  pathname === "/register" ? "text-blue-300" : "text-white"
                } hover:text-blue-300`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
