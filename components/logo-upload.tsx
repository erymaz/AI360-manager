import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import styled from "@emotion/styled";
import {UploadSharp} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useCallback, useMemo, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {colorIcons, lightenDarkenColor} from "./color-icons";
import {Logo} from "./logo-templates";
import {useTranslations} from "next-intl";

// S3 client initialization
const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_S3_REGION || "eu-central-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY || "",
    },
});

const FileDropzoneContainer = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    padding: 0.5rem;

    .s3-file-dropzone {
        overflow: hidden;
        position: absolute;
        inset: 0;
        margin: 0;
        opacity: 0;
    }
`;

const StyledLogo = styled.div`
    width: 56px;
    height: 56px;
    padding: 10px 10px 4px 10px;
    border-radius: 8px;
    background: #73ffd7;
    border: 1px solid #73ffd7;
    margin-right: 1rem;
`;

const LogoPreview = styled.img`
    width: 56px;
    height: 56px;
    object-fit: contain;
    border-radius: 8px;
    margin-right: 1rem;
`;

const StyledContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const FileDescription = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #9097ac;
    margin: 0 0px 5px 0;
`;

const TARGET_WIDTH = 64;

export const LogoUpload = ({
                               onChange,
                               logoUrl,
                               color = "green",
                               icon = "FileBox",
                           }: {
    color?: string;
    icon?: string;
    logoUrl?: string;
    onChange?: (logoUrl?: string) => any;
}) => {
    const t = useTranslations('waipify.ui');
    const [newFile, setNewFile] = useState<File>();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [originalFileName, setOriginalFileName] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [progress, setProgress] = useState(0);
    const [id, setId] = useState<string | undefined>();
    const lightColor = lightenDarkenColor(colorIcons[color], 110);

    const handleUpload = async (file = newFile) => {
        if (file) {
            createResizedImage(file).then((resizedFile) => {
                uploadFileToS3(resizedFile);
            });
        }
    };

    const createResizedImage = async (file: File) => {
        const img = await loadImage(file);
        const {targetWidth, targetHeight} = calculateDimensions(img);
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

    const generateFileName = (
        file: File,
        targetWidth: number,
        targetHeight: number
    ) => {
        const fileNameWithoutExtension = file.name.substring(
            0,
            file.name.lastIndexOf(".")
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

        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });

        const fileUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${uploadParams.Key}`;
        setUploadedImageUrl(fileUrl);
        setNewFile(undefined);
        setId(uploadParams.Key);
        setProgress(0);
        onChange?.(fileUrl);
    };

    const handleRemove = useCallback(() => {
        setNewFile(undefined);
        setUploadedImageUrl("");
        setId(undefined);
        onChange?.(undefined);
    }, [onChange]);

    const previewUrl = useMemo(() => {
        return newFile ? URL.createObjectURL(newFile) : uploadedImageUrl;
    }, [newFile, uploadedImageUrl]);

    return (
        <FileDropzoneContainer>
            {!!previewUrl || !!logoUrl ? (
                <LogoPreview src={previewUrl || logoUrl}/>
            ) : (
                <StyledLogo
                    style={{
                        background: lightColor,
                        border: "1px solid " + lightColor,
                    }}
                >
                    <Logo
                        name={icon}
                        fill={lightColor}
                        stroke={colorIcons[color]}
                        width="34px"
                        height="34px"
                    />
                </StyledLogo>
            )}

            <StyledContentContainer>
                <FileDescription>{t("general.image_64")}</FileDescription>
                {id || logoUrl ? (
                    <Button variant="contained" onClick={handleRemove}>
                        {t("general.remove")}
                    </Button>
                ) : (
                    <Button variant="contained" endIcon={<UploadSharp/>}>
                        {t("general.upload_logo")}
                    </Button>
                )}
            </StyledContentContainer>
            {!id && !logoUrl && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setNewFile(e.target.files[0]);
                            handleUpload(e.target.files[0]);
                        }
                    }}
                />
            )}
        </FileDropzoneContainer>
    );
};