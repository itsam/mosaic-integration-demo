import { Outlet } from "@tanstack/react-router";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="mt-16 flex flex-1 flex-col gap-4 p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
