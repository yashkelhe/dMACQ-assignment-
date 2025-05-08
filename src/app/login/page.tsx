"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    // mutation, onSuccess , and onError
    mutationFn: async () => {
      const res = await axios.post("/api/login", { email, password });
      // store token in localstorage
      // localStorage.setItem("token", res.data.token);
      Cookies.set("token", res.data.token);
    },
    onSuccess: () => router.push("/blog"),
    onError: () => alert("Login failed. Check credentials."),
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const goToRegister = () => {
    router.push("/register");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-700">
          Login
        </h2>
        <div className="text-black ">
          {" "}
          email : test@example.com ; password : password123{" "}
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-medium py-3 rounded"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={goToRegister}
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
