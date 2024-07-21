"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/ui/mode-toggle";

const navItems = {
  "/": {
    name: "home",
    x: 0,
    y: 0,
    w: "64px",
  },
  "/blog": {
    name: "blog",
    x: 63,
    y: 34,
    w: "56px",
  },
  // "/guestbook": {
  //   name: "guestbook",
  //   x: 118,
  //   y: 69,
  //   w: "100px",
  // },
};

function Logo() {
  return (
    <Link aria-label="Darius McFarland" href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        aria-hidden="true"
        viewBox="0 0 128 128"
        className="fill-sky-500 dark:fill-cyan-500"
      >
        <path d="M65.71 15.31h-43.6c-1.25 0-2.24 1-2.24 2.24v100.96c0 1.24 1 2.24 2.24 2.24H65.7c30.15 0 50.43-21.19 50.43-52.73 0-31.53-20.27-52.71-50.42-52.71zm-1.29 80.8c-.28 0-.54-.07-.79-.16-.06.01-.11.03-.17.03-.08.01-.14.04-.22.04h-14.7c-1.2 0-2.16-.97-2.16-2.16V42.19c0-1.19.96-2.16 2.16-2.16h14.7c.08 0 .14.03.22.04.05 0 .11.02.17.03.25-.09.51-.16.79-.16.43 0 .86.04 1.29.06.75.03 1.5.09 2.24.18 13.11 1.63 21.69 12.39 21.69 27.84s-8.59 26.21-21.69 27.84c-.74.09-1.49.15-2.24.18-.43.03-.86.07-1.29.07z"></path>
      </svg>
    </Link>
  );
}

export default function Navbar() {
  let pathname = usePathname();
  if (pathname?.includes("/blog/")) {
    pathname = "/blog";
  }
  pathname = pathname as string;

  return (
    <aside className="md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0">
      <div className="lg:sticky lg:top-20">
        <div className="ml-2 md:ml-[12px] mb-2 px-4 md:px-0 md:mb-8 space-y-10 flex flex-col md:flex-row items-start ">
          <Logo />
        </div>
        <nav
          className="flex flex-row md:flex-col items-start relative overflow-hidden pl-4 pr-8 justify-between md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
            {navItems[pathname as string] ? (
              <>
                {/* Desktop version, hidden on mobile, animates y axis */}
                <div className="hidden md:block">
                  <motion.div
                    className="absolute bg-accent dark:bg-slate-800 h-[34px] rounded-md z-[-1]"
                    layoutId="test2"
                    initial={{ opacity: 0, y: navItems[pathname].y }}
                    animate={{
                      opacity: 1,
                      y: navItems[pathname].y,
                      width: navItems[pathname].w,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
                {/* Mobile version, hidden on desktop, animates x axis */}
                <div className="block md:hidden">
                  <motion.div
                    className="absolute bg-accent dark:bg-slate-800 h-[34px] rounded-md z-[-1]"
                    layoutId="test"
                    initial={{ opacity: 0, x: navItems[pathname].x }}
                    animate={{
                      opacity: 1,
                      x: navItems[pathname].x,
                      width: navItems[pathname].w,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                </div>
              </>
            ) : null}

            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname;

              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-[5px] px-[10px]",
                    {
                      "text-muted-foreground": !isActive,
                      "font-bold": isActive,
                    }
                  )}
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div className="mt-1 md:mt-0">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </aside>
  );
}
