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
import { PencilLineIcon } from "lucide-react";
import EditableSolutionName from "./EditableSolutionName";

const Wap360adminTh = styled(TableCell)`
  padding: 8px 10px 8px 10px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #000;
  white-space: nowrap;
  cursor: pointer;
  // :nth-of-type(1),
  :nth-of-type(2),
  // :nth-of-type(3) {
  //   width: 15%;
  // }
  :nth-of-type(6),
  :nth-of-type(7),
  :nth-of-type(10) {
    text-align: center;
  }
`;

const Wap360adminTd = styled(TableCell)`
  padding: 18px 10px;
  border-right: 1px solid rgb(237, 238, 243);
  position: relative;
  // :nth-of-type(6),
  // :nth-of-type(7),
  // :nth-of-type(8) {
  //   text-align: center;
  // }
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
    id: "name",
    label: "Provider Name",
  },
  {
    id: "logo",
    label: "Logo",
  },
  {
    id: "type",
    label: "Type",
    tooltip: "Shows the type of AI solutions provided by the company",
  },
  {
    id: "solution_name",
    label: "AI functionality",
    tooltip: "List of the AI functionalities provided by the AI tool",
  },
  {
    id: "models_transformer",
    label: "Models & Transformer",
    tooltip: "Underlying model for this AI functionality (for example GPT-4 turbo)",
  },
  {
    id: "rai_score",
    label: "RAI score",
    tooltip: "This is the average responsible AI score",
  },
  {
    id: "viability_score",
    label: "Avg Viability Score",
    tooltip: "It shows the average viability score of the AI tool",
  },
  {
    id: "created_by",
    label: "Created by",
  },
  {
    id: "assessed_by",
    label: "Assessed by",
  },
  {
    id: "action",
    label: "Actions",
  },
]

export default function InventoryMasterTable({
  providers,
  organization,
  handleEditProvider,
}: {
  providers: any;
  organization: any;
  handleEditProvider: (id: string) => void;
}) {

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  const jsonStringToArray = (indus: string) => {
    try {
      const result: any = JSON.parse(indus)
        .filter((val: any) => val.name)
        .map((val: any) => ({
          ...val
        }));
      return result;
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
          {providers ? (
            providers.map((prov: any, index: number) => {
              const solutions = jsonStringToArray(prov.solutions);
              const models = jsonStringToArray(prov.models);
              return (
                <TableRow hover key={index}>
                  <Wap360adminTd>{prov.name}</Wap360adminTd>
                  <Wap360adminTd>
                    {prov.logo ? (
                      <Image
                        loader={myLoader}
                        src={prov.logo}
                        alt="logo"
                        height={50}
                        width={108}
                      />
                    ) : (
                      ""
                    )}
                  </Wap360adminTd>
                  <Wap360adminTd>{prov.type}</Wap360adminTd>
                  <Wap360adminTd>
                    {solutions.map((solution: any) =>
                      <EditableSolutionName
                        key={solution.id}
                        organization={organization}
                        solution={solution}
                      />
                    )}
                    {!solutions?.length &&
                      <EditableSolutionName
                        key="new-solution"
                        organization={organization}
                        providerId={prov.id}
                        solution={null}
                      />}
                  </Wap360adminTd>
                  <Wap360adminTd>{models.map((model: any) => model.name).join(", ")}</Wap360adminTd>
                  <Wap360adminTd></Wap360adminTd>
                  <Wap360adminTd style={{ fontWeight: 600, textAlign: 'center' }}>{prov.average_fn}</Wap360adminTd>
                  <Wap360adminTd>{prov.created_by}</Wap360adminTd>
                  <Wap360adminTd></Wap360adminTd>
                  <Wap360adminTd>
                    <SolutionTableActionsBtn
                      onClick={() => handleEditProvider(prov.id)}
                    >
                      <PencilLineIcon className="w-5" />
                    </SolutionTableActionsBtn>
                  </Wap360adminTd>
                </TableRow>
              );
            })
          ) : (
            <TableRow hover role="checkbox" tabIndex={-1}>
              <Wap360adminTd colSpan={10} align="center">
                <p>No Provider Available</p>
              </Wap360adminTd>
            </TableRow>
          )}
        </Wap360adminTbody>
      </Table>
    </Wap360adminTabelMain>
  );
}
