"use client";

import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useMockAuth } from "@/lib/mockAuthClient";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useMockAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-50 mx-auto flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-end md:ml-auto">
        <div className="flex items-center gap-x-2">
          {isLoading && <Spinner />}
          {!isLoading && !isAuthenticated && (
            <>
              <Button variant="ghost" size="sm" onClick={() => console.log("Mock sign in")}>
                Log In
              </Button>
              <Button size="sm" onClick={() => console.log("Mock sign up")}>
                Get Zotion Free
              </Button>
            </>
          )}

          {isAuthenticated && !isLoading && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/documents"> Enter Zotion </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => console.log("Mock user menu")}>
                User
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
