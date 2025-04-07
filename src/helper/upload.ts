"use server";
import { cloudinary } from "@/cloudinaryConfig"; // Import properly configured Cloudinary instance

export async function uploadImagetoCloudinaryandreturnUrls(files: File[]) {
  try {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "uploads", resource_type: "image" },
            (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(new Error("Cloudinary Upload Failed"));
              } else {
                resolve(result?.secure_url);
              }
            }
          );

          uploadStream.end(buffer);
        });
      })
    );

    return uploadedImages;
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload images");
  }
}
