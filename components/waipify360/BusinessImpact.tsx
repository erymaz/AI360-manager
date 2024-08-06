import BaseLine from "./BaseLine";
import { request } from "@/helpers/request";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const BusinessImpactWraper = styled.div`
  margin-top: 15px;
`;
const BusinessfieldWraper = styled.div`
  display: flex;
  align-items: center;
`;
const BusinessImpactbtn = styled.button`
  color: #69aef6;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
  :hover {
    color: #000;
  }
`;
const BusinessImpactsHs = styled.h6`
  color: #000;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 30px;
  margin-bottom: 19px;
`;
const BusinessImpactsHsM = styled.h6`
  color: #000;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-top: 47px;
  margin-bottom: 0px;
`;
const ProductMetricsLabel = styled.label`
  color: #6a7381;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 4px;
  display: block;
`;
const ProductMetricsLabelTwo = styled.label`
  color: #6a7381;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 4px;
  display: block;
  width: 164px;
`;
const ProductMetricsInput = styled.input`
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background: #fff;
  padding: 7px 13px;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  max-width: 164px;
  :focus {
    outline: none;
  }
`;
const ProductMetricsBtnGroup = styled.div`
  margin-bottom: 12px;
`;
const ProductMetricsBtnRemove = styled.button`
  border-radius: 8px;
  background: #c6cad2;
  padding: 9px 16px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  border: none;
  cursor: pointer;
`;
const ProductMetricsBtn = styled.button`
  color: #979797;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 4px;
  & span {
    font-size: 24px;
  }
  :hover {
    color: #1f75ff;
  }
`;
const ProductMetricsInnerGroup = styled.div`
  position: relative;
`;

const ProductMetricsDaySpan = styled.span`
  position: absolute;
  right: 13px;
  top: 8px;
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const BusinessImpactsInternal = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  margin-bottom: 20px;
`;
const BusinessImpactsInternalTwo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 500px;
  margin-top: 50px;
`;
const BusinessImpactsInternalThree = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  max-width: 500px;
`;
const BusinessImpactsLabel = styled.label`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;
const BusinessImpactsPn = styled.p`
  width: 166px;
  color: #1c941d;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 0;
`;
const BusinessImpactsMessage = styled.div`
  margin-top: 40px;
`;
const BusinessImpactsTextarea = styled.textarea`
  padding: 8px 13px;
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background: #fff;
  height: 88px;
  width: 100%;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-family: "Urbanist";
  :focus {
    outline: none;
  }
  :placeholder {
    color: #9ca5af;
  }
`;
const BusinessImpactsTextareaWard = styled.p`
  color: #9ca5af;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  margin: 0;
`;
const BusinessImpactsCheckBox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #d7dbe0;
`;
const BusinessImpactsCheckBoxLabel = styled.label`
  color: #25333c;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
`;
const BusinessImpactsCheckBoxGroup = styled.label`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const BusinessImpact = ({
  impOrganization,
  handleParamChange,
  handleAddChange,
  formData,
  filialId,
  metrics,
  periods,
  validation,
}: {
  impOrganization: any;
  handleParamChange: (value: any, type?: string) => void;
  handleAddChange: (type: string) => void;
  formData: any;
  filialId: any;
  metrics: any;
  periods: any;
  validation: any;
}) => {
  const [unit, setUnit] = useState("");
  const [matObject, setMatObject] = useState<any>(null);

  useEffect(() => {
    const details: any = {};
    if (!formData.is_not_quantifiable) {
      details["is_not_quantifiable"] = false;
    }

    if (!formData?.baseline) {
      const new_val = [
        {
          id: "",
          metric_name: "",
          task_to_metric_id: "",
          baseline_value: 0,
          comparison_period: "",
          after_ai_value: 0,
        },
      ];
      details["baseline"] = new_val;
    }

    handleParamChange(details);
    loadmetricUnits();
  }, []);

  useEffect(() => {
    if(validation?.baseline){
      handleParamChange({}, 'baseline')
    }
  }, [validation?.baseline]);

  useEffect(() => {
    if (metrics && metrics.length > 0) {
      const new_obj: any = {};
      for (let i = 0; i < metrics.length; i++) {
        new_obj[metrics[i].id] = metrics[i].name;
      }
      setMatObject(new_obj);
    }
  }, [metrics]);

  const loadmetricUnits = async () => {
    await request(`/api/impact360/matric_units/${filialId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res: any) => {
      if (res[0]) {
        setUnit(res[0]["metric_unit"]);
      }
    });
  };

  const handleAddClick = () => {
    const new_val = [
      ...formData?.baseline,
      {
        id: "",
        metric_name: "",
        task_to_metric_id: "",
        baseline_value: 0,
        comparison_period: "",
        after_ai_value: 0,
      },
    ];

    handleParamChange({ baseline: new_val }, "baseline");
  };

  const handleRemoveClick = (index: any) => {
    const list = [...formData?.baseline];
    list.splice(index, 1);
    handleParamChange({ baseline: list }, "baseline");
  };

  const handleImpactChange: any = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { name, value }: any = event.target && event.target;
    if (name == "is_not_quantifiable") {
      const { checked } = event.target;
      handleParamChange(
        { is_not_quantifiable: checked },
        "is_not_quantifiable"
      );
    }
    if (name == "logic_comment") {
      handleParamChange({ logic_comment: value }, "logic_comment");
    }
  };

  const handleBaselineChange = (data: any, index: number) => {
    const list: any = [...formData?.baseline];
    list[index] = data;
    handleParamChange({ baseline: list }, "baseline");
  };

  const handleAfterAIChnage = (value: string, index: number) => {
    const list: any = { ...formData?.baseline[index] };
    list["after_ai_value"] = value;
    handleBaselineChange(list, index);
  };

  let sum = 0;
  formData?.baseline?.map((element: any) => {
    sum += Number(element?.baseline_value) - Number(element?.after_ai_value);
  });

  return (
    <BusinessImpactWraper>
      <BusinessImpactbtn type="button">Keys for impact (4)</BusinessImpactbtn>
      <BusinessImpactsHs>BUSINESS BASELINE</BusinessImpactsHs>

      {formData?.baseline && formData?.baseline.length
        ? formData?.baseline.map((impact: any, index: number) => {
            return (
              <BusinessfieldWraper key={index}>
                <BaseLine
                  dataIndex={index}
                  impOrganization={impOrganization}
                  metrics={metrics}
                  data={impact}
                  periods={periods}
                  unit={unit}
                  handleBaselineChange={handleBaselineChange}
                  handleAddChange={handleAddChange}
                  validate={validation?.baseline}
                />

                <ProductMetricsBtnGroup>
                  {formData?.baseline.length !== 1 && (
                    <ProductMetricsBtnRemove
                      className="mr10"
                      onClick={() => handleRemoveClick(index)}
                    >
                      Remove
                    </ProductMetricsBtnRemove>
                  )}
                </ProductMetricsBtnGroup>
              </BusinessfieldWraper>
            );
          })
        : ""}

      <ProductMetricsBtn onClick={handleAddClick}>
        <span>+</span> add more
      </ProductMetricsBtn>
      <BusinessImpactsHsM>
        BUSINESS EXPECTED METRIC AFTER AI APPLICATION{" "}
      </BusinessImpactsHsM>
      <BusinessImpactsInternalThree>
        <ProductMetricsLabelTwo>Value</ProductMetricsLabelTwo>
      </BusinessImpactsInternalThree>
      {formData?.baseline && formData?.baseline.length
        ? formData?.baseline.map((impact: any, index: number) => {
            return (
              <BusinessImpactsInternal key={index}>
                <BusinessImpactsLabel>
                  {impact.task_to_metric_id && matObject
                    ? matObject[impact.task_to_metric_id]
                    : "Business Impact metric"}
                </BusinessImpactsLabel>
                <ProductMetricsInnerGroup>
                  <ProductMetricsInput
                    type="number"
                    name="after_ai_value"
                    value={impact?.after_ai_value}
                    onChange={(event) =>
                      handleAfterAIChnage(event.target.value, index)
                    }
                  />
                  <ProductMetricsDaySpan>
                    {unit ? unit : "euro"}
                  </ProductMetricsDaySpan>
                </ProductMetricsInnerGroup>
              </BusinessImpactsInternal>
            );
          })
        : ""}
      <BusinessImpactsInternalTwo>
        <BusinessImpactsLabel>Impact total</BusinessImpactsLabel>
        <BusinessImpactsPn>
          {Number(sum)} {unit ? unit : "euro"}
        </BusinessImpactsPn>
      </BusinessImpactsInternalTwo>
      <BusinessImpactsMessage>
        <ProductMetricsLabel>
          Chosen logic for the impact measurement
        </ProductMetricsLabel>
        <BusinessImpactsTextarea
          placeholder="Enter text here"
          name="logic_comment"
          value={formData?.logic_comment}
          onChange={handleImpactChange}
        ></BusinessImpactsTextarea>
        <BusinessImpactsTextareaWard>
          {formData?.logic_comment ? formData?.logic_comment.length : 0}/200
        </BusinessImpactsTextareaWard>
      </BusinessImpactsMessage>
      <p className="text-danger">{validation?.logic_comment}</p>
      <BusinessImpactsCheckBoxGroup>
        <BusinessImpactsCheckBox
          type="checkbox"
          name="is_not_quantifiable"
          checked={formData?.is_not_quantifiable}
          onChange={handleImpactChange}
        />
        <BusinessImpactsCheckBoxLabel>
          Mark this record as positive but not quantifiable impact
        </BusinessImpactsCheckBoxLabel>
      </BusinessImpactsCheckBoxGroup>
    </BusinessImpactWraper>
  );
};
export default BusinessImpact;
