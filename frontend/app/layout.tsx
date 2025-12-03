import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Primetrade",
  description: "Dark theme always enabled",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-zinc-100">
        <Navbar />
        <main className="min-h-[calc(100vh-60px)]">
          {children}
        </main>
      </body>
    </html>
  );
}