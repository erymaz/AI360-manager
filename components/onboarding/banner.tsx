import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const StyledBanner = styled.div`
  background-color: #ecfdf5;
  border: 1px solid #059669;
  border-radius: 6px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  color: #6a7381;
  font-size: 0.875rem;
`;

const BannerTitle = styled(Typography)`
  color: #059669;
  font-weight: bold;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const Banner = ({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <StyledBanner>
      {icon}
      <div>
        <BannerTitle>{title}</BannerTitle>
        {children}
      </div>
    </StyledBanner>
  );
};
