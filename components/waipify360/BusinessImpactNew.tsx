"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";
import { useState } from "react";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

type SliderProps = React.ComponentProps<typeof Slider>;
const BusinessImpactNew = (
  {
    impOrganization,
    handleParamChange,
    formData,
    filialId,
    validation,
  }: {
    impOrganization: any;
    handleParamChange: (value: any, type?: string) => void;
    formData: any;
    filialId: any;
    validation: any;
  },
  { className, ...props }: SliderProps
) => {
  const [hourPerOutcomes, setHourPerOutcomes] = useState("");
  const [minutePerOutcomes, setMinutePerOutcomes] = useState("");
  const [hourPerOutcomesAfterAI, setHourPerOutcomesAfterAI] = useState("");
  const [minutePerOutcomesAfterAI, setMinutePerOutcomesAfterAI] = useState("");
  const [reducedFromHours, setReducedFromHours] = useState("");
  const [reducedFromMinutes, setReducedFromMinutes] = useState("");
  const [reducedToHours, setReducedToHours] = useState("");
  const [reducedToMinutes, setReducedToMinutes] = useState("");

  useLayoutEffect(() => {
    if (formData?.time_per_outcomes) {
      const hours = Math.floor(Number(formData?.time_per_outcomes || 0));
      setHourPerOutcomes(String(hours));
      const minutes = Math.round(
        (Number(formData?.time_per_outcomes || 0) - hours) * 60
      );
      setMinutePerOutcomes(String(minutes));
    }

    if (formData?.time_per_outcomes_after_ai) {
      const hours = Math.floor(
        Number(formData?.time_per_outcomes_after_ai || 0)
      );
      setHourPerOutcomesAfterAI(String(hours));
      const minutes = Math.round(
        (Number(formData?.time_per_outcomes_after_ai || 0) - hours) * 60
      );
      setMinutePerOutcomesAfterAI(String(minutes));
    }

    if (formData?.reduced_process_time_from) {
      const hours = Math.floor(
        Number(formData?.reduced_process_time_from || 0)
      );
      setReducedFromHours(String(hours));
      const minutes = Math.round(
        (Number(formData?.reduced_process_time_from || 0) - hours) * 60
      );
      setReducedFromMinutes(String(minutes));
    }

    if (formData?.reduced_process_time_to) {
      const hours = Math.floor(Number(formData?.reduced_process_time_to || 0));
      setReducedToHours(String(hours));
      const minutes = Math.round(
        (Number(formData?.reduced_process_time_to || 0) - hours) * 60
      );
      setReducedToMinutes(String(minutes));
    }
  }, []);

  const handleImpactCheckboxChange: any = async (
    event: boolean,
    type: string
  ) => {
    handleParamChange({ [type]: event }, type);
  };

  const handleImpactTextChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value }: any = event.target && event.target;
    handleParamChange({ [name]: value }, name);
  };

  const handleOutcomeTimeChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const nValue = Math.abs(Number(value || 0));
    const _name = name.split(".")[0];
    const key = name.split(".")[1] as "h" | "m";
    if (key === "h") {
      setHourPerOutcomes(nValue.toString());
      const _value = nValue + Number(minutePerOutcomes || 0) / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    } else {
      setMinutePerOutcomes(nValue.toString());
      const _value = Number(hourPerOutcomes || 0) + nValue / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    }
  };

  const handleOutcomeAITimeChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const nValue = Math.abs(Number(value || 0));
    const _name = name.split(".")[0];
    const key = name.split(".")[1] as "h" | "m";
    if (key === "h") {
      setHourPerOutcomesAfterAI(nValue.toString());
      const _value = nValue + Number(minutePerOutcomesAfterAI || 0) / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    } else {
      setMinutePerOutcomesAfterAI(nValue.toString());
      const _value = Number(hourPerOutcomesAfterAI || 0) + nValue / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    }
  };

  const handleReducedFromTimeChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const nValue = Math.abs(Number(value || 0));
    const _name = name.split(".")[0];
    const key = name.split(".")[1] as "h" | "m";
    if (key === "h") {
      setReducedFromHours(nValue.toString());
      const _value = nValue + Number(reducedFromMinutes || 0) / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    } else {
      setReducedFromMinutes(nValue.toString());
      const _value = Number(reducedFromHours || 0) + nValue / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    }
  };

  const handleReducedToTimeChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const nValue = Math.abs(Number(value || 0));
    const _name = name.split(".")[0];
    const key = name.split(".")[1] as "h" | "m";
    if (key === "h") {
      setReducedToHours(nValue.toString());
      const _value = nValue + Number(reducedToMinutes || 0) / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    } else {
      setReducedToMinutes(nValue.toString());
      const _value = Number(reducedToHours || 0) + nValue / 60;
      handleParamChange({ [_name]: _value.toFixed(2) }, _name);
    }
  };

  const handleStratChange = (vak: any) => {
    handleParamChange({ strategic_value: vak[0] }, "strategic_value");
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-labelGray text-sm font-normal flex-shrink-0">
          Please complete only the fields that describe the impact of this
          opportunity and leave the rest empty{" "}
        </p>
        <div className="flex flex-wrap sm:flex-nowrap items-start gap-y-2 gap-[15px] flex-shrink-0 relative">
          <h3 className="text-baseColor min-w-fit text-base leading-normal font-semibold capitalize">
            selected solutions:
          </h3>
          <ul className="flex flex-grow flex-wrap gap-[15px] gap-y-1">
            {formData?.entrytools &&
              formData?.entrytools?.map((val: any, index: number) => (
                <li
                  key={index}
                  className="text-baseColor text-base leading-normal font-medium"
                >
                  {val.solution_name}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-start gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            Strategic value
          </Label>
          <div className="max-w-[296px] w-full pt-2">
            <Slider
              defaultValue={[1]}
              min={1}
              max={5}
              step={1}
              onValueChange={handleStratChange}
              value={[formData?.strategic_value]}
              className={cn("strategic-range", className)}
              {...props}
            />
            <div className="flex flex-row justify-between pt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={`${name}-${i}`}
                  className={clsx(
                    "text-xs text-[#4B5563] font-medium relative before:w-px before:h-1 before:bg-[#C6CAD2] before:block flex flex-col gap-[3px] items-center",
                    { "text-10": i > 0 && i < 5 }
                  )}
                  onClick={() => handleStratChange([i + 1])}
                  role="presentation"
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            Task repeats
          </Label>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="repeats_yearly"
              value={formData?.repeats_yearly}
              min="0"
              onChange={handleImpactTextChange}
            />
            <span className="text-sm text-[#1C1F1F]">times a year</span>
          </div>
          <p className="text-required text-xs leading-6 font-normal absolute -bottom-5 left-0">
            {validation?.repeats_yearly}
          </p>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            Current time spent in this task is
          </Label>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="time_per_outcomes.h"
              value={hourPerOutcomes || ""}
              min="0"
              onChange={handleOutcomeTimeChange}
            />
            <span className="text-sm text-[#1C1F1F]">hours</span>
          </div>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="time_per_outcomes.m"
              value={minutePerOutcomes || ""}
              min="0"
              onChange={handleOutcomeTimeChange}
            />
            <span className="text-sm text-[#1C1F1F]">minutes</span>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            Time to be spent when AI is in place
          </Label>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="time_per_outcomes_after_ai.h"
              value={hourPerOutcomesAfterAI}
              min="0"
              onChange={handleOutcomeAITimeChange}
            />
            <span className="text-sm text-[#1C1F1F]">hours</span>
          </div>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="time_per_outcomes_after_ai.m"
              value={minutePerOutcomesAfterAI}
              min="0"
              onChange={handleOutcomeAITimeChange}
            />
            <span className="text-sm text-[#1C1F1F]">minutes</span>
          </div>
        </div>
        <div className="flex items-center gap-[15px] flex-shrink-0 relative">
          <div className="flex-shrink-0 flex flex-wrap items-center gap-[5px]">
            <Label
              htmlFor="task_repeats"
              className="text-[#1C1F1F] text-sm font-normal"
            >
              The process time reduces from:
            </Label>
            <div className="flex items-center gap-[15px]">
              <Input
                type="number"
                className="w-[57px] py-1.5 remove-arrow"
                name="reduced_process_time_from.h"
                value={reducedFromHours}
                min="0"
                onChange={handleReducedFromTimeChange}
              />
              <span className="text-sm text-[#1C1F1F]">hours</span>
            </div>
            <div className="flex items-center gap-[15px]">
              <Input
                type="number"
                className="w-[57px] py-1.5 remove-arrow"
                name="reduced_process_time_from.m"
                value={reducedFromMinutes}
                min="0"
                onChange={handleReducedFromTimeChange}
              />
              <span className="text-sm text-[#1C1F1F]">minutes</span>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px]">
            <Label
              htmlFor="task_repeats"
              className="text-[#1C1F1F] text-sm font-normal"
            >
              to:
            </Label>
            <div className="flex items-center gap-[15px]">
              <Input
                type="number"
                className="w-[57px] py-1.5 remove-arrow"
                name="reduced_process_time_to.h"
                value={reducedToHours}
                min="0"
                onChange={handleReducedToTimeChange}
              />
              <span className="text-sm text-[#1C1F1F]">hours</span>
            </div>
            <div className="flex items-center gap-[15px]">
              <Input
                type="number"
                className="w-[57px] py-1.5 remove-arrow"
                name="reduced_process_time_to.m"
                value={reducedToMinutes}
                min="0"
                onChange={handleReducedToTimeChange}
              />
              <span className="text-sm text-[#1C1F1F]">minutes</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            The average salary per hour of employees performing this task is
          </Label>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="employee_hourly_rate"
              step="0.01"
              value={formData?.employee_hourly_rate}
              min="0"
              onChange={handleImpactTextChange}
            />
            <span className="text-sm text-[#1C1F1F]">euros</span>
          </div>
          <p className="text-danger">{validation?.employee_hourly_rate}</p>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            The total fixed costs (other than employees costs) associated to
            this task are
          </Label>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[57px] py-1.5 remove-arrow"
              name="total_cost_yearly"
              value={formData?.total_cost_yearly}
              min="0"
              onChange={handleImpactTextChange}
            />
            <span className="text-sm text-[#1C1F1F]">euros per year</span>
          </div>
          <p className="text-danger">{validation?.total_cost_yearly}</p>
        </div>
        <div className="flex-shrink-0 flex flex-wrap items-center gap-[15px] relative">
          <Label
            htmlFor="task_repeats"
            className="text-[#1C1F1F] text-sm font-normal"
          >
            The hypothesis is that with AI we will achieve a revenue increase of
          </Label>
          <div className="flex items-center gap-[15px]">
            <Input
              type="number"
              className="w-[90px] flex-grow py-1.5 remove-arrow"
              name="revenue_increase_with_ai"
              value={formData?.revenue_increase_with_ai}
              onChange={handleImpactTextChange}
            />
            <span className="text-sm text-[#1C1F1F]">euros</span>
          </div>
        </div>
        <div className="flex-shrink-0 w-full max-w-lg">
          <Label
            htmlFor="message-2"
            className="text-xs text-labelGray font-medium mb-1 block"
          >
            Description of additional impact on Main KPIs or Lead indicators
          </Label>
          <Textarea
            placeholder="Add Description"
            name="business_impact_comments"
            value={formData?.business_impact_comments}
            onChange={handleImpactTextChange}
            className="placeholder:text-[#9CA5AF] flex min-h-[85px] w-full rounded-lg border border-[#D7DBE0] font-normal bg-transparent shadow-none px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
          />
          {/* <Button variant={"transparent"} className="text-[#1D5BD8] p-0 h-auto">
            Edit
          </Button> */}
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <Checkbox
              id="is_not_quantifiable"
              className="w-5 h-5"
              checked={formData?.is_not_quantifiable}
              onCheckedChange={(eev) =>
                handleImpactCheckboxChange(eev, "is_not_quantifiable")
              }
              name="is_not_quantifiable"
            />
            <label
              htmlFor="terms"
              className="text-sm text-[#020617] font-normal leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark this record as positive but not quantifiable impact
            </label>
          </div>
        </div>
      </div>
      {/* New Form Fields End */}
    </>
  );
};
export default BusinessImpactNew;
