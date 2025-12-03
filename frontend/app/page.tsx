import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        
        <h1 className="text-4xl font-bold text-white">
          Welcome to <span className="text-blue-400">Primetrade</span>
        </h1>

        <p className="text-zinc-400 text-lg">
          A modern full-stack app with authentication, dashboard & tasks.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="px-6 py-3 rounded border border-blue-400 text-blue-400 font-medium hover:bg-blue-500/20 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
