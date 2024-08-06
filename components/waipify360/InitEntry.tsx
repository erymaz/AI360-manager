"use client";

import styled from "@emotion/styled";
import { useMemo, useState } from "react";
import {useTranslations} from "next-intl";

import { Label } from "../ui/label";
import ModalSelect from "./ModalSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { request } from "@/helpers/request";
import { taskRisks } from "@/helpers/tasks";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { SearchableDropdown } from "@/components/searchable-dropdown";

const SelectWapBtn = styled.button`
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 7px 13px 7px 11px;
  font-size: 14px;
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
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", right: "13px", top: "12px" }}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#64748B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function InitEntry({
  impOrganization,
  validation,
  formData,
  // cases,
  businessAreas,
  departments,
  industries,
  handleParamChange,
  // setCases,
}: {
  impOrganization: any;
  validation: any;
  formData: any;
  // cases: any;
  businessAreas: any;
  departments: any;
  industries: any;
  handleParamChange: (value: any, type: string) => void;
  // setCases: (value: any) => void;
}) {
  const t = useTranslations('waipify.ui');

  const [searchInt, setSearchInt] = useState<any>(null);
  const [opportunities, setOpportunities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const [displayBusinessArea, setDisplayBusinessArea] = useState(businessAreas);
  const [opportunityToggle, setOpportunityToggle] = useState<boolean>(false);
  const [caseToggle, setCaseToggle] = useState<boolean>(false);
  const [taskToggle, setTaskToggle] = useState<any>(false);
  const [cases, setCases] = useState<any>([]);

  useLayoutEffect(() => {
    if (formData?.case_id) {
      loadTasks("", formData?.case_id);
    }
  }, [formData?.case_id]);

  useLayoutEffect(() => {
    if (formData?.business_area_id) {
      loadOpportunities("",formData.business_area_id);
      loadCases("", formData.industry_id, formData.business_area_id);
    } else {
      setOpportunities([]);
    }
  }, [formData?.business_area_id]);

  useLayoutEffect(() => {
    loadCategory(formData.industry_id);
    loadCases("", formData.industry_id, formData.business_area_id);
  }, [formData?.industry_id]);

  useLayoutEffect(() => {
    loadBusinessAreas(formData.industry_id, formData?.industry_category_id || "");
  }, [formData?.industry_id, formData?.industry_category_id]);

  const departmentOptions = useMemo(() => {
    return departments?.map((_: any) => {
      return {
        label: _.name,
        value: String(_.id),
      };
    });
  }, [departments]);

  const industryOptions = useMemo(() => {
    const options = industries.map((industry: any) => ({
      value: industry.id,
      label: t(`account_settings.industry.${industry.name}`)
    }));
    options.unshift({
      value: 'all',
      label: "All industries",
    });
    return options;
  }, [industries]);

  const loadOpportunities = async (name: string, business_area_id: string) => {
    try {
      let url = `/api/impact360/opportunities?organization_creator_id=${impOrganization.creator_id}&business_area_id=${business_area_id}&name=${name}`;
      await request<{ opportunities?: any }>(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res: any) => {
        if (res) {
          setOpportunities(res.opportunities);
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const loadCategory = async (industry_id: any) => {
    return request<{
      industry_categories?: any;
    }>(
      `/api/impact360/industry_category?organization_id=${impOrganization.id}&industry_id=${industry_id}`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res) {
        setCategories(res.industry_categories);
      }
    });
  };

  const loadCases = async (name: string, industry_id?: string, business_area_id?: string) => {
    try {
      await request<{ cases?: any }>(
        `/api/impact360/cases?
          organization_creator_id=${impOrganization?.creator_id}
          ${industry_id ? `&industry_id=${industry_id}` : ""}
          ${business_area_id ? `&business_area_id=${business_area_id}` : ""}
          ${name ? `&name=${name}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res) {
          setCases(res?.cases);
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const loadTasks = async (name: string, case_id?: any) => {
    try {
      let url = `/api/impact360/tasks?organization_creator_id=${
        impOrganization.creator_id
      }${name ? `&name=${name}` : ""}${case_id ? `&case_id=${case_id}` : ""}`;
      await request<{ tasks?: any }>(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res: any) => {
        if (res) {
          setTasks(res?.tasks);
        }
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const loadBusinessAreas = async (
    industry?: string,
    category?: string
  ): Promise<void> => {
    const details = {
      industry_id: industry,
      industry_category_id: category,
    };

    let path = "/api/impact360/business_areas?";
    Object.entries(details).forEach(([key, value]) => {
      if (value) {
        path += `${key}=${value}&`;
      }
    });

    return request<{ businessAreas?: any }>(path, {
      method: "GET",
    }).then((res) => {
      if (res) {
        setDisplayBusinessArea(res?.businessAreas);
      }
    });
  };

  const handleSearchVal = async (value: any, type: string) => {
    if (searchInt) {
      clearInterval(searchInt);
    }
    const searchTime = setTimeout(async () => {
      if (type === "case") {
        loadCases(value);
      } else if (type === "task") {
        if (formData?.case_id) {
          loadTasks(value, formData?.case_id);
        }
      } else if (type === "opportunity") {
        loadOpportunities(value, formData?.business_area_id);
      }
    }, 500);
    setSearchInt(searchTime);
  };

  const handleAddNew = async (
    content: string,
    type: string,
    callback?: any
  ) => {
    if (type == "case") {
      await request(`/api/impact360/cases`, {
        method: "POST",
        body: {
          name: content,
          industry_id: formData?.industry_id ?? undefined,
          country_id: impOrganization.country_id,
          region_id: null,
          description: null,
          original_id: null,
          organization_id: impOrganization.id,
        },
      })
        .then((res: any) => {
          if (res.case) {
            if (formData?.industry_id) {
              const details = {
                case_id: res.case.id,
                industry_id: impOrganization.industry_id,
              };
              request(`/api/impact360/case_to_industry`, {
                method: "POST",
                body: { cases_to_industry: [details] },
              })
                .then((result: any) => {
                  if (result.cases_to_industry_data) {
                    loadCases("");
                    handleSelect(res.case, type);
                    setCaseToggle(false);
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
              loadCases("");
              handleSelect(res.case, type);
              setCaseToggle(false);
              if (callback) {
                callback({ success: true });
              }
            }
          }
        })
        .catch((err) => {
          if (callback) {
            callback({ success: false, error: err.error });
          }
        });
    } else if (type == "task") {
      if (!formData.case_id && callback) {
        callback({ success: false, error: "Please select Use Case" });
      } else {
        await request(`/api/impact360/tasks`, {
          method: "POST",
          body: {
            case_id: formData.case_id,
            name: content,
            organization_id: impOrganization.id,
            original_id: null,
            description: "",
          },
        })
          .then((res: any) => {
            if (res) {
              loadTasks("", formData.case_id);
              handleSelect(res.task, type);
              setTaskToggle(false);
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
      }
    } else if (type == "opportunity") {
      if (!formData.business_area_id && callback) {
        callback({ success: false, error: "Please select Business Function" });
      } else {
        await request(`/api/impact360/opportunities`, {
          method: "POST",
          body: {
            name: content,
            // industry_id: impOrganization.industry_id,
            organization_creator_id: impOrganization.creator_id,
            business_area_id: formData.business_area_id,
          },
        })
          .then((res: any) => {
            if (res) {
              loadOpportunities("",formData.business_area_id);
              handleSelect(res.opportunity, type);
              setOpportunityToggle(false);
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
      }
    }
  };

  const handleSelect = async (value: any, type: string) => {
    if (type === "opportunity" && formData?.opportunity_id != value.id) {
      handleParamChange(
        {
          opportunity_id: value.id,
          opportunity_name: value.name,
          opportunity_ocid: value.organization_creator_id,
        },
        "opportunity_id"
      );
    } else if (type === "case" && formData?.case_id != value.id) {
      handleParamChange(
        {
          case_id: value.id,
          case_name: value.name,
          case_ocid: value.organization_creator_id,
          task_id: "",
          task_name: "",
          task_ocid: "",
        },
        "case_id"
      );
    } else if (type === "task" && formData?.task_id != value.id) {
      handleParamChange(
        {
          task_id: value.id,
          task_name: value.name,
          task_ocid: value.organization_creator_id,
        },
        "task_id"
      );
    }
    handleReset(type);
  };

  const handleBusinessFunctionSelect = (id: string): void => {
    const businessArea = displayBusinessArea.find((_: any) => _.id === id);
    handleParamChange(
      {
        business_area_id: id,
        business_area_name: businessArea.name,
        opportunity_id: "",
        opportunity_name: "",
        opportunity_ocid: "",
      },
      "business_area_id"
    );
  };

  const handleIndustrySelect = (id: string): void => {
    const industry = industries.find((_: any) => _.id === id);

    handleParamChange(
      {
        industry_id: industry?.id || null,
        industry_name: industry?.name || 'All industries',
        industry_category_id: "",
        category_name: "",
        business_area_id: "",
        business_area_name: "",
        opportunity_id: "",
        opportunity_name: "",
        opportunity_ocid: "",
      },
      "industry_id"
    );
  };

  const handleCategorySelect = (id: string): void => {
    const category = categories.find((_: any) => _.id === id);
    if (!category) {
      return;
    }
    handleParamChange(
      {
        industry_category_id: id,
        category_name: category.name,
        business_area_id: "",
        business_area_name: "",
        opportunity_id: "",
        opportunity_name: "",
        opportunity_ocid: "",
      },
      "industry_category_id"
    );
  };

  const handleReset = (type: string) => {
    if (type == "case") {
      setTaskToggle(false);
      setCaseToggle(false);
    } else if (type == "task") {
      setTaskToggle(false);
    } else if (type == "opportunity") {
      setOpportunityToggle(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-4 md:gap-y-[25px]">
      {(impOrganization.is_superadmin || impOrganization.is_supervisor) && (
        <>
          <div className="relative max-w-full w-full md:w-[calc(35%_-_13px)] flex-grow flex-shrink-0">
            <Label
              htmlFor="industry"
              className="text-labelGray text-xs font-normal leading-6 block"
            >
              Industry
            </Label>
            <SearchableDropdown
              label="Industry"
              options={industryOptions}
              defaultValue={formData?.industry_id}
              onChange={handleIndustrySelect}
            />
          </div>
          <div className="relative max-w-full w-full md:w-[calc(65%_-_13px)] flex-grow flex-shrink-0">
            <Label
              htmlFor="business_function"
              className="text-labelGray text-xs font-normal leading-6 block"
            >
              Category
            </Label>
            <SearchableDropdown
              label="Category"
              options={categories.map((category: any) => ({
                value: category.id,
                label: category.name
              }))}
              defaultValue={formData?.industry_category_id}
              onChange={handleCategorySelect}
            />
          </div>
        </>
      )}

      <div className="relative max-w-full w-full md:w-[calc(35%_-_13px)] flex-grow flex-shrink-0">
        <Label
          htmlFor="business_function"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Business Function
          <span className="text-required text-xs font-normal leading-6">*</span>
        </Label>
        <SearchableDropdown
          label="Business Function"
          options={displayBusinessArea.map((businessArea: any) => ({
            value: businessArea.id,
            label: businessArea.name
          }))}
          defaultValue={formData?.business_area_id}
          onChange={handleBusinessFunctionSelect}
        />
        <p className="text-required text-xs leading-6 font-normal absolute left-0 -bottom-5">
          {validation.business_area_id}
        </p>
      </div>

      <div className="relative max-w-full w-full md:w-[calc(65%_-_13px)] flex-grow flex-shrink-0">
        <Label
          htmlFor="ppportunity"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Opportunity
        </Label>
        <SelectWapBtn onClick={() => setOpportunityToggle(!opportunityToggle)}>
          {formData?.opportunity_name ? (
            formData?.opportunity_name
          ) : (
            <span className="text-labelGray text-sm font-normal leading-6">
              Select Opportunity
            </span>
          )}
          <ChevronDown />
        </SelectWapBtn>
        <p className="text-required text-xs leading-6 font-normal absolute -bottom-5 left-0">
          {validation.opportunity_id}
        </p>
        {opportunityToggle && (
          <ModalSelect
            modalContent={opportunities}
            handleSearchVal={handleSearchVal}
            handleSelect={handleSelect}
            handleAddNew={handleAddNew}
            type="opportunity"
            onClickOutside={() => setOpportunityToggle(!opportunityToggle)}
          />
        )}
      </div>

      <div className="relative max-w-full w-full md:w-[calc(35%_-_13px)] flex-grow flex-shrink-0">
        <Label
          htmlFor="ai_use_case"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          AI Use Case
          <span className="text-required text-xs font-normal leading-6">*</span>
        </Label>

        <SelectWapBtn onClick={() => setCaseToggle(!caseToggle)}>
          {formData?.case_name ? (
            formData?.case_name
          ) : (
            <span className="text-labelGray text-sm font-normal leading-6">
              Select AI Use Case
            </span>
          )}
          <ChevronDown />
        </SelectWapBtn>
        <p className="text-required text-xs leading-6 font-normal absolute -bottom-5 left-0">
          {validation.case_id}
        </p>
        {caseToggle && (
          <ModalSelect
            modalContent={cases}
            handleSearchVal={handleSearchVal}
            handleSelect={handleSelect}
            handleAddNew={handleAddNew}
            type="case"
            onClickOutside={() => setCaseToggle(!caseToggle)}
          />
        )}
      </div>

      <div className="relative max-w-full w-full md:w-[calc(65%_-_13px)] flex-grow flex-shrink-0">
        <Label
          htmlFor="business_task"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Business Task
          <span className="text-required text-xs font-normal leading-6">*</span>
        </Label>

        <SelectWapBtn onClick={() => setTaskToggle(!taskToggle)}>
          {formData?.task_name ? (
            formData?.task_name
          ) : (
            <span className="text-labelGray text-sm font-normal leading-6">
              Select Business Task
            </span>
          )}
          <ChevronDown />
        </SelectWapBtn>
        <p className="text-required text-xs leading-6 font-normal absolute -bottom-5 left-0">
          {validation.task_id}
        </p>
        {taskToggle && (
          <ModalSelect
            modalContent={tasks}
            handleSearchVal={handleSearchVal}
            handleSelect={handleSelect}
            handleAddNew={handleAddNew}
            type="task"
            onClickOutside={() => setTaskToggle(!taskToggle)}
          />
        )}
      </div>

      <div className="relative max-w-full w-full md:w-[calc(35%_-_13px)] flex-grow flex-shrink-0">
        <Label
          htmlFor="task_risk_level"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Task Risk Level
        </Label>
        <Select
          onValueChange={(val) =>
            handleParamChange({ task_risk: val }, "task_risk")
          }
          value={formData?.task_risk}
        >
          <SelectTrigger
            className={
              formData?.task_risk
                ? "select-value focus:ring-0"
                : " select-placeholder"
            }
          >
            <SelectValue placeholder="Select Task Risk Level" />
          </SelectTrigger>
          <SelectContent>
            {taskRisks.map((risk, index) => (
              <SelectItem value={risk} key={index}>
                {" "}
                {risk}{" "}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative max-w-full w-full md:w-[calc(65%_-_13px)] flex-grow flex-shrink-0">
        <Label
          htmlFor="task_risk_level"
          className="text-labelGray text-xs font-normal leading-6 block"
        >
          Responsible department
        </Label>
        <Select
          onValueChange={(val) =>
            handleParamChange({ department_id: val }, "department_id")
          }
          value={formData?.department_id || ""}
        >
          <SelectTrigger
            className={`shadow-none focus:ring-0 ${
              formData?.department_id ? " select-value" : " select-placeholder"
            }`}
          >
            <SelectValue placeholder="Select Responsible Department" />
          </SelectTrigger>
          <SelectContent>
            {departmentOptions.map((department: any) => (
              <SelectItem value={department.value} key={department.value}>
                {department.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
export default InitEntry;
