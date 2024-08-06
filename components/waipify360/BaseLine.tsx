import ModalSelect from "./ModalSelect";
import { request } from "@/helpers/request";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const ProductMetricsLine = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
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
const ProductMetricsGroup = styled.div`
  width: 31%;
  position: relative;
`;

const ProductMetricsInnerGroup = styled.div`
  position: relative;
`;

const ProductMetricsDaySpan = styled.span`
  position: absolute;
  right: 13px;
  top: 33px;
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const SelectWapBtn = styled.button`
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background: #fff;
  padding: 8px 13px;
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  text-align: left;
  position: relative;
  cursor: pointer;
`;

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{ position: "absolute", right: "13px", top: "12px" }}
  >
    <path
      d="M14.9405 6.71289L10.0505 11.6029C9.47305 12.1804 8.52805 12.1804 7.95055 11.6029L3.06055 6.71289"
      stroke="#9CA5AF"
      strokeWidth="1.2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BaseLine = ({
  dataIndex,
  impOrganization,
  metrics,
  periods,
  handleBaselineChange,
  handleAddChange,
  data,
  unit,
  validate,
}: {
  dataIndex: number;
  impOrganization: any;
  metrics: any;
  periods: any;
  handleBaselineChange: (value: any, type: number) => void;
  handleAddChange: (type: string) => void;
  data: any;
  unit: any;
  validate: boolean;
}) => {
  const [isImpact, setIsImpact] = useState(false);
  const [isPeriod, setIsPeriod] = useState(false);
  const [matric, setMatrics] = useState<any>(null);
  const [period, setPeriod] = useState<any>(null);
  const [validation, setValidation] = useState<any>(null);

  useEffect(() => {
    if (data) {
      if (!matric) {
        setMatrics(
          () =>
            metrics.filter((mat: any) => mat.id === data.task_to_metric_id)[0]
        );
      }
      if (!period) {
        setPeriod(
          () => periods.filter((pd: any) => pd.id === data.comparison_period)[0]
        );
      }
    }
  }, [data]);

  useEffect(() => {
    if (validate) {
      let error = false;
      let errorObj: any = {};
      if (!data.task_to_metric_id) {
        error = true;
        errorObj["metrics"] = "Please select business impact metric";
      }

      if (!data?.baseline_value) {
        error = true;
        errorObj["baseline_value"] = "Baseline value is required";
      }

      if (!data.comparison_period) {
        error = true;
        errorObj["periods"] = "Please select comparison period";
      }

      if (error) {
        setValidation(errorObj);
      }
    }
  }, [validate]);

  const handleSelect = (value: any, type?: string) => {
    const list: any = { ...data };
    if (type === "metrics") {
      list["task_to_metric_id"] = value.id;
      setMatrics(value);
      setIsImpact(false);
    } else if (type === "periods") {
      list["comparison_period"] = value.id;
      setPeriod(value);
      setIsPeriod(false);
    }
    if (type) {
      setValidation({
        ...validation,
        [type]: "",
      });
    }
    handleBaselineChange(list, dataIndex);
  };

  const handleValueChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target && event.target;
    const list: any = { ...data };
    list[name] = value;
    handleBaselineChange(list, dataIndex);
    setValidation({
      ...validation,
      [name]: "",
    });
  };

  const handleAddNew = async (
    content: string,
    type: string,
    callback?: any
  ) => {
    if (type == "metrics") {
      await request(`/api/impact360/metrics`, {
        method: "POST",
        body: {
          name: content,
          organization_id: impOrganization.id,
          is_business_impact: true,
        },
      })
        .then((res: any) => {
          if (res) {
            handleAddChange(type);
            handleSelect(res?.metric, "metrics");
            if (callback) {
              callback({ success: true });
            }
          }
        })
        .catch((err) => {
          if (callback) {
            callback({ success: false, error: err.error });
          }
        });
    } else if (type === "periods") {
      await request(`/api/impact360/period`, {
        method: "POST",
        body: {
          name: content,
        },
      })
        .then((res: any) => {
          if (res) {
            handleAddChange(type);
            handleSelect(res?.period, "periods");
            if (callback) {
              callback({ success: true });
            }
          }
        })
        .catch((err) => {
          if (callback) {
            callback({ success: false, error: err.error });
          }
        });
    } else {
      if (callback) {
        callback({ success: false, error: "Something went wrong" });
      }
    }
  };

  return (
    <ProductMetricsLine>
      <ProductMetricsGroup>
        <ProductMetricsLabel>Business Impact metric</ProductMetricsLabel>
        <SelectWapBtn onClick={() => setIsImpact(!isImpact)}>
          {matric ? matric.name : " Please select metric"}
          <ChevronDown />
        </SelectWapBtn>
        {isImpact && (
          <ModalSelect
            modalContent={metrics}
            handleSelect={handleSelect}
            handleAddNew={handleAddNew}
            type="metrics"
          />
        )}

      <p className="text-danger w-error">{validation?.metrics}</p>
      </ProductMetricsGroup>
      <ProductMetricsInnerGroup>
        <ProductMetricsLabel>Value</ProductMetricsLabel>
        <ProductMetricsInput
          type="number"
          name="baseline_value"
          value={data?.baseline_value}
          onChange={(event: any) => handleValueChange(event)}
        />

        <ProductMetricsDaySpan>{unit ? unit : "euro"}</ProductMetricsDaySpan>
      <p className="text-danger w-error">{validation?.baseline_value}</p>
      </ProductMetricsInnerGroup>
      <ProductMetricsGroup>
        <ProductMetricsLabel>Comparison period</ProductMetricsLabel>
        <SelectWapBtn onClick={() => setIsPeriod(!isPeriod)}>
          {period ? period.name : " Please select period"}
          <ChevronDown />
        </SelectWapBtn>
        {isPeriod && (
          <ModalSelect
            modalContent={periods}
            handleSelect={handleSelect}
            handleAddNew={handleAddNew}
            type="periods"
          />
        )}
      <p className="text-danger w-error">{validation?.periods}</p>
      </ProductMetricsGroup>

    </ProductMetricsLine>
  );
};
export default BaseLine;
