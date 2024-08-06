import {Modal} from "./modal";
import {request} from "@/helpers/request";
import {Alert, Button, CircularProgress, Snackbar} from "@mui/material";
import {useCallback, useState} from "react";
import {useTranslations} from "next-intl";

export const DeleteOrganisationModal = ({
                                            open,
                                            onClose,
                                            onComplete,
                                            tenantId,
                                        }: {
    open: boolean;
    onClose?: () => void;
    onComplete: (tenantId: string) => void;
    tenantId: string;
}) => {
    const t = useTranslations('waipify.ui');
    const [showError, setShowError] = useState<boolean | string>(false);
    const [loading, setLoading] = useState<boolean | string>(false);

    const deleteOrganisation = useCallback(async () => {
        setLoading(true);
        try {
            await request(`/api/organisations/${tenantId}`, {
                method: "DELETE",
            });
            onComplete(tenantId);
        } catch (e) {
            setShowError(t((e as { error: string }).error));
        } finally {
            setLoading(false);
        }
    }, [onComplete, tenantId]);

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                title={t("account_settings.delete_organisation")}
                footer={
                    <>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            disabled={Boolean(loading)}
                        >
                            {t("general.cancel")}
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={deleteOrganisation}
                            disabled={Boolean(loading)}
                        >
                            {loading && (
                                <CircularProgress
                                    sx={{marginRight: "1rem"}}
                                    size={20}
                                    color="inherit"
                                />
                            )}
                            {t("general.delete")}
                        </Button>
                    </>
                }
            >
                {t("account_settings.delete_organisation_confirmation_text")}
            </Modal>
            <Snackbar
                open={Boolean(showError)}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
            >
                <Alert severity="error">{showError}</Alert>
            </Snackbar>
        </>
    );
};
