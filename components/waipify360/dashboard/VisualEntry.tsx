"use client";

import styled from "@emotion/styled";
import { Tooltip, tooltipClasses, styled as matStyled } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Eye } from "lucide-react"
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartToltip = styled.div`
  width: 100%;
  max-width: 598px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
`;

const WapSwith = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;
const WapSwithInput = styled.input`
  opacity: 0;
  display: none;
  &:checked + span {
    background-color: #2196f3;
    :before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
    }
  }
  :focus + span {
    box-shadow: 0 0 1px #2196f3;
  }
`;

const WapSwithSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
  ::before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ChartToltipHed = styled.div`
  padding: 12px 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  & p {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    & span {
      color: #fff;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      padding: 2px 12px;
      border-radius: 5px;
      margin-left: 7px;
    }
  }
  & > div {
    display: flex;
    align-items: center;
    img {
      margin-left: 10px;
    }
  }
`;

const ChartTolList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-top: 0px;
  padding: 0 12px;
  border-top: 1px solid #edeef3;
`;
const ChartTolCol = styled.div`
  width: 33.33%;
  padding: 12px 10px;
  border-right: 1px solid #edeef3;
  :last-child {
    border-right: none;
  }
  & h5 {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 14px;
    margin-top: 0;
  }
  & p {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    & span {
      color: #1c941d;
      font-weight: 500;
    }
  }
  & h3 {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
  }
  & img {
    width: auto;
    height: 35px;
    object-fit: contain;
  }
`;

const ChartBox = styled.div`
  padding: 30px;
  flex: auto;
  display: flex;
  flex-direction: column;
`;

const MainBoxChart = styled.div`
  position: relative;
  flex: auto;
  display: flex;
  flex-direction: column;
`;

const defaultOption : any= {
  chart: {
    toolbar: {
      show: false,
    },
    legend: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  xaxis: {
    tickAmount: 5,
    min: 0,
    max: 5,
    decimalsInFloat: false,
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    axisTicks: {
      show: false,
    },
    labels: {
      formatter: function (value: any) {
        return "€" + value.toFixed(2);
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
};

const CustomTooltip = matStyled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1E428A",
    color: "#FFFFFF",
    fontSize: 14,
  },
}));

const VisualEntry = ({
  entries,
  handleEditEntry,
}: {
  entries: any;
  handleEditEntry: (row: any) => void;
}) => {
  const [series, setSeries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState<any>(null);
  const [isOpen, setisOpen] = useState(false);
  const [updateValue, setUpdateValue] = useState(0);
  

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  useLayoutEffect(() => {
    const new_array: any = [];
    for (let i = 0; i < entries.length; i++) {
      const detialsObj: any = {
        y: Number(+entries[i].genai_impact),
        x: Number(entries[i].feasibility_number),
        entry_id: entries[i].id,
        status: entries[i].status,
        fillColor: entries[i].status_colour
          ? entries[i].status_colour
          : "#8957E5",
      };
      new_array.push(detialsObj);
    }
    setSeries(new_array);
    if(entries.length > 0){
      setUpdateValue((val) => val +1)
    }

  }, [entries]);

  const handleSelectPoint = (data: any) => {
    const entryData = entries.filter((entry: any) => entry.id == data.entry_id);
    setCurrentEntry(entryData[0]);
    setisOpen(true);
  };

  const assignObject = useMemo(() => {
    return {
      ...defaultOption,
      chart: {
        ...defaultOption["chart"],
        events: {
          dataPointSelection: (_: any, _e: any, config: any) => {
            handleSelectPoint(
              config.w.config.series[0].data[config.dataPointIndex]
            );
          },
        },
      },
    };
  }, [entries]);

  const handleEdit = () => {
    handleEditEntry(currentEntry);
    setisOpen(false);
  };

  return (
    <div className="relative">
      <div className="p-6 bg-white rounded-xl border border-border">
        <h5 className="font-semibold text-text">Business Impact vs. Viability Score</h5>
        <h6 className="text-muted-text text-sm my-2">This chart provides you the economic business impact and the score of the viability of implementation for each AI opportunity.</h6>
        <div className="min-h-[calc(100vh_-_480px)] max-h-[calc(100vh_-_480px)]">
          <ApexChart
            type="scatter"
            options={assignObject}
            series={[{ data: series }]}
            height={"100%"}
            width={"100%"}
            key={updateValue}
          />
        </div>
      </div>

      {isOpen && currentEntry && (
        <ChartToltip>
          <ChartToltipHed>
            <p>
              Status:
              <span
                style={{
                  background: currentEntry.status_colour,
                  color: currentEntry.status_colour ? "#ffffff" : "#000000",
                }}
              >
                {currentEntry.status ? currentEntry.status : "NA"}
              </span>
            </p>
            <div>
              <WapSwith className="switch">
                <WapSwithInput type="checkbox" />
                <WapSwithSlider className="slider round"></WapSwithSlider>
              </WapSwith>
              <Eye className="w-6 ml-2" onClick={handleEdit} />
            </div>
          </ChartToltipHed>
          <ChartTolList>
            <ChartTolCol>
              <h5>Use Case</h5>
              <p>{currentEntry.case_name}</p>
            </ChartTolCol>
            <ChartTolCol>
              <h5>Task</h5>
              <p>{currentEntry.task_name}</p>
            </ChartTolCol>
          </ChartTolList>
          <ChartTolList>
            <ChartTolCol>
              {currentEntry.provider_logo ? (
                <CustomTooltip
                  title={currentEntry.provider_name}
                  placement="top"
                >
                  <Image
                    alt="logo"
                    loader={myLoader}
                    src={currentEntry.provider_logo}
                  />
                </CustomTooltip>
              ) : (
                <h5>{currentEntry.provider_name}</h5>
              )}
              <p>{currentEntry.solution_name}</p>
            </ChartTolCol>
            <ChartTolCol>
              <h5>VN</h5>
              <h3>{currentEntry.feasibility_number}</h3>
            </ChartTolCol>
            <ChartTolCol>
              <h5>Estimated Genai Impact </h5>
              <p>
                <span>
                  +€
                  {currentEntry.genai_impact ? +currentEntry.genai_impact : 0}
                </span>
              </p>
            </ChartTolCol>
          </ChartTolList>
        </ChartToltip>
      )}
    </div>
  );
};

export default VisualEntry;
