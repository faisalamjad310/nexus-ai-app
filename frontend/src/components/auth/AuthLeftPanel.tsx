"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiZap, FiCpu } from "react-icons/fi";
interface AuthLeftPanelProps {
  mode: "signin" | "signup";
}
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
export default function AuthLeftPanel({ mode }: AuthLeftPanelProps) {
  const { t } = useTranslation();
  const FEATURES = [
    {
      icon: "🧠",
      title: t("auth.features.models_title"),
      desc: t("auth.features.models_desc"),
    },
    {
      icon: "⚡",
      title: t("auth.features.deploy_title"),
      desc: t("auth.features.deploy_desc"),
    },
    {
      icon: "📊",
      title: t("auth.features.compare_title"),
      desc: t("auth.features.compare_desc"),
    },
    {
      icon: "🤖",
      title: t("auth.features.build_title"),
      desc: t("auth.features.build_desc"),
    },
  ];
  return (
    <div
      className="hidden lg:flex flex-col justify-between p-10 xl:p-12 relative overflow-hidden text-left"
      style={{
        background:
          "linear-gradient(155deg, #18181b 0%, #27272a 42%, #18181b 100%)",
        minWidth: 400,
        maxWidth: 460,
        flex: "0 0 auto",
      }}
    >
      <div
        className="absolute top-[-70px] right-[-70px] w-[280px] h-[280px] rounded-full opacity-[0.14]"
        style={{
          background: "radial-gradient(circle, #a1a1aa, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-[-50px] left-[-50px] w-[220px] h-[220px] rounded-full opacity-[0.1]"
        style={{
          background: "radial-gradient(circle, #a1a1aa, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fafafa 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-2.5 relative z-10"
      >
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-neutral-500 to-neutral-600 flex items-center justify-center shadow-md">
          <FiZap size={17} className="text-white" />
        </div>
        <span
          className="font-syne text-xl font-bold text-white"
          style={{ letterSpacing: "-0.03em" }}
        >
          NexusAI
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className="relative z-10 flex flex-col items-center text-center my-6 xl:my-8"
      >
        <div className="mb-5 xl:mb-6 flex items-center justify-center w-[120px] h-[120px] rounded-full border-2 border-white/15 bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          <FiCpu
            size={52}
            className="text-neutral-300"
            strokeWidth={1.25}
            aria-hidden
          />
        </div>
        <h2
          className="font-syne text-[1.65rem] xl:text-[1.95rem] font-bold text-white leading-[1.15] mb-3 max-w-[340px]"
          style={{ letterSpacing: "-0.035em" }}
        >
          {t("auth.panel.headline")}
        </h2>
        <p className="text-white/55 text-[0.86rem] xl:text-[0.9rem] leading-relaxed font-instrument max-w-[360px]">
          {t("auth.panel.sub")}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[0.7rem] text-white/60 font-instrument">
          <span className="w-1.5 h-1.5 bg-emerald-400/90 rounded-full animate-pulse flex-shrink-0" />
          {mode === "signin"
            ? t("auth.badges.signin_title")
            : t("auth.badges.signup_title")}
        </div>
      </motion.div>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3 relative z-10"
      >
        {FEATURES.map((f) => (
          <motion.li
            key={f.title}
            variants={item}
            className="flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/[0.1] flex items-center justify-center text-base flex-shrink-0">
              {f.icon}
            </div>
            <div className="min-w-0">
              <div className="text-[0.82rem] font-semibold text-white font-instrument leading-tight">
                {f.title}
              </div>
              <div className="text-[0.72rem] text-white/48 font-instrument leading-snug mt-0.5">
                {f.desc}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
