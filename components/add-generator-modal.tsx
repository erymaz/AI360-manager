import { Modal } from "./modal";
import { CustomiseItem, CustomiseItemsList } from "./onboarding/customise-item";
import { request } from "@/helpers/request";
import { AiGenerator, WorkspaceDto } from "@/types";
import styled from "@emotion/styled";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import {useTranslations} from "next-intl";

const GeneratorsList = styled(CustomiseItemsList)`
  margin-top: 0;
`;

export const AddGeneratorModal = ({
  open,
  onClose,
  onSubmit,
  workspace,
  allGenerators,
}: {
  open?: boolean;
  onClose?: () => void;
  onSubmit: (updatedGenerators: string[]) => void;
  workspace: WorkspaceDto;
  allGenerators?: AiGenerator[];
}) => {
  const t = useTranslations('waipify.ui');
  const [showError, setShowError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [selectedGenerators, setSelectedGenerators] = useState<string[]>([]);

  const selectGenerator = useCallback(
    (event: ChangeEvent<HTMLInputElement>, name: string) => {
      const checked = event.target.checked;

      if (checked) {
        setSelectedGenerators((generators) => [...generators, name]);
      } else {
        setSelectedGenerators((generators) =>
          generators.filter((item) => item !== name)
        );
      }
    },
    []
  );

  const addWorkspaces = useCallback(async () => {
    setLoading(true);
    const updatedGenerators = [
      ...(workspace.generators ?? []),
      ...selectedGenerators,
    ];
    try {
      await request(`/api/workspaces/${workspace.id}/generators`, {
        method: "PUT",
        body: { generators: updatedGenerators },
      });
      onSubmit(updatedGenerators);
    } catch (e) {
      setShowError((e as { error: string }).error);
    } finally {
      setLoading(false);
    }
  }, [onSubmit, selectedGenerators, workspace]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={t("general.add_to_my_workspace")}
        footer={
          <>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={addWorkspaces}
              disabled={!!loading || !selectedGenerators.length}
            >
              {t("general.add_generator")}
            </Button>
          </>
        }
      >
        {allGenerators && allGenerators.length ? (
          <GeneratorsList>
            {allGenerators
              .filter((item) => !workspace.generators.includes(item.name))
              .map((item: AiGenerator) => (
                <CustomiseItem
                  key={item.name}
                  generator={item}
                  checked={selectedGenerators.includes(item.name)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    selectGenerator(event, item.name)
                  }
                />
              ))}
          </GeneratorsList>
        ) : (
          <Typography>
            All available generators have been added to the workspace
          </Typography>
        )}
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
