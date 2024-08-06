import { useGeneratorLayout } from "./generator-layout";
import { SectionTitle } from "./section-title";
import styled from "@emotion/styled";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";

export const StyledSidebar = styled(Box)<{ isOpen?: boolean }>`
  background-color: #f6f7f9;
  border-right: 1px solid #d7dbe0;
  padding: 2rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  transition: 0.15s all ease-in;

  position: absolute;
  inset: 66px 0 0;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  width: 100vw;
  z-index: 1;

  @media (min-width: 900px) {
    max-height: calc(100vh - 66px);
    position: relative;
    inset: auto;
    transform: none;
    width: 22.5rem;
  }
`;

export const Sidebar = ({ children }: { children?: ReactNode }) => {
  const { sidebarOpen } = useGeneratorLayout();
  return <StyledSidebar isOpen={sidebarOpen}>{children}</StyledSidebar>;
};

const StyledToggleSidebarButton = styled(IconButton)`
  border: 1px solid #d7dbe0;
  border-radius: 0.5rem;
  margin-right: 1rem;

  @media (min-width: 900px) {
    display: none;
  }
`;

export const ToggleSidebarButton = () => {
  const { toggleSidebar } = useGeneratorLayout();

  return (
    <StyledToggleSidebarButton onClick={toggleSidebar}>
      <ArrowBack />
    </StyledToggleSidebarButton>
  );
};

const SidebarTitleContainer = styled(SectionTitle)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SidebarTitle = ({ children }: { children?: ReactNode }) => {
  return (
    <SidebarTitleContainer>
      <ToggleSidebarButton />
      {children}
    </SidebarTitleContainer>
  );
};
