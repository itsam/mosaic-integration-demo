import { useOidc } from "@/oidc";
import { CircleUser, ExternalLink, LogOut, UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenuDropdown() {
  const { oidcTokens, logout } = useOidc();

  const data = {
    user: {
      name: oidcTokens?.decodedIdToken.name,
      email: oidcTokens?.decodedIdToken.email,
      role: "Administrator",
      avatar: "/avatars/user.jpg",
      initials: oidcTokens?.decodedIdToken.name
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase(),
    },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={data.user.avatar} alt={data.user.name} />
              <AvatarFallback className="rounded-lg">
                {data.user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{data.user.name}</span>
              <span className="truncate text-xs">{data.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_OIDC_ISSUER}/account`,
                "_blank",
              )
            }
          >
            <UserCircle2 />
            <div className="flex items-center gap-2">
              <span>My Account</span>
              <ExternalLink />
            </div>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout?.({ redirectTo: "home" })}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
