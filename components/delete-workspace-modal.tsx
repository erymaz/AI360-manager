import { Modal } from "./modal";
import { request } from "@/helpers/request";
import { WorkspaceDto } from "@/types";
import {Alert, Button, CircularProgress, Snackbar} from "@mui/material";
import { useCallback, useState } from "react";
import {useTranslations} from "next-intl";

export const DeleteWorkspaceModal = ({
  open,
  onClose,
  onComplete,
  workspace,
}: {
  open?: boolean;
  onClose?: () => void;
  onComplete: (workspace: WorkspaceDto) => void;
  workspace: WorkspaceDto;
}) => {
  const t = useTranslations('waipify.ui');
  const [showError, setShowError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean | string>(false);

  const deleteWorkspace = useCallback(async () => {
    setLoading(true);
    try {
      await request(`/api/workspaces/${workspace.id}`, {
        method: "DELETE",
      });
      onComplete(workspace);
    } catch (e) {
      setShowError((e as { error: string }).error);
    } finally {
      setLoading(false);
    }
  }, [onComplete, workspace]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={t("general.delete_workspace_title")}
        footer={
          <>
            <Button variant="outlined" onClick={onClose} disabled={!!loading}>
              {t("general.cancel")}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={deleteWorkspace}
              disabled={!!loading}
            >
              {loading && (
                <CircularProgress
                  sx={{ marginRight: "1rem" }}
                  size={20}
                  color="inherit"
                />
              )}
              {t("general.delete")}
            </Button>
          </>
        }
      >
        {t("general.delete_workspace_confirmation_text")}
      </Modal>
      <Snackbar
        open={!!showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">{showError}</Alert>
      </Snackbar>
    </>
  );
};
