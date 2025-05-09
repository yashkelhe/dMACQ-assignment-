"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const token = Cookies.get("token");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to the Blog Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Discover and read amazing posts. Please login or register to get
          started!
        </p>
        <div className="text-gray-600">Login with this credentials</div>
        <div className="text-black">
          <span>Email : test@example.com</span> ,{" "}
          <span> password: password123</span>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Register
          </button>
          {token && (
            <button
              onClick={() => router.push("/blog")}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            >
              Visit Blog
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
