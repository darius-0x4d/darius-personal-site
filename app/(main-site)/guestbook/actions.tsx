"use client";

import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import {
  ExitIcon,
  GitHubLogoIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-8">Sign the Guestbook</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Choose an account to use to sign the guestbook. Your name associated
            with the account will appear next to your message.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-w-fit justify-self-center">
          <Button
            className="mb-2"
            variant="outline"
            onClick={() => signIn("github")}
          >
            <GitHubLogoIcon />
            <div className="ml-3">Sign in with GitHub</div>
          </Button>
          <Button
            className="mb-2"
            variant="outline"
            onClick={() => signIn("google")}
          >
            <MagnifyingGlassIcon />
            <div className="ml-3">Sign in with Google</div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
