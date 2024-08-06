import {FormControlCounter} from "./form-control-counter";
import {RequiredMarker} from "./required-marker";
import {FormField, FormFieldType} from "@/types";
import styled from "@emotion/styled";
import {Select, FormControl as MuiFormControl} from "@mui/material";
import {
    Box,
    FormLabel,
    TextField,
    TextFieldProps,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";

export const StyledTextField = styled(TextField)`
    margin-top: 0.5rem;

    .MuiInputBase-root {
        background-color: #fff;
        border-radius: 0.5rem;
        padding: ${(props) => (props.multiline ? ".5rem 1rem" : "0")};
    }

    input {
        padding: 0.5rem 1rem;
    }
`;

export const FormControl = ({
                                field,
                                children,
                                ...props
                            }: TextFieldProps & { field: FormField; children?: React.ReactNode }) => {
    const methods = useFormContext();
    const t = useTranslations('waipify.ui');
    const initialValue =
        field.formFieldType === FormFieldType.Checkbox
            ? field.checked ?? false
            : field.value ??
            (field.formFieldType === FormFieldType.Dropdown &&
            field.options &&
            field.options.length > 0
                ? field.options[0].value
                : "");
    const value = methods.watch(field.name);

    if (field.formFieldType === FormFieldType.Checkbox) {
        return (
            <Box marginBottom={3}>
                <FormControlLabel
                    control={
                        <Controller
                            name={field.name}
                            defaultValue={initialValue}
                            render={(props) => (
                                <Checkbox
                                    {...methods.register(field.name, {required: field.required})}
                                    checked={!!props.field.value}
                                    onChange={props.field.onChange}
                                />
                            )}
                        />
                    }
                    id={field.name}
                    name={field.name}
                    label={
                        <>
                            <RequiredMarker field={field}/>
                            {t(field.label)}
                        </>
                    }
                    htmlFor={field.name}
                    value="true"
                />
            </Box>
        );
    }

    if (field.formFieldType === FormFieldType.Dropdown) {
        return (
            <Box marginBottom={2}>
                <FormLabel htmlFor={field.name}>
                    <RequiredMarker field={field}/>
                    {field.label}
                </FormLabel>
                <MuiFormControl fullWidth>
                    <Controller
                        name={field.name}
                        defaultValue={initialValue}
                        render={(props) => (
                            <Select
                                labelId={`${field.name}-label`}
                                id={field.name}
                                value={props.field.value}
                                // @ts-ignore
                                onChange={props.field.onChange}
                                displayEmpty
                                renderValue={(selected) => {
                                    // @ts-ignore
                                    const selectedOption = field.options.find(
                                        (option) => option.value === selected
                                    );
                                    return selectedOption ? selectedOption.label : "";
                                }}
                                {...props}
                            >
                                {children}
                            </Select>
                        )}
                    />
                </MuiFormControl>
            </Box>
        );
    }

    const stripHtml = (value: string) => {
        // Replace <br /> tags with new lines
        const replacedText = value.replace(/<br\s*\/?>/gi, "\n");

        // Remove HTML tags
        const strippedText = replacedText.replace(/<[^>]+>/g, "");

        return strippedText.substring(
            0,
            props.inputProps?.maxLength || strippedText.length
        );
    };

    return (
        <Box marginBottom={2}>
            <FormLabel htmlFor={field.name}>
                <RequiredMarker field={field}/>
                {t(field.label)}
            </FormLabel>
            <Controller
                name={field.name}
                defaultValue={initialValue}
                rules={{required: field.required}}
                render={({field: fieldProps}) => (
                    <StyledTextField
                        {...methods.register(field.name, {required: field.required})}
                        fullWidth
                        id={field.name}
                        placeholder={field.placeholder && t(field.placeholder)}
                        {...props}
                        inputProps={props.inputProps}
                        value={fieldProps.value}
                        onChange={(e) => {
                            fieldProps.onChange(stripHtml(e.target.value));
                        }}
                        onBlur={(e) => {
                            const value = (
                                e as unknown as React.ChangeEvent<
                                    HTMLTextAreaElement | HTMLInputElement
                                >
                            ).target.value;
                            fieldProps.onChange(stripHtml(value));
                        }}
                    />
                )}
            />
            {props.multiline && props.inputProps?.maxLength && (
                <FormControlCounter value={value} limit={props.inputProps.maxLength}/>
            )}
        </Box>
    );
};
