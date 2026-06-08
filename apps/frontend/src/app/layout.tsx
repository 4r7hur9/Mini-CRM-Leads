import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini CRM de Leads",
  description: "Frontend do Mini CRM de Leads.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
