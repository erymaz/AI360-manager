import {styles} from "./card.styles";
import {MoreVert} from "@mui/icons-material";
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import {useTranslations} from "next-intl";

interface Generator {
    name: string;
    title: string;
    image: string;
    description: string;
    cost_per_use: number;
}

export interface CardProps {
    workspaceId: string;
    generator: Generator;
    category: string;
    users: { id: string }[];
    onDeleteCard: (id: string) => void;
}

export const Card = ({
                         workspaceId,
                         generator,
                         category,
                         users = [],
                         onDeleteCard,
                     }: CardProps) => {
    const t = useTranslations('waipify.ui');
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickElement = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeDeleteDialog = () => setOpenDeleteDialog(false);

    const locale = (router.locale || router.defaultLocale || "en") as "en" | "de";

    return (
        <Box
            sx={styles.container}
            onClick={() => {
                if (!openDeleteDialog && !openMenu) {
                    router.push(
                        `/generator/${generator.name}?workspaceId=${workspaceId}`
                    );
                }
            }}
        >
            <Box sx={styles.header}>
                {category && (
                    <Image
                        src={`/workspace/${category}-badge.svg`}
                        alt={`${category}`}
                        width={130}
                        height={24}
                        style={styles.badge}
                    />
                )}
                <IconButton
                    style={styles.moreVertButton}
                    aria-label="more"
                    id="long-button"
                    aria-controls={openMenu ? "long-menu" : undefined}
                    aria-expanded={openMenu ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={(e) => {
                        handleClickElement(e);
                        e.stopPropagation();
                    }}
                >
                    <MoreVert style={styles.moreVert}/>
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{"aria-labelledby": "long-button"}}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{style: {maxHeight: 200, width: "20ch"}}}
                >
                    <MenuItem
                        key={"option"}
                        onClick={(e) => {
                            setAnchorEl(null);
                            setOpenDeleteDialog(true);
                            e.stopPropagation();
                        }}
                    >
                        Delete
                    </MenuItem>
                </Menu>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDeleteDialog}
                    onClose={closeDeleteDialog}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {`${t("general.delete")} ${t(generator.title)}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t("general.delete_generator")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={(e) => {
                                closeDeleteDialog();
                                e.stopPropagation();
                            }}
                            autoFocus
                        >
                            {t("general.cancel")}
                        </Button>
                        <Button
                            autoFocus
                            onClick={(e) => {
                                closeDeleteDialog();
                                onDeleteCard(generator.name);
                                e.stopPropagation();
                            }}
                        >
                            {t("general.delete")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box sx={styles.title}>{t(generator.title)}</Box>
            <Box sx={styles.description}>{t(generator.description)}</Box>
            <Box sx={{display: "flex", margin: "16px 0 16px 20px"}}>
                {users?.map((user) => {
                    return (
                        <Box key={user.id}>
                            <Image
                                src={`/avatar${user.id}.png`}
                                alt="avatar"
                                width={32}
                                height={32}
                                style={styles.avatar}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};
