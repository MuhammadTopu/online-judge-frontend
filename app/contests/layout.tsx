import { AppConfig } from "@/config/app.config";
import { Metadata } from "next";

// Static metadata
export const metadata: Metadata = {
  title: `Problems - ${AppConfig().app.name}`,
  description: AppConfig().app.meta.description,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
