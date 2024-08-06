import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image";

import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { riskIcons } from "@/helpers/tasks";

import { cn } from "@/lib/utils"

type Option = { value: string; label: string };

type Props = {
  showSelectedValue?: boolean;
  defaultValue?: string;
  label: string;
  name?: string;
  options: Option[];
  placeholder?: string;
  style?: string;
  onChange: (value: string) => void;
};

export const SearchableDropdown = ({
  showSelectedValue = true,
  defaultValue,
  label,
  name,
  options,
  placeholder,
  onChange,
  style,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    } else {
      setValue("");
    }
  }, [defaultValue]);

  const handleChange = (selected: string) => {
    setValue(selected);
    onChange(selected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          role="combobox"
          aria-expanded={open}
          className={`${style ? style : 'w-full'} justify-between truncate`}
        >
          {!showSelectedValue && <span>{label}</span>}
          {(showSelectedValue && value) && <span className="w-full text-left truncate">{options.find((option) => option.value === value)?.label}</span>}
          {(showSelectedValue && !value) && <span className="w-full text-left truncate select-placeholder">{`Select ${label}`}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder || 'Search'} />
          <CommandEmpty>No {label} found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    handleChange(option.value)
                    setOpen(false)
                  }}
                >
                  <div className="flex gap-x-4">
                    {showSelectedValue && <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />}
                    {name === 'risks' && <Image
                      src={riskIcons[option.label]}
                      alt="logo"
                      height={20}
                      width={20}
                    />}
                    <span>{option.label}</span>
                  </div>

                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
