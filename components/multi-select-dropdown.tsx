import { useState, useMemo } from "react";
import styled from "@emotion/styled";
import Multiselect from "multiselect-react-dropdown";

import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

const StyledDropdown = styled.div<{
  width?: string;
  min?: string;
  max?: string;
}>`
  position: relative;
  width: ${(props) => props.width || "100%"};
  min-width: ${(props) => props.min || "200px"};
  max-width: ${(props) => props.max || "100%"};
  margin: 0.5rem 0 0;
`;

const SelectedValuesWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 10px;
  width: 100%;
  font-size: 14px;
  padding-right: 35px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type Option = { cat: string; key: string };

type Props = {
  options: Option[];
  value?: Option[];
  placeholder?: string;
  onChange: (newValue: Option[]) => void;
  width?: string;
  min?: string;
  max?: string;
};

export const MultiSelect = ({
  options,
  value,
  placeholder,
  onChange,
  width,
  min,
  max,
}: Props) => {
  const [selected, setSelected] = useState<Option[]>([]);

  useLayoutEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const displayTxt = useMemo(() => {
    if (!selected.length) {
      return "";
    } else if (selected.length === 1) {
      return selected[0].key;
    } else {
      return `${selected[0].key}, +${selected.length - 1} selected`;
    }
  }, [selected]);

  const handleChange = (selectedList: Option[]) => {
    setSelected([...selectedList]);
    onChange(selectedList);
  };

  return (
    <StyledDropdown width={width} max={max} min={min} className="mt-0 text-sm">
      <SelectedValuesWrapper>
        <span>{displayTxt}</span>
      </SelectedValuesWrapper>
      <Multiselect
        displayValue="key"
        onRemove={handleChange}
        onSelect={handleChange}
        options={options}
        placeholder={placeholder && !displayTxt ? placeholder : ""}
        showCheckbox
        showArrow={false}
        avoidHighlightFirstOption={true}
        hideSelectedList
      />
    </StyledDropdown>
  );
};
