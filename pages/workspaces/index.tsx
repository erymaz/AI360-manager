import {AddWorkspaceModal} from "@/components/add-workspace-modal";
import {CreateNewButton} from "@/components/crreate-new-button";
import {DeleteWorkspaceModal} from "@/components/delete-workspace-modal";
import Navbar from "@/components/navbar";
import {WorkspaceCard} from "@/components/workspace-card";
import {WorkspacesContainer} from "@/components/workspaces-container";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import {styles} from "@/styles/dashboard.styles";
import {WorkspaceDto} from "@/types";
import styled from "@emotion/styled";
import {Add} from "@mui/icons-material";
import {Alert, Box, Button, Snackbar, Typography} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import React, {useState} from "react";
import {useTranslations} from "next-intl";

const WorkspacesGrid = styled.div`
    display: grid;
    gap: 1.5rem;

    @media (min-width: 900px) {
        grid-auto-rows: 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const CreateWorkspaceCard = styled.a`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    gap: 8px;
    border: 1px dashed #9ca5af;
    border-radius: 8px;
`;

const WorkspacesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

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
        return {
            props: {
                workspaces,
                locale,
                companyName: organisation.companyName,
                organization360,
                messages
            },
        };
    }
);

export default function Workspaces({
                                       workspaces,
                                       companyName,
                                       organization360
                                   }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const t = useTranslations('waipify.ui');
    const [showError, setShowError] = useState<boolean | string>();
    const [open, setOpen] = useState(false);
    const [workspaceItems, setWorkspaceItems] = useState<WorkspaceDto[]>(workspaces);
    const [deletingWorkspace, setDeletingWorkspace] = useState<WorkspaceDto>();
    const onDeleteWorkspace = async (workspace: WorkspaceDto) => {
        setDeletingWorkspace(workspace);
    };
    const handleWorkspaceDeleted = async (workspace: WorkspaceDto) => {
        setWorkspaceItems(
            workspaceItems.filter((item) => item.id !== workspace.id)
        );
        setDeletingWorkspace(undefined);
    };

    return (
        <>
            <Box sx={styles.container}>
                <Navbar companyName={companyName} organization360={organization360}/>
                <WorkspacesContainer>
                    <WorkspacesHeader>
                        <Typography variant="h6">{t("navbar.my-workspaces")}</Typography>
                        <CreateNewButton
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            {t("general.create_workspace")}
                        </CreateNewButton>
                    </WorkspacesHeader>
                    <WorkspacesGrid>
                        {workspaceItems.map((item) => (
                            <WorkspaceCard
                                key={item.id}
                                item={item}
                                onWorkspaceDeleted={onDeleteWorkspace}
                            />
                        ))}
                        <CreateWorkspaceCard onClick={() => setOpen(true)}>
                            <Add/>
                            <Typography>{t("general.create_workspace")}</Typography>
                        </CreateWorkspaceCard>
                    </WorkspacesGrid>
                </WorkspacesContainer>
            </Box>
            <Snackbar
                open={!!showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
            >
                <Alert severity="error">{showError}</Alert>
            </Snackbar>
            {open && (
                <AddWorkspaceModal
                    open={open}
                    onClose={() => setOpen(false)}
                    onSubmit={() => {
                        setOpen(false);
                        setWorkspaceItems(workspaces);
                    }}
                    workspaces={workspaces}
                />
            )}
            {deletingWorkspace && (
                <DeleteWorkspaceModal
                    open={Boolean(deletingWorkspace)}
                    onClose={() => setDeletingWorkspace(undefined)}
                    onComplete={handleWorkspaceDeleted}
                    workspace={deletingWorkspace}
                />
            )}
        </>
    );
}
