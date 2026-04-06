"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { FiX } from "react-icons/fi";
import type { RootState } from "@/store";
import AuthLeftPanel from "@/components/auth/AuthLeftPanel";
import AuthForm from "@/components/auth/AuthForm";
type Mode = "signin" | "signup";
function safeNext(next: string | null) {
  if (!next) return "/";
  if (!next.startsWith("/")) return "/";
  if (next.startsWith("//")) return "/";
  return next;
}
export default function AuthShell({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextHref = safeNext(searchParams.get("next"));
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) router.replace(nextHref);
  }, [isAuthenticated, nextHref, router]);
  return (
    <div
      className="min-h-screen flex items-center justify-center px-3 py-8 sm:py-10 md:py-14"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative w-full max-w-[1000px] rounded-[22px] sm:rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] border border-black/[0.08] bg-white flex flex-col lg:flex-row">
        <button
          type="button"
          aria-label="Close"
          onClick={() => router.push("/")}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center text-text2 hover:text-text1 hover:bg-black/[0.05] transition-colors border-none bg-white/90 backdrop-blur-sm cursor-pointer"
        >
          <FiX size={18} strokeWidth={2} />
        </button>
        <AuthLeftPanel mode={mode} />
        <div className="flex-1 flex flex-col justify-center px-5 sm:px-9 lg:px-11 py-10 sm:py-12 lg:py-14 min-h-[min(520px,90vh)]">
          <AuthForm mode={mode} />
        </div>
      </div>
    </div>
  );
}
