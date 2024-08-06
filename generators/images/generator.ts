import axios, {AxiosRequestConfig} from "axios";
import FormData from "form-data";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {v4 as uuidv4} from "uuid";

// Define your ClipDrop API endpoints
export const clipdropApiEndpoint: Record<string, string> = {
    text_to_image: "https://clipdrop-api.co/text-to-image/v1",
    reimagine: "https://clipdrop-api.co/reimagine/v1/reimagine",
    remove_background: "https://clipdrop-api.co/remove-background/v1",
    replace_background: "https://clipdrop-api.co/replace-background/v1",
    remove_text: "https://clipdrop-api.co/remove-text/v1",
    cleanup: "https://clipdrop-api.co/cleanup/v1",
    upscale: "https://clipdrop-api.co/image-upscaling/v1/upscale",
};

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_REGION || "eu-central-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || "",
    },
});

// Function to upload file to S3
async function uploadFileToS3(file: Buffer, filename: string) {
    const uploadParams = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: `${uuidv4()}_${filename}`,
        Body: file,
        ContentType: "image/jpeg",
    };

    const command = new PutObjectCommand(uploadParams);
    const uploadUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600});

    await axios.put(uploadUrl, file,);

    return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${uploadParams.Key}`;
}

export async function run(formData: Record<string, any>) {
    const task = formData.task;
    const _formData = new FormData();
    let imageFilename = "default.jpg";
    if (task !== "text_to_image") {
        const imageUrl = formData.target_image;
        const imageResponse = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });
        if (imageResponse.status !== 200) {
            throw new Error(`Failed to fetch image from URL: ${imageUrl}`);
        }
        const imageContent = imageResponse.data;
        imageFilename = imageUrl.split("/").pop() || "default.jpg";
        _formData.append("image_file", Buffer.from(imageContent), {
            filename: imageFilename,
            contentType: "image/jpeg",
        });
    }
    if (task === "text_to_image" || task === "replace_background") {
        _formData.append("prompt", formData.prompt);
    }
    if (task === "upscale") {
        _formData.append("target_width", formData.target_width);
        _formData.append("target_height", formData.target_height);
    }

    if (!process.env.CLIPDROP_API_KEY) {
        throw new Error(
            "CLIPDROP_API_KEY is not defined in the environment variables.",
        );
    }

    const apiEndpoint = clipdropApiEndpoint[task];
    const request: AxiosRequestConfig = {
        method: "POST",
        headers: {
            ..._formData.getHeaders(),
            "x-api-key": `${process.env.CLIPDROP_API_KEY}`,
        },
        data: _formData,
        url: apiEndpoint,
        responseType: "arraybuffer",
    };

    try {
        const response = await axios(request);
        const resultBuffer = response.data;
        const file = Buffer.from(resultBuffer);

        // Upload the result to S3
        const resImageUrl = await uploadFileToS3(file, imageFilename);

        return [
            {
                locale: "en-US",
                contentType: "image",
                result: {body: {output: [resImageUrl]}},
            },
        ];
    } catch (error: any) {
        if (error.response) {
            const errorText = Buffer.from(error.response.data).toString("utf-8");
            console.error("Error response:", errorText);
        } else {
            console.error("Error:", error.message);
        }
        throw error;
    }
}