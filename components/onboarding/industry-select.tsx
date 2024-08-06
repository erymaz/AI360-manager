import dynamic from "next/dynamic";
import {useMemo} from "react";
import {useTranslations} from "next-intl";

type Industry = {
    id?: string;
    name: string;
};

type SelectOption = {
    label: string;
    value: string;
};

const ReactSelectNoSSR = dynamic(() => import("react-select"), {
    loading: () => <></>,
    ssr: false,
});

export const IndustrySelect = ({
                                   value,
                                   onChange,
                                   industries
                               }: {
    value: string;
    onChange: (value: string) => void;
    industries: Industry[]
}) => {
    const t = useTranslations('waipify.ui');
    const options: any = useMemo(
        () =>
            industries
                .map((industry: Industry) => {
                    return {label: t(`account_settings.industry.${industry.name}`), value: industry.id};
                }),
        [t, industries]
    );
    return (
        <ReactSelectNoSSR
            placeholder="Select"
            classNamePrefix="dropdown"
            value={options.filter((industry: SelectOption) => industry.value == value)}
            options={options}
            onChange={(option: unknown) =>
                onChange((option as { value: string })?.value)
            }
        />
    );
};