import styled from "@emotion/styled";
import { Box, Grid } from "@mui/material";
import { BorderBox } from "./border-box";

const PlaceholderTextTitle = styled(Box)`
  height: 1rem;
  border-radius: 3rem;
  background-color: #9ca5af;
`;
const PlaceholderText = styled(Box)`
  height: 0.625rem;
  border-radius: 3rem;
  background-color: #c6cad2;
`;
const PlaceholderTextLight = styled(Box)`
  height: 0.625rem;
  border-radius: 3rem;
  background-color: #edeef3;
`;

const PlaceholderContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlaceholderItem = () => (
  <BorderBox p={2} mb={2}>
    <PlaceholderText mb={2} width="4rem" />
    <PlaceholderContent>
      <PlaceholderTextLight width="7rem" />
      <PlaceholderText width="3rem" />
    </PlaceholderContent>
  </BorderBox>
);

export const Placeholder = () => {
  return (
    <>
      <PlaceholderTextTitle mb={2} width="7rem" />
      <PlaceholderItem />
      <PlaceholderItem />
      <PlaceholderItem />
    </>
  );
};
