import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const FormContainer = styled(Box)`
  background-color: #fff;
  box-shadow: 0px 10px 14px -12px rgba(0, 0, 0, 0.15);
  width: 50rem;
  max-width: 100%;
  border-radius: 8px;
  padding: 2rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 2.5rem;
`;

export const FormContainerMobile = styled(Box)`
  background-color: #fff;
  padding: 2rem;  
  padding-bottom: 6rem;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 1fr;
  grid-rows-gap: 2.5rem;
`;
