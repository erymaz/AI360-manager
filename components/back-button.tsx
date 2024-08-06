import { ArrowBack } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";

export const BackButton = (props: IconButtonProps) => (
  <IconButton {...props}>
    <ArrowBack />
  </IconButton>
);
