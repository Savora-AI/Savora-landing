import { Outlet } from "react-router";
import { Navigation } from "./Navigation";

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--savora-charcoal)] text-white">
      <Navigation />
      <Outlet />
    </div>
  );
}
