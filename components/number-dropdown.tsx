import {RequiredMarker} from "./required-marker";
import {Select} from "./select";
import {FormField} from "@/types";
import styled from "@emotion/styled";
import {Box, FormLabel, MenuItem} from "@mui/material";
import {useMemo, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";

const StyledNumberControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NumberDropdown = ({field}: { field: FormField }) => {
    const methods = useFormContext();
    const t = useTranslations('waipify.ui');
    const min = field.min || 0;
    const max = field.max || 50;

    const options = useMemo(() => {
        return Array.from(
            {length: max - min + 1},
            (_value, index) => min + index
        );
    }, [min, max]);

    return (
        <Box marginBottom={2}>
            <StyledNumberControl>
                <FormLabel htmlFor={field.name}>
                    <RequiredMarker field={field}/>
                    {t(field.label)}
                </FormLabel>
                <Controller
                    name={field.name}
                    defaultValue={field.value}
                    rules={{required: field.required}}
                    render={(props) => (
                        <Select
                            {...methods.register(field.name, {required: field.required})}
                            id={field.name}
                            value={props.field.value}
                            onChange={props.field.onChange}
                            displayEmpty={!!field.placeholder}
                        >
                            {!!field.placeholder && (
                                <MenuItem disabled value="">
                                    {field.placeholder}
                                </MenuItem>
                            )}
                            {options.map((value) => (
                                <MenuItem key={value} value={`${value}`}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </StyledNumberControl>
        </Box>
    );
};
