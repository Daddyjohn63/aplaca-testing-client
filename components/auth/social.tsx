"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import {signIn} from "next-auth/react"
import {siteConfig} from "@/site-config";
import {useSearchParams} from "next/navigation"

export const Social = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const defaultLoginRedirect = siteConfig.routes.defaultLoginRedirect;

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || defaultLoginRedirect
    })
  }

  return (
    <div className="flex items-center w-full gap-7">
      <Button size="lg" className="w-full bg-white hover:bg-white/80" variant="outline" onClick={() => onClick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full bg-white hover:bg-white/80" variant="outline" onClick={() => onClick("github")}>
        <FaGithub className="h-5 w-5 text-[#24292e]" />
      </Button>
    </div>
  );
};

export default Social;
