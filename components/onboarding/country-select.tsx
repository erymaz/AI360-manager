import dynamic from "next/dynamic";
import { useMemo } from "react";

type Country = {
  id?: string;
  en: string;
  iso2: string;
  iso3: string;
  flag: string;
  de: string;
  es: string;
};

type SelectOption = {
  label: string;
  value: string;
};


const ReactSelectNoSSR = dynamic(() => import("react-select"), {
  loading: () => <></>,
  ssr: false,
});
export const CountrySelect = ({
  value,
  onChange,
  countries
}: {
  value: string;
  onChange: (value: string) => void;
  countries: Country[]
}) => {
  
  const options: any = useMemo(
    () =>
      [
        ...countries.filter(
          (country: any) => country.iso2 === "GB" || country.iso2 === "DE"
        ),
        ...countries.filter(
          (country: any) => country.iso2 !== "GB" && country.iso2 != "DE"
        ),
      ].map((country: Country) => ({
        label: `${country?.flag} ${country?.en}`,
        value: country?.id,
      })),
    [countries]
  )

  return (
    <ReactSelectNoSSR
      placeholder="Select"
      classNamePrefix="dropdown"
      value={options.filter((country: SelectOption) => country?.value === value)}
      options={options}
      onChange={(option: unknown) =>
        onChange((option as { value: string })?.value)
      }
    />
  );
};
