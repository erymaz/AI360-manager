import {colorIcons, getColorIcon, lightenDarkenColor} from "./color-icons";
import {Logo, LogoNames} from "./logo-templates";
import {LogoUpload} from "./logo-upload";
import {Modal} from "./modal";
import {request} from "@/helpers/request";
import {WorkspaceDto} from "@/types";
import styled from "@emotion/styled";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import {useCallback, useState} from "react";
import {useTranslations} from "next-intl";

const LogoTemplate = styled.div`
    cursor: pointer;
    border: 1px solid #ddd;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`;

const LogoControl = styled.div`
    border: 1px solid #ddd;
    border-radius: 0.5rem;
`;

const SelectedLogo = styled.div`
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;

const SelectedLogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`;

const ColorsContainer = styled.div`
    display: flex;
`;

const TemplatesContainer = styled.div`
    border-top: 1px solid #ddd;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 1rem;
    padding: 1rem;
`;

export const AddWorkspaceModal = ({
                                      open,
                                      onClose,
                                      onSubmit,
                                      workspaces,
                                  }: {
    open?: boolean;
    onClose?: () => void;
    onSubmit: () => void;
    workspaces: WorkspaceDto[];
}) => {
    const t = useTranslations('waipify.ui');
    const [name, setName] = useState("");
    const [showError, setShowError] = useState<boolean | string>(false);
    const [loading, setLoading] = useState<boolean | string>(false);
    const [selectedLogo, setSelectedLogo] = useState(LogoNames[0]);
    const [selectedColor, setSelectedColor] = useState("blue");
    const [logoUrl, setLogoUrl] = useState<string | undefined>();

    const createWorkspace = useCallback(async () => {
        if (!name) {
            return;
        }
        setLoading(true);
        try {
            const newWorkspace = await request<WorkspaceDto>(`/api/workspaces`, {
                body: {
                    generators: [],
                    workspaceName: name,
                    logoUrl: logoUrl || "",
                    template: {
                        color: selectedColor,
                        name: selectedLogo,
                    },
                },
            });
            workspaces.push(newWorkspace);
        } catch (e) {
            setShowError((e as { error: string })?.error);
        } finally {
            onSubmit();
            setLoading(false);
        }
    }, [logoUrl, name, onSubmit, selectedColor, selectedLogo]);

    return (
        <>
            <Modal
                open={!!open}
                onClose={onClose}
                width="46rem"
                title={t("general.create_workspace")}
                footer={
                    <>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={createWorkspace}
                            disabled={!!loading || !name}
                        >
                            Create Workspace
                        </Button>
                    </>
                }
            >
                <Box mb={3}>
                    <Typography component="label" htmlFor="name">
                        Workspace Name
                    </Typography>
                    <TextField
                        id="name"
                        fullWidth
                        placeholder="Enter workspace name"
                        sx={{mt: 1}}
                        onChange={(ev) => setName(ev.target.value)}
                    ></TextField>
                </Box>
                <Typography mt={2} mb={1} component="div">
                    Logo
                </Typography>
                <LogoControl>
                    <SelectedLogoContainer>
                        <LogoUpload
                            color={selectedColor}
                            icon={selectedLogo}
                            logoUrl={logoUrl}
                            onChange={(e) => setLogoUrl(e)}
                        />
                        <ColorsContainer>
                            {Object.entries(colorIcons).map(([color, value]) => {
                                return (
                                    <Box
                                        sx={{marginLeft: "5px"}}
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {getColorIcon(value, color === selectedColor)}
                                    </Box>
                                );
                            })}
                        </ColorsContainer>
                    </SelectedLogoContainer>
                    <TemplatesContainer>
                        {LogoNames.map((logoName: string) => {
                            return (
                                <LogoTemplate
                                    key={logoName}
                                    onClick={() => setSelectedLogo(logoName)}
                                    style={{
                                        background:
                                            selectedLogo === logoName
                                                ? lightenDarkenColor(colorIcons.blue, 110)
                                                : "white",
                                        ...(selectedLogo === logoName
                                            ? {outline: "1px solid #609EFA"}
                                            : {}),
                                    }}
                                >
                                    <Logo
                                        name={logoName}
                                        stroke={
                                            selectedLogo === logoName ? colorIcons.blue : "gray"
                                        }
                                        fill={
                                            selectedLogo === logoName
                                                ? lightenDarkenColor(colorIcons.blue, 110)
                                                : "white"
                                        }
                                    />
                                </LogoTemplate>
                            );
                        })}
                    </TemplatesContainer>
                </LogoControl>
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
