import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const s3 = new S3Client({
  region: "us-east-1", // Replace with your AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadFilesToS3(
  files: string[],
  bucketName: string
): Promise<void> {

  const uploadPromises = files.map(async (filePath) => {
    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileStream,
    };

    try {
      const result = await s3.send(new PutObjectCommand(uploadParams));
      console.log(`Uploaded ${fileName}:`, result);
    } catch (error) {
      console.error(`Error uploading ${fileName}:`, error);
    }
  });

  await Promise.all(uploadPromises);
}

//how to use fn
const files: string[] = ["./file1.txt", "./file2.jpg"];
const bucketName: string = "your-s3-bucket-name";


