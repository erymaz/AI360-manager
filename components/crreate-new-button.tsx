import { useViewport } from "@/helpers/use-viewport";
import { Add } from "@mui/icons-material";
import { Button, ButtonProps, IconButton } from "@mui/material";

export const CreateNewButton = ({ children, ...props }: ButtonProps) => {
  const { isMobile } = useViewport();
  return isMobile ? (
    <IconButton
      sx={{
        border: "solid 1px #D7DBE0",
        borderRadius: "8px",
        marginLeft: "14px",
      }}
      {...props}
    >
      <Add />
    </IconButton>
  ) : (
    <Button
      sx={{ ml: 2 }}
      endIcon={<Add />}
      variant="contained"
      type="submit"
      {...props}
    >
      {children}
    </Button>
  );
};
