"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { openApp } from "@/store/appSlice";
import {
  apiFlagshipComparison,
  type FlagshipComparisonRow,
  type FlagshipSpeedTier,
} from "@/lib/api";

function SpeedCell({ tier }: { tier: FlagshipSpeedTier }) {
  if (tier === "fastest") {
    return (
      <span className="inline-flex items-center gap-1.5 text-text2">
        <span className="text-base leading-none" aria-hidden>
          ⚡
        </span>
        <span className="text-[0.78rem] sm:text-sm font-medium">Fastest</span>
      </span>
    );
  }
  if (tier === "fast") {
    return (
      <span className="inline-flex items-center gap-1.5 text-text2">
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-green"
          aria-hidden
        />
        <span className="text-[0.78rem] sm:text-sm font-medium">Fast</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-text2">
      <span
        className="h-2 w-2 shrink-0 rounded-full bg-amber"
        aria-hidden
      />
      <span className="text-[0.78rem] sm:text-sm font-medium">Moderate</span>
    </span>
  );
}

export default function FlagshipComparison() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [rows, setRows] = useState<FlagshipComparisonRow[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    apiFlagshipComparison()
      .then((data) => {
        if (!cancelled) {
          setRows(data);
          setLoadState("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showTable = rows.length > 0;
  const loading = loadState === "loading";

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-8 md:px-10 bg-bg2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-5 sm:mb-8 min-w-0">
        <div className="min-w-0">
          <h2
            className="font-syne text-[1.4rem] sm:text-[1.9rem] font-bold text-text1"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("landing.comparison_title")}
          </h2>
          <p className="text-[0.82rem] sm:text-[0.85rem] text-text2 mt-1 max-w-2xl">
            {t("landing.comparison_subtitle")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(openApp("marketplace"))}
          className="text-[0.82rem] sm:text-[0.85rem] text-accent font-medium cursor-pointer hover:underline font-instrument shrink-0 self-start sm:self-auto"
        >
          {t("landing.comparison_cta")}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-black/[0.08] bg-card shadow-card overflow-hidden min-w-0"
      >
        <div className="overflow-x-auto min-w-0 -mx-px">
          <table className="w-full min-w-[880px] text-left border-collapse">
            <thead>
              <tr className="bg-bg3/60 border-b border-black/[0.06]">
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_model")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_lab")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_context")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_input")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_output")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3 text-center">
                  {t("landing.comparison_col_multimodal")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_speed")}
                </th>
                <th className="py-3 px-3 sm:px-4 text-[0.65rem] sm:text-[0.68rem] font-semibold uppercase tracking-wide text-text3">
                  {t("landing.comparison_col_best")}
                </th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={`sk-${i}`} className="border-b border-black/[0.06]">
                    <td colSpan={8} className="py-3 px-4">
                      <div className="h-4 rounded bg-bg3/80 animate-pulse" />
                    </td>
                  </tr>
                ))}
              {loadState === "error" && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-8 px-4 text-center text-sm text-text3"
                  >
                    {t("landing.comparison_error")}
                  </td>
                </tr>
              )}
              {!loading &&
                showTable &&
                rows.map((row) => (
                  <tr
                    key={row.model}
                    className="border-b border-black/[0.06] last:border-b-0 hover:bg-accent-lt/40 transition-colors"
                  >
                    <td className="py-2.5 px-3 sm:px-4">
                      <span className="inline-flex items-center gap-2 min-w-0">
                        <span
                          className="text-base sm:text-lg shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-bg2"
                          aria-hidden
                        >
                          {row.icon}
                        </span>
                        <span className="font-semibold text-text1 text-[0.8rem] sm:text-sm truncate">
                          {row.model}
                        </span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-[0.78rem] sm:text-sm text-text2 whitespace-nowrap">
                      {row.lab}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-[0.78rem] sm:text-sm text-text2 whitespace-nowrap">
                      {row.context}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-[0.78rem] sm:text-sm text-text1 font-medium whitespace-nowrap">
                      {row.inputPrice}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-[0.78rem] sm:text-sm text-text1 font-medium whitespace-nowrap">
                      {row.outputPrice}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-center text-[0.85rem]">
                      {row.multimodal ? (
                        <span className="text-green" title="Yes">
                          ✓
                        </span>
                      ) : (
                        <span className="text-rose" title="No">
                          ✕
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4">
                      <SpeedCell tier={row.speed} />
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 text-[0.75rem] sm:text-[0.8rem] text-text2 max-w-[14rem]">
                      <span className="break-words">{row.bestFor}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
}
