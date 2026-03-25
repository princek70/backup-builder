'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface-container-lowest p-10 rounded-2xl shadow-ambient border border-outline-variant/10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-3xl">lock</span>
          </div>
          <h1 className="text-2xl font-black text-primary tracking-tight">Admin Portal</h1>
          <p className="text-on-surface-variant mt-2 text-center text-sm">
            Enter your secure password to access the dashboard.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">
              Secret Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ghost-input text-lg tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-error-container text-on-error-container text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/10"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-on-surface-variant hover:text-primary transition-colors text-xs font-medium">
            ← Back to Public Site
          </a>
        </div>
      </div>
    </div>
  );
}
