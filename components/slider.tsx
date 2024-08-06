import { RequiredMarker } from "./required-marker";
import { FormField } from "@/types";
import styled from "@emotion/styled";
import { Box, FormLabel, Slider as MuiSlider } from "@mui/material";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {useTranslations} from "next-intl";

const StyledSlider = styled.div`
  padding: 0 0.5rem;
  .MuiSlider-markLabel {
    font-size: 11px;
  }
`;

export const Slider = ({ field }: { field: FormField }) => {
  const methods = useFormContext();
    const t = useTranslations('waipify.ui');

  const marks = useMemo(() => {
    return field.options?.map((item, index) => ({
      value: index,
      label: item.label,
    }));
  }, [field.options]);

  const valueLabelFormat = (value: number) => {
    return field.options?.[value].label;
  };

  const getValue: ComponentPropsWithoutRef<typeof MuiSlider>["onChange"] = (
    event
  ) => {
    const val = (event.target as unknown as { value: number }).value;
    return field.options?.[val].value;
  };

  return (
    <Box marginBottom={2}>
      <FormLabel htmlFor={field.name}>
        <RequiredMarker field={field} />
        {t(field.label)}
      </FormLabel>
      <StyledSlider>
        <Controller
          name={field.name}
          defaultValue={field.value}
          render={(props) => (
            // @ts-ignore
            <MuiSlider
              {...methods.register(field.name, { required: field.required })}
              max={(field.options?.length || 1) - 1}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              value={field.options?.findIndex(
                (option) => option.value === props.field.value
              )}
              onChange={(...event) => props.field.onChange(getValue(...event))}
              valueLabelFormat={valueLabelFormat}
            />
          )}
        />
      </StyledSlider>
    </Box>
  );
};
