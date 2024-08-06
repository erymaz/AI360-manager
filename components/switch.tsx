import {RequiredMarker} from "./required-marker";
import {FormField} from "@/types";
import styled from "@emotion/styled";
import {FormLabel} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";

const SwitchContainer = styled.div`
    margin-bottom: 1rem;
`;

const StyledSwitch = styled.div`
    display: flex;
    justify-content: space-between;
    background: #edeef3;
    border: 1px solid #d7dbe0;
    border-radius: 0.5rem;
    padding: 0.25rem;
    margin-top: 0.5rem;
`;

const SwitchItem = styled.label<
    React.HTMLProps<HTMLLabelElement> & { active?: boolean }
>`
    display: flex;
    flex: 1;
    position: relative;
    justify-content: center;
    border-radius: 6px;
    padding: 6px;
    background: ${({active}) => (active ? "#fff" : "transparent")};
    color: ${({active}) => (active ? "#1A262D" : "#3E4856")};

    ${({active}) => active && "box-shadow: 0px 2px 6px rgba(11, 50, 67, 0.08);"}
    input {
        opacity: 0;
        position: absolute;
        inset: 0;
        cursor: pointer;
    }
`;

export const Switch = ({field}: { field: FormField }) => {
    const methods = useFormContext();
    const t = useTranslations('waipify.ui');
    const options = field.options || [];
    return (
        <SwitchContainer>
            <FormLabel htmlFor={field.name}>
                <RequiredMarker field={field}/>
                {t(field.label)}
            </FormLabel>
            <StyledSwitch className="switch-control">
                {options.map((option) => (
                    <Controller
                        key={option.value}
                        name={field.name}
                        defaultValue={field.value}
                        rules={{required: field.required}}
                        render={(props) => (
                            <SwitchItem active={!!(props.field.value === option.value)}>
                                <input
                                    {...methods.register(field.name, {required: field.required})}
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={!!(props.field.value === option.value)}
                                    onChange={(e) => {
                                        props.field.onChange(e.target.value);
                                    }}
                                />
                                {option.label}
                            </SwitchItem>
                        )}
                    />
                ))}
            </StyledSwitch>
        </SwitchContainer>
    );
};
