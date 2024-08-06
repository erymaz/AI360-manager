"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronDown, CirclePlus } from "lucide-react";
import { InferGetServerSidePropsType } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { ReportContext } from "../../../../context/reportContext";
import { AppPagination } from "@/components/app-pagination";
import Layout360 from "@/components/layouts/Layout360";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import CreateNewReport from "@/components/waipify360/CreateNewReport";
// import CreateReportsInBulk from "@/components/waipify360/reports/CreateReportsInBulk";
import EmptyReport from "@/components/waipify360/reports/EmptyReport";
import EntryFilter from "@/components/waipify360/EntryFilter";
import ReportList from "@/components/waipify360/reports/ReportList";
import ReportSummaryTable from "@/components/waipify360/reports/ReportSummaryTable";
import { request } from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { withCurrency } from "@/helpers/utils";
import { getAllFDepartment, getAllStatus } from "@/lib/api/impact360";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { CreateReportSchema } from "@/lib/types/manager360";
import { handleIndustries, handleSatatuses } from "@/redux/orgSourceSlice";
import AddMoreOpportunities from "@/components/waipify360/reports/AddMoreOpportunities";

export const getServerSideProps = withRequiredAuthentication(
  async (ctx, { organisation, organization360, locale, messages }) => {
    const details: any = {
      locale,
      companyName: organisation.companyName,
      organization360,
      messages,
    };
    if (ctx.query) {
      if (
        ctx.query.viewmode === "admin" &&
        !organization360.is_superadmin &&
        !organization360.is_supervisor
      ) {
        return {
          redirect: {
            destination: "/workspaces",
            permanent: false,
          },
        };
      } else if (
        ctx.query.viewmode !== "admin" &&
        ctx.query.viewmode !== "aimanager"
      ) {
        return {
          redirect: {
            destination: "/workspaces",
            permanent: false,
          },
        };
      }

      if (ctx.query.filial_id) {
        details["filial_id"] = ctx.query.filial_id;
      }

      if (ctx.query.report_id) {
        details["report_id"] = ctx.query.report_id;
      }
    }
    return {
      props: details,
    };
  }
);

const WapFormLeft = styled.div`
  width: 226px;
`;
const ModalContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #ebeaea;
  background: #fff;
  width: 100%;
  max-width: 804px;
  padding: 6px 13px 16px 13px;
  position: fixed;
  top: 76px;
`;
const WapModalRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 32px;
  padding-bottom: 40px;
`;
const WapInputLabel = styled.label`
  color: #6a7381;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  display: block;
  margin-bottom: 4px;
`;
const WapInput = styled.input`
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

  :placeholder {
    color: #9ca5af;
  }

  :focus {
    outline: none;
  }
`;
const ModalTitle = styled.h3`
  color: #1a262d;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 19px;
  margin-top: 0;
  width: 100%;
`;
const ModalInputGroup = styled.div`
  margin-top: -30px;
  width: 278px;
`;
const ModalCancel = styled.button`
  border-radius: 8px;
  background: #c6cad2;
  padding: 9px 16px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  border: none;
  cursor: pointer;
`;
const CreateReport = styled.button`
  border-radius: 8px;
  background: #1f75ff;
  padding: 9px 12px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  border: none;
  cursor: pointer;
  margin-left: 6px;
`;
const ModalFooter = styled.div`
  padding-top: 15px;
  border-top: 1px solid #ebeaea;
  text-align: end;
`;
const WaptopHeaderSelect = styled.select`
  border-radius: 6px;
  border: 1px solid #d7dbe0;
  background: #fff;
  width: 100%;
  max-width: 226px;
  color: #4b5563;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  padding: 4px;
  min-height: 33px;
  overflow: hidden;
  overflow: -moz-hidden-unscrollable;
  // -webkit-appearance: none;
`;

const schema = yup.object({
  report_name: yup.string().required("Report name is required"),
  filial_id: yup.string().required("Please select filial"),
});

const Report = ({
  organization360,
  filial_id,
  report_id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const t = useTranslations("waipify.ui");
  const dispatch = useDispatch();
  const { industries, statuses } = useSelector(
    (state: any) => state.oraganization
  );
  const { toast } = useToast();

  const [opportunityModalOpen, setOpportunityModalOpen] = useState(false);
  // const [bulkCreationModalOpen, setBulkCreationModalOpen] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [entryLoading, setEntryLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [eeId, setEeId] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [fillals, setFillals] = useState<any>([]);
  const [filialId, setFilialId] = useState<any>(filial_id || null);
  const [generateReports, setGenerateReport] = useState<any>([]);
  const [reportId, setReportId] = useState<any>(report_id || null);
  const [feasibilityCriteria, setFeasibilityCriteria] = useState([]);
  const [departments, setDepartments] = useState([]);
  // const [cases, setCases] = useState([]);
  const [businessAreas, setBusinessAreas] = useState([]);
  // const [opportunities, setOpportunities] = useState([]);
  const [entries, setEntries] = useState([]);
  const [searchTimeOut, setSearchTimeOut] = useState<any>("");
  const [filterData, setFilterData] = useState<any>({
    business_area_ids: [],
    opportunity_ids: [],
    case_ids: [],
    status_ids: [],
    risks: [],
    provider_ids: [],
    department_ids: [],
    impact: [null, null],
    search_val: "",
  });
  const [cntFiltered, setCntFiltered] = useState(0);
  const [totalPr, setTotalPr] = useState(0);
  const [totalIm, setTotalIm] = useState(0);
  const [pageData, setPageData] = useState({
    page: 0,
    perpage: 25,
    sortKey: "",
    sortDirection: "",
  });
  const [facets, setFacets] = useState<{
    businessAreas: any[];
    providers: any[];
    useCases: any[];
    opportunities: any[];
  }>({
    businessAreas: [],
    providers: [],
    useCases: [],
    opportunities: [],
  });
  const [showAssistant, setShowAssistant] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateReportSchema>({ resolver: yupResolver(schema) });

  useLayoutEffect(() => {
    router.push({ pathname: window.location.pathname }, undefined, {
      shallow: true,
    });
    initialLoad();
  }, []);

  useLayoutEffect(() => {
    if (reportId) {
      getReportEntry(reportId);
    }
  }, [pageData, filterData]);

  useLayoutEffect(() => {
    if (display && filialId) {
      setValue("filial_id", filialId);
    }
  }, [display, filialId, setValue]);

  useLayoutEffect(() => {
    if (filialId && !generateReports?.length) {
      getReportData(filialId);
    }
  }, [filialId]);

  useLayoutEffect(() => {
    if (reportId) {
      getReportFacets(reportId);
    }
  }, [reportId]);

  const filialName = useMemo(() => {
    if (filialId) {
      return fillals.find((_: any) => _.id === filialId)?.name || "";
    } else {
      return "";
    }
  }, [filialId, fillals]);

  const reportName = useMemo(() => {
    if (reportId) {
      return generateReports.find((_: any) => _.id === reportId)?.name || "";
    } else {
      return "";
    }
  }, [reportId, generateReports]);

  const hasFilters = useMemo(() => {
    if (
      filterData.business_area_ids.length ||
      filterData.case_ids.length ||
      filterData.opportunity_ids.length ||
      filterData.provider_ids.length ||
      filterData.risks.length ||
      filterData.search_val ||
      filterData.status_ids.length ||
      filterData.impact[0] ||
      filterData.impact[1]
    ) {
      return true;
    }
    return false;
  }, [filterData]);

  const initialLoad = async (): Promise<void> => {
    const pr_array = [
      loadStatus(),
      loadFeasibility(),
      getFilialData(organization360),
      loadBusinessAreas(organization360),
    ];

    if (industries.length == 0) {
      pr_array.push(loadIndustries(organization360));
    }
    await Promise.all(pr_array);
  };

  const loadFeasibility = async () => {
    await request<{ feasibility_criteria?: any }>(
      `/api/impact360/feasibility_criteria`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res: any) => {
      if (res) {
        setFeasibilityCriteria(res?.feasibility_criteria);
      }
    });
  };

  const loadStatus = async () => {
    if (statuses.length > 0) return;
    getAllStatus().then(async (res: any) => {
      if (res?.statuses) {
        dispatch(handleSatatuses(res?.statuses));
      }
    });
  };

  const loadIndustries = async (org: any): Promise<void> => {
    if (!org.id) {
      return;
    }

    return request<{
      industries?: any;
    }>(`/api/impact360/industries?organization_id=${org?.id}`, {
    // }>(`/api/impact360/industries`, {
      method: "GET",
    }).then((res) => {
      if (res) {
        dispatch(handleIndustries(res.industries));
      }
    });
  };

  const loadBusinessAreas = async (org: any): Promise<void> => {
    if (!org.id) {
      return;
    }

    return request<{ businessAreas?: any }>(
      `/api/impact360/business_areas?organization_id=${org?.id}`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res) {
        setBusinessAreas(res?.businessAreas);
      }
    });
  };

  const loadDepartments = async (fid: string) => {
    if (fid) {
      getAllFDepartment(fid)
        .then(async (res: any) => {
          setDepartments(res?.departments);
        })
        .catch(() => setDepartments([]));
    }
  };

  const getFilialData = async (org: any): Promise<void> => {
    if (!org?.id) {
      return;
    }
    await request<{ filials?: any }>(`/api/impact360/filial/${org.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res) {
        if (res.filials?.length === 1) {
          const filial_id = res.filials[0]["id"];
          setFilialId(filial_id);
          setValue("filial_id", filial_id);
          loadDepartments(filial_id);
        }
        setFillals(res?.filials);
      }
    });
  };

  const getReportData = async (id: string) => {
    setReportLoading(true);
    await request<{ reports?: any }>(`/api/impact360/report/${id}`, {
      method: "GET",
    })
      .then((res: any) => {
        if (res) {
          setGenerateReport(res?.reports);
        }
        setReportLoading(false);
      })
      .catch(() => {
        setReportLoading(false);
      });
  };

  const getReportFacets = async (id: string) => {
    await request<{
      businessAreas: any[],
      providers: any[];
      useCases: any[];
      opportunities: any[];
    }>(`/api/impact360/entries/getall/filterschema?report_id=${id}`, {
      method: "GET",
    })
      .then((res: any) => {
        if (res) {
          setFacets({
            businessAreas: res.businessAreas,
            providers: res.providers,
            useCases: res.useCases,
            opportunities: res.opportunities,
          });
        }
      })
      .catch(() => {
      });
  };

  const onSubmit = async (form: CreateReportSchema) => {
    const date = new Date().toJSON();
    try {
      await request(`/api/impact360/report/${form.filial_id}`, {
        method: "POST",
        body: {
          name: form.report_name,
          preview_url: "preview test",
          slug: "slug test",
          time_zone: date,
          default_currency_code: "eu",
          default_locale: "test",
        },
      }).then((res: any) => {
        if (res) {
          toast({
            description: "Report Create Success!",
            className: "custom_toast bg-success",
            open: true,
          });
          setReportId(res.report.id);
          reset();
          setDisplay(false);
        }
      });
    } catch (e: any) {
      toast({
        description: e.error,
        variant: "destructive",
        className: "custom_toast",
        open: true,
      });
    }
  };

  const handleFilal = async (id: string) => {
    setGenerateReport([]);
    setEntries([]);
    setReportId(null);
    if (id) {
      setFilialId(id);
      loadDepartments(id);
      getReportData(id);
    }
  };

  const handleSelectReport = async (id: string) => {
    setReportId(id);
    if (id) {
      getReportEntry(id).then(() => {});
    } else {
      setEntries([]);
    }
  };

  const getReportEntry = async (id: string) => {
    const param: any = {};
    for (const filfield in filterData) {
      if (filfield != "impact") {
        if (filterData[filfield]) {
          param[filfield] = filterData[filfield];
        }
      } else {
        if (filterData[filfield][0] || filterData[filfield][1]) {
          param[filfield] = filterData[filfield];
        }
      }
    }

    let url = `/api/impact360/entries/getall?report_id=${id}`;

    if (pageData.perpage) {
      url = `${url}&page=${pageData.page}&limit=${pageData.perpage}`;
    }

    if (pageData.sortKey && pageData.sortDirection) {
      url = `${url}&sortKey=${pageData.sortKey}&sortDirection=${pageData.sortDirection}`;
    }

    setEntryLoading(true);
    return request<{
      entries?: any;
      count: number;
      totalPr: number;
      totalIm: number;
    }>(url, {
      method: "POST",
      body: param,
    })
      .then((res) => {
        if (res) {
          let entries = res?.entries || [];
          setEntries(entries);
          setCntFiltered(res.count || 0);
          setTotalPr(res.totalPr);
          setTotalIm(res.totalIm);
        }
        setEntryLoading(false);
      })
      .catch(() => {
        setEntries([]);
        setCntFiltered(0);
        setTotalPr(0);
        setTotalIm(0);
        setEntryLoading(false)
      });
  };

  const handlePageDataChange = (value?: any, type?: any) => {
    const details: any = {
      [type]: value,
    };
    if (type === "perpage") {
      details["page"] = 0;
    }

    setPageData({
      ...pageData,
      ...details,
    });
  };

  const handleFilterDataChange = (value: any, type: any) => {
    if (searchTimeOut) {
      clearInterval(searchTimeOut);
    }
    const mytimeOut = setTimeout(() => {
      setPageData({
        ...pageData,
        page: 0,
      });

      if (type === "impact_min") {
        type = "impact";
        value = [value, filterData.impact[1]];
      } else if (type === "impact_max") {
        type = "impact";
        value = [filterData.impact[0], value];
      }

      setFilterData({
        ...filterData,
        [type]: value,
      });
    }, 500);
    setSearchTimeOut(mytimeOut);
  };

  const handleSortData = (value: any) => {
    setPageData({
      ...pageData,
      ...value,
    });
  };

  const handleCancelReport = () => {
    reset();
    setDisplay((prevDisplay) => !prevDisplay);
  };

  const handleEditEntry = (row: string) => {
    setOpportunityModalOpen(true);
    setEeId(row);
    setIsEdit(true);
  };

  const handleRoportclose = (value: boolean) => {
    // loadOpportunities(organization360);
    getReportEntry(reportId);
    setOpportunityModalOpen(value);
    // setBulkCreationModalOpen(value);
    setIsEdit(false);
    setEeId(null);
    setShowAssistant(false);
  };

  const successDeleteEntry = () => {
    if (reportId) {
      getReportEntry(reportId);
    }
  };

  return (
    <ReportContext.Provider value={{ successDeleteEntry, filial_id: filialId }}>
      <div className="flex flex-col py-6 px-[15px] flex-grow flex-shrink-0">
        {/* Select report */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex gap-x-2 font-semibold cursor-pointer">
                  <span className="text-base">
                    {filialId ? filialName : "Select a division"}
                  </span>
                  <ChevronDown className="w-5" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit" align="start">
                {fillals.map((filial: any, index: number) => {
                  return (
                    <DropdownMenuItem key={index} onSelect={()=>handleFilal(filial["id"])}>
                      {filial["name"]}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            {filialId && reportId && (
              // <span className="text-blue-900 font-semibold ml-2">{reportName}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-x-2 font-semibold cursor-pointer ml-2">
                    <span className="text-blue-900 font-semibold">
                      {reportName}
                    </span>
                    <ChevronDown className="w-5" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit" align="start">
                  {generateReports.map((report: any, index: number) => {
                    return (
                      <DropdownMenuItem key={index} onSelect={()=>handleSelectReport(report["id"])}>
                        {report["name"]}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          {!reportId && (
            <Button
              variant="outline"
              size="lg"
              className="flex gap-x-2 rounded-lg bg-blue-900 text-white text-sm"
              onClick={() => {
                setReportId("");
                setDisplay(true);
              }}
            >
              <CirclePlus className="w-3" />
              <span>{t("report.create_new_report")}</span>
            </Button>
          )}
          {!reportLoading && !entryLoading && reportId && cntFiltered < 1 && !hasFilters ? (
            <Button
              variant="outline"
            >
              Create Automatically a Full Report 
            </Button>
          ) : (
            <></>
          )}
        </div>

        {/* View reports */}
        {filialId && !reportId && (
          <ReportList
            filialId={filialId}
            loading={reportLoading}
            reports={generateReports}
            handleSelectReport={handleSelectReport}
          />
        )}

        {/* Empty entries */}
        {!reportLoading && !entryLoading && reportId && cntFiltered < 1 && !hasFilters ? (
          <div className="mt-5">
            <EmptyReport
              impOrganization={organization360}
              reportId={reportId}
              filialId={filialId}
              businessAreas={businessAreas}
              refresh={()=>handleRoportclose(false)}
            />
          </div>
        ) : (
          <></>
        )}

        {/* Show entries */}
        {(reportId && cntFiltered > 0) || hasFilters ? (
          <div className="mt-6 flex-shrink-0 flex-grow flex flex-col">
            <div className="flex gap-4">
              <EntryFilter
                handleFilterDataChange={handleFilterDataChange}
                cases={facets.useCases}
                businessAreas={facets.businessAreas}
                opportunities={facets.opportunities}
                providers={facets.providers}
                filterData={filterData}
              />
              <div className="flex flex-col items-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex gap-x-2 rounded-lg bg-blue-900 text-white text-sm"
                  onClick={()=>setShowAssistant(true)}
                >
                  <CirclePlus className="w-3" />
                  <span>{t("report.add_more_opportunities")}</span>
                </Button>
                <Button
                  variant="transparent"
                  size="lg"
                  onClick={() => setOpportunityModalOpen(true)}
                >
                  <span className="mr-1 text-text!">or</span>
                  <span className="text-blue-700">create manually</span>
                </Button>
              </div>
            </div>
            {/* Stats */}
            <div className="flex flex-shrink-0 gap-x-2 text-sm text-muted-foreground mt-6">
              <span>{`${cntFiltered} ${t(
                "report.summary_ai_opportunities_found"
              )}`}</span>
              <span>{`${totalPr} ${t(
                "report.summary_ai_providers_compared"
              )}`}</span>
              <span>{`${t(
                "report.summary_potential_annual_impact"
              )} ${withCurrency(totalIm)}`}</span>
            </div>
            <div className="my-2 flex-shrink-0 flex-grow overflow-hidden flex flex-col">
              <div className="w-full flex flex-col flex-grow flex-shrink-0 overflow-hidden shadow-md">
                <div className="flex flex-col flex-shrink-0 w-full overflow-auto bg-white rounded-md px-2">
                  <ReportSummaryTable
                    entries={entries.length > 0 ? entries : []}
                    statuses={statuses}
                    feasibilityCriteria={feasibilityCriteria}
                    loading={entryLoading}
                    handleStatusChange={() => getReportEntry(reportId)}
                    handleSortData={handleSortData}
                    handleEditEntry={handleEditEntry}
                  />
                  {cntFiltered > 0 && !entryLoading && (
                    <div className="pt-4 sm:pt-8">
                      <AppPagination
                        rowsPerPageOptions={["25", "50"]}
                        rowsPerPage={pageData.perpage}
                        page={pageData.page}
                        total={cntFiltered}
                        onPageChange={(value: number) =>
                          handlePageDataChange(value, "page")
                        }
                        onRowsPerPageChange={(rowsPerPage) =>
                          handlePageDataChange(Number(rowsPerPage), "perpage")
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <ModalContainer style={{ display: display ? "block" : "none" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <WapModalRow>
            <ModalTitle>{t("report.create_new_report")}</ModalTitle>
            <WapFormLeft>
              <WaptopHeaderSelect id="filial_id" {...register("filial_id")}>
                <option value="">Select Option </option>
                {fillals.map((filial: any, index: number) => {
                  return (
                    <option key={index} value={filial["id"]}>
                      {filial["name"]}
                    </option>
                  );
                })}
              </WaptopHeaderSelect>
              {errors.filial_id && (
                <div className="text-blue-600">{errors.filial_id.message}</div>
              )}
            </WapFormLeft>
            <ModalInputGroup>
              <WapInputLabel>Report Name</WapInputLabel>
              <WapInput
                {...register("report_name")}
                id="report_name"
                type="text"
                placeholder="Enter name...."
                name="report_name"
              />
              {errors.report_name ? (
                <div className="text-blue-600">
                  {errors.report_name.message}
                </div>
              ) : (
                <></>
              )}
            </ModalInputGroup>
          </WapModalRow>
          <ModalFooter>
            <ModalCancel type="button" onClick={handleCancelReport}>
              {t("general.cancel")}
            </ModalCancel>
            <CreateReport type="submit">
              {t("report.create_report")}
            </CreateReport>
          </ModalFooter>
        </form>
      </ModalContainer>

      <CreateNewReport
        open={opportunityModalOpen}
        impOrganization={organization360}
        eeId={eeId}
        isEdit={isEdit}
        reportId={reportId}
        filialId={filialId}
        // cases={cases}
        departments={departments}
        feasibilityCriteria={feasibilityCriteria}
        industries={industries}
        businessAreas={businessAreas}
        // setCases={setCases}
        setIsOpen={handleRoportclose}
      />

      <AddMoreOpportunities
        open={showAssistant}
        impOrganization={organization360}
        reportId={reportId}
        filialId={filialId}
        businessAreas={businessAreas}
        setIsOpen={()=>setShowAssistant(false)}
        refresh={handleRoportclose}
      />
    </ReportContext.Provider>
  );
};

Report.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout360>{page}</Layout360>;
};

export default Report;
