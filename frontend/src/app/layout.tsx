import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import LocalizationProvider from "@/providers/LocalizationProvider";
export const metadata: Metadata = {
  title: "NexusAI — Find your perfect AI model · Guided discovery",
  description:
    "No AI experience needed — guided discovery helps you find the right model. Browse 220+ models from leading labs.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <LocalizationProvider>{children}</LocalizationProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
