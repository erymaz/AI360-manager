import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";
import { SectionTitle } from "./section-title";

const StyledOutcomeBox = styled(Box)`
  background-color: #eff6ff;
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

const StyledOutcomeHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export const OutcomeBox = ({
  title,
  actions,
  children,
  ...props
}: { title?: ReactNode; actions?: ReactNode } & BoxProps) => {
  return (
    <StyledOutcomeBox mb={3} {...props}>
      <StyledOutcomeHeader>
        <SectionTitle>{title}</SectionTitle>
        <Box>{actions}</Box>
      </StyledOutcomeHeader>
      {children}
    </StyledOutcomeBox>
  );
};
