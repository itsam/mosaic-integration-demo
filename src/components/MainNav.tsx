import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenuDropdown } from "./UserMenuDropdown";
import { ChevronsLeftRightEllipsisIcon, LockKeyholeOpen } from "lucide-react";

export function MainNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-neutral-800">
      <div className="flex h-16 w-full flex-row items-center justify-between px-2">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 px-2">
            <div className="flex aspect-square size-8 items-center justify-center">
              <img
                className=""
                src="/images/logo.svg"
                alt="Buildings drawing as IMC logo"
              />
            </div>
            <p className="text-md whitespace-nowrap font-semibold">
              MOSAIC integration demo
            </p>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/token-details"
            className="m-2 flex items-center gap-2 whitespace-nowrap rounded-md p-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-700 md:m-0"
          >
            <LockKeyholeOpen className="h-5 w-5" />
            <span className="hidden md:flex">Token details</span>
          </Link>
          <Link
            to="/gateway"
            className="m-2 flex items-center gap-2 whitespace-nowrap rounded-md p-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-700 md:m-0"
          >
            <ChevronsLeftRightEllipsisIcon className="h-5 w-5" />
            <span className="hidden md:flex">API Gateway</span>
          </Link>
          <UserMenuDropdown />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
