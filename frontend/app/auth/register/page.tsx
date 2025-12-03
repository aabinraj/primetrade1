'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import API from "@/lib/api";
import { setToken } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const res = await API.post("/api/auth/register", data);
      setToken(res.data.token);
      router.replace("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-50">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block text-sm text-zinc-700 dark:text-zinc-200">Full name</label>
          <input
            {...register("name")}
            placeholder="Your name"
            className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            required
          />

          <label className="block text-sm text-zinc-700 dark:text-zinc-200">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            required
          />

          <label className="block text-sm text-zinc-700 dark:text-zinc-200">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Choose a password"
            className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-zinc-700 dark:text-zinc-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
