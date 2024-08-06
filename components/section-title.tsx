import { useViewport } from "@/helpers/use-viewport";
import { Typography, TypographyProps } from "@mui/material";

export const SectionTitle = (props: TypographyProps) => {
  const { isMobile } = useViewport();
  return (
    <Typography
      variant="h5"
      fontSize={isMobile ? "16px" : "18px"}
      fontWeight={500}
      mb={0.5}
      {...props}
    />
  );
};
