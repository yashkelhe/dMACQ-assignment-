"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function BlogDetailPage() {
  const { id } = useParams();

  const token = Cookies.get("token");

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const handleLike = () => {
    toast.success("You liked the post!");
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load post</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{data.title}</h1>
        <p className="text-gray-700 leading-relaxed mb-8">{data.content}</p>

        <button
          onClick={handleLike}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded transition"
        >
          👍 Like
        </button>
      </div>
    </div>
  );
}
