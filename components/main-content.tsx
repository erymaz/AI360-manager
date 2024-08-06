import { ToggleSidebarButton } from "./sidebar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export const MainContent = styled(Box)`
  flex: 1;
  overflow: auto;
  height: calc(100vh - 66px);
  background-color: #fff;
  padding: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`;
const Subtitle = styled.div`
  margin: 0;
  font-size: 14px;
  color: #6a7381;
  white-space: nowrap;
  max-width: calc(100vw - 10rem);
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MainContentTitle = ({
  children,
  subtitle,
  actions,
}: {
  children: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) => {
  return (
    <TitleContainer>
      <ToggleSidebarButton />
      <div>
        <Title>{children}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </div>
      <div style={{ marginLeft: "auto" }}>{actions}</div>
    </TitleContainer>
  );
};
