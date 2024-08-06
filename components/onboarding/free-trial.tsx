import logoBackdrop from "../../public/logo-backdrop.svg";
import styled from "@emotion/styled";
import {CheckCircleOutline} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTranslations} from "next-intl";

const FreeTrialContainer = styled.div`
    background: url(${logoBackdrop.src}) center bottom no-repeat #e6efff;
    border-radius: 6px;
    padding: 0.8rem 2.5rem;
    min-height: 30rem;
`;

const FreeTrialContainerMobile = styled.div`
    background: url(${logoBackdrop.src}) center bottom no-repeat #e6efff;
    border-radius: 6px;
    padding: 0.8rem 2.5rem;
    min-height: 15rem;
`;

const FreeTrialTitle = styled.h2`
    color: #3c5d90;
    line-height: normal;
    font-size: 1.6rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #c2d4f0;
    margin-bottom: 1rem;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    color: #1a262d;
`;

const ListItem = styled.li`
    margin: 1rem 0;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    line-height: normal;

    svg {
        fill: #1f75ff;
        font-size: 1.3rem;
        margin-right: 0.5rem;
    }
`;

export const FreeTrial = () => {
    const theme = useTheme();
    const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));
    const t = useTranslations('waipify.ui');

    const FreeTrialContent = () => {
        return (
            <>
                <FreeTrialTitle>{t("onboarding.free_trial")}</FreeTrialTitle>
                <List>
                    <ListItem>
                        <CheckCircleOutline/> {t("onboarding.create_first_report_free")}
                    </ListItem>
                    <ListItem>
                        <CheckCircleOutline/> {t("onboarding.no_credit_card")}
                    </ListItem>
                    <ListItem>
                        <CheckCircleOutline/> {t("onboarding.invite_team")}
                    </ListItem>
                </List>
            </>
        );
    };

    return isDesktopView ? (
        <FreeTrialContainer><FreeTrialContent/></FreeTrialContainer>
    ) : (
        <FreeTrialContainerMobile><FreeTrialContent/></FreeTrialContainerMobile>
    );
};
