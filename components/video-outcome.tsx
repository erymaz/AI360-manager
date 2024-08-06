import {request} from "@/helpers/request";
import styled from "@emotion/styled";
import {Download} from "@mui/icons-material";
import {CircularProgress, IconButton, Skeleton, Tooltip} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";

const DownloadAction = styled.div<{ contained?: boolean }>`
    position: absolute;
    top: ${({contained}) => (contained ? "1rem" : "-2rem")};
    right: 0;
`;

const VideoOutcomeContainer = styled.div<{ contained?: boolean }>`
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

const Video = styled.video`
    width: 100%;
    object-fit: contain;
    margin-top: 1rem;
`;

const VideoPlaceholderContainer = styled.div`
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

const VideoPlaceholderBackground = styled(Skeleton)`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
`;

const PlaceholderTitle = styled.h3`
    margin: 1rem 0 0;
`;
const PlaceholderSubtitle = styled.p``;

const VideoPlaceholder = () => {
    const t = useTranslations('waipify.ui');
    return (
        <VideoPlaceholderContainer>
            <VideoPlaceholderBackground variant="rectangular"/>
            <CircularProgress/>
            <PlaceholderTitle>{t("video.video-progress")}</PlaceholderTitle>
            <PlaceholderSubtitle>{t("video.video-subtitle")}</PlaceholderSubtitle>
        </VideoPlaceholderContainer>
    );
};

let interval: ReturnType<typeof setInterval>;

export const VideoOutcome = ({
                                 data,
                                 onVideoLoaded,
                                 contained,
                             }: {
    data: any;
    onVideoLoaded?: any;
    contained?: boolean;
}) => {
    const videoId = useMemo(() => {
        let result = data?.textByLocale?.["en-US"];
        if (data?.result?.[0]?.result?.body) {
            result = data?.result?.[0]?.result?.body;
        }
        return result?.split(`: `)[1];
    }, [data]);
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(() => {
        if (videoId && videoId !== "undefined" && typeof videoId !== "undefined") {
            request<{ url?: string }>(`/api/video/${videoId}`).then((res) => {
                if (res.url) {
                    setVideoUrl(res.url);
                    onVideoLoaded?.();
                } else {
                    request(`/api/video/${videoId}`, {method: "POST"});
                }
            });
        }
    }, [videoId]);

    useEffect(() => {
        if (
            !videoUrl &&
            videoId !== "undefined" &&
            typeof videoId !== "undefined"
        ) {
            interval = setInterval(() => {
                request<{ url?: string }>(`/api/video/${videoId}`).then((res) => {
                    if (res.url) {
                        setVideoUrl(res.url);
                        onVideoLoaded?.();
                        clearInterval(interval);
                    }
                });
            }, 2 * 60 * 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [videoId, videoUrl]);

    return (
        <VideoOutcomeContainer contained={contained}>
            {videoId === "undefined" || typeof videoId === "undefined" ? (
                <>Missing video id</>
            ) : !!videoUrl ? (
                <>
                    <DownloadAction contained={contained}>
                        <Tooltip key="tooltipDownload" title="Download">
                            <IconButton href={videoUrl} download>
                                <Download/>
                            </IconButton>
                        </Tooltip>
                    </DownloadAction>
                    <Video controls src={videoUrl}/>
                </>
            ) : (
                <VideoPlaceholder/>
            )}
        </VideoOutcomeContainer>
    );
};
