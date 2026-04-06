"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { openApp, showToast } from "@/store/appSlice";

export default function Footer() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      dispatch(showToast(t("auth.validation.email")));
      return;
    }
    dispatch(showToast(t("landing.footer.newsletter_thanks")));
    setEmail("");
  };

  const barLinks: { label: string; action: () => void }[] = [
    {
      label: t("landing.footer.bar_models"),
      action: () => router.push("/marketplace"),
    },
    {
      label: t("landing.footer.bar_research"),
      action: () => router.push("/research"),
    },
    {
      label: t("landing.footer.links.api"),
      action: () => router.push("/chat"),
    },
    {
      label: t("landing.footer.bar_privacy"),
      action: () => dispatch(showToast(t("agents.chat.coming_soon"))),
    },
    {
      label: t("landing.footer.bar_terms"),
      action: () => dispatch(showToast(t("agents.chat.coming_soon"))),
    },
  ];

  return (
    <footer className="text-white">
      <div className="bg-[#18181b] px-4 sm:px-8 md:px-10 py-14 sm:py-20 md:py-24">
        <div className="max-w-[640px] mx-auto text-center">
          <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-4 font-instrument">
            {t("landing.footer.newsletter_kicker")}
          </p>
          <h2 className="font-syne text-[1.65rem] sm:text-2xl md:text-[1.85rem] font-bold text-white leading-tight mb-3 sm:mb-4">
            {t("landing.footer.newsletter_title_1")}
            <br />
            {t("landing.footer.newsletter_title_2")}
          </h2>
          <p className="text-[0.88rem] sm:text-[0.92rem] text-zinc-400 leading-relaxed mb-8 sm:mb-10 font-instrument">
            {t("landing.footer.newsletter_desc")}
          </p>

          <form
            onSubmit={onSubscribe}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-2 max-w-[520px] mx-auto mb-5"
          >
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("landing.footer.email_placeholder")}
              className="flex-1 min-w-0 rounded-full bg-zinc-900/80 border border-zinc-700/90 px-5 py-3.5 text-[0.88rem] text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/40 font-instrument transition-colors"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-zinc-100 text-zinc-900 px-6 sm:px-7 py-3.5 text-[0.88rem] font-semibold font-instrument hover:bg-white transition-colors border-none cursor-pointer whitespace-nowrap"
            >
              {t("landing.footer.subscribe_cta")}
            </button>
          </form>

          <p className="text-[0.72rem] sm:text-[0.75rem] text-zinc-500 font-instrument">
            {t("landing.footer.newsletter_trust")}
          </p>
        </div>
      </div>

      <div className="bg-[#0c0c0e] border-t border-zinc-800/80 px-4 sm:px-8 md:px-10 py-4 sm:py-5">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => {
              dispatch(openApp("marketplace"));
              router.push("/");
            }}
            className="text-left text-[0.78rem] sm:text-[0.8rem] text-zinc-300 hover:text-white transition-colors font-instrument border-none bg-transparent cursor-pointer"
          >
            {t("landing.footer.bar_brand")}
          </button>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:gap-x-8">
            {barLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="text-[0.75rem] sm:text-[0.78rem] text-zinc-400 hover:text-white transition-colors font-instrument border-none bg-transparent cursor-pointer p-0"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
