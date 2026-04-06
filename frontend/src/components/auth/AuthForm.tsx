"use client";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SiGoogle, SiGithub } from "react-icons/si";
import { IoLogoMicrosoft } from "react-icons/io5";
import type { RootState } from "@/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  clearError,
  AuthUser,
} from "@/store/authSlice";
import { showToast } from "@/store/appSlice";
import { apiLogin, apiSignup } from "@/lib/api";
type Mode = "signin" | "signup";
function safeNext(next: string | null) {
  if (!next) return "/";
  if (!next.startsWith("/")) return "/";
  if (next.startsWith("//")) return "/";
  return next;
}
export default function AuthForm({ mode }: { mode: Mode }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading, error } = useSelector((s: RootState) => s.auth);
  const nextHref = useMemo(
    () => safeNext(searchParams.get("next")),
    [searchParams],
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const goTab = (target: Mode) => {
    if (target === mode) return;
    const path = target === "signin" ? "/login" : "/signup";
    router.push(`${path}?next=${encodeURIComponent(nextHref)}`);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes("@")) {
      dispatch(
        (mode === "signin" ? loginFailure : signupFailure)(
          t("auth.validation.email"),
        ),
      );
      return;
    }
    if (password.trim().length < 6) {
      dispatch(
        (mode === "signin" ? loginFailure : signupFailure)(
          t("auth.validation.password_min"),
        ),
      );
      return;
    }
    if (mode === "signup" && name.trim().length < 2) {
      dispatch(signupFailure(t("auth.validation.name")));
      return;
    }
    try {
      if (mode === "signin") dispatch(loginStart());
      else dispatch(signupStart());
      const result =
        mode === "signin"
          ? await apiLogin(cleanEmail, password.trim())
          : await apiSignup(name.trim(), cleanEmail, password.trim());
      const user: AuthUser = {
        id: result.id,
        name: result.name,
        email: result.email,
        avatar: result.name[0]?.toUpperCase() ?? "U",
        plan: result.plan,
      };
      if (mode === "signin") dispatch(loginSuccess(user));
      else dispatch(signupSuccess(user));
      router.replace(nextHref);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("auth.error.generic");
      dispatch((mode === "signin" ? loginFailure : signupFailure)(message));
    }
  };
  const inputClass =
    "w-full rounded-xl border border-black/[0.12] bg-[#f4f4f5] px-4 py-3 text-[0.9rem] outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(115,115,115,0.12)] font-instrument transition-colors";
  const socialSoon = () => dispatch(showToast(t("auth.form.social_soon")));
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="flex gap-8 border-b border-black/[0.1] mb-7">
        <button
          type="button"
          onClick={() => goTab("signin")}
          className={`pb-3 text-[0.9rem] font-instrument font-semibold border-b-[3px] -mb-px transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 ${
            mode === "signin"
              ? "text-text1 border-accent"
              : "text-text3 border-transparent hover:text-text2"
          }`}
        >
          {t("auth.form.tab_signin")}
        </button>
        <button
          type="button"
          onClick={() => goTab("signup")}
          className={`pb-3 text-[0.9rem] font-instrument font-semibold border-b-[3px] -mb-px transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 ${
            mode === "signup"
              ? "text-text1 border-accent"
              : "text-text3 border-transparent hover:text-text2"
          }`}
        >
          {t("auth.form.tab_signup")}
        </button>
      </div>
      <div className="mb-6">
        <h1
          className="font-syne text-[1.75rem] sm:text-[1.9rem] font-bold text-text1"
          style={{ letterSpacing: "-0.04em" }}
        >
          {mode === "signin"
            ? t("auth.form.signin_welcome")
            : t("auth.form.signup_title")}
        </h1>
        <p className="text-text2 text-[0.9rem] font-instrument mt-1.5 leading-relaxed">
          {mode === "signin"
            ? t("auth.form.signin_lead")
            : t("auth.form.signup_lead")}
        </p>
      </div>
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-50 px-4 py-3 text-[0.85rem] text-red-700 font-instrument">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-[0.8rem] text-text2 font-medium font-instrument mb-1.5">
              {t("auth.form.labels.name")}
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder={t("auth.form.placeholders.name")}
              autoComplete="name"
            />
          </div>
        )}
        <div>
          <label className="block text-[0.8rem] text-text2 font-medium font-instrument mb-1.5">
            {t("auth.form.labels.email_address")}
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder={t("auth.form.placeholders.email")}
            autoComplete="email"
            inputMode="email"
          />
        </div>
        <div>
          <label className="block text-[0.8rem] text-text2 font-medium font-instrument mb-1.5">
            {t("auth.form.labels.password")}
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder={
              mode === "signin"
                ? t("auth.form.placeholders.password_signin")
                : t("auth.form.placeholders.password")
            }
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
          />
        </div>
        {mode === "signin" && (
          <div className="flex justify-end -mt-1">
            <button
              type="button"
              onClick={socialSoon}
              className="text-[0.82rem] font-medium text-accent hover:text-accent2 font-instrument bg-transparent border-none cursor-pointer p-0"
            >
              {t("auth.form.forgot_password")}
            </button>
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent text-white text-[0.92rem] font-semibold rounded-xl px-5 py-3.5 hover:bg-accent2 transition-colors cursor-pointer font-instrument border-none disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading
            ? t("auth.form.buttons.wait")
            : mode === "signin"
              ? t("auth.form.buttons.signin")
              : t("auth.form.buttons.signup")}
        </button>
      </form>
      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/[0.1]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-3 text-[0.75rem] text-text3 font-instrument">
            {t("auth.form.or_continue")}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        <button
          type="button"
          onClick={socialSoon}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-black/[0.12] bg-white py-2.5 px-1 text-[0.72rem] sm:text-[0.78rem] font-medium text-text1 hover:bg-[#f4f4f5] hover:border-black/[0.16] transition-colors cursor-pointer font-instrument"
        >
          <SiGoogle className="text-[1.1rem] shrink-0" aria-hidden />
          <span className="hidden sm:inline">Google</span>
        </button>
        <button
          type="button"
          onClick={socialSoon}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-black/[0.12] bg-white py-2.5 px-1 text-[0.72rem] sm:text-[0.78rem] font-medium text-text1 hover:bg-[#f4f4f5] hover:border-black/[0.16] transition-colors cursor-pointer font-instrument"
        >
          <SiGithub className="text-[1.1rem] shrink-0" aria-hidden />
          <span className="hidden sm:inline">GitHub</span>
        </button>
        <button
          type="button"
          onClick={socialSoon}
          className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-black/[0.12] bg-white py-2.5 px-1 text-[0.72rem] sm:text-[0.78rem] font-medium text-text1 hover:bg-[#f4f4f5] hover:border-black/[0.16] transition-colors cursor-pointer font-instrument"
        >
          <IoLogoMicrosoft className="text-[1.1rem] shrink-0" aria-hidden />
          <span className="hidden sm:inline">Microsoft</span>
        </button>
      </div>
      <div className="mt-8 text-center text-[0.86rem] text-text2 font-instrument">
        {mode === "signin" ? (
          <span>
            {t("auth.form.footer_no_account")}{" "}
            <button
              type="button"
              onClick={() =>
                router.push(`/signup?next=${encodeURIComponent(nextHref)}`)
              }
              className="text-accent hover:text-accent2 font-semibold bg-transparent border-none cursor-pointer p-0 inline"
            >
              {t("auth.form.footer_create_one")} →
            </button>
          </span>
        ) : (
          <span>
            {t("auth.form.footer_have_account")}{" "}
            <button
              type="button"
              onClick={() =>
                router.push(`/login?next=${encodeURIComponent(nextHref)}`)
              }
              className="text-accent hover:text-accent2 font-semibold bg-transparent border-none cursor-pointer p-0 inline"
            >
              {t("auth.form.footer_sign_in")} →
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
