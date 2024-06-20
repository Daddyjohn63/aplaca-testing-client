'use client'

import Link from "next/link"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site-config";

type LogoProps = {
  size?: string;
  variant?: string;
  className?: string;
}

type Size = {
  width: number;
  height: number;
}

type Sizes = {
  [key: string]: Size
}

const sizes: Sizes = {
  xs: { width: 150, height: 29 },
  sm: { width: 200, height: 39 },
  md: { width: 255, height: 50 },
  lg: { width: 300, height: 58 },
  xl: { width: 350, height: 68 },
}

type Variants = {
  [key: string]: string
}

const variants: Variants = {
  light: "/logo_horizontal_lightmode.svg",
  dark: "/logo_horizontal_darkmode.svg"
}

export const Logo = (props: LogoProps) => {

  const { size = "sm", variant, className } = props

  //If variant is not defined, set to darkmode
  let defaultVariant = variant || 'dark'

  //If variant is not set by user, and theme color is light, set logo to light
  if(!variant) {
    if(siteConfig.themeColor === 'light') {
      defaultVariant = 'light';
    }  
  }

  const { width, height } = sizes[size] || sizes.sm
  const logo_variant = variants[defaultVariant] || variants.light

  return (
      <Link
        href={"/"}
        className={cn(className)}
      >
        <Image priority alt="Logo" src={logo_variant} width={width} height={height} />
      </Link>
  )
}
