import { CloseSharp } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";

export const CloseGenerator = () => {
  const router = useRouter();
  const goToDashboard = () => router.push("/workspaces");

  return (
    <IconButton onClick={goToDashboard}>
      <CloseSharp fontSize="small" sx={{ fill: "#6A7381" }} />
    </IconButton>
  );
};
