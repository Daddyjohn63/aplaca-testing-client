"use client"

import { Icons } from "@/components/icons";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo";
import { NavItems } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

export function MobileNavBtn({navItemsArray}: {navItemsArray: NavItems[]}) {

  const user = useCurrentUser()
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="px-2"><MenuIcon /></Button>
      </SheetTrigger>
      <SheetContent className="bg-background" side="left" onCloseAutoFocus={event => event.preventDefault()}>
        <SheetHeader>
          <Logo size="md" />
        </SheetHeader>
        <div className="py-5">
          <nav id="mobile-navigation">
            <ul className="space-y-1">
              <li>
               {!user && (
                  <Link href="/login">
                    <Button className="text-md w-full mb-5">Sign In</Button>
                  </Link>
                )} 
              </li>
              {!!navItemsArray && navItemsArray.map((item, i) => {

                const Icon = Icons[item.icon || "dashboard"]

                return (
                  <li key={i}>
                    <SheetClose asChild>
                      <Link href={item.href} className={`${pathname === item.href ? "bg-muted" : ""} hover:bg-primary hover:text-primary-foreground p-3 rounded-sm flex gap-2 items-center`}>
                        {item.icon && <Icon />} {item.text}
                      </Link>
                    </SheetClose>
                    <ul className="pl-4">
                      {item.subMenu && item.subMenu.map((subItem, j) => {
                        return (
                          <li key={j}>
                            <SheetClose asChild>
                              <Link href={subItem.href} className={`${pathname === subItem.href ? "bg-muted" : ""} hover:bg-primary hover:text-primary-foreground text-foreground/60 py-2 px-3 rounded-sm flex gap-2 items-center`}>
                                {subItem.title}</Link>
                            </SheetClose>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
