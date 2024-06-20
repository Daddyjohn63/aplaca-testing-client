'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Zap } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface CTACardProps {
  title?: string;
  description?: string;
  btnText?: string;
  btnHref?: string;
}

export function CTAAlert(props: CTACardProps) {

  const {
    title = "Upgrade Your Account To Get Full Access!",
    description = "You need to upgrade your account before you can get full access!",
    btnText = "Upgrade Now",
    btnHref = '/#pricing-section'
  } = props;

  return (
        <div>
          <Alert className="mb-5 bg-destructive border-0 max-w-3xl">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        <Button asChild className="gap-2">
          <Link href={btnHref}>
            <Zap size={20} /> {btnText}
          </Link>
        </Button>
      </div>

  )
}
