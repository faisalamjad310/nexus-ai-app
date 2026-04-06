"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import AppNav from "@/components/app/AppNav";
import ChatHub from "@/components/app/chat/ChatHub";
import MarketplaceView from "@/components/app/marketplace/MarketplaceView";
import AgentsHub from "@/components/app/agents/AgentsHub";
import ResearchView from "@/components/app/research/ResearchView";
import ModelModal from "@/components/shared/ModelModal";
import Toast from "@/components/shared/Toast";
import { ActiveTab, openApp } from "@/store/appSlice";
import { setSession } from "@/store/authSlice";
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
  apiSession,
  apiGuest,
  apiModels,
  apiLabs,
  apiAgents,
  apiResearch,
} from "@/lib/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
export default function AppWorkspace({ tab }: { tab: ActiveTab }) {
  const dispatch = useDispatch();
  const modelsStatus = useSelector((s: RootState) => s.models.status);
  useEffect(() => {
    dispatch(openApp(tab));
  }, [dispatch, tab]);
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
      .catch((err) => {
        console.error("Failed to fetch catalog:", err);
        dispatch(setModelsError());
        dispatch(setAgentsError());
      });
  }, [dispatch, modelsStatus]);
  useEffect(() => {
    apiSession()
      .then(({ authenticated, user }) => {
        if (authenticated && user) {
          dispatch(
            setSession({
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.name[0]?.toUpperCase() ?? "U",
              plan: user.plan,
              guestMode: false,
            }),
          );
        } else {
          apiGuest()
            .then((guestUser) => {
              dispatch(
                setSession({
                  id: guestUser.id,
                  name: guestUser.name,
                  email: guestUser.email,
                  avatar: guestUser.name[0]?.toUpperCase() ?? "G",
                  plan: guestUser.plan,
                  guestMode: true,
                }),
              );
            })
            .catch((err) => {
              console.error("Failed to create guest session", err);
              dispatch(setSession(null));
            });
        }
      })
      .catch((err) => {
        console.warn("Session check failed, trying guest:", err);
        apiGuest()
          .then((guestUser) => {
            dispatch(
              setSession({
                id: guestUser.id,
                name: guestUser.name,
                email: guestUser.email,
                avatar: guestUser.name[0]?.toUpperCase() ?? "G",
                plan: guestUser.plan,
                guestMode: true,
              }),
            );
          })
          .catch((err) => {
            console.error("Failed to create guest session", err);
            dispatch(setSession(null));
          });
      });
  }, [dispatch]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col h-screen overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <AppNav />
        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {tab === "chat" && (
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
            {tab === "marketplace" && (
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
            {tab === "agents" && (
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
            {tab === "research" && (
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
      <ModelModal />
      <Toast />
    </>
  );
}
