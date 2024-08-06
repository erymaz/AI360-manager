import { Select as MuiSelect, SelectProps } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const Select = forwardRef(
  (
    {
      sx,
      onChange,
      ...props
    }: Omit<SelectProps, "onChange"> & {
      onChange: (event: { target: { value: string } }) => void;
    },
    ref,
  ) => {
    return (
      <MuiSelect
        sx={{
          minWidth: "92px",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#c4c4c4",
            borderRadius: "8px",
          },
          ".MuiSelect-select": {
            background: "#fff",
            padding: ".5rem 1rem",
          },
          ...sx,
        }}
        onChange={onChange as SelectProps["onChange"]}
        displayEmpty
        input={<OutlinedInput ref={ref} />}
        {...props}
      />
    );
  },
);

Select.displayName = 'Select';
