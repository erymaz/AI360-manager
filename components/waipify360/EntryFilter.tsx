"use client";

import { useState, useMemo } from "react";
import {useTranslations} from "next-intl";

import {request} from "@/helpers/request";
import styled from "@emotion/styled";
import { Button } from "@/components/ui/button";
import {
  CirclePlus,
  ChevronDown,
  ChevronUp,
  Filter,
  CircleX
} from "lucide-react";
import { taskRisks } from "@/helpers/tasks";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { SearchableDropdown } from "@/components/searchable-dropdown";

const WapReportSearchiInput = styled.input`
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  background: #fff;
  padding: 8px 13px;
  padding-left: 32px;
  color: #9ca5af;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  height: 42px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4IiBmaWxsPSJub25lIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjg5MF80NzE4KSI+CiAgICA8cGF0aCBkPSJNMTYuNSAxNi41TDE1IDE1TTguNjI1IDE1Ljc1QzkuNTYwNjcgMTUuNzUgMTAuNDg3MiAxNS41NjU3IDExLjM1MTYgMTUuMjA3NkMxMi4yMTYxIDE0Ljg0OTYgMTMuMDAxNSAxNC4zMjQ4IDEzLjY2MzEgMTMuNjYzMUMxNC4zMjQ4IDEzLjAwMTUgMTQuODQ5NiAxMi4yMTYxIDE1LjIwNzYgMTEuMzUxNkMxNS41NjU3IDEwLjQ4NzIgMTUuNzUgOS41NjA2NyAxNS43NSA4LjYyNUMxNS43NSA3LjY4OTMzIDE1LjU2NTcgNi43NjI4MyAxNS4yMDc2IDUuODk4MzhDMTQuODQ5NiA1LjAzMzk0IDE0LjMyNDggNC4yNDg0OCAxMy42NjMxIDMuNTg2ODZDMTMuMDAxNSAyLjkyNTI1IDEyLjIxNjEgMi40MDA0MiAxMS4zNTE2IDIuMDQyMzZDMTAuNDg3MiAxLjY4NDI5IDkuNTYwNjcgMS41IDguNjI1IDEuNUM2LjczNTMzIDEuNSA0LjkyMzA2IDIuMjUwNjcgMy41ODY4NiAzLjU4Njg2QzIuMjUwNjcgNC45MjMwNiAxLjUgNi43MzUzMyAxLjUgOC42MjVDMS41IDEwLjUxNDcgMi4yNTA2NyAxMi4zMjY5IDMuNTg2ODYgMTMuNjYzMUM0LjkyMzA2IDE0Ljk5OTMgNi43MzUzMyAxNS43NSA4LjYyNSAxNS43NVoiIHN0cm9rZT0iIzlDQTVBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcDBfMjg5MF80NzE4Ij4KICAgICAgPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+Cjwvc3ZnPg==");
  background-repeat: no-repeat;
  background-position: left 6px center;
  :focus {
    outline: none;
  }
  @media (max-width: 1199px) {
    max-width: 670px;
  }
`;

function EntryFilter({
  handleFilterDataChange,
  cases,
  businessAreas,
  opportunities,
  providers,
  filterData,
}: {
  handleFilterDataChange: (value: any, type: string) => void;
  cases: any;
  businessAreas: any;
  opportunities: any;
  providers: any;
  filterData: any;
}) {
  const t = useTranslations('waipify.ui');

  const [statuses, setStatuses] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState<boolean>(false);

  useLayoutEffect(() => {
      init();
  }, []);

  const businessFunctionOptions = useMemo(() => {
    if (!businessAreas?.length) {
      return[];
    }
    return businessAreas?.map((businessArea: any) => {
      return {
        value: businessArea.id,
        label: businessArea.name,
      };
    });
  }, [businessAreas]);

  const opportunitiesOptions = useMemo(() => {
    if (!opportunities?.length) {
      return [];
    }
    return opportunities.map((opp: any) => ({
      value: opp.id,
      label: opp.name,
    }));
  }, [opportunities]);

  const statusOptions = useMemo(() => {
    if (!statuses?.length) {
      return [];
    }
    return statuses.map((opp: any) => ({
      value: opp.id,
      label: opp.name,
    }));
  }, [statuses]);

  const caseOptions = useMemo(() => {
    if (!cases?.length) {
      return [];
    }
    return cases.map((opp: any) => ({
      value: opp.id,
      label: opp.name,
    }));
  }, [cases]);

  const providerOptions = useMemo(() => {
    if (!providers?.length) {
      return [];
    }
    const _providers: any = [];
    providers.forEach((prov: any) => {
      if (prov.id) {
        _providers.push({
          value: prov.id,
          label: prov.name,
        });
      }
    });
    return _providers;
  }, [providers]);

  const init = async () => {
    await Promise.all([
      loadStatuses(),
    ])
  }

  const loadStatuses = async () => {
    return request<{ statuses?: any }>(`/api/impact360/statuses`, {
      method: "GET",
    }).then((res: any) => {
      if (res) {
        setStatuses(res?.statuses);
      }
    });
  };

  const handleMultiSelect = (name: string, value: string, checked: boolean = true) => {
    if (checked && !filterData[name]?.find((_: string) => _ === value)) {
      const values = filterData[name] ? [...filterData[name]] : [];
      values.push(value);
      handleFilterDataChange(values, name);
      return;
    }

    if (!checked) {
      const values = filterData[name]?.filter((_: string) => _ !== value);
      handleFilterDataChange(values, name);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event && event.target.value;
    setSearch(value);
    handleFilterDataChange(value, "search_val");
  };

  const businessFunctionName = (id: string): string => {
    return businessAreas?.find((_: any) => _.id === id)?.name || "";
  }

  const opportunityName = (id: string): string => {
    return opportunities?.find((_: any) => _.id === id)?.name || "";
  }

  const statusName = (id: string): string => {
    return statuses?.find((_: any) => _.id === id)?.name || "";
  }

  const caseName = (id: string): string => {
    return cases?.find((_: any) => _.id === id)?.name || "";
  }

  const providerName = (id: string): string => {
    return providers?.find((provider: any) => provider.id === id)?.name || "";
  }

  return (
    <div className="">
      <div className="flex gap-x-2">
        <WapReportSearchiInput
          type="text"
          placeholder={t("general.search1")}
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="mt-4 flex items-center flex-wrap gap-4">
        {/* business functions */}
        <SearchableDropdown
          label={t("report.business_function")}
          name="business_area_ids"
          options={businessFunctionOptions}
          showSelectedValue={false}
          style="w-[200px]"
          onChange={(value)=>handleMultiSelect("business_area_ids", value)}
        />

        {/* AI enabled solution */}
        <SearchableDropdown
          label={t("sidebar.use_case")}
          name="case_ids"
          options={caseOptions}
          showSelectedValue={false}
          style="w-[200px]"
          onChange={(value)=>handleMultiSelect("case_ids", value)}
        />

        {/* statuses */}
        <SearchableDropdown
          label={t("general.status")}
          name="status_ids"
          options={statusOptions}
          showSelectedValue={false}
          style="w-[200px]"
          onChange={(value)=>handleMultiSelect("status_ids", value)}
        />

        <Button
          variant="secondary"
          className="flex items-center gap-x-3 bg-transparent border border-border"
          onClick={()=>setShowMore(!showMore)}
        >
          <Filter className="w-4" />
          <span>Advanced filters</span>
          {showMore ?
            <ChevronUp className="w-4" /> :
            <ChevronDown className="w-4" />
          }
        </Button>
      </div>

      {showMore &&
        <div className="flex items-center gap-x-4 mt-4 p-2 bg-gray-200 rounded-lg">
          {/* opportunities */}
          <SearchableDropdown
            label={t("report.opportunity")}
            name="opportunity_ids"
            options={opportunitiesOptions}
            showSelectedValue={false}
            style="w-[200px]"
            onChange={(value)=>handleMultiSelect("opportunity_ids", value)}
          />

          {/* Risk level */}
          <SearchableDropdown
            label={t("report.risk_level")}
            name="risks"
            options={taskRisks.map(risk => ({
              label: risk,
              value: risk,
            }))}
            showSelectedValue={false}
            style="w-[200px]"
            onChange={(value)=>handleMultiSelect("risks", value)}
          />

          {/* Best AI tool */}
          <SearchableDropdown
            label={t("report.best_ai_tool")}
            name="provider_ids"
            options={providerOptions}
            showSelectedValue={false}
            style="w-[200px]"
            onChange={(value)=>handleMultiSelect("provider_ids", value)}
          />
        </div>
      }

      <div className="flex flex-wrap gap-2 mt-4">
        {filterData["business_area_ids"]?.map((id: string) =>
          <div
            key={id}
            className="text-foreground text-sm font-medium rounded-md flex items-center gap-x-2 border border-foreground bg-white shadow-md px-2 py-1 cursor-pointer"
            onClick={()=>handleMultiSelect("business_area_ids", id, false)}
          >
            <CircleX className="w-3" />
            <span>{businessFunctionName(id)}</span>
          </div>
        )}

        {filterData["opportunity_ids"]?.map((id: string) =>
          <div
            key={id}
            className="text-foreground text-sm font-medium rounded-md flex items-center gap-x-2 border border-foreground bg-white shadow-md px-2 py-1 cursor-pointer"
            onClick={()=>handleMultiSelect("opportunity_ids", id, false)}
          >
            <CircleX className="w-3" />
            <span>{opportunityName(id)}</span>
          </div>
        )}

        {filterData["status_ids"]?.map((id: string) =>
          <div
            key={id}
            className="text-foreground text-sm font-medium rounded-md flex items-center gap-x-2 border border-foreground bg-white shadow-md px-2 py-1 cursor-pointer"
            onClick={()=>handleMultiSelect("status_ids", id, false)}
          >
            <CircleX className="w-3" />
            <span>{statusName(id)}</span>
          </div>
        )}

        {filterData["case_ids"]?.map((id: string) =>
          <div
            key={id}
            className="text-foreground text-sm font-medium rounded-md flex items-center gap-x-2 border border-foreground bg-white shadow-md px-2 py-1 cursor-pointer"
            onClick={()=>handleMultiSelect("case_ids", id, false)}
          >
            <CircleX className="w-3" />
            <span>{caseName(id)}</span>
          </div>
        )}

        {filterData["risks"]?.map((risk: string) =>
          <div
            key={risk}
            className="text-foreground text-sm font-medium rounded-md flex items-center gap-x-2 border border-foreground bg-white shadow-md px-2 py-1 cursor-pointer"
            onClick={()=>handleMultiSelect("risks", risk, false)}
          >
            <CircleX className="w-3" />
            <span>{risk}</span>
          </div>
        )}

        {filterData["provider_ids"]?.map((id: string) =>
          <div
            key={id}
            className="text-foreground text-sm font-medium rounded-md flex items-center gap-x-2 border border-foreground bg-white shadow-md px-2 py-1 cursor-pointer"
            onClick={()=>handleMultiSelect("provider_ids", id, false)}
          >
            <CircleX className="w-3" />
            <span>{providerName(id)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default EntryFilter;
