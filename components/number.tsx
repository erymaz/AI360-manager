import {StyledTextField} from "./form-control";
import {RequiredMarker} from "./required-marker";
import {FormField} from "@/types";
import styled from "@emotion/styled";
import {Box, FormLabel} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";

const StyledNumberControl = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Number = ({field}: { field: FormField }) => {
    const methods = useFormContext();
    const t = useTranslations('waipify.ui');
    const getValue = (e: any) => {
        const inputValue = e.target.value;
        // Only allow numbers (including decimal point)
        const regex = /^[0-9.,]*$/;
        if (regex.test(inputValue)) {
            return inputValue;
        } else {
            return inputValue.replace(/[^0-9.,]/g, "");
        }
    };

    const onChange = (e: any, fieldChange: (value: any) => any) => {
        fieldChange(getValue(e));
    };

    return (
        <Box marginBottom={2} marginTop={2}>
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
                        <StyledTextField
                            {...methods.register(field.name, {required: field.required})}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={props.field.value}
                            inputProps={{
                                min: 0,
                                step: "1",
                                lang: "en",
                            }}
                            onChange={(e) => onChange(e, props.field.onChange)}
                            onBlur={(e) => props.field.onChange(getValue(e))}
                            sx={{maxWidth: "92px"}}
                        />
                    )}
                />
            </StyledNumberControl>
        </Box>
    );
};
