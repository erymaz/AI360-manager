import { ChangeEvent, ReactNode, useState } from "react";
import styled from "@emotion/styled";
import {
  CancelOutlined,
  CheckCircleOutline,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Box, FormLabel, TextFieldProps, Typography } from "@mui/material";
import { StyledTextField } from "@/components/form-control";

const VisibilityAction = styled.button`
  cursor: pointer;
  padding: 2px;
  appearance: none;
  border: none;
  background-color: #fff;
  position: absolute;
  right: 0.5rem;
  top: 0.8rem;

  svg {
    fill: #9ca5af;
  }
`;

const PasswordStrengthTooltip = styled.div`
  background-color: #1a262d;
  color: #fff;
  font-size: 0.875rem;
  margin-top: 1rem;
  border-radius: 8px;
  padding: 0.75rem;
  position: absolute;
  top: 100%;
  z-index: 1;

  &:before {
    content: "";
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #1a262d;
    position: absolute;
    top: -1rem;
    left: 1rem;
  }
`;

const StyledPasswordStrengthItem = styled(Typography)`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;

  svg {
    margin-right: 0.5rem;
  }
`;

const PasswordStrengthItem = ({
  active,
  children,
}: {
  active?: boolean;
  children?: ReactNode;
}) => (
  <StyledPasswordStrengthItem
    sx={{ textDecoration: active ? "none" : "line-through" }}
  >
    {active ? (
      <CheckCircleOutline htmlColor="#059669" />
    ) : (
      <CancelOutlined htmlColor="#DC2626" />
    )}
    {children}
  </StyledPasswordStrengthItem>
);

export const PasswordFormControl = (props: TextFieldProps) => {
  const id = props.id || "password";
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { inputProps, onChange, onFocus, onBlur, ...rest } = props;

  const validate = (password: string) => {
    return [
      { label: "At least 12 characters", value: password.length > 12 },
      {
        label: "Upper and lowercase letters",
        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password),
      },
      {
        label: "One number or special character",
        value: /^(?=.*[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(password),
      },
    ];
  };

  const [validationState, setValidationState] = useState(
    validate(props.value as string)
  );

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValidationState(validate(event.target.value));
    onChange?.(event);
  };

  return (
    <Box marginBottom={2}>
      <FormLabel htmlFor={id}>Password</FormLabel>
      <Box sx={{ position: "relative" }}>
        <StyledTextField
          id={id}
          type={visible ? "text" : "password"}
          fullWidth
          inputProps={{
            style: { paddingRight: "2.5rem" },
            ...inputProps,
          }}
          onChange={onPasswordChange}
          onFocus={(ev) => {
            setShowTooltip(true);
            onFocus?.(ev);
          }}
          onBlur={(ev) => {
            setShowTooltip(false);
            onBlur?.(ev);
          }}
          {...rest}
        />
        <VisibilityAction onClick={() => setVisible((current) => !current)}>
          {visible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
        </VisibilityAction>
        {showTooltip && (
          <PasswordStrengthTooltip>
            {validationState.map((item, index) => (
              <PasswordStrengthItem key={index} active={!!item.value}>
                {item.label}
              </PasswordStrengthItem>
            ))}
          </PasswordStrengthTooltip>
        )}
      </Box>
    </Box>
  );
};
