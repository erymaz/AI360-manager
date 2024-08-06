import {colorIcons, getColorIcon} from "@/components/color-icons";
import {StyledTextField} from "@/components/form-control";
import {Logo, LogoNames} from "@/components/logo-templates";
import {LogoUpload} from "@/components/logo-upload";
import Navbar from "@/components/navbar";
import {cachedWorkspaces} from "@/components/workspace-logo";
import {request} from "@/helpers/request";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as userWorkspaceService from "@/lib/services/user-workspace";
import * as workspaceService from "@/lib/services/workspace";
import {
    gray,
    selectedBlue,
    selectedLightBlue,
    styles,
} from "@/styles/workspace-settings.styles";
import {MemberOption, UserWorkspaceDto, WorkspaceRole} from "@/types";
import {ArrowBack} from "@mui/icons-material";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    createFilterOptions,
    FormLabel,
    IconButton,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useTranslations} from "next-intl";

export const getServerSideProps = withRequiredAuthentication(
    async (
        ctx: GetServerSidePropsContext,
        {organisation, clerkUserId, role, locale, organization360, messages}
    ) => {
        const {workspaceId} = ctx.query;
        if (!workspaceId || typeof workspaceId !== "string") {
            return {
                redirect: {
                    destination: "/workspaces",
                    permanent: false,
                },
            };
        }

        const workspace = await workspaceService.getWorkspaceByTenantAndId(
            organisation.tenantId,
            workspaceId,
            clerkUserId,
            role
        );

        const workspaceUsers = await userWorkspaceService.getAllWorkspaceUsers(
            organisation.tenantId,
            workspaceId,
            clerkUserId,
            role,
            {pageNumber: 0, pageSize: 200}
        );

        const memberOptions = await userWorkspaceService.getMemberOptions(
            clerkUserId,
            organisation.tenantId,
            workspaceId
        );

        return {
            props: {
                tenantId: organisation.tenantId,
                clerkUserId,
                workspace,
                workspaceUsers,
                memberOptions,
                locale,
                companyName: organisation.companyName,
                organization360,
                messages
            },
        };
    }
);

export default function WorkspaceSettings({
                                              tenantId,
                                              clerkUserId,
                                              workspace,
                                              workspaceUsers: initialWorkspaceUsers,
                                              memberOptions,
                                              companyName,
                                              organization360
                                          }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const filter = createFilterOptions<MemberOption>();
    const t = useTranslations('waipify.ui');
    const router = useRouter();

    const [selectedLogo, setSelectedLogo] = useState(
        workspace.template?.name || "FileBox"
    );

    const [selectedColor, setSelectedColor] = useState(
        workspace.template?.color || "green"
    );
    const [workspaceUsers, setWorkspaceUsers] = useState<UserWorkspaceDto[]>(
        initialWorkspaceUsers
    );
    const [workspaceName, setWorkspaceName] = useState<string | undefined>(
        workspace.workspaceName ?? ""
    );
    const [logoUrl, setLogoUrl] = useState<string | undefined>(
        workspace.logoUrl ?? ""
    );
    const [error, setError] = useState<string | undefined>("");
    const [successAlert, setSuccessAlert] = useState<string | undefined>(
        undefined
    );
    const [allowed, setAllowed] = useState<MemberOption[]>(memberOptions.allowed);
    const [added, setAdded] = useState<MemberOption[]>(memberOptions.added);
    const [option, setOption] = useState<MemberOption | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const submit = () => {
        if (!workspaceName) {
            setError("Workspace name is required");
            return;
        }
        request(`/api/workspaces/${workspace?.id}`, {
            method: "PUT",
            body: {
                workspaceName,
                logoUrl: logoUrl || "",
                template: {
                    color: selectedColor,
                    name: selectedLogo,
                },
            },
        }).then(() => {
            if (workspace?.id && cachedWorkspaces[workspace?.id]) {
                cachedWorkspaces[workspace.id] = undefined;
            }
        });
    };

    const addMember = async (option: MemberOption | null) => {
        setLoading(true);
        if (!option) {
            setError(t("general.workspace_settings.add_empty_error"));
            setLoading(false);
            return;
        }
        if (added.map((op) => op.email).includes(option.email)) {
            setError(t("general.workspace_settings.has_alredy_invited"));
            setLoading(false);
            return;
        }
        const email = option.email;
        const userId = option.userId || null;
        let addedMember;
        if (option.forInvite && !option.userId) {
            addedMember = await addInviteToWorkspace(email);
        } else {
            addedMember = await addMemberToWorkspace(email, userId);
        }
        if (addedMember) {
            workspaceUsers.push(addedMember);
            setWorkspaceUsers(workspaceUsers);
            added.push(option);
            setAdded(added);
            setAllowed(allowed.filter((op) => op.email !== option.email));
        }
        setLoading(false);
    };

    const addInviteToWorkspace = async (email: string) => {
        const body: UserWorkspaceDto = {
            tenantId,
            workspaceId: workspace!.id,
            workspaceRole: WorkspaceRole.CREATOR,
            userId: null,
            email,
        };
        return request<UserWorkspaceDto>(`/api/user-workspaces/invite`, {
            method: "POST",
            body,
        }).then(
            (invitedUser) => {
                setSuccessAlert(t("general.workspace_settings.user_invited"));
                return invitedUser;
            },
            () => {
                setError(t("general.workspace_settings.fail_inviting"));
                return undefined;
            }
        );
    };

    const addMemberToWorkspace = async (email: string, userId: string | null) => {
        const body: UserWorkspaceDto = {
            tenantId,
            workspaceId: workspace!.id,
            workspaceRole: WorkspaceRole.CREATOR,
            userId,
            email,
        };
        return request<UserWorkspaceDto>(`/api/user-workspaces`, {
            method: "POST",
            body,
        }).then(
            (addedMember) => {
                setSuccessAlert(t("general.workspace_settings.added"));
                return addedMember;
            },
            () => {
                setError(t("general.workspace_settings.add_failed"));
                return undefined;
            }
        );
    };

    const deleteFromWorkspace = async (workspaceUser: UserWorkspaceDto) => {
        setLoading(true);
        const workspaceId = workspaceUser.workspaceId;
        await request(`/api/user-workspaces/${workspaceId}`, {
            method: "DELETE",
            body: {email: workspaceUser.email},
        }).then(
            () => {
                setSuccessAlert(t("general.workspace_settings.deleted"));
                setWorkspaceUsers(
                    workspaceUsers.filter((user) => user.email !== workspaceUser.email)
                );
                allowed.push({
                    email: workspaceUser.email,
                    userId: workspaceUser.userId,
                });
                setAllowed(allowed);
                setAdded(added.filter((op) => op.email !== workspaceUser.email));
            },
            () => {
                setError(t("general.workspace_settings.delete_failed"));
            }
        );
        setLoading(false);
    };

    const changeRole = async (workspaceUser: UserWorkspaceDto) => {
        setLoading(true);
        await request<UserWorkspaceDto>(`/api/user-workspaces`, {
            method: "PUT",
            body: workspaceUser,
        }).then(
            (changedUser) => {
                setSuccessAlert(t("general.workspace_settings.role_changed"));
                setWorkspaceUsers(
                    workspaceUsers.map((user) => {
                        if (user.email === changedUser.email) {
                            user.workspaceRole = workspaceUser.workspaceRole;
                        }
                        return user;
                    })
                );
            },
            () => {
                setError(t("general.workspace_settings.role_change_failed"));
            }
        );
        setLoading(false);
    };

    return (
        <Box sx={styles.mainContainer}>
            <Navbar companyName={companyName} organization360={organization360}/>
            <Box sx={styles.container}>
                <Box sx={{display: "flex"}}>
                    <IconButton
                        style={styles.arrowBack}
                        aria-label="settings"
                        onClick={() => router.push("/workspaces")}
                    >
                        <ArrowBack/>
                    </IconButton>
                    <Box sx={styles.titleContainer}>
                        <Box sx={styles.headerTitle}>
                            {t("general.workspace_settings.workspace_settings")}
                        </Box>
                        <Box sx={styles.headerSubtitle}>{workspace?.workspaceName}</Box>
                    </Box>
                </Box>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                    }}
                >
                    <Box sx={styles.sectionContainer}>
                        <Box sx={styles.headerTitle}>{t("general.workspace")}</Box>
                        <Box sx={{marginTop: "20px"}}>
                            <Box marginBottom={2}>
                                <FormLabel htmlFor="workspaceName">
                                    {t("general.workspace_name")}
                                </FormLabel>
                                <StyledTextField
                                    fullWidth
                                    id="workspaceName"
                                    name="workspaceName"
                                    placeholder={t("general.workspace_name")}
                                    value={workspaceName}
                                    onChange={(e) => setWorkspaceName(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box sx={styles.logoTitle}>Logo</Box>
                        <Box sx={styles.bigLogoContainer}>
                            <Box sx={styles.dividerContainer}>
                                <LogoUpload
                                    onChange={(e) => setLogoUrl(e)}
                                    color={selectedColor}
                                    icon={selectedLogo}
                                    logoUrl={logoUrl}
                                />
                                <Box sx={styles.colorsContainer}>
                                    {Object.entries(colorIcons).map((entry) => {
                                        return (
                                            <Box
                                                sx={{marginLeft: "5px"}}
                                                key={entry[0]}
                                                onClick={() => setSelectedColor(entry[0])}
                                            >
                                                {getColorIcon(entry[1], entry[0] === selectedColor)}
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>

                            <Box sx={styles.logoContainer}>
                                <Stack>
                                    <Box sx={styles.templatesTitle}>Templates</Box>
                                    <Box sx={styles.templatesContainer}>
                                        {LogoNames.map((logoName: string) => {
                                            return (
                                                <Box
                                                    sx={styles.logo(selectedLogo, logoName)}
                                                    key={logoName}
                                                    onClick={() => setSelectedLogo(logoName)}
                                                >
                                                    <Logo
                                                        name={logoName}
                                                        fill={
                                                            selectedLogo === logoName
                                                                ? selectedLightBlue
                                                                : "white"
                                                        }
                                                        stroke={
                                                            selectedLogo === logoName ? selectedBlue : gray
                                                        }
                                                    />
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                        <Box pt={3} sx={{display: "flex", justifyContent: "flex-end"}}>
                            <Button variant="contained" type="submit">
                                {t("general.save")}
                            </Button>
                        </Box>
                    </Box>
                </form>
                <Box sx={styles.sectionContainer}>
                    <Box sx={styles.membersHeader}>
                        <Box sx={styles.membersTitle}>
                            {t("account_settings.invitations")}
                        </Box>
                    </Box>
                    <Box sx={styles.membersRightSection}>
                        <Autocomplete
                            style={styles.emailInput}
                            id="email-input"
                            options={allowed}
                            value={option}
                            onChange={(event, newOption) => {
                                if (typeof newOption === "string") {
                                    setOption({
                                        email: newOption,
                                        userId: undefined,
                                        forInvite: true,
                                    });
                                } else if (newOption && newOption.forInvite) {
                                    setOption({
                                        email: newOption.email,
                                        userId: newOption.userId,
                                        forInvite: true,
                                    });
                                } else if (newOption && newOption.email && newOption.userId) {
                                    setOption({
                                        email: newOption.email,
                                        userId: newOption.userId,
                                    });
                                } else if (newOption && newOption.email) {
                                    setOption({
                                        email: newOption.email,
                                        userId: null,
                                    });
                                } else {
                                    setOption(newOption);
                                }
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const {inputValue} = params;
                                const isExisting = options.some(
                                    (option) => inputValue === option.email
                                );
                                if (inputValue !== "" && !isExisting) {
                                    filtered.push({
                                        userId: undefined,
                                        email: inputValue,
                                        forInvite: true,
                                    });
                                }
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            getOptionLabel={(option) => {
                                if (typeof option === "string") {
                                    return option;
                                }
                                return option.email;
                            }}
                            renderOption={(props, option) => (
                                <li {...props}>{option.email}</li>
                            )}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Invite by email"/>
                            )}
                        />
                        <Button
                            sx={styles.sendInviteButton}
                            endIcon={
                                <Image
                                    src={`/workspace/send-invite.svg`}
                                    alt={"send-invite"}
                                    width={13}
                                    height={13}
                                />
                            }
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={() => addMember(option)}
                            disabled={loading}
                        >
                            Send invite
                        </Button>
                    </Box>
                </Box>
                <Box sx={styles.sectionContainer}>
                    <Box sx={styles.membersHeader}>
                        <Box sx={styles.membersTitle}>{t("general.members")}</Box>
                    </Box>
                    <Box sx={styles.membersContainer}>
                        {workspaceUsers
                            ?.filter((workspaceUser) => workspaceUser.userId !== clerkUserId)
                            .map((workspaceUser, index) => {
                                const userName = [
                                    workspaceUser.firstName,
                                    workspaceUser.lastName,
                                ]
                                    .filter(Boolean)
                                    .join(" ");
                                return (
                                    <Box
                                        key={workspaceUser.email}
                                        sx={{
                                            ...styles.memberContainer,
                                            borderBottom:
                                                workspaceUsers.length - 1 > index
                                                    ? "1px solid #EDEEF3"
                                                    : "",
                                        }}
                                    >
                                        <Box sx={{display: "flex"}}>
                                            <Box sx={styles.memberName}>
                                                {userName && <Box>{userName}</Box>}
                                                <Box sx={{color: "#9CA5AF"}}>
                                                    {workspaceUser.email}
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box sx={styles.role}>
                                            <Select
                                                sx={styles.roleSelect}
                                                value={workspaceUser.workspaceRole}
                                                onChange={(event) => {
                                                    workspaceUser.workspaceRole = event.target
                                                        .value as WorkspaceRole;
                                                    changeRole(workspaceUser);
                                                }}
                                                displayEmpty
                                                inputProps={{"aria-label": "Without label"}}
                                                disabled={loading}
                                            >
                                                <MenuItem value={WorkspaceRole.ADMIN}>Admin</MenuItem>
                                                <MenuItem value={WorkspaceRole.CREATOR}>
                                                    Creator
                                                </MenuItem>
                                            </Select>
                                            <Box sx={styles.bin}>
                                                <IconButton
                                                    aria-label="bin"
                                                    onClick={() => deleteFromWorkspace(workspaceUser)}
                                                    disabled={loading}
                                                >
                                                    <Image
                                                        src={`/workspace/bin.svg`}
                                                        alt={"bin"}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={!!error}
                autoHideDuration={3000}
                onClose={() => setError("")}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
            <Snackbar
                open={!!successAlert}
                autoHideDuration={3000}
                onClose={() => setSuccessAlert(undefined)}
            >
                <Alert severity="success">{successAlert}</Alert>
            </Snackbar>
        </Box>
    );
}
