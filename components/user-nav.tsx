"use client";

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
import { userNavItems } from "@/constants/nav-routes";
import Link from "next/link";
import { signOut } from "next-auth/react"

export function UserNav({user}: any) {

  if (!!user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="hover:text-primary relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 border-2 border-foreground">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.name ?? ""}
              />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {!!userNavItems && userNavItems.map((item, i) => {
              return (
                <Link href={item.href} key={i}>
                  <DropdownMenuItem> 
                    {item.text}
                  </DropdownMenuItem>
                  </Link>
              )
            })}
          </DropdownMenuGroup>
          {user.role === "ADMIN" && ( 
            <>
              <DropdownMenuSeparator />
              <Link href="/admin">
              <DropdownMenuItem className="bg-destructive">
                  Admin
              </DropdownMenuItem>
              </Link>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
