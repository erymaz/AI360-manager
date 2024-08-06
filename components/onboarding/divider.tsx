import styled from "@emotion/styled";

export const Divider = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca5af;

  &::after,
  &::before {
    content: "";
    display: block;
    height: 1px;
    flex: 1;
    background-color: #d7dbe0;
  }
`;
