import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4} from "uuid"; 
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { siteConfig } from "@/site-config";

// Create an S3 client
// You must copy the endpoint from your B2 bucket details
// and set the region to match.
const s3 = new S3Client({
  endpoint: siteConfig.fileStorage.endpoint,
  region: siteConfig.fileStorage.region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
});

export async function POST(req: NextRequest) {

  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if(!file) {
    return NextResponse.json({error: "No file to process!"})
  }
  try {

    // Make filename unique
    const filename = file.name;
    const fileExtension = "." + filename.split(".").pop()

    const uuidFilename = uuidv4() + fileExtension

    //Converting formData to buffer to send to cloud storage.
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)


    // Sending to cloud storage
    await s3.send(new PutObjectCommand({
      Bucket: siteConfig.fileStorage.bucket,
      Key: `${uuidFilename}`,
      Body: buffer
    }));

    return NextResponse.json({success: "File uploaded to cloud storage!", uuidFilename})

  } catch(e) {
    console.error(e)
    return NextResponse.json({error: "File not upload, something went wrong!"})
  }
}
