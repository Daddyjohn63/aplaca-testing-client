'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getSelectMedia } from "@/actions/media/get-media"
import { siteConfig } from "@/site-config"

type Media = {
  id: number;
  imagePath: string;
}

type ModalMediaGridProps = {
  setMediaObj: (imageObj: Media) => void
}

const bucketUrl = siteConfig.fileStorage.bucketUrl;

export const ModalMediaGrid = (props: ModalMediaGridProps) => {

  const {setMediaObj} = props;

  const [mediaData, setMediaData] = useState<any>()
  const [mediaSkip, setMediaSkip] = useState<number>(0)
  const [mediaLimit, setMediaLimit] = useState<number>(12)

  useEffect(()=> {
    const fetchMediaData = async() => {
      const data = await getSelectMedia(mediaLimit, mediaSkip)
    
      if(!data.data || data.data.length <= 0) {
        return
      }
      setMediaData(data.data)
    };
    fetchMediaData()
  },[mediaSkip, mediaLimit])

  const getNextMediaData = async () => {
    setMediaSkip(currentTake => currentTake + mediaLimit)
  }

  const getPrevMediaData = async () => {
    setMediaSkip(currentTake => Math.max(0, currentTake - mediaLimit))
  }

  return (
    <div className="w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 h-[450px] auto-rows-max grid-auto-flow-dense overflow-hidden">
            {mediaData && mediaData.map((media: Media) => {
              return(
                <div key={media.id} className="w-[200px] h-[140px] overflow-hidden">
                  <Image 
                    src={`${bucketUrl}/${media.imagePath}`} 
                    onClick={() => setMediaObj(media)}
                    alt="media image"
                    width="200"
                    height="130"
                  />
                </div>
              )
            })}
      </div>
          <div className="flex justify-center gap-5 mt-4">
            <Button disabled={mediaSkip <= 0 ? true : false} onClick={() => getPrevMediaData()}>Prev</Button>
            <Button disabled={!!mediaData && mediaData.length < mediaLimit ? true : false} onClick={() => getNextMediaData()}>Next</Button>
          </div>
        </div>
  )
}

