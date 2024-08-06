import Edit from "@/public/edit.svg";
import styled from "@emotion/styled";
import { Tooltip, tooltipClasses, styled as matStyled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";
import * as React from "react";

const Wap360adminTh = styled(TableCell)`
  padding: 8px 15px 8px 15px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #000;
  white-space: nowrap;
  cursor: pointer;
  // width: 11%;
  // :nth-of-type(1),
  // :nth-of-type(2),
  // :nth-of-type(3) {
  //   width: 15%;
  // }
  // :nth-of-type(6),
  // :nth-of-type(7),
  :nth-of-type(12) {
    text-align: center;
  }
`;

const Wap360adminTd = styled(TableCell)`
  padding: 18px 10px;
  border-right: 1px solid rgb(237, 238, 243);
  position: relative;
  :nth-of-type(6),
  :nth-of-type(7),
  :nth-of-type(8) {
    text-align: center;
  }
  :hover span {
    opacity: 1;
  }
  & p {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #000;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  & span {
    border: 1px solid #c8cdd0;
    border-radius: 6px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMzQ2NV83NTg4IiB0cmFuc2Zvcm09InNjYWxlKDAuMDE1NjI1KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzM0NjVfNzU4OCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQVhOU1IwSUFyczRjNlFBQUFFUmxXRWxtVFUwQUtnQUFBQWdBQVlkcEFBUUFBQUFCQUFBQUdnQUFBQUFBQTZBQkFBTUFBQUFCQUFFQUFLQUNBQVFBQUFBQkFBQUFRS0FEQUFRQUFBQUJBQUFBUUFBQUFBQkdVVUt3QUFBRFhFbEVRVlI0QWUyYXk2dE9VUmpHRCtlUU1wR1lHUEFWVWdaTXBOQ1pLOWZjQnY0SHBVeVZNakJpZ0dKMEpraGhKQVpLSndybGtoaElPaTRuNUJJREpRTzVISDdQeVZ1cjFkcmZ2cVMrdGZaZWJ6MW43Y3RhdS9mM3JNdTM5ejU3YUNoSGRpQTdrQjNJRG5UWGdSbUpvYzhpM3kxb0sxcURGaUl4ZkVJUDBSVjBHZjFFcll2dEVFMmdQeVY2d2ZtZHFEVXhBc2sxVkFidW56OUttK0hVWFpnSndPMEc4R2JHc1pRTkVQeFlBRjd6K3hRYVJWb0RGcUFONkNUNmpnemV5aVNuUXo5NGdSZkZLazY4UVFhdjhpV2FqWklKcmVxbmtRdWg3YzlvTlNvTDFmRkh3cDZ5UnJHY0w0Si9TNExMYWlSNWdycXVnV2RydEIxWVZjSHJ0OXhOWE50MTRRV3czcnZPVXgyTU9RUi9DZm53SHpoV3ArZU5jWjUzclM5MndpKzEyQXc2Qks5VmZkZC9URVRYZEVQR1JobEtOTFRndVNPaHRWT2dDUDRicHJnR2FMdXVDYm9uY0s5eGh2Mm9vZ2hlb010UmFGUlVOV0VkN1g4ZzE0RGQ3RWNUL2VCdHdhdFNKd1Mwa29NK3ZCNk85QlFaUmRRQnExTlhjRDMwRWJrOXIrMGRLSXFvQzZTa3E3YnBVWGNTK2ZEakhJc2lxb0tFa2kxcjI2TlJDUDQreDZONEJpZ0RDRUg3eDRxdThaNksvc09QUnNFRk5PSmZaQkQ3UllsWFhkSGRuSFhUTm9iOFllN3Z0eExlakNnem9kWHdaa0tQamErb1V6MXY4SXZaMEFzT0gvNFp4MW8zNXczYXlpTDQ2MTJHNzhTY0wrcjVERzl6WTVEbC8veWQ5emx5eitPSXY5cm5ZZThQazBIczUyRWZHSnBON3UzOXpzdHpQbUJzTkhOZUR5RlhBd2wyb3VjMVZHOTJHVjRHL1BJTWVNZSt2Y0RVK1NZUi9adzNxS1ZzdUwvSFUreXZzSk1OeTJUZ3hiY1h1UWJjYWdodHpaS0NWOUxIa1d2QUVTTnBVQ1lITDhhN3lEVmdXd053TlVrU1hxK1YvYTh0RmpVd0lFbDRjYTVGYnUrLzdoSzhXUGQ1Qmx5c2FVQ3lQVytjNXp3RER0aUpDbVh5OEdKOGp0d3BNRm9CWEZXV29Fbmt0dFYyTlBmMjVGSWE4Nmt4aFF4Q2Q0TnpDMXJwZzhYTjZEQzZnWDRqYTJlbFJ0TXdTaVkya3FrbHIvTFJ2OHpuVU9vamhQM29QQXE5cDNmYmFUczVlSEllT29SY2tDZnM2eit1L2djSWJwM1E5amh0a3VwNThwMk9CL3dOQVZVOXBpbHpCNDFNWHkzU1AzcTlWUlFDcU5weitvRDVNYnFITkVxa0NTU3pvbzUrdmRNditWZFFDZGFBdFQ3b2pyRlZjUkFhalFLdDZQcUVWU3Y4SnFRVlAwZDJJRHVRSGNnT1pBZGE0TUJmK3NoV0dVRnlPaTBBQUFBQVNVVk9SSzVDWUlJPSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
    width: 30px;
    height: 30px;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    opacity: 0;
    position: absolute;
    right: 10px;
    background-color: #fff;
  }
  & .wap-click-arrow {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  & img {
    display: block;
    object-fit: contain;
    margin: auto;
    max-width: 100%;
  }
`;

const Wap360adminTbody = styled(TableBody)`
  tr:hover {
    background-color: #fff;
  }
  & tr:nth-of-type(even) {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
const Wap360adminTabelMain = styled(TableContainer)`
  width: 100%;
  overflow-x: auto;
  max-height: calc(100vh - 405px);
`;

const SolutionTableActionsBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  display: block;
  margin: auto;
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

const headers = [
  {
    id: "model_name",
    label: "Model Name",
  },
  {
    id: "provider",
    label: "Provider",
  },
  {
    id: "type",
    label: "Type",
    tooltip: "This is the classification of the model by its type",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "tasks_in_use",
    label: "Tasks in use",
    tooltip: "This shows the list of your company business tasks that are enhanced or automated with this model, directly integrated in your systems, customized or as underlying model of a AI tool",
  },
  {
    id: "capabilities",
    label: "Capabilities",
    tooltip: "It describes the capabilities of the model",
  },
  {
    id: "context_size",
    label: "Context size",
    tooltip: "It shows the context size enabled by the model",
  },
  {
    id: "quality_of_data_training",
    label: "Quality of data training",
    tooltip: "It describes the quality of the training data used by the model",
  },
  {
    id: "human_validation",
    label: "Human validation",
    tooltip: "It tells you if the model entails human validation",
  },
  {
    id: "inference_latency",
    label: "Inference Latency",
    tooltip: "It shows the model average latency time",
  },
  {
    id: "cost",
    label: "Cost",
  },
  {
    id: "action",
    label: "Action",
  },
]

export default function ModelsTable({
  model,
  handleEditModel,
}: {
  model?: any;
  handleEditModel: (id: string) => void;
}) {
  const handleProviders = (providers: string) => {
    try {
      const jsonIndus: any = JSON.parse(providers)
      return jsonIndus;
    } catch {
      return [];
    }
  };

  return (
    <Wap360adminTabelMain>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {headers.map(header => 
              <Wap360adminTh key={header.id}>
                {header.tooltip ?
                  <CustomTooltip title={header.tooltip} placement="bottom-end">
                    <span>{header.label}</span>
                  </CustomTooltip>
                  : <span>{header.label}</span>
                }
              </Wap360adminTh>
            )}
          </TableRow>
        </TableHead>
        <Wap360adminTbody>
          {model ? (
            model.models.map((md: any, index: number) => {
              const indvalue = handleProviders(md.providers);
              return (
                <TableRow hover key={index}>
                  <Wap360adminTd>{md.name}</Wap360adminTd>
                  <Wap360adminTd>{indvalue[0].name}</Wap360adminTd>
                  <Wap360adminTd>{indvalue[0].type}</Wap360adminTd>
                  <Wap360adminTd><p>{md.description}</p></Wap360adminTd>
                  <Wap360adminTd></Wap360adminTd>
                  <Wap360adminTd>{md.main_capability_name}</Wap360adminTd>
                  <Wap360adminTd></Wap360adminTd>
                  <Wap360adminTd>{md.created_by}</Wap360adminTd>
                  <Wap360adminTd>{md.created_by}</Wap360adminTd>
                  <Wap360adminTd></Wap360adminTd>
                  <Wap360adminTd></Wap360adminTd>
                  <Wap360adminTd>
                    <SolutionTableActionsBtn
                      onClick={() => handleEditModel(md.id)}
                    >
                      <Image src={Edit} alt="edit" />
                    </SolutionTableActionsBtn>
                  </Wap360adminTd>
                </TableRow>
              );
            })
          ) : (
            <TableRow hover role="checkbox" tabIndex={-1}>
              <Wap360adminTd colSpan={12} align="center">
                <p>No Model Available</p>
              </Wap360adminTd>
            </TableRow>
          )}
        </Wap360adminTbody>
      </Table>
    </Wap360adminTabelMain>
  );
}
