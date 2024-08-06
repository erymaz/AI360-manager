import styled from "@emotion/styled";

const FormControlCounterStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #9ca5af;
`;

export const FormControlCounter = ({
  value,
  limit,
}: {
  value?: string;
  limit?: number;
}) => {
  return (
    <FormControlCounterStyled>
      {value?.length} / {limit}
    </FormControlCounterStyled>
  );
};
