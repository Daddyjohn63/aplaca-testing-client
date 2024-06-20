import { cn } from "@/lib/utils"
type Props = {
  title: string;
  subtitle?: string;
  className?: string;
}
export function SectionTitle(props: Props) {

  const {title, subtitle, className} = props

  return (
    <div className={cn("space-y-3 mb-10", className)}>
      <h2 className="text-4xl font-black">{title}</h2>
      <p className="text-lg">{subtitle}</p>
    </div>
  )
}
