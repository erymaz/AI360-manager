"use client";

import styled from "@emotion/styled";
import {useCallback, useMemo, useState} from "react";
import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {useTranslations} from "next-intl";
import { Spinner } from "@/components/ui/spinner";

const ProviderUploadBox = styled.div`
    border: 1px dashed #d7dbe0;
    position: relative;
    margin-top: 16px;
    width: 100%;
    max-width: 504px;
    border-radius: 8px;


    & input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }

    & label {
        padding: 16px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;

        & h3 {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: #535a65;
            margin: 0;
        }

        & p {
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
            color: #9ca5af;
            margin: 0;
        }

        & .upload-box-icon {
            line-height: 0;
        }

        & img {
            max-width: 100px;
            width: 100%;
            height: auto;
        }
    }

    & .file-up-close {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTggNkw2IDE4IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD48cGF0aCBkPSJNNiA2TDE4IDE4IiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjwvcGF0aD48L3N2Zz4=");
        width: 24px;
        height: 24px;
        display: block;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
`;

const TARGET_WIDTH = 64;

const ProviderLogoUpload = ({
    logoUrl,
    onChange,
}: {
    logoUrl?: string;
    onChange?: (logoUrl: string | null) => any;
}) => {
    const t = useTranslations('waipify.ui');
    const [newFile, setNewFile] = useState<File>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_S3_REGION || "eu-central-1",
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || "",
        },
    });

    const handleUpload = async (file: File) => {
        const resizedFile = await createResizedImage(file);
        const uploadParams = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: `${Date.now()}_${resizedFile.name}`,
            Body: resizedFile,
            ContentType: resizedFile.type,
        };

        const command = new PutObjectCommand(uploadParams);
        setLoading(true);
        const uploadUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600});

        await fetch(uploadUrl, {
            method: "PUT",
            body: resizedFile,
        });

        const uploadedUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${uploadParams.Key}`;
        setUploadedImageUrl(uploadedUrl);
        onChange?.(uploadedUrl);
        setLoading(false);
    };

    const createResizedImage = async (file: File) => {
        const img = await loadImage(file);
        const {targetWidth, targetHeight} = calculateDimensions(img);
        const canvas = createResizedCanvas(img, targetWidth, targetHeight);
        const resizedImageDataUrl = canvas.toDataURL(file.type);
        const resizedImageBlob = dataURLToBlob(resizedImageDataUrl);
        return new File([resizedImageBlob], file.name, {type: file.type});
    };

    const loadImage = (file: File): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;
            img.onload = () => {
                URL.revokeObjectURL(objectUrl);
                resolve(img);
            };
        });
    };

    const calculateDimensions = (img: HTMLImageElement) => {
        const aspectRatio = img.width / img.height;
        const targetWidth = TARGET_WIDTH;
        const targetHeight = Math.round(targetWidth / aspectRatio);
        return {targetWidth, targetHeight};
    };

    const createResizedCanvas = (
        img: HTMLImageElement,
        targetWidth: number,
        targetHeight: number
    ) => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }
        return canvas;
    };

    const dataURLToBlob = (dataURL: string) => {
        const [metadata, data] = dataURL.split(";base64,");
        const contentType = metadata.split(":")[1];
        const decodedData = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
        return new Blob([decodedData], {type: contentType});
    };

    const handleRemove = () => {
        // const key = uploadedImageUrl.split("/").pop();
        // const deleteParams = {
        //     Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        //     Key: key!,
        // };

        // const command = new DeleteObjectCommand(deleteParams);
        // await s3Client.send(command);
        setUploadedImageUrl("");
        onChange?.(null);
    };

    const previewUrl = useMemo(() => {
        return newFile ? URL.createObjectURL(newFile) : uploadedImageUrl;
    }, [newFile, uploadedImageUrl]);

    return (
        <>
            {!loading ? <ProviderUploadBox>
                {!uploadedImageUrl && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setNewFile(file);
                                handleUpload(file);
                            }
                        }}
                    />
                )}
                <label htmlFor="provider_upload">
                    {previewUrl || logoUrl ? (
                        <img src={previewUrl || logoUrl}/>
                    ) : (
                        <>
                            <div className="upload-box-icon">
                                <img src="/upload-icon.svg" alt=""/>
                            </div>

                            <div>
                                <h3>Drag logo here</h3>
                                <p>or, click to browse (8 MB max)</p>
                            </div>
                        </>
                    )}
                </label>
                {uploadedImageUrl && (
                    <span className="file-up-close" onClick={handleRemove}></span>
                )}
            </ProviderUploadBox>
            : <Spinner className="mt-8" />}
        </>
    );
};

export default ProviderLogoUpload;
