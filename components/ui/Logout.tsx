"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { signOut } from "@/lib/actions/auth.action";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
