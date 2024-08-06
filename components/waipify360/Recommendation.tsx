import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useMemo } from "react";

const Recommendation = ({
  validation,
  handleParamChange,
  formData,
}: {
  validation: any;
  handleParamChange: (value: any, type: string) => void;
  formData: any;
}) => {
  const handleChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event && event.target.value;
    if (!value || value.length <= 600) {
      handleParamChange({ assessment: value }, "assessment");
    }
  };

  const sum = useMemo(() => {
    if (formData) {
      let currentCost =
        Number(formData.time_per_outcomes || 0) *
        Number(formData.employee_hourly_rate || 1);
      if (formData.repeats_yearly) {
        currentCost = currentCost * Number(formData.repeats_yearly);
      }
      if (formData.total_cost_yearly) {
        currentCost = currentCost + Number(formData.total_cost_yearly);
      }

      let costAfterAI =
        Number(formData.time_per_outcomes_after_ai || 0) *
        Number(formData.employee_hourly_rate || 1);
      if (formData.repeats_yearly) {
        costAfterAI = costAfterAI * Number(formData.repeats_yearly);
      }
      if (formData.total_cost_yearly) {
        costAfterAI = costAfterAI + Number(formData.total_cost_yearly);
      }
      return currentCost - costAfterAI + (+formData.revenue_increase_with_ai || 0);
    } else {
      return 0;
    }
  }, [formData]);

  return (
    <>
      <div className="flex flex-wrap flex-col gap-[25px]">
        <ul className="flex-shrink-0 flex flex-wrap gap-4 sm:gap-5">
          <li className="flex-grow sm:flex-grow-0 flex flex-col gap-1">
            <Label
              htmlFor="estimated_business"
              className="text-xs flex-shrink-0 text-labelGray font-medium mb-1 block"
            >
              Estimated Business Impact
            </Label>
            <Input
              id="estimated_business"
              readOnly
              className="bg-[#EDF5FF] flex-shrink-0 border-[#EDF5FF] text-[#409D44] sm:w-[155px] flex-grow font-medium text-sm"
              value={`${sum?.toFixed(2) || 0} euros`}
            />
          </li>
          <li className="flex-grow sm:flex-grow-0 flex flex-col gap-1">
            <Label
              htmlFor="time_first"
              className="text-xs flex-shrink-0 text-labelGray font-medium mb-1 block"
            >
              Time to first Impact
            </Label>
            <Input
              id="time_first"
              readOnly
              className="bg-[#EDF5FF] flex-shrink-0 border-[#EDF5FF] text-[#409D44] sm:w-[155px] flex-grow font-medium text-sm"
              value={`${formData?.winner_solution_data?.impact_starts || "NA"}`}
            />
          </li>
          <li className="flex-grow sm:flex-grow-0 flex flex-col gap-1">
            <Label
              htmlFor="viability_score"
              className="text-xs flex-shrink-0 text-labelGray font-medium mb-1 block"
            >
              Here is Viability Score (VS)
            </Label>
            <Input
              id="viability_score"
              readOnly
              className="bg-[#EDF5FF] flex-shrink-0 border-[#EDF5FF] text-[#409D44] sm:w-[155px] flex-grow font-medium text-sm"
              value={`${formData?.winner_solution_data?.feasibility_number || 0}`}
            />
          </li>
        </ul>
        <div className="flex-shrink-0 w-full max-w-lg">
          <Label
            htmlFor="message-2"
            className="text-xs text-labelGray font-medium mb-1 block"
          >
            Recommendation conclusion
          </Label>
          <Textarea
            placeholder="Add recommendations"
            onChange={handleChange}
            value={formData?.assessment}
            className="placeholder:text-[#9CA5AF] flex min-h-[85px] w-full rounded-lg border border-[#D7DBE0] font-normal bg-transparent shadow-none px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
          />
          <div className="flex flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-1">
            <p className="text-required flex-grow text-xs leading-normal font-normal">
              {formData?.assessment?.length > 600 &&
                "You have reached the maximum limit of 600 characters for this field."}
            </p>
            <p className="text-xs font-medium text-[#9CA5AF] max-w-fit ml-auto">
              {formData?.assessment?.length}/600
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendation;
