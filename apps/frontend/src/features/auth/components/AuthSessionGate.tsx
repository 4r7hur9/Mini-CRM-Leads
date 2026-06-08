"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

type AuthSessionGateProps = {
  children: React.ReactNode;
};

export function AuthSessionGate({ children }: AuthSessionGateProps) {
  const router = useRouter();
  const loadCurrentUser = useAuthStore((state) => state.loadCurrentUser);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    let active = true;

    loadCurrentUser().then((user) => {
      if (active && !user) {
        router.replace("/login");
      }
    });

    return () => {
      active = false;
    };
  }, [loadCurrentUser, router]);

  if (status === "loading" || status === "idle") {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-stone-700">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-teal-700" />
      </div>
    );
  }

  return <>{children}</>;
}
