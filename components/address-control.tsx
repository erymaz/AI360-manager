import {StyledTextField} from "./form-control";
import {RequiredMarker} from "./required-marker";
import {FormField} from "@/types";
import {Box, FormLabel} from "@mui/material";
import {usePlacesWidget} from "react-google-autocomplete";
import {useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";

export const AddressControl = ({field}: { field: FormField }) => {
    const methods = useFormContext();
    const t = useTranslations('waipify.ui');
    const {ref} = usePlacesWidget({
        onPlaceSelected: (place) => console.log(place),
        options: {
            types: ["address"],
        },
    });
    return (
        <Box marginBottom={2}>
            <FormLabel htmlFor={field.name}>
                <RequiredMarker field={field}/>
                {t(field.label)}
            </FormLabel>
            <StyledTextField
                inputRef={ref as any}
                fullWidth
                id={field.name}
                placeholder={field.placeholder}
                defaultValue={field.value}
                {...methods.register(field.name, {required: field.required})}
            />
        </Box>
    );
};
