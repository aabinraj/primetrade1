'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import API from "@/lib/api";
import { setToken } from "@/lib/auth";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    console.log('[Login] submitting', data);
    try {
      const res = await API.post("/api/auth/login", data);
      console.log('[Login] response', res?.data);

      // Try multiple common token keys in case backend used something else
      const token = res?.data?.token ?? res?.data?.accessToken ?? res?.data?.data?.token;
      if (!token) {
        alert('Login succeeded but server did not return a token. Check response in console.');
        console.error('No token found in response', res.data);
        setLoading(false);
        return;
      }

      // Persist token and set axios header
      setToken(token);
      console.log('[Login] token saved to localStorage:', localStorage.getItem('token'));

      // Verify token by calling /me
      try {
        const profile = await API.get('/api/auth/me');
        console.log('[Login] /api/auth/me OK', profile.data);
        // successful — navigate
        router.replace('/dashboard');
      } catch (errMe: any) {
        console.error('[Login] /api/auth/me failed after login', errMe?.response?.data ?? errMe);
        alert('Login token saved but verification failed. Check console/network.');
      }

    } catch (err: any) {
      console.error('[Login] error', err?.response?.data ?? err);
      alert(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-900 dark:text-zinc-50">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
            placeholder="********"
            className="w-full border border-zinc-200 dark:border-zinc-700 p-3 rounded bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-zinc-700 dark:text-zinc-300">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
