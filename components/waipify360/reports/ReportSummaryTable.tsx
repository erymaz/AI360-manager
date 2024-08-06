import sortedDown from "../../../public/down-arrow.svg";
import sortedUp from "../../../public/up-arrow.svg";
import SummaryRow from "./SummaryRow";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import * as React from "react";

interface Data {
  id: number;
  reference: number;
  business_area_name: string;
  // opportunity_name: string;
  case_name: string;
  task_name: string;
  task_risk: string;
  entry_solution_name: string;
  impact_kpis: string;
  feasibility_number: number;
  impact_starts: string;
  genai_impact: string;
  recommendation: string;
  status: string;
  actions: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  sort?: boolean;
  tooltip?: string;
  style?: string;
  labelStyle?: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "reference",
    numeric: false,
    disablePadding: true,
    label: "#",
    tooltip:
      "This just a number assigned when you add the opportunity to the record. It will help you identifying it!",
    style: "w-[3.6%]",
    labelStyle: "",
  },
  {
    id: "business_area_name",
    numeric: false,
    disablePadding: false,
    label: "Business function",
    sort: true,
    style: "w-[8%]",
    labelStyle: "w-[61px]",
  },
  {
    id: "case_name",
    numeric: false,
    disablePadding: false,
    label: "AI Use Case",
    sort: true,
    tooltip:
      "It tells you what you can do with AI in order to enhance or automate a business task or functionality",
    style: "w-[20%]",
    labelStyle: "w-[131px]",
  },
  {
    id: "task_name",
    numeric: false,
    disablePadding: false,
    label: "Business task",
    sort: true,
    tooltip:
      "This is the business task that your employee, a third party or the system currently performs that will be impacted by the AI",
    style: "w-[16%]",
    labelStyle: "w-[93px]",
  },
  {
    id: "task_risk",
    numeric: false,
    disablePadding: false,
    label: "Risk level",
    sort: true,
    tooltip:
      "It shows what is the risk level of the task itself related to applying AI on it. Regulations or internal policies may define for example that applying AI for one activity is not accepted. ",
    style: "w-[4%]",
    labelStyle: "w-[28px]",
  },
  {
    id: "entry_solution_name",
    numeric: false,
    disablePadding: false,
    label: "Best AI tool",
    sort: true,
    tooltip:
      "Displays the name of the AI tool, model or custom development to implement in order to achieve the business impact. This has been chosen compared to other options. You can see the compared accessing the record",
    style: "w-[5%]",
    labelStyle: "w-[42px]",
  },
  {
    id: "impact_kpis",
    numeric: false,
    disablePadding: false,
    label: "Impacted KPIs",
    sort: false,
    style: "w-[11%]",
    labelStyle: "w-[100px]",
  },
  {
    id: "genai_impact",
    numeric: false,
    disablePadding: false,
    label: "Business impact",
    sort: true,
    tooltip:
      "It's the forecast of business impact of the AI implementation for your company",
    style: "w-[8%]",
    labelStyle: "w-[55px]",
  },
  {
    id: "feasibility_number",
    numeric: false,
    disablePadding: false,
    label: "VS",
    sort: true,
    tooltip:
      "Viability Score (VS) provides an score of the Viability of implementation of this AI, based on criteria of outcome accuracy, easiness of adoption and compliance criteria. You can access the details in the record",
    style: "w-[3%]",
    labelStyle: "w-[14px]",
  },
  {
    id: "impact_starts",
    numeric: false,
    disablePadding: false,
    label: "Time to Impact",
    sort: true,
    tooltip:
      "Expected time from start of the implementation till the first tangible business impact is achieved. Usually equals the implementation time",
    style: "w-[5%]",
    labelStyle: "w-[46px]",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    sort: true,
    tooltip:
      "This is the current status of the opportunity in your business. You control and assign the status of each of your opportunities",
    style: "w-[8%]",
    labelStyle: "w-[36px]",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    style: "w-[4%]",
    labelStyle: "w-[27px]",
  },
];

export default function ReportSummaryTable({
  entries,
  statuses,
  feasibilityCriteria,
  loading,
  handleStatusChange,
  handleSortData,
  handleEditEntry,
}: {
  entries?: any;
  statuses: any;
  feasibilityCriteria: any;
  loading: boolean;
  handleSortData: (sortData: any) => void;
  handleStatusChange: () => void;
  handleEditEntry: (row: any) => void;
}) {
  const [order, setOrder] = React.useState<any>({
    property: "",
    direction: "",
  });

  const handleRequestSort = (property: any, direction: string) => {
    setOrder({
      property,
      direction,
    });
    handleSortData({ sortKey: property, sortDirection: direction });
  };

  return (
    <div className="overflow-y-auto scroll-smooth custom-scrollbar max-h-[calc(100vh_-_400px)] flex-shrink-0">
      <Table
        className={`opportunity-table min-w-[1330px]${
          entries?.length === 0 ? " no_record" : ""
        }`}
      >
        <TableHeader>
          <TableRow>
            {headCells.map((cell) => {
              return (
                <TableHead
                  className={`pb-1.5 pt-4 ${cell.style}`}
                  key={cell.id}
                >
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          className={`text-[#64748B] text-xs leading-[14px] font-medium inline-block flex-shrink-1 text-left max-w-fit ${cell.labelStyle}`}
                        >
                          {cell.label}
                        </TooltipTrigger>
                        {cell.tooltip && (
                          <TooltipContent className="max-w-72 w-full whitespace-normal bg-[#E2E8F0] border border-solid border-[#E2E8F0] shadow-[0px_1px_5px_0px_#64748B1A] text-black">
                            {cell.tooltip}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>

                    {cell.sort && (
                      <div className="flex flex-col gap-2 flex-shrink-0 w-3.5">
                        <Button
                          variant={"transparent"}
                          className="p-0 w-fit max-w-fit h-auto flex-shrink-0"
                          onClick={() => handleRequestSort(cell.id, "asc")}
                        >
                          <Image
                            src={sortedUp}
                            alt="up-arrow"
                            className={
                              cell.id === order.property &&
                              order.direction === "asc"
                                ? `filter brightness-0`
                                : ""
                            }
                            height={4}
                            width={8}
                          />
                        </Button>
                        <Button
                          variant={"transparent"}
                          className="p-0 w-fit max-w-fit h-auto flex-shrink-0"
                          onClick={() => handleRequestSort(cell.id, "desc")}
                        >
                          <Image
                            src={sortedDown}
                            alt="down-arrow"
                            className={
                              cell.id === order.property &&
                              order.direction === "desc"
                                ? `filter brightness-0`
                                : ""
                            }
                            height={4}
                            width={8}
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading ? (
            entries?.length > 0 ? (
              entries.map((row: any, index: any) => {
                return (
                  <SummaryRow
                    key={index}
                    row={row}
                    statuses={statuses}
                    handleStatusChange={handleStatusChange}
                    handleEditEntry={handleEditEntry}
                  />
                );
              })
            ) : (
              <TableRow className="hover:bg-blue-100 cursor-pointer">
                <TableCell
                  colSpan={12}
                  className="text-[#020617] font-medium leading-6"
                >
                  No records available
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow className="hover:bg-blue-100 cursor-pointer">
              <TableCell
                colSpan={12}
                className="text-[#020617] font-medium leading-6 text-center h-[60px]"
              >
                <div className="flex space-x-3 justify-center items-center bg-white dark:invert">
                  <div className="h-3 w-3 bg-[#1e71f6] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-3 w-3 bg-[#1e71f6] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-3 w-3 bg-[#1e71f6] rounded-full animate-bounce"></div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
