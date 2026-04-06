"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FeaturedModels from "@/components/landing/FeaturedModels";
import Footer from "@/components/landing/Footer";
import AppNav from "@/components/app/AppNav";
import ChatHub from "@/components/app/chat/ChatHub";
import MarketplaceView from "@/components/app/marketplace/MarketplaceView";
import AgentsHub from "@/components/app/agents/AgentsHub";
import ResearchView from "@/components/app/research/ResearchView";
import ModelModal from "@/components/shared/ModelModal";
import Toast from "@/components/shared/Toast";
import { openApp, ActiveTab } from "@/store/appSlice";
import {
  setModels,
  setModelsLoading,
  setModelsError,
  setLabs,
  setResearch,
} from "@/store/modelsSlice";
import {
  setTemplates,
  setAgentsLoading,
  setAgentsError,
} from "@/store/agentSlice";
import {
  apiModels,
  apiLabs,
  apiAgents,
  apiResearch,
} from "@/lib/api";
export default function Home() {
  const dispatch = useDispatch();
  const { activePage, activeTab } = useSelector((s: RootState) => s.app);
  const modelsStatus = useSelector((s: RootState) => s.models.status);
  useEffect(() => {
    if (modelsStatus === "loading" || modelsStatus === "loaded") return;
    dispatch(setModelsLoading());
    dispatch(setAgentsLoading());
    Promise.all([apiModels(), apiLabs(), apiAgents(), apiResearch()])
      .then(([models, labs, agents, research]) => {
        dispatch(setModels(models));
        dispatch(setLabs(labs));
        dispatch(setTemplates(agents));
        dispatch(setResearch(research));
      })
      .catch(() => {
        dispatch(setModelsError());
        dispatch(setAgentsError());
      });
  }, [dispatch, modelsStatus]);
  useEffect(() => {
    const open = new URLSearchParams(window.location.search).get("open");
    if (!open) return;
    if (
      open === "chat" ||
      open === "marketplace" ||
      open === "agents" ||
      open === "research"
    ) {
      dispatch(openApp(open as ActiveTab));
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("open");
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, [dispatch]);
  return (
    <>
      <AnimatePresence mode="wait">
        {activePage === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col min-h-screen"
            style={{ background: "var(--bg)" }}
          >
            <Navbar />
            <Hero />
            <FeaturedModels />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col h-screen overflow-hidden"
            style={{ background: "var(--bg)" }}
          >
            <AppNav />
            <div className="flex-1 flex overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-1 overflow-hidden"
                  >
                    <ChatHub />
                  </motion.div>
                )}
                {activeTab === "marketplace" && (
                  <motion.div
                    key="marketplace"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col flex-1 overflow-hidden"
                  >
                    <MarketplaceView />
                  </motion.div>
                )}
                {activeTab === "agents" && (
                  <motion.div
                    key="agents"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col flex-1 overflow-hidden"
                  >
                    <AgentsHub />
                  </motion.div>
                )}
                {activeTab === "research" && (
                  <motion.div
                    key="research"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col flex-1 overflow-hidden"
                  >
                    <ResearchView />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModelModal />
      <Toast />
    </>
  );
}
