"use client";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function BlogPage() {
  const token = Cookies.get("token");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`/api/posts?page=${pageParam}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  const filtered = allPosts.filter((post: Post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };
  const BackHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600" onClick={BackHome}>
          📚 Blog
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full p-3 border rounded mb-6 text-black  bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.map((post: Post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="block border p-5 mb-5 rounded-lg bg-white shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {post.title}
            </h2>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
          </Link>
        ))}

        <div
          ref={observerRef}
          className="h-10 text-center text-sm text-gray-500 mt-6"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Scroll down to load more"
            : "🎉 End of posts"}
        </div>
      </main>
    </div>
  );
}
