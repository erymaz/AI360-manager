"use client";

import Layout360 from "@/components/layouts/Layout360";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import CreateNewReport from "@/components/waipify360/CreateNewReport";
import DashboardEmpty from "@/components/waipify360/DashboardEmpty";
import EntryFilter from "@/components/waipify360/EntryFilter";
import VisualEntry from "@/components/waipify360/dashboard/VisualEntry";
import { request } from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { withCurrency } from "@/helpers/utils";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { handleIndustries } from "@/redux/orgSourceSlice";
import { CreditCard, Users, Euro } from "lucide-react";
import { InferGetServerSidePropsType } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = withRequiredAuthentication(
  async (ctx, { organisation, organization360, locale, messages }) => {
    return {
      props: {
        companyName: organisation.companyName,
        country: organisation.country,
        organization360,
        locale,
        messages,
      },
    };
  }
);

function Dashboard({
  companyName,
  organization360,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations("waipify.ui");
  const dispatch = useDispatch();
  const { industries } = useSelector((state: any) => state.oraganization);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [entryLoading, setEntryLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [eeId, setEeId] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [fillals, setFillals] = useState([]);
  const [filialId, setFilialId] = useState<any>(null);
  const [generateReports, setGenerateReport] = useState([]);
  const [reportId, setReportId] = useState<any>(null);
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
    department_ids: [],
    impact: [null, null],
    search_val: "",
  });
  const [cntFiltered, setCntFiltered] = useState(0);
  const [totalPr, setTotalPr] = useState(0);
  const [totalIm, setTotalIm] = useState(0);
  const [productionIm, setProductionIm] = useState(0);
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

  useLayoutEffect(() => {
    initialLoad();
  }, []);

  useLayoutEffect(() => {
    if (reportId) {
      getReportEntry(reportId);
    }
  }, [filterData]);

  useLayoutEffect(() => {
    if (reportId) {
      getReportFacets(reportId);
    }
  }, [reportId]);

  const initialLoad = async (): Promise<void> => {
    setLoading(true);
    const pr_array = [
      loadFeasibility(),
      // loadCases(organization360),
      loadBusinessAreas(organization360),
      // loadOpportunities(organization360),
      getFilialData(organization360),
    ];

    if (industries.length == 0) {
      pr_array.push(loadIndustries(organization360));
    }

    await Promise.all(pr_array);
    setLoading(false);
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
    await request<{ businessAreas?: any }>(
      `/api/impact360/business_areas?industry_id=${org?.industry_id}`,
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
      await request<{ departments?: any }>(
        `/api/impact360/department?filial_id=${fid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res: any) => {
          setDepartments(res?.departments);
        })
        .catch(() => setDepartments([]));
    }
  };

  const getFilialData = async (org: any) => {
    if (!org?.id) {
      return;
    }
    await request<{ filials?: any }>(`/api/impact360/filial/${org.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res) {
          setFillals(res?.filials);
        }
      })
      .catch((error) => {});
  };

  const getReportData = async (filial_id: string) => {
    setReportLoading(true);
    await request<{ reports?: any }>(`/api/impact360/report/${filial_id}`, {
      method: "GET",
    })
      .then((res: any) => {
        if (res) {
          setGenerateReport(res?.reports);
        }
        setReportLoading(false);
      })
      .catch((error) => {
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

  const handleFilal = async (filial_id: string) => {
    if (filial_id == "") {
      setGenerateReport([]);
      setEntries([]);
    } else {
      setFilialId(filial_id);
      loadDepartments(filial_id);
      getReportData(filial_id);
    }
    setReportId(null);
  };

  const handleSelectReport = async (report_id: string) => {
    setReportId(report_id);
    if (report_id) {
      getReportEntry(report_id).then(() => {});
    } else {
      setEntries([]);
    }
  };

  const getReportEntry = async (report_id: string) => {
    if (!report_id) {
      return;
    }
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

    let url = `/api/impact360/entries/getall?report_id=${report_id}`;

    setEntryLoading(true);
    request<{
      entries?: any;
      count: number;
      totalEn: number;
      totalPr: number;
      totalIm: number;
      productionIm: number;
    }>(url, {
      method: "POST",
      body: param,
    })
      .then((res) => {
        if (res) {
          let entries = res?.entries;
          if (entries.length) {
            for (let i = 0; i < entries.length; i++) {
              const cr_review = entries[i].solution_entry_reviews;
              if (!cr_review?.length) {
                continue;
              }
              const detialsObj: any = {};
              for (let j = 0; j < cr_review.length; j++) {
                detialsObj[cr_review[j]["feasibility_criteria_id"]] =
                  cr_review[j];
              }
              entries[i].solution_entry_reviews = detialsObj;
            }
          }
          setEntries(entries);
          setCntFiltered(res.count || 0);
          setTotalPr(res.totalPr);
          setTotalIm(res.totalIm);
          setProductionIm(res.productionIm);
        }
        setEntryLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setEntries([]);
        setCntFiltered(0);
        setTotalPr(0);
        setTotalIm(0);
        setProductionIm(0);
        setEntryLoading(false);
      });
  };

  const handleFilterDataChange = (value: any, type: any) => {
    if (searchTimeOut) {
      clearInterval(searchTimeOut);
    }
    const mytimeOut = setTimeout(() => {
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

  const handleEditEntry = (row: string) => {
    setIsOpen(true);
    setEeId(row);
    setIsEdit(true);
  };

  const handleRoportclose = (value: boolean) => {
    getReportEntry(reportId);
    setIsOpen(value);
    setIsEdit(false);
    setEeId(null);
  };

  return (
    <>
      <div className="p-6">
        <h5 className="text-sm text-muted-foreground">
          {t("sidebar.dashboard")}
        </h5>
        {loading && (
          <div className="w-12">
            <Spinner className="text-primaryColor mt-4" />
          </div>
        )}

        {!loading &&
        (fillals.length > 1 || generateReports.length > 1 || entries.length) ? (
          <>
            <div className="w-fit flex gap-4 p-4 rounded-lg bg-card border border-border mt-2">
              <div className="flex-1">
                <Label className="text-labelGray text-sm font-normal leading-6 block">
                  Company or branch
                </Label>
                <Select
                  onValueChange={(val) => handleFilal(val)}
                  value={filialId || undefined}
                >
                  <SelectTrigger
                    className={`w-48 ${filialId ? "select-value" : undefined}`}
                  >
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {fillals.map((filial: any, index: number) => (
                      <SelectItem key={index} value={filial["id"]}>
                        {filial["name"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!reportLoading ? (
                <div className="flex-1">
                  <Label className="text-labelGray text-sm font-normal leading-6 block">
                    Report
                  </Label>
                  <Select
                    onValueChange={(val) => handleSelectReport(val)}
                    value={reportId || undefined}
                  >
                    <SelectTrigger
                      className={`w-48 ${
                        reportId ? "select-value" : undefined
                      }`}
                    >
                      <SelectValue placeholder="Select Report" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateReports.map(
                        (generateReport: any, index: number) => (
                          <SelectItem key={index} value={generateReport["id"]}>
                            {generateReport["name"]}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <Spinner className="text-primaryColor mt-8" />
              )}
            </div>
            {reportId && (
              <div className="flex gap-x-4 mt-4">
                <div className="flex-1 flex flex-col gap-4">
                  <EntryFilter
                    handleFilterDataChange={handleFilterDataChange}
                    cases={facets.useCases}
                    businessAreas={facets.businessAreas}
                    opportunities={facets.opportunities}
                    providers={facets.providers}
                    filterData={filterData}
                  />
                  <VisualEntry
                    entries={entries.length > 0 ? entries : []}
                    handleEditEntry={handleEditEntry}
                  />
                </div>
                <div className="w-72 space-y-4">
                  <Card x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Number of Opportunities
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{cntFiltered}</div>
                      <p className="text-xs text-muted-foreground">
                        {/* +180.1% from last month */}
                      </p>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Achievable Revenue & Cost Savings
                      </CardTitle>
                      <Euro className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {withCurrency(productionIm)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {/* +20.1% from last month */}
                      </p>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ROI</CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">-</div>
                      <p className="text-xs text-muted-foreground">
                        {/* +19% from last month */}
                      </p>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Remaining AI Opportunities’ Impact
                      </CardTitle>
                      <Euro className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {withCurrency(totalIm)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {/* +20.1% from last month */}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        {!loading &&
        !reportLoading &&
        !entryLoading &&
        fillals.length < 2 &&
        generateReports.length < 2 &&
        !entries.length ? (
          <div className="mt-4">
            <DashboardEmpty
              view={router.query?.viewmode || ""}
              fillals={fillals}
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <CreateNewReport
        open={isOpen}
        impOrganization={organization360}
        eeId={eeId}
        isEdit={isEdit}
        reportId={reportId}
        filialId={filialId}
        // cases={cases}
        industries={industries}
        feasibilityCriteria={feasibilityCriteria}
        departments={departments}
        businessAreas={businessAreas}
        // setCases={setCases}
        setIsOpen={handleRoportclose}
      />
    </>
  );
}

Dashboard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout360>{page}</Layout360>;
};

export default Dashboard;
