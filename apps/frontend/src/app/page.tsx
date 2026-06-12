/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por redirecionar a home para dashboard.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/dashboard");
}
