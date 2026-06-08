import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const cookieStore = await cookies();

  if (cookieStore.get(AUTH_COOKIE_NAME)) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
