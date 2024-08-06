import { SectionTitle } from "./section-title";
import styled from "@emotion/styled";

export const WorkspaceDropdownTitle = styled(SectionTitle)`
  font-size: 14px;
  font-weight: normal;
  max-width: 25vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: -1rem;

  @media (min-width: 900px) {
    margin-left: 0;
    font-size: 18px;
    font-weight: bold;
  }
`;
