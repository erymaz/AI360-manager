import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

export function AppPagination({
  rowsPerPage,
  rowsPerPageOptions,
  page,
  total,
  onPageChange,
  onRowsPerPageChange,
}: {
  rowsPerPage: number;
  rowsPerPageOptions: string[];
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: string) => void;
}) {
  const [pages, setPages] = useState<number>(0);

  useLayoutEffect(() => {
    setPages(Math.ceil(total / rowsPerPage));
  }, [total, rowsPerPage]);

  return (
    <>
      <Pagination className="sm:relative w-full justify-center gap-2 pb-3">
        <div className="flex items-center gap-x-2 sm:absolute sm:left-3 sm:top-0">
          <span className="text-sm font-semibold">Rows per page</span>
          <Select
            onValueChange={onRowsPerPageChange}
            value={String(rowsPerPage)}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {rowsPerPageOptions.map((_: string, index: number) => (
                  <SelectItem key={index} value={_}>
                    {_}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <PaginationContent>
          {page > 0 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                className="text-[#020617] font-medium leading-6 text-sm"
                href="#"
              />
            </PaginationItem>
          )}
          {page > 2 && (
            <PaginationItem>
              <PaginationEllipsis className="text-[#020617] font-medium leading-6 text-sm" />
            </PaginationItem>
          )}
          {page > 0 && (
            <PaginationItem>
              <PaginationLink
                className="text-[#020617] font-medium leading-6 text-sm"
                onClick={() => onPageChange(page - 1)}
                href="#"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              className="text-[#020617] font-medium leading-6 text-sm"
              onClick={() => onPageChange(page)}
              href="#"
              isActive
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          {page + 1 < pages && (
            <PaginationItem>
              <PaginationLink
                className="text-[#020617] font-medium leading-6 text-sm"
                onClick={() => onPageChange(page + 1)}
                href="#"
              >
                {page + 2}
              </PaginationLink>
            </PaginationItem>
          )}
          {page === 0 && page + 2 < pages && (
            <PaginationItem>
              <PaginationLink
                className="text-[#020617] font-medium leading-6 text-sm"
                onClick={() => onPageChange(page + 2)}
                href="#"
              >
                {page + 3}
              </PaginationLink>
            </PaginationItem>
          )}
          {page === 0 && page + 3 < pages && (
            <PaginationItem>
              <PaginationEllipsis className="text-[#020617] font-medium leading-6 text-sm" />
            </PaginationItem>
          )}
          {page !== 0 && page + 2 < pages && (
            <PaginationItem>
              <PaginationEllipsis className="text-[#020617] font-medium leading-6 text-sm" />
            </PaginationItem>
          )}
          {page + 1 < pages && (
            <PaginationItem>
              <PaginationNext
                className="text-[#020617] font-medium leading-6 text-sm"
                onClick={() => onPageChange(page + 1)}
                href="#"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
