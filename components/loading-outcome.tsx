import { Callout } from "./callout";
import { CloseGenerator } from "./close-generator";
import { EmptyState } from "./empty-state";
import { useGeneratorContext } from "@/components/generator-context";
import { useViewport } from "@/helpers/use-viewport";
import { Box, CircularProgress } from "@mui/material";
import {useTranslations} from "next-intl";

export const LoadingOutcome = ({ actions }: { actions?: React.ReactNode }) => {
    const t = useTranslations('waipify.ui');
  const { name } = useGeneratorContext();
  const { isDesktop } = useViewport();

  return (
    <>
      <Box display="flex">
        <Callout
          icon={<CircularProgress size="3rem" />}
          title={
            (name || "").indexOf("video") > -1
              ? t("general.generating_video")
              : t("general.generating_text")
          }
          mb={3}
          flex={1}
        >
          {t("general.take_couple_minutes")}
        </Callout>
        {isDesktop && actions}
        {isDesktop && <CloseGenerator />}
      </Box>
      {isDesktop && <EmptyState />}
    </>
  );
};
