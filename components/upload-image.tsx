import styled from "@emotion/styled";
import { FileUploadOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import {useTranslations} from "next-intl";

const StyledUploadImage = styled.div`
  display: flex;
  align-items: center;
  border: 1px dashed #d7dbe0;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const Icon = styled.div`
  padding: 1rem;
  width: 42px;
  height: 42px;
  background-color: #f6f7f9;
  position: relative;
  margin-right: 1rem;
  border-radius: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const UploadImage = () => {
    const t = useTranslations('waipify.ui');
  return (
    <StyledUploadImage>
      <Icon>
        <FileUploadOutlined />
      </Icon>
      <Box>
        <div>
          <Typography>{t("general.drag_image")}</Typography>
        </div>
        <Typography variant="body2" fontSize={12} color="blueGrey">
          {t("general.click_to_browse")}
        </Typography>
      </Box>
    </StyledUploadImage>
  );
};
