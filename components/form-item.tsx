import { AddressControl } from "./address-control";
import { AvatarSelect } from "./avatar-select";
import { Callout } from "./callout";
import { Divider } from "./divider";
import { Dropdown } from "./dropdown";
import { FormControl } from "./form-control";
import { FormGroup } from "./form-group";
import ImageUpload from "./image-upload";
import { Number } from "./number";
import { NumberDropdown } from "./number-dropdown";
import { RequiredMarker } from "./required-marker";
import { Slider } from "./slider";
import { Switch } from "./switch";
import { FormField, FormFieldType } from "@/types";
import styled from "@emotion/styled";
import { WarningAmber } from "@mui/icons-material";
import { Box, FormLabel, TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const StyledFormItem = styled.div<{ hasError?: boolean }>`
  .switch-control,
  .dropdown-control,
  .dropdown__control,
  .MuiInputBase-input:not(textarea),
  .MuiOutlinedInput-root {
    border-radius: 8px;
    ${({ hasError }) => (hasError ? `box-shadow: 0 0 0 1px #f00` : "")}
  }
`;

const FormComponent = ({ field }: { field: FormField }) => {
  const { control, register } = useFormContext();
  switch (field.formFieldType) {
    case FormFieldType.Image:
      return (
        <Box key={field.name} marginBottom={2}>
          <FormLabel htmlFor={field.name}>
            <RequiredMarker field={field} />
            {field.label}
          </FormLabel>
          <ImageUpload name={field.name} resize={field.resize} />
        </Box>
      );
    case FormFieldType.Checkbox:
      return <FormControl key={field.name} field={field} />;
    case FormFieldType.Switch:
      return <Switch key={field.name} field={field} />;
    case FormFieldType.NumberDropdown:
      return <NumberDropdown key={field.name} field={field} />;
    case FormFieldType.Number:
      return <Number key={field.name} field={field} />;
    case FormFieldType.Dropdown:
      return <Dropdown key={field.name} field={field} />;
    case FormFieldType.Multiselect:
      return <Dropdown key={field.name} field={field} multiple />;
    case FormFieldType.Slider:
      return <Slider key={field.name} field={field} />;
    case FormFieldType.Address:
      return <AddressControl field={field} />;
    case FormFieldType.Divider:
      return <Divider />;
    case FormFieldType.Callout:
      return (
        <Callout
          sx={{ marginBottom: "1rem", background: "#fff" }}
          icon={<WarningAmber />}
          title={field.label}
        >
          {field.value}
        </Callout>
      );
    case FormFieldType.Textarea:
      return (
        <FormControl
          key={field.name}
          multiline
          field={field}
          inputProps={{ maxLength: field.maxLength || 500 }}
        />
      );
    case FormFieldType.Avatar:
      return <AvatarSelect field={field} />;
    case FormFieldType.Group:
      return <FormGroup field={field} />;
    case FormFieldType.Date:
      return (
        <Box key={field.name} marginBottom={2}>
          <FormLabel htmlFor={field.name}>
            <RequiredMarker field={field} />
            {field.label}
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={""}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DatePicker
                  value={value ? new Date(value) : null}
                  onChange={date => onChange(date?.toISOString().slice(0,10))}
                  components={{
                    TextField: TextField
                  }}
                  componentsProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      );
    case FormFieldType.Text:
    default:
      return <FormControl key={field.name} field={field} />;
  }
};

export const FormItem = ({ field }: { field: FormField }) => {
  const { formState } = useFormContext();
  return (
    <StyledFormItem hasError={!!formState.errors[field.name]}>
      <FormComponent field={field} />
    </StyledFormItem>
  );
};
