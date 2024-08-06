import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const AuthForm = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const AuthFormTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;
  line-height: normal;
  margin-bottom: 1.8rem;
  color: #1a262d;
`;

export const AuthFormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  width: 100%;
`;

export const AuthFormFooterMobile = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  margin: 0;
  border-top: 1px solid #D7DBE0;
  background-color: #fff;
  padding: 1rem;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AuthFormActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
