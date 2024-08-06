import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter as useNavigate } from "next/router";

import DeleteEntryModel from "../models/DeleteEntryModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReportContext } from "@/context/reportContext";
import { withCurrency, threeCommaDecimals } from "@/helpers/utils";
import { opportunityStatusChange } from "@/lib/api/impact360";
import { riskIcons } from "@/helpers/tasks";
import { ArrowUp, ArrowDown } from "lucide-react";

function SummaryRow({
  row,
  statuses,
  handleStatusChange,
  handleEditEntry,
}: {
  row: any;
  statuses: any;
  handleStatusChange: () => void;
  handleEditEntry: (row: any) => void;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { successDeleteEntry, filial_id } = useContext(ReportContext);
  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  const handleStatusChanged = async (id: string): Promise<void> => {
    const status = statuses.find((_: any) => _.id === id);
    if (!status) {
      return;
    }
    opportunityStatusChange(row.id, id).then((res: any) => {
      handleStatusChange();
    });
  };

  const getImpactColor = (value: string): string => {
    const nV = Number(value || 0);
    if (nV > 0) {
      return "text-green-500";
    } else if (nV < 0) {
      return "text-red-500";
    } else {
      return "text-black";
    }
  };

  const getStatusColor = (id: string): string => {
    if (!id) {
      return "#FFF";
    }
    const status = statuses.find((_: any) => _.id === id);
    return status?.hex_colour_value || "#9CA5AF";
  };

  const handleAccept = () => {
    setOpen(false);
    successDeleteEntry();
  };

  const handleDetailView = (event: any) => {
    event.stopPropagation();
    navigate.push({
      pathname: `${window.location.pathname}/opportunity`,
      query: { opportunity_id: row.id, filial_id: filial_id },
    });
  };

  const getKpisArr = (kpisStr: string) => {
    try {
      return JSON.parse(kpisStr);
    } catch(err) {
      return [];
    }
  };

  return (
    <>
      {row ? (
        <>
          <TableRow
            onClick={handleDetailView}
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className="hover:bg-blue-100 cursor-pointer"
          >
            <TableCell className="font-medium leading-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="w-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {row.reference}
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#E2E8F0] border border-solid border-[#E2E8F0] shadow-[0px_1px_5px_0px_#64748B1A] text-black">
                    {row.reference}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="">
              <p className="text-sm leading-tight">
                {row.business_area_name}
              </p>
            </TableCell>
            <TableCell className="">
              <div>
                <h6 className="w-full max-w-[300px] font-semibold text-sm truncate">
                  {row.case_name}
                </h6>
                {row.case_description && <p className="text-xs mt-2">{row.case_description}</p>}
              </div>
            </TableCell>
            <TableCell className="">
              <p className="text-sm">
                {row.task_name}
              </p>
            </TableCell>
            <TableCell className="">
              {row.task_risk ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        loader={myLoader}
                        src={riskIcons[row.task_risk]}
                        alt="logo"
                        height={20}
                        width={20}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-inputBorder border border-solid border-inputBorder shadow-[0px_1px_5px_0px_#64748B1A] text-black">
                      {row.task_risk}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                "NA"
              )}
            </TableCell>
            <TableCell className="">
              <div className="w-16 truncate">
                {row.entry_solution_logo || row.solution_logo_url || row.winner_solution_is_custom ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Image
                          loader={myLoader}
                          src={
                            row.solution_logo_url
                              ? row.solution_logo_url
                              : row.entry_solution_logo
                                ? row.entry_solution_logo
                                : "/model_default.svg"
                          }
                          alt="logo"
                          height={40}
                          width={40}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.style.display = "none";
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#E2E8F0] border border-solid border-[#E2E8F0] shadow-[0px_1px_5px_0px_#64748B1A] text-black">
                        <p>{row.entry_solution_name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span>{row.entry_solution_name}</span>
                )}
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex-1">
                {getKpisArr(row.kpis)?.slice(0, 3)?.map((kpi: any, index: number) => (
                  <div key={index} className="flex items-center py-1 truncate">
                    {kpi.effect === 'Increase' && <ArrowUp className="w-3 mr-2" />}
                    {kpi.effect === 'Decrease' && <ArrowDown className="w-3 mr-2" />}
                    <span className="text-sm text-text text-sm">
                      {`${kpi.expected_impact || ''}${kpi.unit || ''} ${kpi.name || ''}`}
                    </span>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className={getImpactColor(row.genai_impact)}>
              {row.genai_impact ? withCurrency(Number(row.genai_impact)) : "NA"}
            </TableCell>
            <TableCell className="">
              {row.feasibility_number
                ? threeCommaDecimals(Number(row.feasibility_number))
                : 0}
            </TableCell>
            <TableCell className="">
              <p className="leading-5 text-sm">
                {row.impact_starts ? row.impact_starts : "NA"}
              </p>
            </TableCell>
            <TableCell>
              <Select
                onValueChange={handleStatusChanged}
                value={row.status_id || ""}
              >
                <SelectTrigger
                  className={`h-7 text-xs ${row.status_id ? 'text-white' : 'text-black'} rounded-sm focus:ring-none`}
                  style={{
                    backgroundColor: getStatusColor(row.status_id),
                    // borderColor: getStatusColor(row.status_id),
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <SelectValue
                    className="select-placeholder"
                    placeholder="Select status"
                  />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status: any) => (
                    <SelectItem
                      key={status.id}
                      value={status.id}
                      className="text-xs"
                      style={{ color: status.hex_colour_value || "#9CA5AF" }}
                    >
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="">
              <DropdownMenu>
                <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                  <div className="ml-3 bg-muted rounded-lg w-6 h-6 flex items-center justify-center">
                    <span className="mb-2">...</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEntry(row);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true)
                  }}>
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <DeleteEntryModel
            open={open}
            entry_id={row.id}
            handleAccept={handleAccept}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default SummaryRow;
