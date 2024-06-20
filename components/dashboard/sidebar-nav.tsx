'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { Zap } from "lucide-react";
import { NavItems } from "@/types";


export function DashboardSidebarNav(
  {data, hasAccess}: {data: NavItems[], hasAccess: boolean | undefined}
) {

  const pathname = usePathname()

  return (
      <div>
      <ul className="space-y-1">
        {!!data && data.map((item, i) => {

          const Icon = Icons[item.icon || "dashboard"]

          return (
            <li key={i}>
                <Link href={item.href} className={`${item.href === pathname ? "bg-muted-foreground/30" : ""} flex gap-3 w-full justify-between items-center p-3 hover:bg-primary hover:text-primary-foreground rounded-md`}>
                  <div className="flex justify-left gap-3">
                 <Icon /> 
                  {item.text}
                  </div>
                  {!!item.upgrade && !hasAccess && <Zap className="border border-muted-foreground r-md p-[5px] w-7 h-7 rounded-md" />}
                </Link>
            </li>
          ) 
         })}
      </ul>
  </div>
  )
}
