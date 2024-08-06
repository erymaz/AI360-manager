import { request } from "@/helpers/request";
import styled from "@emotion/styled";
import { Tooltip, tooltipClasses, styled as matStyled } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import React, { useRef } from "react";
import { Eye } from "lucide-react"

const WapTabelTd = styled(TableCell)`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  padding: 13px;
  text-align: left;
  border-right: 1px solid #edeef3;
  border-left: 1px solid #edeef3;
  & img {
    object-fit: contain;
  }
`;

const WapTabelRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f8f9fa;
  }
`;

const WapFn = styled.h3`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
const WapPSpan = styled.p`
  color: #5f6368;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  & span {
    color: #1c941d;
  }
`;
const WapTableSelect = styled.select`
  color: #000;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  border: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  :focus {
    outline: none;
  }
`;

const WapSwith = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;
const WapSwithInput = styled.input`
opacity: 0;
width: 0;
height: 0;
&:checked + slider:{
    background-color: #2196F3;
  },
:focus + slider:{
    box-shadow: 0 0 1px #2196F3;
}
&:checked + slider::before :{
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  },

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
const WapEye = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;
const WapActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const WapDescWidth = styled.div`
  width: 400px;
`;

const SelectLabel = styled.label`
  width: 100%;
  display: block;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  width: 166px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  position: relative;
  padding: 5px 10px;
  text-align: center;
  margin: 0 auto;
  display: block;
  text-transform: capitalize;
  padding-right: 30px;
  ::after {
    content: "";
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTExLjYyMDkgNS4yMjA3TDcuODE3NTMgOS4wMjQwNEM3LjM2ODM2IDkuNDczMiA2LjYzMzM2IDkuNDczMiA2LjE4NDE5IDkuMDI0MDRMMi4zODA4NiA1LjIyMDciIHN0cm9rZT0iIzlDQTVBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==");
    width: 16px;
    height: 16px;
    position: absolute;
    right: 0px;
    top: 6px;
    z-index: -1;
  }
  & select {
    opacity: 0;
    position: absolute;
    left: 0;
    text-transform: capitalize;
  }
`;

const StatusSelectWrapper = styled.div`
  width: 190px;
  z-index: 9;
  position: relative;
`;

const StatusFloatSpan = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: calc(100% - 20px);
  height: 100%;
  z-index: -1;
  border-radius: 5px;
`;

const CustomTooltip = matStyled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#1E428A",
    color: "#FFFFFF",
    fontSize: 14,
  },
}));

function EntryRow({
  row,
  index,
  feasibilityCriteria,
  statuses,
  handleStatusChange,
  handleEditEntry,
}: {
  row: any;
  index: number;
  statuses: any;
  feasibilityCriteria: any;
  handleStatusChange: () => void;
  handleEditEntry: (row: any) => void;
}) {
  const selectRef = useRef<any>(null);

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  const handleStatusChanged = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: any
  ) => {
    const status = event.target && event.target.value;
    await request(`/api/impact360/entries/${id}`, {
      method: "PUT",
      body: { status_id: status },
    }).then((res: any) => {
      handleStatusChange();
    });
  };

  const handleSelectClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (selectRef) {
      selectRef.current.click();
    }
  };

  return (
    <>
      {row ? (
        <WapTabelRow
          hover
          role="checkbox"
          tabIndex={-1}
          key={row.id}
          sx={{ cursor: "pointer" }}
        >
          <WapTabelTd
            component="th"
            id={`enhanced-table-checkbox-${index}`}
            scope="row"
            padding="none"
            sx={{ padding: "16px" }}
          >
            {row.case_name}
          </WapTabelTd>
          <WapTabelTd align="right">{row.task_name}</WapTabelTd>
          <WapTabelTd align="right">
            <div>
              {row.provider_logo ? (
                <CustomTooltip title={row.provider_name} placement="top">
                  <Image
                    loader={myLoader}
                    src={row.provider_logo}
                    alt="logo"
                    height={50}
                    width={108}
                  />
                </CustomTooltip>
              ) : (
                <p>{row.provider_name}</p>
              )}
            </div>
          </WapTabelTd>
          <WapTabelTd align="right">{row.solution_name}</WapTabelTd>
          <WapTabelTd align="right">
            {row.has_incumbent_integration ? "Yes" : "No"}
          </WapTabelTd>
          {feasibilityCriteria.map((crt: any, index: any) => {
            return (
              <WapTabelTd align="right" key={index}>
                {row["solution_entry_reviews"][crt.id]
                  ? Number(
                      row["solution_entry_reviews"][crt.id]["score"]
                    ).toFixed(1)
                  : 0}
              </WapTabelTd>
            );
          })}

          <WapTabelTd align="right">
            <WapFn>{row.feasibility_number ? row.feasibility_number : 0}</WapFn>
          </WapTabelTd>
          <WapTabelTd align="right">
            {row.impact_starts ? row.impact_starts : "NA"}
          </WapTabelTd>
          <WapTabelTd align="right">NA</WapTabelTd>
          <WapTabelTd align="right">NA</WapTabelTd>
          <WapTabelTd align="right">
            <div>
              <p>NA</p>
              <p>NA</p>
            </div>
          </WapTabelTd>
          <WapTabelTd align="right">
            <div>
              {row.business_impact
                ? row.business_impact.map((bsc: any, index: number) => {
                    return (
                      <p
                        key={index}
                      >{`${bsc.matric_name} - €${bsc.baseline_value}`}</p>
                    );
                  })
                : "NA"}
            </div>
          </WapTabelTd>
          <WapTabelTd align="right">
            <div>
              <WapPSpan>
                <span>{row.genai_impact ? `€${row.genai_impact}` : "NA"}</span>
              </WapPSpan>
            </div>
          </WapTabelTd>
          <WapTabelTd align="right">
            <WapDescWidth>
              {row.assessment ? row.assessment : "NA"}
            </WapDescWidth>
          </WapTabelTd>
          <WapTabelTd align="right">
            {row.objective ? row.objection : "NA"}
          </WapTabelTd>
          <WapTabelTd align="right">
            {row.department ? row.department : "NA"}
          </WapTabelTd>
          <WapTabelTd align="right">
            <div onClick={handleSelectClick}>
              <WapTableSelect>
                <option>Q2.2023</option>
                <option>Q2.2023</option>
                <option>Q2.2023</option>
                <option>Q2.2023</option>
              </WapTableSelect>
            </div>
          </WapTabelTd>
          <WapTabelTd align="right">
            <StatusSelectWrapper onClick={handleSelectClick}>
              <SelectLabel
                style={{
                  color: row.status_colour ? "#ffffff" : "#000000",
                }}
              >
                <StatusFloatSpan
                  style={{
                    background: row.status_colour,
                  }}
                ></StatusFloatSpan>

                {row.status ? row.status : "Select Status"}
                <WapTableSelect
                  ref={selectRef}
                  onChange={(event) => handleStatusChanged(event, row?.id)}
                  onClick={(event) => event.stopPropagation()}
                  value={row?.status_id}
                >
                  <option key={index} value="">
                    Select Status
                  </option>
                  {statuses.map((element: any, index: any) => {
                    return (
                      <option key={index} value={element.id}>
                        {element.name}
                      </option>
                    );
                  })}
                </WapTableSelect>
              </SelectLabel>
            </StatusSelectWrapper>
          </WapTabelTd>
          <WapTabelTd align="right">
            <WapActions className="wap-actins">
              <WapSwith className="switch">
                <WapSwithInput type="checkbox" />
                <WapSwithSlider className="slider round"></WapSwithSlider>
              </WapSwith>
              <WapEye onClick={() => handleEditEntry(row)}>
                <Eye className="w-6" />
              </WapEye>
            </WapActions>
          </WapTabelTd>
        </WapTabelRow>
      ) : (
        ""
      )}
    </>
  );
}

export default EntryRow;
