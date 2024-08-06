import { GeneratorCard } from "../ai-generators-library/generator-card";
import { Generator } from "@/pages/add-generator";
import styled from "@emotion/styled";
import { CheckCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import { HTMLProps, ReactNode } from "react";

const StyledCustomiseItemContent = styled.div`
  border: 1px solid rgb(215, 219, 224);
  border-radius: 10px;
  height: 100%;
  display: flex;

  input:checked ~ & {
    border-color: #1f75ff;
  }
`;

const StyledCustomisedItem = styled.label`
  display: block;
  position: relative;

  input {
    opacity: 0;
    position: absolute;
  }
`;

const CheckIcon = styled(CheckCircle)`
  display: none;
  position: absolute;
  right: -0.6rem;
  top: -0.6rem;
  z-index: 1;
  background-color: #fff;
  border-radius: 100px;

  input:checked ~ & {
    display: block;
  }
`;

export const CustomiseItemsList = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-auto-rows: 1fr;
  margin-top: 1.5rem;
`;

export const CustomiseItemsListMobile = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const ItemsListMobileStyled = styled(Box)`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(2, minmax(240px, 70%));
    grid-template-rows: repeat(2, 46%);
    overflow-x: scroll;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;
    grid-auto-columns: minmax(240px, 70%);
    padding-top: 6rem;
    padding-bottom: 3rem;
    padding-left: 1rem;
  `;
  return <ItemsListMobileStyled>{children}</ItemsListMobileStyled>;
};

export const CustomiseItem = ({
  generator,
  inputRef,
  ...props
}: HTMLProps<HTMLInputElement> & {
  generator: Generator;
  inputRef?: any;
}) => (
  <StyledCustomisedItem>
    <input type="checkbox" ref={inputRef} {...props} />
    <CheckIcon htmlColor="#1f75ff" />
    <StyledCustomiseItemContent>
      <GeneratorCard
        compact
        title={generator.title}
        description={generator.description}
        cost={generator.cost_per_use}
        popularity={generator.popularity}
        image={generator.image}
      />
    </StyledCustomiseItemContent>
  </StyledCustomisedItem>
);
