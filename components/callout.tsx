import { BorderBox } from "./border-box";
import { SectionTitle } from "./section-title";
import styled from "@emotion/styled";
import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

const StyledCallout = styled(BorderBox)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 4rem 1rem;
  border: 1px solid #d7dbe0;
  border-radius: 0.5rem;

  @media (min-width: 900px) {
    padding: 1rem;
  }
`;

const StyledIcon = styled(Typography)`
  width: 3rem;
  height: 3rem;

  svg {
    display: block;
  }
`;

export const Callout = ({
  icon,
  title,
  children,
  ...props
}: BoxProps & {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <StyledCallout {...props}>
      <StyledIcon sx={{ color: "primary.main" }}>{icon}</StyledIcon>
      <Box>
        <SectionTitle>{title}</SectionTitle>
        <Typography fontSize="14px" color="#6A7381">
          {children}
        </Typography>
      </Box>
    </StyledCallout>
  );
};
