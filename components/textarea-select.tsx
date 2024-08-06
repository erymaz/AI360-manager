import styled from "@emotion/styled";
import Multiselect from "multiselect-react-dropdown";
import { useState, useMemo, useRef } from "react";

const StyledDropdown = styled.div<{
  width?: string;
  min?: string;
  max?: string;
}>`
  position: relative;
  width: ${(props) => props.width || "100%"};
  min-width: ${(props) => props.min || "250px"};
  max-width: ${(props) => props.max || "100%"};
  margin: 0.5rem 0 0;
  padding: 8px 13px;
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  width: 100%;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  min-height: 134px;

  & .searchWrapper {
    border: none;
    & img {
      display: none;
    }
  }
`;

const SelectedValuesWrapper = styled.div`
  top: 8px;
  left: 10px;
  width: 100%;
  font-size: 14px;
  padding-right: 10px;
  color: #9ca5af;
`;

type Option = { cat: string; key: string };

type Props = {
  name: string;
  options: Option[];
  selected: Option[];
  placeholder?: string;
  onChange: (name: string, newValue: Option[]) => void;
  width?: string;
  min?: string;
  max?: string;
};

export const MultiSelectArea = ({
  name,
  options,
  selected,
  placeholder,
  onChange,
  width,
  min,
  max,
}: Props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const selectRef = useRef<any>(null);
  const wrapperRef = useRef<any>(null);

  const displayTxt = useMemo(() => {
    if (selected) {
      if (!selected.length) {
        return "";
      } else if (selected.length === 1) {
        return selected[0].key;
      } else {
        return selected.map((val) => val.key).join(", ");
      }
    }
    return "";
  }, [selected]);

  const handleChange = (selectedList: Option[]) => {
    onChange(name, selectedList);
  };

  const handleSelectChange = (event: any) => {
    event.stopPropagation();
    selectRef.current.searchBox.current.click();
  };

  const handleFocus = (value: boolean) => {
    setIsFocus(value);
  };

  return (
    <StyledDropdown
      width={width}
      max={max}
      min={min}
      ref={wrapperRef}
      onClick={handleSelectChange}
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
    >
      <SelectedValuesWrapper>
        <span>{displayTxt ? displayTxt : !isFocus && placeholder}</span>
      </SelectedValuesWrapper>
      <Multiselect
        ref={selectRef}
        displayValue="key"
        onRemove={handleChange}
        onSelect={handleChange}
        options={options}
        placeholder={""}
        showCheckbox
        showArrow
        selectedValues={selected || []}
        avoidHighlightFirstOption={true}
        hideSelectedList
      />
    </StyledDropdown>
  );
};
