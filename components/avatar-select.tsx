import { RequiredMarker } from "./required-marker";
import { FormField } from "@/types";
import styled from "@emotion/styled";
import { FormLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const StyledAvatarContainer = styled.div`
  background: #fff;
  border-radius: 4px;
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  padding: 0.25rem;
  margin: 0.5rem 0 1rem;
`;

const StyledAvatar = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  margin: 0.25rem;
  border-radius: 4px;
  cursor: pointer;

  img {
    border-radius: 4px;
    background: #f5f5f5;
    max-width: 100%;
    display: block;
  }

  span {
    display: block;
    max-width: 100%;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const AvatarRadioButton = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
`;

const AvatarSelection = styled.div`
  margin-bottom: 0.5rem;
  border-radius: 4px;

  input:checked ~ & {
    outline: 2px solid #1f75ff;
  }
`;

const Avatar = ({
  fieldName,
  value,
  label,
  image,
  onChange,
  checked,
}: {
  fieldName: string;
  value: string;
  label: string;
  image: string;
  onChange?: (ev: any) => any;
  checked?: boolean;
}) => (
  <StyledAvatar>
    <AvatarRadioButton
      type="radio"
      name={fieldName}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <AvatarSelection>
      <img src={image} alt="image"/>
    </AvatarSelection>
    <span>{label}</span>
  </StyledAvatar>
);

export const AvatarSelect = ({ field }: { field: FormField }) => {
  return (
    <div>
      <FormLabel>
        <RequiredMarker field={field} />
        {field.label}
      </FormLabel>
      <StyledAvatarContainer>
        <Controller
          name={field.name}
          defaultValue={field.value}
          render={(props) => (
            <>
              {field.options?.map((item) => (
                <Avatar
                  key={item.value}
                  fieldName={field.name}
                  value={item.value}
                  label={item.label}
                  image={item.image}
                  checked={props.field.value === item.value}
                  onChange={props.field.onChange}
                />
              ))}
            </>
          )}
        />
      </StyledAvatarContainer>
    </div>
  );
};
