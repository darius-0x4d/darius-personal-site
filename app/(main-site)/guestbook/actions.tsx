"use client";

import { Button } from "@/components/ui/button";
import { ExitIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <div className="flex justify-end">
      <Button variant="ghost" onClick={() => signOut()}>
        <ExitIcon className="font-bold h-4 w-4" />
        <span className="font-bold pl-2">Sign Out</span>
      </Button>
    </div>
  );
}

export function SignIn() {
  return (
    <Button className="mb-8" onClick={() => signIn("github")}>
      <GitHubLogoIcon />
      <div className="ml-3">Sign in with GitHub</div>
    </Button>
  );
}
