import {BorderBox} from "./border-box";
import {Placeholder} from "./placeholder";
import {SectionTitle} from "./section-title";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useTranslations} from "next-intl";

export const EmptyState = () => {
    const t = useTranslations('waipify.ui');
    return (
        <Grid2 container>
            <Grid2 xs={8} pr={1.5}>
                <BorderBox sx={{minHeight: "20rem"}} mb={3} p={3}>
                    <SectionTitle>{t("outcome.outcome-box")}</SectionTitle>
                </BorderBox>
            </Grid2>
            <Grid2 xs={4} pl={1.5}>
                <Placeholder/>
            </Grid2>
        </Grid2>
    );
};
