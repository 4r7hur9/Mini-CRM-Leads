/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por layout global do App Router.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastViewport } from "@/components/ui/ToastViewport";

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
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
