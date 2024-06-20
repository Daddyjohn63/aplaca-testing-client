'use client'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CTACardProps {
  image?: string;
  title: string;
  description?: string;
  btnText?: string;
  btnHref?: string;
}

export function CTACard(props: CTACardProps) {

  const {image, title, description, btnText, btnHref} = props;

  return (
    <div className="border border-border bg-background p-5 rounded-md space-y-4">
      {!!image && (
        <Image src={image} width={0} height={0} sizes="100vw" style={{width: '100%', height: 'auto'}} alt={title} className="rounded-sm"/> 
      )}
      <div className="space-y-2">
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-sm">{description}</p>
        {!!btnText && (
          <div className="pt-2">
          <Button>
            <Link href={`${btnHref}`}>{btnText}</Link>
          </Button>
          </div>
        )}
    </div>
    </div>

  )
}
