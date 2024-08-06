import { BackButton } from "./back-button";
import styled from "@emotion/styled";
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ReactNode } from "react";

const HeadingNavContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;
const HeadingNavContent = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const HeadingNavTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1a262d;
`;
const HeadingNavSubitle = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #6a7381;
`;

export const HeadingNav = ({
  title,
  subtitle,
  onBack,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  onBack?: () => any;
}) => (
  <HeadingNavContainer>
    <BackButton onClick={onBack} />
    <HeadingNavContent>
      <HeadingNavTitle>{title}</HeadingNavTitle>
      <HeadingNavSubitle>{subtitle}</HeadingNavSubitle>
    </HeadingNavContent>
  </HeadingNavContainer>
);
