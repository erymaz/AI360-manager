import {styles} from "./styles";
import {request} from "@/helpers/request";
import {WorkspaceDto} from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import {
    Alert,
    CircularProgress,
    IconButton,
    MenuItem,
    Select,
    Snackbar,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import {useRouter} from "next/router";
import {useCallback, useState} from "react";
import {useTranslations} from "next-intl";

export default function AddGeneratorModal({
                                              open,
                                              onClose,
                                              generator,
                                              allWorkspaces,
                                          }: {
    open: boolean;
    onClose: () => void;
    generator: string | null;
    allWorkspaces: WorkspaceDto[];
}) {
    const t = useTranslations('waipify.ui');
    const router = useRouter();
    const [workspaces, setWorkspaces] = useState<WorkspaceDto[]>(allWorkspaces);
    const [loading, setLoading] = useState<boolean>();
    const [showError, setShowError] = useState<boolean | string>();
    const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceDto | null>(allWorkspaces[0] ?? null);

    const addGenerator = useCallback(async () => {
        if (!selectedWorkspace?.id || !generator) {
            return;
        }

        const generators: string[] = selectedWorkspace.generators;

        if (generators.includes(generator)) {
            setShowError(t("general.generator_exists"));
            return;
        }

        setLoading(true);
        const {id} = selectedWorkspace;
        try {
            await request(`/api/workspaces/${id}/generators`, {
                method: "PUT",
                body: {
                    generators: [...generators, generator],
                },
            });
            router.push(`/workspaces/${id}`);
        } catch (e) {
            setShowError((e as { error: string }).error);
        }

        setLoading(false);
    }, [generator, router, selectedWorkspace, t]);

    const hasWorkspaces = workspaces && workspaces?.length > 0;

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={onClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={styles.main}>
                        <Box sx={{display: "flex"}}>
                            <Box sx={styles.title}>{t("add-generator.title")}</Box>
                            <IconButton
                                style={styles.closeIcon}
                                aria-label="settings"
                                onClick={onClose}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <Box sx={styles.label}>{t("add-generator.select-workspace")}</Box>
                        {hasWorkspaces && (
                            <Select
                                sx={styles.workspaceSelect}
                                value={selectedWorkspace?.id}
                                onChange={() => {
                                }}
                                displayEmpty
                                inputProps={{"aria-label": "Without label"}}
                            >
                                {workspaces.map((w, index) => (
                                    <MenuItem
                                        key={w?.id}
                                        value={w?.id}
                                        onClick={() => {
                                            setSelectedWorkspace(workspaces[index]);
                                        }}
                                    >
                                        {w?.workspaceName}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                        <Box sx={styles.info}>
                            {t("add-generator.automatically-customized")}
                        </Box>
                        <Box sx={styles.buttons}>
                            <Button
                                style={styles.submit}
                                variant="contained"
                                fullWidth
                                type="submit"
                                onClick={addGenerator}
                                disabled={loading}
                            >
                                {loading && (
                                    <CircularProgress
                                        sx={{marginRight: "1rem"}}
                                        size={20}
                                        color="inherit"
                                    />
                                )}
                                {t("general.submit")}
                            </Button>
                            <Button
                                style={styles.cancel}
                                variant="outlined"
                                fullWidth
                                onClick={onClose}
                            >
                                {t("general.cancel")}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Snackbar
                open={!!showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
            >
                <Alert severity="error">{showError}</Alert>
            </Snackbar>
        </div>
    );
}
