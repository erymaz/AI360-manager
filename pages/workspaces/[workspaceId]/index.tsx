import {AddGeneratorModal} from "@/components/add-generator-modal";
import {GeneratorCard} from "@/components/ai-generators-library/generator-card";
import {CreateNewButton} from "@/components/crreate-new-button";
import {DashboardContainer} from "@/components/dashboard-container";
import Navbar from "@/components/navbar";
import {SectionTitle} from "@/components/section-title";
import {WorkspaceDropdownTitle} from "@/components/workspace-dropdown-title";
import {WorkspaceLogo} from "@/components/workspace-logo";
import {AddNewTile} from "@/components/workspace/add-new-tile";
import {loadAiGenerators} from "@/generators/listing";
import {localizeMeta} from "@/helpers/localization";
import {request} from "@/helpers/request";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import {styles} from "@/styles/dashboard.styles";
import {AiGenerator, WorkspaceDto, WorkspaceRole} from "@/types";
import {
    Add,
    History,
    KeyboardArrowDown,
    MoreVert,
    Settings,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    LinearProgress,
    Menu,
    MenuItem,
    Snackbar,
    Typography,
} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import { useSession } from "@clerk/nextjs";

export const getServerSideProps = withRequiredAuthentication(
    async (
        ctx: GetServerSidePropsContext,
        {organisation, clerkUserId, role, locale, organization360, messages}
    ) => {
        const workspaces = await workspaceService.getAllWorkspaces(
            organisation.tenantId,
            clerkUserId,
            role
        );
        if (!workspaces.length) {
            return {
                redirect: {
                    destination: "/workspaces",
                    permanent: false,
                },
            };
        }

        const aiGenerators = loadAiGenerators(ctx);
        const allGenerators = localizeMeta(
            await aiGenerators,
            ctx
        ) as AiGenerator[];
        return {
            props: {
                workspaces,
                allGenerators,
                locale,
                companyName: organisation.companyName,
                organization360,
                messages
            },
        };
    }
);

const GeneratorCardActions = ({onDelete}: { onDelete: () => any }) => {
    const [cardAnchorEl, setCardAnchorEl] = React.useState<null | HTMLElement>(
        null
    );

    const openCardMenu = Boolean(cardAnchorEl);
    const handleCardMenu = (event: React.MouseEvent<HTMLElement>) => {
        setCardAnchorEl(event.currentTarget);
    };

    const close = () => {
        setCardAnchorEl(null);
    };

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={openCardMenu ? "long-menu" : undefined}
                aria-expanded={openCardMenu ? "true" : undefined}
                aria-haspopup="true"
                onClick={(e) => {
                    handleCardMenu(e);
                    e.stopPropagation();
                }}
            >
                <MoreVert/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{"aria-labelledby": "long-button"}}
                anchorEl={cardAnchorEl}
                open={openCardMenu}
                onClose={close}
                PaperProps={{
                    style: {maxHeight: 200, width: "20ch"},
                }}
            >
                <MenuItem
                    key={"option"}
                    onClick={(e) => {
                        onDelete?.();
                        close();
                        e.stopPropagation();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default function Worksapce({
                                      workspaces,
                                      allGenerators,
                                      companyName,
                                      organization360
                                  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const t = useTranslations('waipify.ui');
    const {session, isSignedIn} = useSession();
    const router = useRouter();
    const [showError, setShowError] = useState<boolean | string>();
    const [selectedGenerator, setSelectedGenerator] = useState<
        AiGenerator | undefined
    >(undefined);

    const [isAddingGenerator, setIsAddingGenerator] = useState(false);

    const defaultWorkspaceId =
        router.query.workspaceId?.toString() ?? workspaces[0]?.id ?? "";
    const [selectedMenuItem, setSelectedMenuItem] =
        useState<string>(defaultWorkspaceId);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const openMenu = Boolean(anchorEl);
    const handleClickElement = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const [workspace, setWorkspace] = useState<WorkspaceDto | undefined>(
        (() => {
            return (workspaces as WorkspaceDto[]).find((workspace) => {
                return selectedMenuItem == workspace.id;
            });
        })()
    );

    const setInitialCards = useCallback(
        (generators = workspace?.generators) => {
            return generators
                ? allGenerators.filter((generator: AiGenerator) => {
                    if (generators == undefined) {
                        return false; // There is some defect where workspaces can be created with no generators property.
                    }
                    return generators.includes(generator.name);
                })
                : [];
        },
        [allGenerators, workspace?.generators]
    );

    const [dashboardCards, setDashboardCards] = useState(setInitialCards());

    const deleteCardHandler = useCallback(
        async (name?: string) => {
            if (!workspace || !name) {
                return;
            }
            try {
                const generators = workspace?.generators;

                if (!generators?.includes(name)) {
                    setShowError(t("general.generator_not_added"));
                    return;
                }

                const workspaceId = workspace?.id;
                try {
                    await request(`/api/workspaces/${workspaceId}/generators`, {
                        method: "PUT",
                        body: {
                            generators: generators.filter((item) => item !== name),
                        },
                    });
                    setDashboardCards([
                        ...dashboardCards.filter((c: any) => c.name !== name),
                    ]);
                    setWorkspace(
                        (ws) =>
                            ({
                                ...ws,
                                generators: generators.filter((item) => item !== name),
                            } as WorkspaceDto)
                    );
                } catch (e) {
                    setShowError((e as { error: string }).error);
                }
            } catch (e) {
                console.log(e);
            }
        },
        [dashboardCards, t, workspace]
    );

    const handleGeneratorAdded = useCallback(
        (generators: string[]) => {
            if (workspace) {
                setWorkspace({...workspace, generators});
                setDashboardCards(setInitialCards(generators));
                setIsAddingGenerator(false);
            }
        },
        [workspace, setInitialCards]
    );

    const selectedWorkspace: WorkspaceDto = useMemo(() => {
        return workspaces.find(
            (item: WorkspaceDto) => item.id === defaultWorkspaceId
        )!;
    }, [defaultWorkspaceId, workspaces]);

    useEffect(() => {
        if (router.query.workspaceId) {
            const workspace = (workspaces as WorkspaceDto[]).find(
                ({id}) => id === router.query.workspaceId
            );
            setWorkspace(workspace);
            setDashboardCards(setInitialCards(workspace?.generators));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.workspaceId, workspaces]);

    const onOpen = (generatorName: string, workspaceId?: string) => {
        router.push(`/generator/${generatorName}?workspaceId=${workspaceId}`);
    };

    if (typeof session === "undefined") {
        return <LinearProgress/>;
    }

    if (!isSignedIn) {
        router.push("/api/auth/login");
        return <LinearProgress/>;
    }

    const dashboardMenu = (
        <Menu
            id="long-menu"
            MenuListProps={{"aria-labelledby": "long-button"}}
            anchorEl={anchorEl}
            open={openMenu}
            onBlur={() => setAnchorEl(null)}
            PaperProps={{style: styles.menu}}
        >
            {workspaces.map((workspace: WorkspaceDto) => {
                return (
                    <MenuItem
                        key={workspace.id}
                        onClick={(e) => {
                            setAnchorEl(null);
                            setSelectedMenuItem(workspace.id);
                            e.stopPropagation();
                            router.push(`${router.pathname}?workspaceId=${workspace.id}`);
                        }}
                    >
                        <WorkspaceLogo size="small" workspace={workspace}/>
                        <Box sx={styles.menuItemContainer}>
                            <Box>
                                <SectionTitle>{workspace.workspaceName}</SectionTitle>
                            </Box>
                        </Box>
                        {defaultWorkspaceId === workspace.id ? (
                            <Box sx={styles.tick}>
                                <Image
                                    src="/workspace/tick.svg"
                                    alt="tick"
                                    width={24}
                                    height={24}
                                />
                            </Box>
                        ) : null}
                    </MenuItem>
                );
            })}
        </Menu>
    );

    return (
        <>
            <Box sx={styles.container}>
                <Navbar companyName={companyName} organization360={organization360}/>
                <Box sx={styles.verticalFlex}>
                    <DashboardContainer>
                        <Box sx={{display: "flex"}}>
                            <Box sx={styles.header}>
                                <Box
                                    sx={styles.titleContainer}
                                    onClick={(e) => {
                                        handleClickElement(e);
                                        e.stopPropagation();
                                    }}
                                >
                                    <WorkspaceLogo size="small" workspace={selectedWorkspace}/>
                                    <SectionTitle mb={3} sx={styles.title}>
                                        <WorkspaceDropdownTitle>
                                            {selectedWorkspace?.workspaceName}
                                        </WorkspaceDropdownTitle>
                                        <Box sx={{marginLeft: "11px"}}>
                                            <KeyboardArrowDown/>
                                        </Box>
                                    </SectionTitle>
                                </Box>
                                {dashboardMenu}
                                <Box sx={styles.searchContainer}>
                                    {selectedWorkspace &&
                                        selectedWorkspace.currentUserRole ===
                                        WorkspaceRole.ADMIN && (
                                            <IconButton
                                                style={styles.settingsIcon}
                                                aria-label="settings"
                                                onClick={() =>
                                                    router.push(
                                                        `/workspace-settings?workspaceId=${
                                                            selectedWorkspace?.id || defaultWorkspaceId
                                                        }`
                                                    )
                                                }
                                            >
                                                <Settings/>
                                            </IconButton>
                                        )}
                                    <IconButton
                                        style={styles.settingsIcon}
                                        aria-label="history"
                                        onClick={() =>
                                            router.push(
                                                `/history?workspaceId=${
                                                    selectedWorkspace?.id || defaultWorkspaceId
                                                }`
                                            )
                                        }
                                    >
                                        <History/>
                                    </IconButton>
                                    <CreateNewButton onClick={() => setIsAddingGenerator(true)}>
                                        {t("general.add_new_generator")}
                                    </CreateNewButton>
                                </Box>
                            </Box>
                        </Box>
                        <Grid container spacing={{xs: 3}}>
                            {dashboardCards.map((generator: AiGenerator, index: any) => (
                                <GeneratorCard
                                    key={generator.name}
                                    compact
                                    title={generator.title}
                                    image={generator.image}
                                    description={generator.description}
                                    cost={generator.cost_per_use}
                                    popularity={generator.popularity}
                                    onClick={() => onOpen(generator.name, workspace?.id)}
                                    showPrice={false}
                                    actions={
                                        <GeneratorCardActions
                                            onDelete={() => setSelectedGenerator(generator)}
                                        />
                                    }
                                />
                            ))}
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={dashboardCards.length + 1}
                            >
                                <AddNewTile
                                    onClick={() => setIsAddingGenerator(true)}
                                    workspaceId={selectedMenuItem}
                                    title={t("general.add_new_generator")}
                                />
                            </Grid>
                        </Grid>
                    </DashboardContainer>
                </Box>
            </Box>
            <Snackbar
                open={!!showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
            >
                <Alert severity="error">{showError}</Alert>
            </Snackbar>
            {isAddingGenerator && workspace && (
                <AddGeneratorModal
                    open={isAddingGenerator}
                    onClose={() => setIsAddingGenerator(false)}
                    workspace={workspace}
                    onSubmit={handleGeneratorAdded}
                    allGenerators={allGenerators}
                />
            )}

            <Dialog
                open={!!selectedGenerator}
                onClose={() => setSelectedGenerator(undefined)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {!!selectedGenerator?.title &&
                        `${t("general.delete")} ${t(
                            selectedGenerator.title as unknown as string
                        )}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>{t("general.delete_generator")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(e) => {
                            setSelectedGenerator(undefined);
                            e.stopPropagation();
                        }}
                        autoFocus
                    >
                        {t("general.cancel")}
                    </Button>
                    <Button
                        autoFocus
                        onClick={(e) => {
                            setSelectedGenerator(undefined);
                            deleteCardHandler(selectedGenerator?.name);
                            e.stopPropagation();
                        }}
                    >
                        {t("general.delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
