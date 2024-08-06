import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const styles = {
  container: {
    minHeight: "226px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1.5px dashed #9CA5AF",
    borderRadius: "8px",
    cursor: "pointer",
  },
  title: {
    color: "#6A7381",
    font: "Inter",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
  },
  add: { color: "#6A7381" },
};

export const AddNewTile = ({
  title,
  workspaceId,
  onClick,
}: {
  title: string;
  workspaceId: string;
  onClick?: () => void;
}) => {
  const router = useRouter();
  return (
    <Box
      onClick={() => {
        onClick
          ? onClick()
          : router.push(`/add-generator?workspaceId=${workspaceId}`);
      }}
      sx={styles.container}
    >
      <Add sx={styles.add} />
      <Box sx={styles.title}>{title}</Box>
    </Box>
  );
};
