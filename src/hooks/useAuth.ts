"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    // if preset then true else false
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
