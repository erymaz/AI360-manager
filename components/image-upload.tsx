import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import styled from "@emotion/styled";
import {DeleteForever} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useFormContext} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import {UploadImage} from "@/components/upload-image";
import axios from "axios";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_REGION || "eu-central-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || "",
    },
});

const StyledThumbnail = styled.div`
    background: #fff;
    border-radius: 0.5rem;
    border: 1px solid #d7dbe0;
    display: flex;
    padding: 0.5rem;
    align-items: center;

    img {
        background: #d7dbe0;
        height: 64px;
        width: 64px;
        object-fit: contain;
        border-radius: 0.25rem;
        margin-right: 1rem;
    }
`;

const ThumbnailInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FileName = styled.div`
    flex: 1;
    white-space: nowrap;
    width: 9rem;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const FileDropzoneContainer = styled.div`
    position: relative;
    overflow: hidden;

    input[type="file"] {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
    }
`;

const ProgressTrack = styled.div`
    background: #ddd;
    position: absolute;
    width: 100%;
    bottom: 1px;
    overflow: hidden;
    border-radius: 0 0 8px 8px;
`;

const ProgressValue = styled.div`
    height: 0.5rem;
    background: #1976d2;
    transition: 0.5s all ease-in;
`;

const Progress = ({value}: { value?: number }) => (
    <ProgressTrack>
        <ProgressValue style={{width: `${value}%`}}/>
    </ProgressTrack>
);

const Thumbnail = ({
                       url,
                       name,
                       size,
                       onRemove,
                   }: {
    url: string;
    name: string;
    size: number;
    onRemove?: () => any;
}) => {
    const formattedFileSize = useMemo(() => {
        if (size < 1024) {
            return `${size} bytes`;
        } else if (size < 1024 * 1024) {
            let sizeInKB = (size / 1024).toFixed(2);
            return `${sizeInKB} KB`;
        }
        let sizeInMB = (size / (1024 * 1024)).toFixed(2);
        return `${sizeInMB} MB`;
    }, [size]);

    return (
        <StyledThumbnail>
            <img src={url} alt="Thumbnail"/>
            <ThumbnailInfo>
                <div>
                    <FileName>{name || url.split("/").pop()}</FileName>
                    {!!size && (
                        <div style={{color: "#6A7381"}}>{formattedFileSize}</div>
                    )}
                </div>
                {onRemove && (
                    <Tooltip title="Remove">
                        <IconButton onClick={onRemove}>
                            <DeleteForever/>
                        </IconButton>
                    </Tooltip>
                )}
            </ThumbnailInfo>
        </StyledThumbnail>
    );
};

type ImageUploadProps = {
    name: string;
    resize?: Record<string, number>;
};

const ImageUpload = ({name, resize}: ImageUploadProps) => {
    const methods = useFormContext();
    const [newFile, setNewFile] = useState<File>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [originalFileName, setOriginalFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [progress, setProgress] = useState(0);
    const value = methods.watch(name);

    useEffect(() => {
        if (value) {
            setUploadedImageUrl(value);
        }
    }, [value]);

    const handleUpload = async (file = newFile) => {
        if (!file) return;
        const fileToUpload = resize ? await createResizedImage(file, resize) : file;
        uploadFileToS3(fileToUpload);
    };

    const createResizedImage = async (
        file: File,
        resize: Record<string, number>,
    ) => {
        const img = await loadImage(file);
        const resizeWidth = resize?.width;
        const {targetWidth, targetHeight} = calculateDimensions(img, resizeWidth);
        const canvas = createResizedCanvas(img, targetWidth, targetHeight);
        const resizedImageDataUrl = canvas.toDataURL(file.type);
        const resizedImageBlob = dataURLToBlob(resizedImageDataUrl);
        const newFileName = generateFileName(file, targetWidth, targetHeight);
        return new File([resizedImageBlob], newFileName, {type: file.type});
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

    const calculateDimensions = (img: HTMLImageElement, targetWidth: number) => {
        const aspectRatio = img.width / img.height;
        const targetHeight = Math.round(targetWidth / aspectRatio);
        return {targetWidth, targetHeight};
    };

    const createResizedCanvas = (
        img: HTMLImageElement,
        targetWidth: number,
        targetHeight: number,
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

    const generateFileName = (
        file: File,
        targetWidth: number,
        targetHeight: number,
    ) => {
        const fileNameWithoutExtension = file.name.substring(
            0,
            file.name.lastIndexOf("."),
        );
        const fileExtension = file.name.split(".").pop();
        return `${fileNameWithoutExtension}_w${targetWidth}_h${targetHeight}.${fileExtension}`;
    };

    const dataURLToBlob = (dataURL: string) => {
        const [metadata, data] = dataURL.split(";base64,");
        const contentType = metadata.split(":")[1];
        const decodedData = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
        return new Blob([decodedData], {type: contentType});
    };

    const uploadFileToS3 = async (file: File) => {
        const uploadParams = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: `${uuidv4()}_${file.name}`,
            Body: file,
            ContentType: file.type,
        };

        const command = new PutObjectCommand(uploadParams);
        const uploadUrl = await getSignedUrl(s3Client, command, {expiresIn: 3600});

        const response = await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        if (response.status !== 200) {
            throw new Error("Failed to upload file to S3");
        }

        const fileUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${uploadParams.Key}`;
        setUploadedImageUrl(fileUrl);
        setNewFile(undefined);
        setProgress(0);
        methods.setValue(name, fileUrl);
    };

    const handleRemove = useCallback(() => {
        setNewFile(undefined);
        setUploadedImageUrl("");
        methods.setValue(name, undefined);
    }, [methods, name]);

    const removeInline = useCallback(() => {
        setUploadedImageUrl("");
        methods.setValue(name, undefined);
    }, [methods, name]);

    const previewUrl = useMemo(() => {
        return newFile ? URL.createObjectURL(newFile) : uploadedImageUrl;
    }, [newFile, uploadedImageUrl]);

    return (
        <div style={{marginTop: "1rem"}}>
            <FileDropzoneContainer>
                {previewUrl ? (
                    <>
                        <Thumbnail
                            url={previewUrl}
                            name={originalFileName}
                            size={fileSize}
                            onRemove={handleRemove}
                        />
                        {!uploadedImageUrl && <Progress value={progress}/>}
                    </>
                ) : (
                    <UploadImage/>
                )}
                {!previewUrl && (
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
            </FileDropzoneContainer>
            <input type="hidden" name={name} value={uploadedImageUrl}/>
        </div>
    );
};

export default ImageUpload;
