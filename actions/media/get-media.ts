'use server'

import { db } from "@/lib/db"

export const countAllMedia = async() => {

  const data = await db.media.count()
  return {data}

}
export const getAllMedia = async() => {

  const data = await db.media.findMany()
  return {data}

}
export const getSelectMedia = async(limit: number ,skip: number) => {

  const data = await db.media.findMany({
    take: limit,
    skip
  })
  return {data}

}
