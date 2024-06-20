import { YoutubeEmbed } from "@/components/youtube-embed";
import { cn } from "@/lib/utils";

export function VideoSection({className}: {className?: string}) {

  const youtubeId = "njX2bu-_Vw4?si=Lf0WKk7dzZqGKQ3j"

  return (
      <section className={cn(className)}>
        <div className="container">
            <YoutubeEmbed embedId={youtubeId} />
        </div>
      </section>
  )
}
