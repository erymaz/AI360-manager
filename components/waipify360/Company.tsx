import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultpleSelect from "react-select";

type OptionSchema = {
  value: string;
  lable: string;
};

const plannedPeriods = [
  "Q1.2024",
  "Q2.2024",
  "Q3.2024",
  "Q4.2024",
  "Q1.2025",
  "Q2.2025",
  "Q3.2025",
  "Q4.2025",
];

const Company = ({
  validation,
  initiatives,
  objectives,
  handleParamChange,
  formData,
  entry_id,
}: {
  validation: any;
  initiatives: any;
  objectives: any;
  handleParamChange: (value: any, type: string, set?: boolean) => void;
  formData: any;
  entry_id: any;
}) => {
  const handleMuiltSelectChange = async (
    value: OptionSchema[],
    type: string
  ) => {
    let new_val: any = value;
    if (value.length === 0) new_val = null;
    handleParamChange({ [type]: new_val }, type);
  };

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-4 md:gap-y-[25px]">
      <div className="relative max-w-full w-full md:w-[304px] flex-grow flex-shrink-0">
        <Label
          htmlFor="business_task"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Company Objective
        </Label>
        <MultpleSelect
          isMulti
          placeholder="Select Objective"
          name="co-objectives"
          options={objectives}
          value={formData?.objective_id}
          className="basic-multi-select text-sm leading-6 bg-white multi-custom-select"
          classNamePrefix="select"
          onChange={(event: any) =>
            handleMuiltSelectChange(event, "objective_id")
          }
        />
      </div>
      <div className="relative max-w-full w-full md:w-[520px] flex-grow flex-shrink-0">
        <Label
          htmlFor="business_task"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Key Result
        </Label>
        <Select
          onValueChange={(val) => handleParamChange({ result: val }, "result")}
          value={formData?.result || ""}
        >
          <SelectTrigger
            className={formData?.result ? "select-value" : undefined}
          >
            <SelectValue placeholder="Select Key Result" />
          </SelectTrigger>
          <SelectContent>
            {["result 1", "result 2"].map((result: any, index: number) => (
              <SelectItem value={result} key={index}>
                {result}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative max-w-full w-full md:w-[304px] flex-grow flex-shrink-0">
        <Label
          htmlFor="business_task"
          className="text-labelGray text-xs font-normal leading-6"
        >
          Company Initiatives
        </Label>
        <Select
          onValueChange={(val) =>
            handleParamChange({ initiative_id: val }, "initiative_id")
          }
          value={formData?.initiative_id}
        >
          <SelectTrigger
            className={`focus:ring-0 focus-visible:ring-0 ${
              formData?.initiative_id ? " select-value" : undefined
            }`}
          >
            <SelectValue placeholder="Select Initiative" />
          </SelectTrigger>
          <SelectContent>
            {initiatives.map((result: any, index: number) => (
              <SelectItem value={result.value} key={index}>
                {result.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="relative max-w-full w-full md:w-[520px] flex-grow flex-shrink-0">
        <Label
          htmlFor="business_task"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Planned Period for implementation
        </Label>
        <Select
          onValueChange={(val) => handleParamChange({ period: val }, "period")}
          value={formData?.period}
          disabled={!formData?.initiative_id}
        >
          <SelectTrigger
            className={formData?.period ? "select-value" : undefined}
          >
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            {plannedPeriods.map((period: any, index: number) => (
              <SelectItem value={period} key={index}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Company;
