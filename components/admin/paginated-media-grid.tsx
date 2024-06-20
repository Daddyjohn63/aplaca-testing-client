'use client'
import Link from "next/link";
import { PaginationControls } from "@/components/pagination-controls";
import Image from "next/image";
import { type Media } from "@prisma/client";
import { siteConfig } from "@/site-config";

type MediaGridProps = {
  data: Media[];
  page: number;
  count: number;
  totalPages: number;
}

const PaginatedMediaGrid = (props: MediaGridProps) => {

  const {data, count, page, totalPages} = props;

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data && data.map((media) => {
          return (
            <div key={media.id} className="space-y-4">

              <div className="w-full aspect-video rounded-md overflow-hidden flex items-center justify-center bg-muted border-2 border-transparent hover:border-primary">
                <Link href={`/admin/media/update-media/${media.id}`}>
                <Image
                  src={`${siteConfig.fileStorage.bucketUrl}/${media.imagePath}`}
                  className="w-full"
                  alt={media.altText || 'media item'}
                  width="550"
                  height="310"
                />
              </Link>
              </div>
            </div>
          )
        })}
      </div>
      <div className="pt-10">
        {count > 0 ? <PaginationControls totalPages={totalPages} page={page}/> : ''}
      </div>
    </div>
  )

}

export default PaginatedMediaGrid
