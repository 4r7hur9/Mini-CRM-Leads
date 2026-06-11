/**
 * Pagina ou layout do App Router.
 *
 * Responsavel por layout das telas publicas de auth.
 *
 * Funciona como ponto de entrada visual do Next.js.
 */
type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <>{children}</>;
}
