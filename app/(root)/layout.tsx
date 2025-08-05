import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import {
  getCurrentUser,
  isAuthenticated,
  signOut,
} from "@/lib/actions/auth.action";
import LogoutButton from "@/components/ui/Logout";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();
  if (!isUserAuthenticated) {
    // Get current path
    const currentPath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : "";
    redirect(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
  }

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/this_logo.png"
            alt="MockMate Logo"
            width={38}
            height={28}
            style={{ borderRadius: "8px" }}
          />

          <h2 className="text-primary-100">Intellihire</h2>
        </Link>
        <div className="flex items-center gap-4">
          <p>{user?.name}</p>
          {isUserAuthenticated && <LogoutButton />}
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
