export const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <iframe
    className="w-full aspect-video rounded-xl"
    src={`https://www.youtube.com/embed/${embedId}`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
  />
)


