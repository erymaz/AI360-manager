import {Callout} from "./callout";
import {CloseGenerator} from "./close-generator";
import {EmptyState} from "./empty-state";
import {useGeneratorContext} from "@/components/generator-context";

import {useViewport} from "@/helpers/use-viewport";
import {AutoFixHigh} from "@mui/icons-material";
import {Box} from "@mui/material";
import {useTranslations} from "next-intl";

export const PlaceholderOutcome = ({
                                       actions,
                                   }: {
    actions?: React.ReactNode;
}) => {
    const {isDesktop} = useViewport();
    const t = useTranslations('waipify.ui');
    const {name} = useGeneratorContext();
    return (
        <>
            <Box display="flex" sx={{alignItems: "flex-start"}}>
                <Callout
                    flex={1}
                    icon={<AutoFixHigh sx={{fontSize: "3rem"}}/>}
                    title={
                        (name || "").indexOf("video") > -1
                            ? t("outcome.video_not_generated")
                            : t("outcome.text_not_generated")
                    }
                    mb={3}
                >
                    {t("outcome.complete_all_settings")}
                </Callout>
                {actions}
                {isDesktop && <CloseGenerator/>}
            </Box>
            {isDesktop && <EmptyState/>}
        </>
    );
};
