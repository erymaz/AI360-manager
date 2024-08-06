import {request} from "@/helpers/request";
import styled from "@emotion/styled";
import {Download} from "@mui/icons-material";
import {CircularProgress, IconButton, Skeleton, Tooltip} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";

const ImagePlaceholderContainer = styled.div`
    width: 100%;
    aspect-ratio: 16 / 9;
    margin-top: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    background-color: #ddd;
    padding: 2rem;
`;

const ImagePlaceholderBackground = styled(Skeleton)`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
`;

const PlaceholderTitle = styled.h3`
    margin: 1rem 0 0;
`;
const PlaceholderSubtitle = styled.p``;

const ImagePlaceholder = () => {
    const t = useTranslations('waipify.ui');
    return (
        <ImagePlaceholderContainer>
            <ImagePlaceholderBackground variant="rectangular"/>
            <CircularProgress/>
            <PlaceholderTitle>{t("image.image-progress")}</PlaceholderTitle>
            <PlaceholderSubtitle>{t("image.image-subtitle")}</PlaceholderSubtitle>
        </ImagePlaceholderContainer>
    );
};

const DownloadAction = styled.div<{ contained?: boolean }>`
    position: absolute;
    top: ${({contained}) => (contained ? "1rem" : "-2rem")};
    right: 0;
`;

const ImageOutcomeContainer = styled.div<{ contained?: boolean }>`
    position: relative;
    ${({contained}) =>
            contained
                    ? `
    margin-bottom: 24px;
    background-color: #eff6ff;
    padding: 3rem 1.5rem 1.5rem;
    border-radius: 0.5rem;
  `
                    : ""}
`;

// Add styles for responsive image
const StyledImage = styled.img`
    max-width: 100%; // Image won't exceed its parent's width
    height: auto; // Image scales proportionally
`;

const ImagesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
`;

export const ImageOutcome = ({
                                 data,
                                 contained,
                             }: {
    data: any;
    contained?: boolean;
}) => {
    const imageId = data["en-US"].id;
    const initArray = data["en-US"]?.output?.length ? data["en-US"].output : [""];
    const [imageUrls, setImageUrls] = useState(initArray);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const checkImageStatus = () => {
            request<{ status?: string; output?: string[] }>(
                `/api/images/${imageId}`,
            ).then((res) => {
                if (res.status === "success") {
                    setImageUrls(res.output);
                    clearInterval(interval);
                }
            });
        };

        if (data["en-US"].status === "processing") {
            checkImageStatus();
            interval = setInterval(checkImageStatus, 5 * 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    return (
        <ImagesWrapper>
            {imageUrls.map((imageUrl: string, index: number) => (
                <ImageOutcomeContainer key={index} contained={contained}>
                    {imageUrl ? (
                        <>
                            <DownloadAction contained={contained}>
                                <Tooltip key={`tooltipDownload-${index}`} title="Download">
                                    <IconButton href={imageUrl} download>
                                        <Download/>
                                    </IconButton>
                                </Tooltip>
                            </DownloadAction>
                            <StyledImage
                                src={imageUrl}
                                alt={`Processed image ${index + 1}`}
                            />
                        </>
                    ) : (
                        <ImagePlaceholder/>
                    )}
                </ImageOutcomeContainer>
            ))}
        </ImagesWrapper>
    );
};
