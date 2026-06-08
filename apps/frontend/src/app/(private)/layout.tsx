import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthSessionGate } from "@/features/auth/components/AuthSessionGate";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { UserGreeting } from "@/features/auth/components/UserGreeting";
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
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-lg border border-stone-200 bg-[var(--surface)] px-4 py-4 shadow-sm">
          <UserGreeting />
          <LogoutButton />
        </header>
        <main className="mx-auto mt-6 w-full max-w-6xl">{children}</main>
      </div>
    </AuthSessionGate>
  );
}
