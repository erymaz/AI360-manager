import {NavbarLink} from "./navbar-link";
import {LocaleMenu} from "@/components/locale-menu";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {useClerk} from "@clerk/nextjs";
import {useTranslations} from "next-intl";

const MobileNavbarItem = styled(Typography)`
    color: #25333c;
    font-weight: 600;
    font-size: 18px;
    margin-left: 2rem;
    margin-bottom: 1rem;
`;

const MobileNavbarLink = styled(Link)`
    text-decoration: none;
    color: #25333c;
    font-weight: 600;
    font-size: 18px;
`;

const MobileNavbarGrayItem = styled(Typography)`
    color: gray;
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 1rem !important;
`;

const MobileNavbarGrayLink = styled(Link)`
    text-decoration: none;
    color: gray;
    font-weight: 400;
    font-size: 18px;
`;

const MobileNavbarFooterLink = styled(Link)`
    text-decoration: none;
    color: gray;
    font-weight: 400;
    font-size: 16px;
`;

const MobileNavbarText = styled(Typography)`
    color: black;
    font-weight: 300;
    font-size: 14px;
`;

const MobileNavbarInnerAccordion = styled(Accordion)`
    border: none;
    box-shadow: none;

    p {
        margin: 0;
    }

    & .MuiAccordionSummary-content {
        margin: 0;
    }

    & .Mui-expanded {
        min-height: fit-content !important;
    }
`;

const BellIcon = styled.div`
    display: flex;
    align-items: center;
    border: 0.5px solid rgb(215, 219, 224);
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;
`;

const aiManager360Routes = [
    "/aimanager/dashboard",
    "/aimanager/report",
    "/aimanager/use-case",
    "/aimanager/ai-solutions",
    "/aimanager/ai-models",
    "/aimanager/ecosystem",
    "/aimanager/policies",
    "/aimanager/launcher",
    "/aimanager/document",
    "/aimanager/settings",
];

const admin360Routes = [
    "/admin/dashboard",
    "/admin/report",
    "/admin/use-case",
    "/admin/ai-solutions",
    "/admin/ai-models",
    "/admin/ecosystem",
    "/admin/policies",
    "/admin/launcher",
    "/admin/document",
    "/admin/settings",
    "/admin/matching",
];

const Navbar = ({
                    companyName,
                    organization360,
                }: {
    companyName: string;
    organization360?: any;
}) => {
    const router = useRouter();
    const t = useTranslations('waipify.ui');
    // const {session, isLoaded} = useSession();
    const theme = useTheme();
    const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));
    const {signOut, session} = useClerk()

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }


    return isDesktopView ? (
        <AppBar
            position="static"
            color="transparent"
            sx={{
                background: "#fff",
                borderBottom: "1px solid #D7DBE0",
                position: "relative",
                zIndex: 10,
            }}
        >
            <Container maxWidth={false}>
                <Toolbar disableGutters sx={{zIndex: 10}}>
                    <Box
                        sx={{display: "flex", flexGrow: 1, alignItems: "center", gap: 1}}
                    >
                        <Link href={{
                            pathname: "/360/[viewmode]/dashboard",
                            query: {viewmode: "aimanager"},
                        }}>
                            <Image
                                src="/Logox141.png"
                                alt="wAIpify"
                                width={250}
                                height={42}
                                priority={true}
                            />
                        </Link>
                        <Box display="flex" marginLeft={1} flex={1}>
                            {organization360 &&
                            (organization360.is_superadmin ||
                                organization360.is_supervisor) ? (
                                <NavbarLink
                                    activeroutes={admin360Routes}
                                    href={{
                                        pathname: "/360/[viewmode]/use-case",
                                        query: {viewmode: "admin"},
                                    }}
                                >
                                    {t("navbar.admin360")}
                                </NavbarLink>
                            ) : (
                                ""
                            )}
                            <NavbarLink
                                activeroutes={aiManager360Routes}
                                href={{
                                    pathname: "/360/[viewmode]/report",
                                    query: {viewmode: "aimanager"},
                                }}
                            >
                                {t("navbar.ai-manager360")}
                            </NavbarLink>
                            <NavbarLink
                                href="/workspaces"
                                activeroutes={["/workspaces"]}
                            >
                                {t("navbar.my-workspaces")}
                            </NavbarLink>
                            <NavbarLink
                                href="/ai-generators-library"
                                activeroutes={["/ai-generators-library"]}
                            >
                                {t("navbar.ai-library")}
                            </NavbarLink>
                        </Box>
                    </Box>

                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <Box sx={{marginRight: "10px"}}>
                            <BellIcon>
                                <NotificationsOutlined/>
                            </BellIcon>
                        </Box>
                        <Box sx={{marginRight: "10px"}}>
                            <LocaleMenu/>
                        </Box>
                        <Box>
                            <Tooltip title={t("general.settings")}>
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar
                                        src={session?.user?.imageUrl ?? ""}
                                    />
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{mt: "45px"}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => router.push("/user-settings")}>
                                    <Typography textAlign="center">
                                        {t("navbar.manage_account")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">
                                        {t("navbar.logout")}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    ) : (
        <AppBar
            position="static"
            color="transparent"
            sx={{
                background: "#fff",
                borderBottom: "1px solid #D7DBE0",
                position: "relative",
                zIndex: 10,
            }}
        >
            <Toolbar disableGutters sx={{zIndex: 10}}>
                <Accordion sx={{width: "100%", boxShadow: "none"}}>
                    <AccordionSummary expandIcon={<MenuIcon/>}>
                        <Box
                            sx={{width: "100%", display: "flex", justifyContent: "center"}}
                        >
                            <Link href="/workspaces">
                                <Image
                                    src="/Logox141.png"
                                    alt="wAIpify"
                                    width={250}
                                    height={42}
                                    priority={true}
                                />
                            </Link>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginBottom: "4rem",
                            }}
                        >
                            <MobileNavbarItem>
                                <MobileNavbarLink href="/workspaces">
                                    {t("navbar.my-workspaces")}
                                </MobileNavbarLink>
                            </MobileNavbarItem>
                            <MobileNavbarItem>
                                <MobileNavbarLink href="/ai-generators-library">
                                    {t("navbar.ai-library")}
                                </MobileNavbarLink>
                            </MobileNavbarItem>
                            <MobileNavbarItem>
                                <MobileNavbarInnerAccordion>
                                    <AccordionSummary
                                        sx={{
                                            padding: "0",
                                            maxWidth: "fit-content",
                                            minHeight: "auto",
                                            justifyContent: "start",
                                        }}
                                        expandIcon={<ExpandMoreIcon/>}
                                    >
                                        <MobileNavbarItem>
                                            {t("account_settings.account_settings")}
                                        </MobileNavbarItem>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <MobileNavbarItem sx={{marginBottom: "1rem !important"}}>
                                            {companyName}
                                        </MobileNavbarItem>
                                        <MobileNavbarGrayItem>
                                            <MobileNavbarGrayLink href="/members">
                                                {t("account_settings.members")}
                                            </MobileNavbarGrayLink>
                                        </MobileNavbarGrayItem>
                                        <MobileNavbarGrayItem>
                                            <MobileNavbarGrayLink href="/usage">
                                                {t("account_settings.usage.usage")}
                                            </MobileNavbarGrayLink>
                                        </MobileNavbarGrayItem>
                                        <MobileNavbarText>
                                            {t("account_settings.please_use_desktop_version")}
                                        </MobileNavbarText>
                                        <MobileNavbarItem sx={{marginBottom: "1rem !important"}}>
                                            {t("account_settings.user")}
                                        </MobileNavbarItem>
                                        <MobileNavbarGrayItem>
                                            <MobileNavbarGrayLink href="/user-settings">
                                                {t("account_settings.user_settings")}
                                            </MobileNavbarGrayLink>
                                        </MobileNavbarGrayItem>
                                    </AccordionDetails>
                                </MobileNavbarInnerAccordion>
                            </MobileNavbarItem>
                            <MobileNavbarItem onClick={handleLogout}>
                                {t("navbar.logout")}
                            </MobileNavbarItem>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}
                        >
                            <MobileNavbarGrayItem>
                                <MobileNavbarFooterLink href="#">
                                    {t("auth.link-text.terms")}
                                </MobileNavbarFooterLink>
                            </MobileNavbarGrayItem>
                            <MobileNavbarGrayItem> - </MobileNavbarGrayItem>
                            <MobileNavbarGrayItem>
                                <MobileNavbarFooterLink href="#">
                                    {t("auth.link-text.privacy")}
                                </MobileNavbarFooterLink>
                            </MobileNavbarGrayItem>
                            <MobileNavbarGrayItem> - </MobileNavbarGrayItem>
                            <MobileNavbarGrayItem>
                                <MobileNavbarFooterLink href="#">
                                    {t("auth.link-text.imprint")}
                                </MobileNavbarFooterLink>
                            </MobileNavbarGrayItem>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
