import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const REGION = "us-west-2";
const Bucket = "mycall-output";

const s3Client = new S3Client({
  region: REGION,
});

export async function getObject(Key: string) {
  const command = new GetObjectCommand({ Bucket, Key });
  try {
    const response = await s3Client.send(command);
    const stream = response.Body as Readable;
    let data = "";
    for await (const chunk of stream) {
      data += chunk;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error("Error getting object:", err);
  }
}
