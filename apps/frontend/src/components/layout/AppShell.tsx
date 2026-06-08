import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl gap-6">
        <AppSidebar />
        <div className="min-w-0 flex-1">
          <AppHeader />
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
