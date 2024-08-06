import {CloseGenerator} from "@/components/close-generator";
import FormFromSchema from "@/components/form-from-schema";
import {GeneratorContext} from "@/components/generator-context";
import {GeneratorLayout} from "@/components/generator-layout";
import {
    composeOutputByLocale,
    HistoryContainer,
    HistoryItem,
    HistoryTable,
    renderHistoryOutput,
    tabLabels,
} from "@/components/history";
import {LoadingOutcome} from "@/components/loading-outcome";
import {MainContent, MainContentTitle} from "@/components/main-content";
import Navbar from "@/components/navbar";
import {Outcome} from "@/components/outcome";
import {PlaceholderOutcome} from "@/components/placeholder-outcome";
import {Sidebar, SidebarTitle} from "@/components/sidebar";
import {ImageOutcome} from "@/components/image-outcome";
import {VideoOutcome} from "@/components/video-outcome";
import {getLocale, localizeForm, localizeMeta} from "@/helpers/localization";
import {request} from "@/helpers/request";
import {useViewport} from "@/helpers/use-viewport";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as subscriptionService from "@/lib/services/subscription";
import * as workspaceService from "@/lib/services/workspace";
import {Check, CopyAll, Edit, ThumbDown, ThumbUp} from "@mui/icons-material";
import HistoryIcon from "@mui/icons-material/History";
import {
    Alert,
    Box,
    Button,
    IconButton,
    LinearProgress,
    Snackbar,
    SnackbarCloseReason,
    Tab,
    Tabs,
    TextField,
    Tooltip,
} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useRef, useState} from "react";
import { useTranslations } from "next-intl";
import { useSession } from "@clerk/nextjs";

function getInitialSnack(subscriptionComplete: string | string[] | undefined): {
    open: boolean;
    message: string;
    severity: "success" | "error";
} {
    if (!subscriptionComplete) {
        return {
            open: false,
            message: "",
            severity: "success",
        };
    }
    return subscriptionComplete.toString() === "true"
        ? {
            open: true,
            message: "Your subscription was successfully activated",
            severity: "success",
        }
        : {
            open: true,
            message: "Your subscription was not activated. Please, try again",
            severity: "error",
        };
}

export const getServerSideProps = withRequiredAuthentication(
    async (
        ctx: GetServerSidePropsContext,
        {organisation, clerkUserId, role, locale, organization360, messages}
    ) => {
        const {tenantId} = organisation;
        const workspaceId = ctx.query.workspaceId;
        const {name} = ctx.params as any;

        const workspaceGenerators = await workspaceService.getWorkspaceGenerators(
            tenantId,
            workspaceId!.toString(),
            clerkUserId,
            role
        );
        if (workspaceGenerators.generators.indexOf(name) === -1) {
            console.log("Redirecting to dashboard", workspaceGenerators.generators, name)
            return {
                redirect: {
                    destination: "/workspaces",
                    permanent: false,
                },
            };
        }

        try {
            const {metaData, getFormSchema} = await import(
                `@/generators/${name}/main`
                );
            const generatorLocale = getLocale(ctx);
            const localizedFormSchema = localizeForm(getFormSchema(), ctx);
            const localizedMetaData = localizeMeta(Array(metaData()), ctx)[0];
            const subscriptionInfo = await subscriptionService.getSubscriptionInfo(
                tenantId,
            );
            return {
                props: {
                    locale,
                    generatorLocale,
                    localizedFormSchema,
                    subscriptionInfo,
                    generatorName: name,
                    metaData: localizedMetaData,
                    role,
                    companyName: organisation.companyName,
                    organization360,
                    messages
                },
            };
        } catch (e) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    }
);

const HistoryItemOutcome = ({data}: any) => {
    if (typeof data === "string") {
        return <>{data}</>;
    }
    const resultByLocale = renderHistoryOutput([data]);
    return <>{resultByLocale}</>;
};

export default function Generator({
                                      locale,
                                      generatorLocale,
                                      localizedFormSchema,
                                      subscriptionInfo,
                                      generatorName,
                                      metaData,
                                      role,
                                      companyName,
                                      organization360
                                  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const t = useTranslations('waipify.ui');
    const [tab, setTab] = useState(0);
    const {session, isSignedIn} = useSession();
    const router = useRouter();
    const {isDesktop} = useViewport();

    const [apiResponse, setApiResponse] = useState<any>();
    const [history, setHistory] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [historyItem, setHistoryItem] = useState<HistoryItem>();

    // Selected AI generator and language
    const {name, workspaceId, subscriptionComplete, historyId} = router.query;
    const userSelectedGenerator = name as string;

    const [copied, setCopied] = useState(false);
    const [isEditingInList, setIsEditingInList] = useState<boolean[]>(
        new Array(history?.generations?.length).fill(false)
    );
    const [isEditing, setIsEditing] = useState(false);
    const [editedTexts, setEditedTexts] = useState<string[]>(
        new Array(history?.generations?.length).fill("")
    );
    const [editedText, setEditedText] = useState("");

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>(getInitialSnack(subscriptionComplete));

    // remove subscriptionComplete from query once we processed it
    useEffect(() => {
        if (!subscriptionComplete) {
            return;
        }

        const newPathObject = {
            pathname: router.pathname,
            query: {name, locale, workspaceId, historyId},
        };
        router.replace(newPathObject, undefined, {shallow: true});
    }, [historyId, locale, name, router, subscriptionComplete, workspaceId]);

    useEffect(() => {
        if (loading) {
            setTab(0);
        }
    }, [loading]);

    const outcomeRef = useRef(null as any);

    const copyText = useCallback(async () => {
        if (editedText) {
            await navigator.clipboard.writeText(editedText);
        } else if (outcomeRef.current) {
            outcomeRef.current.copyText();
        }
    }, [editedText]);

    const handleCloseSnackbar = (
        event?: Event | React.SyntheticEvent<any, Event>,
        reason?: SnackbarCloseReason
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbar((prev) => ({...prev, open: false}));
    };

    const fetchHistory = async () => {
        if (history) {
            setHistory(null);
            console.log(history);
            console.log("toggled history off");
        } else {
            try {
                const response = await fetch(
                    `/api/library/generator/${userSelectedGenerator}?workspaceId=${workspaceId}`,
                    {
                        method: "GET",
                        headers: {"Content-Type": "application/json"},
                    }
                );
                if (!response.ok) throw new Error("Error fetching data");
                const result = await response.json();
                setHistory(result);
                const editedTextResults = result.generations.map((g: { result: any }) =>
                    renderHistoryOutput(g.result)
                );
                setEditedTexts(editedTextResults);
            } catch (error) {
                console.log(error);
                setSnackbar({
                    open: true,
                    message: "Failed to fetch history",
                    severity: "error",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const editGeneration = async (generationId: any, text: string) => {
        try {
            const response = await fetch(`/api/library/generation/${generationId}`, {
                method: "PUT",
                body: text,
            });
            if (!response.ok)
                throw new Error(`Error saving generation with id ${generationId}`);
        } catch (error) {
            throw new Error(`Error saving generation with id ${generationId}`);
        }
    };

    const onCopy = useCallback(() => {
        setCopied(true);
        copyText();
        setTimeout(() => setCopied(false), 3000);
    }, [copyText]);

    const handleEditText = (text?: string, index?: number) => {
        if (index !== undefined && text !== undefined) {
            // For the list of Outcome components
            const newEditedTexts = [...editedTexts];
            newEditedTexts[index] = text;
            setEditedTexts(newEditedTexts);
        } else if (text !== undefined) {
            // For the single Outcome component
            setEditedText(text);
        }
    };
    const handleEdit = (index?: number) => {
        if (index !== undefined) {
            const newIsEditingList = [...isEditingInList];
            newIsEditingList[index] = true;
            setIsEditingInList(newIsEditingList);
            setEditedText(editedTexts[index]);
        } else {
            setIsEditing(true);
            const langs = Object.keys(apiResponse?.textByLocale || {});
            setEditedText(apiResponse?.textByLocale[langs[tab]] || "");
        }
    };

    const handleCancel = (index?: number) => {
        if (index !== undefined) {
            const newIsEditingList = [...isEditingInList];
            newIsEditingList[index] = false;
            setIsEditingInList(newIsEditingList);
        } else {
            setIsEditing(false);
            setEditedText("");
        }
    };

    const handleSave = async (id: string, text: string, index?: number) => {
        try {
            await editGeneration(id, text);
            setSnackbar({
                open: true,
                message: "Saved successfully",
                severity: "success",
            });

            // Update the apiResponse state
            if (index === undefined) {
                const langs = Object.keys(apiResponse?.textByLocale || {});
                const currentLang = langs[tab] || "";
                setApiResponse((prevApiResponse: any) => ({
                    ...prevApiResponse,
                    textByLocale: {
                        ...prevApiResponse.textByLocale,
                        [currentLang]: text,
                    },
                }));
            } else {
                const newEditedTexts = [...editedTexts];
                newEditedTexts[index] = text;
                setEditedTexts(newEditedTexts);
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Save failed",
                severity: "error",
            });
        }
        if (index !== undefined) {
            const newIsEditingList = [...isEditingInList];
            newIsEditingList[index] = false;
            setIsEditingInList(newIsEditingList);
        } else {
            setIsEditing(false);
            setEditedText("");
        }
    };

    const contentType = apiResponse?.contentType || historyItem?.result?.[0].contentType;
    const isVideo = contentType === "video" || userSelectedGenerator === "real_estate_video";
    const isImage = contentType === "image";

    const renderTabContent = (index: number) => {
        // If editing, show the text field for all tabs
        if (isEditing) {
            return (
                <TextField
                    sx={{backgroundColor: "white"}}
                    multiline
                    fullWidth
                    value={editedText}
                    onChange={(e) => handleEditText(e.target.value)}
                />
            );
        }

        // If it's a video && 1st tab, show video outcome
        if (isVideo && index === 0) {
            return <VideoOutcome data={apiResponse || historyItem}/>;
        }

        // If it's an image && 1st tab, show static image
        if (isImage && index === 0) {
            const imageUrl = apiResponse?.textByLocale || {
                "en-US": historyItem?.result?.[0]?.result?.body,
            };
            return <ImageOutcome data={imageUrl}/>;
        }

        // If API response has text by locale, display the corresponding text
        if (apiResponse?.textByLocale) {
            return (Object.values(apiResponse.textByLocale)[index] as string);
        }

        // Fallback to history item outcome
        return (
            <HistoryItemOutcome
                data={
                    Array.isArray(historyItem?.result) && historyItem?.result?.[index]
                        ? historyItem?.result?.[index]
                        : historyItem?.result
                }
            />
        );
    };

    const handleFormSubmit = useCallback(
        async (fieldDataObject: Record<string, any>) => {
            if (
                (userSelectedGenerator === "neutral_video" &&
                    !fieldDataObject.product_description?.trim()) ||
                (userSelectedGenerator === "real_estate_video" &&
                    !fieldDataObject.expose_text?.trim())
            ) {
                setErrorMessage("Description is required");
                return;
            }

            if (
                (userSelectedGenerator === "real_estate" ||
                    userSelectedGenerator === "location") &&
                !fieldDataObject.address?.trim()
            ) {
                setErrorMessage("Address is required");
                return;
            }

            setLoading(true);
            setApiResponse(null);
            setHistory(null);

            fieldDataObject.locale = generatorLocale;

            let PromiseList = [
                fetch(
                    `/api/library/generator/${userSelectedGenerator}?workspaceId=${workspaceId}`,
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(fieldDataObject),
                    }
                ).then((res) => res.json()),
            ];

            Promise.all(PromiseList)
                .then((data) => {
                    let result;
                    const contentType = data[0].data[0].contentType;
                    if (contentType === "image") {
                        result = {"en-US": data[0].data[0].result.body};
                    } else {
                        result = composeOutputByLocale(data[0].data);
                    }

                    setApiResponse({
                        generationId: data[0].generationId,
                        textByLocale: result,
                        contentType: contentType,
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [generatorLocale, userSelectedGenerator, workspaceId]
    );

    useEffect(() => {
        if (historyId) {
            request<{ generations: HistoryItem[] }>(
                `/api/library/generator/${generatorName}?workspaceId=${workspaceId}`
            ).then(({generations}) => {
                const generation = generations.find((item) => item._id === historyId);
                setHistoryItem(generation);
            });
        }
    }, [generatorName, historyId, workspaceId]);

    const onLike = () => {
    };
    const onDislike = () => {
    };
    const onDownload = () => {
    };

    const actions = (
        <Box
            display="flex"
            sx={{marginBottom: "1rem", justifyContent: "flex-end"}}
        >
            <IconButton aria-label="settings" edge="end" onClick={fetchHistory}>
                <HistoryIcon/>
            </IconButton>
            {isDesktop && <CloseGenerator/>}
        </Box>
    );

    const outcomeActions = () => {
        if (isVideo || isImage) {
            // Video download is handled in VideoOutcome component
            return <></>;
        } else {
            return (
                <>
                    <Tooltip key="tooltipLike" title="Like Result">
                        <IconButton onClick={onLike}>
                            <ThumbUp/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip key="tooltipDislike" title="Dislike Result">
                        <IconButton onClick={onDislike}>
                            <ThumbDown/>
                        </IconButton>
                    </Tooltip>
                    <Button
                        key="copy"
                        onClick={onCopy}
                        endIcon={copied ? <Check/> : <CopyAll/>}
                        variant="contained"
                    >
                        {t("general.copy")}
                    </Button>
                    {!isEditing ? (
                        <Button
                            key="edit"
                            onClick={() => handleEdit()}
                            endIcon={<Edit/>}
                            variant="outlined"
                        >
                            {t("general.edit")}
                        </Button>
                    ) : (
                        <>
                            <React.Fragment key="editControls">
                                <Button
                                    key="cancel"
                                    onClick={() => handleCancel()}
                                    variant="outlined"
                                >
                                    {t("general.cancel")}
                                </Button>
                                <Button
                                    key="save"
                                    onClick={() =>
                                        handleSave(apiResponse?.generationId, editedText)
                                    }
                                    variant="outlined"
                                >
                                    {t("general.save")}
                                </Button>
                            </React.Fragment>
                        </>
                    )}
                </>
            );
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate} ${formattedTime}`;
    };
    const resultHtml = (
        <Box>
            {isDesktop && actions}
            <Box
                sx={{borderBottom: 1, borderColor: "divider", marginBottom: "1rem"}}
            >
                {!apiResponse?.textByLocale["en-US"] && historyItem?.result ? (
                    <>{formatDate(historyItem.datetime)}</>
                ) : (
                    <></>
                )}
                {!!(historyItem?.result.length || apiResponse?.textByLocale) && (
                    <Tabs value={tab} onChange={(_ev, tab) => setTab(tab)}>
                        {historyItem
                            ? historyItem.result?.map?.((item: Record<string, any>) => (
                                <Tab
                                    key={item.locale}
                                    label={tabLabels[item.locale as keyof typeof tabLabels]}
                                />
                            ))
                            : apiResponse &&
                            Object.keys(apiResponse?.textByLocale).map((key) => (
                                <Tab
                                    key={key}
                                    label={tabLabels[key as keyof typeof tabLabels]}
                                />
                            ))}
                    </Tabs>
                )}
            </Box>
            {tab === 0 && (
                <Outcome title={t("outcome.outcome-box") + " 1"} ref={outcomeRef} buttons={outcomeActions()}>
                    {renderTabContent(0)}
                </Outcome>
            )}
            {tab === 1 && (
                <Outcome title={t("outcome.outcome-box") + " 2"} ref={outcomeRef} buttons={outcomeActions()}>
                    {renderTabContent(1)}
                </Outcome>
            )}
            {tab === 2 && (
                <Outcome title={t("outcome.outcome-box") + " 3"} ref={outcomeRef} buttons={outcomeActions()}>
                    {renderTabContent(2)}
                </Outcome>
            )}
        </Box>
    );

    if (typeof session === "undefined") {
        return <LinearProgress/>;
    }

    if (!isSignedIn) {
        router.push("/api/auth/login");
        return <LinearProgress/>;
    }

    const renderResult =
        ((!history && apiResponse) || (historyItem?.result && !history)) &&
        !loading;

    return (
        <GeneratorContext.Provider value={{name: userSelectedGenerator}}>
            <Box>
                <Navbar companyName={companyName} organization360={organization360}/>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{width: "100%"}}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
                <GeneratorLayout>
                    <Sidebar>
                        <SidebarTitle>{metaData.title}</SidebarTitle>
                        <FormFromSchema
                            schema={localizedFormSchema as any}
                            onFormSubmit={handleFormSubmit}
                            loading={loading}
                            subscriptionInfo={subscriptionInfo}
                            generatorName={generatorName}
                            cost={metaData.cost_per_use}
                            workspaceId={workspaceId!.toString()}
                            value={historyItem?.formData}
                            role={role}
                        />
                    </Sidebar>
                    <MainContent>
                        {!isDesktop && (
                            <MainContentTitle subtitle={metaData.title} actions={actions}>
                                {history ? t("history.title") : "Outcome"}
                            </MainContentTitle>
                        )}
                        {history && (
                            <HistoryContainer>
                                {isDesktop && (
                                    <IconButton onClick={fetchHistory}>
                                        <HistoryIcon/>
                                    </IconButton>
                                )}
                                <HistoryTable historyItems={history?.generations}/>
                            </HistoryContainer>
                        )}
                        {!history && !loading && !apiResponse && !historyItem?.result && (
                            <PlaceholderOutcome
                                actions={
                                    isDesktop && (
                                        <IconButton onClick={fetchHistory}>
                                            <HistoryIcon/>
                                        </IconButton>
                                    )
                                }
                            />
                        )}
                        {loading && <LoadingOutcome/>}
                        {renderResult && resultHtml}
                    </MainContent>
                </GeneratorLayout>
                <Snackbar
                    open={!!errorMessage}
                    autoHideDuration={3000}
                    onClose={() => setErrorMessage("")}
                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Snackbar>
            </Box>
        </GeneratorContext.Provider>
    );
}
