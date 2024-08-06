import styled from "@emotion/styled";
import workspaceBg from "../../public/workspace-bg.png";

export const WorkspaceContainer = styled.div`
  background: url(${workspaceBg.src}) repeat-x top center #fff;
  padding: 2rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 10px 14px -12px rgba(0, 0, 0, 0.15);
  width: 100%;
`;
