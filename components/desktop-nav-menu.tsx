'use client'

import { marketingNavItems } from "@/constants/nav-routes";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu"

export const DesktopNavMenu = () => {

  return (
    <nav id="desktop-navigation" className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList>
            {!!marketingNavItems && marketingNavItems.map((item, i) => {
            return (
              <NavigationMenuItem key={i} className="mb-2">
                {item.subMenu ? 
                <NavigationMenuTrigger>{item.text}</NavigationMenuTrigger>
                  :
                  <Button variant="ghost"><Link href={item.href}>{item.text}</Link></Button>
                }
                  <NavigationMenuContent >
                  <div className="grid grid-cols-2 w-[450px] p-3 gap-3">
                {item.subMenu && item.subMenu.map((subItem, j) => {
                  return (
                      <NavigationMenuLink key={j} href={subItem.href} className="hover:bg-muted rounded-sm p-3 space-y-1">
                              <h5 className="text-sm">{subItem.title}</h5>
                              <p className="text-xs text-foreground/60">{subItem.text}</p>
                      </NavigationMenuLink>
                  )
                })}
                </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
