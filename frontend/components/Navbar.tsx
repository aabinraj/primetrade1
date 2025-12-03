'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { setToken } from "@/lib/auth";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <nav className="w-full bg-zinc-900 border-b border-zinc-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link href="/" className="text-xl font-semibold text-white">
          PrimeTrade
        </Link>

        <div className="flex gap-4 items-center">
          {loggedIn ? (
            <>
              <Link href="/profile" className="text-zinc-300 hover:text-white">Profile</Link>
              <Link href="/dashboard" className="text-zinc-300 hover:text-white">Dashboard</Link>
              <button
                onClick={() => {
                  setToken(null);
                  window.location.href = "/";
                }}
                className="text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-zinc-300 hover:text-white">Login</Link>
              <Link href="/auth/register" className="text-white bg-blue-600 px-3 py-1 rounded">
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
