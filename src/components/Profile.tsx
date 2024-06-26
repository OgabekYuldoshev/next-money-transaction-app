import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogOut } from "lucide-react";
import React from "react";
import { getUserSession } from "@/lib/actions/user.actions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Profile = async () => {
  const user = await getUserSession();

  const fullname = [user.given_name, user.family_name]
    .filter(Boolean)
    .join(" ");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-2 cursor-pointer">
          <div className="flex flex-col items-end select-none">
            <h1 className="text-sm font-medium">{fullname}</h1>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Avatar>
            <AvatarImage
              src={user.picture || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{user.family_name}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="flex gap-2">
            <LogOut size={18} className="mr-2" />
            <span>Log out</span>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
