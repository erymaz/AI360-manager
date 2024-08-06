import { FormItem } from "./form-item";
import { RequiredMarker } from "./required-marker";
import { FormField } from "@/types";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {useTranslations} from "next-intl";

export const FormGroup = ({ field }: { field: FormField }) => {
    const t = useTranslations('waipify.ui');
  const { register, watch } = useFormContext();

  const open = watch(field.name, true);

  return (
    <div>
      <Box marginBottom={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={open}
              {...register(field.name, { required: field.required })}
            />
          }
          id={field.name}
          name={field.name}
          label={
            <>
              <RequiredMarker field={field} />
              {t(field.label)}
            </>
          }
          htmlFor={field.name}
        />
      </Box>
      {open &&
        field.fields?.map((item, index) => (
          <FormItem key={index} field={item} />
        ))}
    </div>
  );
};
