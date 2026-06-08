import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { AuthSessionGate } from "@/features/auth/components/AuthSessionGate";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const cookieStore = await cookies();

  if (!cookieStore.get(AUTH_COOKIE_NAME)) {
    redirect("/login");
  }

  return (
    <AuthSessionGate>
      <AppShell>{children}</AppShell>
    </AuthSessionGate>
  );
}
