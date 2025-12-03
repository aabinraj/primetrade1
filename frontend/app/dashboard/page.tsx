"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/auth/login");

    API.get("/api/auth/me")
      .then((res) => setProfile(res.data))
      .catch(() => router.push("/auth/login"));
  }, []);

  if (!profile) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-300">Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold">Dashboard</h1>

        {/* Profile Card */}
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow space-y-1">
          <p className="text-xl font-semibold">Welcome, {profile.name}</p>
          <p className="text-zinc-400">{profile.email}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            href="/profile"
            className="px-5 py-3 bg-blue-600 rounded text-white font-medium hover:bg-blue-700"
          >
            Edit Profile
          </Link>

          <Link
            href="/dashboard/tasks"
            className="px-5 py-3 bg-green-600 rounded text-white font-medium hover:bg-green-700"
          >
            View Tasks
          </Link>
        </div>

      </div>
    </main>
  );
}
