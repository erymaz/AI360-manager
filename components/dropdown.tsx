import { RequiredMarker } from "./required-marker";
import { Select } from "./select";
import { FormField } from "@/types";
import styled from "@emotion/styled";
import { Box, FormLabel, MenuItem, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {useTranslations} from "next-intl";

const ReactSelectNoSSR = dynamic(() => import("react-select"), {
  loading: () => <></>,
  ssr: false,
});

const StyledDropdown = styled.div`
  margin: 0.5rem 0 0;
`;

type Option = { label: string; value: string };

export const Dropdown = ({
  field,
  multiple,
}: {
  field: FormField;
  multiple?: boolean;
}) => {
  const methods = useFormContext();
    const t = useTranslations('waipify.ui');
  const [isInteracted, setIsInteracted] = useState(false);

  return (
    <Box marginBottom={2}>
      <FormLabel htmlFor={field.name}>
        <RequiredMarker field={field} />
        {t(field.label)}
      </FormLabel>
      <StyledDropdown>
        {multiple ? (
          <Controller
            name={field.name}
            defaultValue={field.value}
            rules={{ required: field.required }}
            render={(props) => (
              <>
                <ReactSelectNoSSR
                  placeholder={field.placeholder}
                  classNamePrefix="dropdown"
                  value={field.options?.filter((option) =>
                    props.field.value.includes(option.value)
                  )}
                  isMulti
                  options={field.options as { label: string; value: string }[]}
                  onChange={(opts: any) => {
                    setIsInteracted(true);
                    props.field.onChange(opts.map(({ value }: any) => value));
                  }}
                  getOptionLabel={(option: any) => t(option.label)}
                  isOptionDisabled={(option: any) =>
                    field.name === "translations" &&
                    props.field.value.length >= 3 &&
                    !props.field.value.includes(option.value)
                  }
                />
                {field.name === "translations" && isInteracted && (
                  <Typography
                    color={props.field.value.length >= 3 ? "error" : "textSecondary"}
                    variant="body2"
                  >
                    {t("general.max_translation_lang")}
                  </Typography>
                )}
              </>
            )}
          />
        ) : (
          <Controller
            name={field.name}
            defaultValue={field.value || ""}
            rules={{ required: field.required }}
            render={(props) => (
              <Select
                {...methods.register(field.name, { required: field.required })}
                placeholder={field.placeholder}
                name={field.name}
                id={field.name}
                value={props.field.value}
                onChange={props.field.onChange}
                multiple={multiple}
                fullWidth
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#c4c4c4",
                    borderRadius: "8px",
                  },
                  ".MuiSelect-select": {
                    background: "#fff",
                    padding: ".5rem 1rem",
                  },
                  ...(!props.field.value
                    ? {
                        ".MuiOutlinedInput-input": {
                          color: "#979797",
                        },
                      }
                    : {}),
                }}
              >
                {!!field.placeholder && (
                  <MenuItem disabled value="">
                    {field.placeholder}
                  </MenuItem>
                )}
                {(field.options as Option[])?.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        )}
      </StyledDropdown>
    </Box>
  );
};
