import Layout360 from "@/components/layouts/Layout360";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { request } from "@/helpers/request";
import {
  getAllFDepartment,
  getEntryInitiatives,
  getEntryTaskModel,
  getEntryCaseSolutions,
  opportunityStatusChange,
} from "@/lib/api/impact360";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRouter as useNavigate } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const riskiconLevel: { [key: string]: string } = {
  Unacceptable: "/unacceptable.svg",
  Systemic: "/systemic.svg",
  High: "/high.svg",
  Medium: "/medium.svg",
  Limited: "/limited.svg",
  Minimal: "/minimal.svg",
  "Needs further evaluation": "/evaluation.svg",
};

const plannedPeriods = [
  "Q1.2024",
  "Q2.2024",
  "Q3.2024",
  "Q4.2024",
  "Q1.2025",
  "Q2.2025",
  "Q3.2025",
  "Q4.2025",
];

export const getServerSideProps = withRequiredAuthentication(
  async (ctx, { organisation, organization360, locale, messages }: any) => {
    const details: any = {
      locale,
      companyName: organisation.companyName,
      organization360,
      messages,
    };

    if (ctx.query) {
      details["query"] = ctx.query;
    }

    return {
      props: details,
    };
  }
);

function OpportunityDetails({ query }: any) {
  const router = useRouter();
  const navigate = useNavigate();
  const { filial_id, opportunity_id, viewmode } = query;
  const { statuses } = useSelector((state: any) => state.oraganization);
  const [isCaseEdit, setisCaseEdit] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [opportunity, setOpportunity] = useState<any>(null);
  const [departments, setDepartments] = useState([]);
  const [caseToSolution, setCaseToSolution] = useState<any>(null);
  const [taskToModel, setTaskToModel] = useState<any>(null);

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  useEffect(() => {
    if (opportunity_id) {
      loadOpportunity(opportunity_id);
      loadDepartments(filial_id);
      router.push({ pathname: window.location.pathname }, undefined, {
        shallow: true,
      });
    } else {
      router.back();
    }
  }, []);

  const loadOpportunity = async (opportunity_id: string) => {
    await request(`/api/impact360/entries?id=${opportunity_id}`, {
      method: "GET",
    }).then(async (res: any) => {
      if (res) {
        const iniatiativeDetials = await getEntryInitiative(opportunity_id);
        if (res[0].winner_solution_id && !!res[0].winner_solution_is_custom) {
          getEntryWinnerModel(res[0].winner_solution_id);
        } else if (res[0].winner_solution_id) {
          getEntryWinnerSolution(res[0].case_id, res[0].winner_solution_id);
        }
        setOpportunity({ ...res[0], ...iniatiativeDetials });
        setFormData(res[0]);
      }
    });
  };

  const getStatusColor = (id: string): string => {
    if (!id) {
      return "#9CA5AF";
    }
    const status = statuses.find((_: any) => _.id === id);
    return status?.hex_colour_value || "#9CA5AF";
  };

  const handleStatusChanged = async (id: string): Promise<void> => {
    const status = statuses.find((_: any) => _.id === id);
    if (!status) {
      return;
    }
    opportunityStatusChange(opportunity?.id, id).then((res: any) => {
      setOpportunity({
        ...opportunity,
        status_id: id,
      });
    });
  };

  const getEntryInitiative = async (enId: string) => {
    return getEntryInitiatives(enId)
      .then(async (res: any) => {
        const cr_initiative = res;
        if (cr_initiative && cr_initiative.length) {
          return {
            initiative_id: cr_initiative[0].initiative_id,
            period: cr_initiative[0].period,
          };
        }
        return {};
      })
      .catch(() => {});
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

  const getEntryWinnerSolution = (case_id: string, solution_id: string) => {
    getEntryCaseSolutions(opportunity_id, case_id, solution_id).then((res: any) => {
      setCaseToSolution(res[0]);
    });
  };

  const getEntryWinnerModel = (model_id: string) => {
    getEntryTaskModel(opportunity_id, model_id).then((res: any) => {
      setTaskToModel(res[0]);
    });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      opportunity?.case_name != formData?.case_name ||
      opportunity?.case_discription != formData?.case_discription
    ) {
      await request(`/api/impact360/cases/${opportunity?.case_id}`, {
        method: "PUT",
        body: {
          name: formData?.case_name,
          description: formData?.case_discription,
        },
      });
      setOpportunity({
        ...opportunity,
        case_name: formData?.case_name,
        case_discription: formData?.case_discription,
      });
    }
    setisCaseEdit(false);
  };

  const handleDepartMentChange = (id: string) => {
    request<{ entry?: any }>(`/api/impact360/entries/${opportunity_id}`, {
      method: "PUT",
      body: {
        department_id: id,
      },
    }).then(() => setOpportunity({ ...opportunity, department_id: id }));
  };

  const handlePeriodChange = (period: string) => {
    request(`/api/impact360/initiatives/${opportunity.initiative_id}`, {
      method: "PUT",
      body: {
        period: formData?.period,
      },
    }).then(() => {
      setOpportunity({ ...opportunity, period });
    });
  };

  const handleBackView = () => {
    navigate.push({
      pathname: `/360/${viewmode}/report`,
      query: {
        filial_id,
        report_id: opportunity?.report_id
      },
    });
  };

  return (
    <div className="flex flex-col py-6 px-[15px] flex-grow flex-shrink-0">
      <div className="flex justify-between flex-grow flex-shrink-0">
        <div className="flex flex-col gap-5 flex-grow flex-shrink-0">
          <div className="flex flex-shrink-0 gap-x-2 font-semibold cursor-pointer items-center">
            <span className="text-[#020617] text-sm font-normal" onClick={handleBackView}>
              {opportunity?.report_name}
            </span>
            <ChevronRight className="w-4 stroke-[#64748B]" />
            <span className="text-[#64748B] text-sm font-normal">
              Opportunity {opportunity?.reference}
            </span>
          </div>
          <div className="max-w-[1063px] gap-4 lg:gap-6 flex-shrink-0 w-full grid grid-cols-3">
            <div className="col-span-2 grid gap-6">
              <div className="grid gap-4 bg-white border border-solid border-inputBorder p-6 rounded-lg w-full">
                <div>
                  <h6 className="text-sm text-muted-foreground">Use case:</h6>
                  <div
                    className={`flex items-center gap-4 ${
                      isCaseEdit ? "edit_line" : ""
                    }`}
                  >
                    <input
                      type="text"
                      className={`w-72 flex-grow font-semibold border leading-none h-10 transition-all duration-300 ease-in align-middle py-2 border-solid rounded-md text-lg sm:text-xl lg:text-2xl focus:outline-none focus-visible:outline-none ${
                        isCaseEdit
                          ? "border-[#E2E8F0] px-3"
                          : "border-transparent px-0"
                      }`}
                      onChange={handleInputChange}
                      value={formData?.case_name}
                      readOnly={!isCaseEdit}
                      name="case_name"
                    />

                    <button
                      className={`outline-none focus:outline-none focus-visible:outline-none flex items-center justify-center rounded-lg ${
                        isCaseEdit ? "bg-[#1F75FF] w-8 h-8" : "w-6 h-6"
                      }`}
                      onClick={
                        isCaseEdit
                          ? () => handleSubmit()
                          : () => setisCaseEdit(true)
                      }
                    >
                      <Image
                        src={isCaseEdit ? "/checked.icon.svg" : "/edit-icon.svg"}
                        width={isCaseEdit ? 16 : 24}
                        height={isCaseEdit ? 16 : 24}
                        alt="Edit-Button"
                      />
                    </button>
                  </div>
                </div>
                <ul className="flex flex-col gap-1">
                  <li className="flex-shrink-0 text-sm font-normal tetx-[#1C1F1F]">
                    <span className="text-[#64748B] font-normal">
                      Supports these tasks:
                    </span>{" "}
                    {opportunity?.task_name}
                  </li>
                  <li className="flex-shrink-0 text-sm font-normal tetx-[#1C1F1F]">
                    <span className="text-[#64748B] ">Business function:</span>{" "}
                    {opportunity?.business_area_name}
                  </li>
                </ul>
                <div className="grid w-full gap-3">
                  <Label
                    htmlFor="message"
                    className="text-[#020617] font-medium text-sm"
                  >
                    Description
                  </Label>
                  <Textarea
                    className="py-2 px-3 rounded-md min-h-32 border-inputBorder focus-visible:shadow-none focus-visible:ring-0 focus-visible:outline-none"
                    placeholder={isCaseEdit ? "Enter description" : ""}
                    id="message"
                    onChange={handleInputChange}
                    name="case_discription"
                    readOnly={!isCaseEdit}
                    value={opportunity?.case_discription}
                  />
                </div>
              </div>
              <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg w-full">
                <h3 className="text-[#020617] tracking-[-0.015em] font-semibold mb-4 text-lg sm:text-xl lg:text-2xl">
                  Optimal AI Tool: {opportunity?.entry_solution_name}
                </h3>
                <div className="flex gap-4">
                  <div>
                    <Image
                      src={
                        opportunity?.entry_solution_logo
                          ? opportunity?.entry_solution_logo
                          : "/optimal-AI-tool-demo.png"
                      }
                      width={95}
                      height={95}
                      alt="Optimal AI Tool"
                      className="rounded-md"
                      loader={myLoader}
                      onError={(event: any) => {
                        event.target.srcset = "/optimal-AI-tool-demo.png";
                      }}
                    />
                  </div>
                  <div className="flex-1 text-sm text-muted-foreground">
                    {opportunity?.description || ''}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
                <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#020617] text-sm tracking-[-0.03em] font-medium">
                      Expected Business Impact
                    </span>
                    <Image
                      src={"/dollar-icon.svg"}
                      width={16}
                      height={16}
                      className="block flex-shrink-0"
                      alt="dollar-icon"
                    />
                  </div>
                  <Label
                    htmlFor=""
                    className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl mb-1 block tracking-[-0.015em]"
                  >
                    ${opportunity?.genai_impact}
                  </Label>
                  <span className="text-[#64748B] text-xs block font-normal">
                    +It’s a factor of marketing success
                  </span>
                </div>
                <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#020617] text-sm tracking-[-0.03em] font-medium">
                      Time to first business impact
                    </span>
                    <Image
                      src={"/users-icon.svg"}
                      width={16}
                      height={16}
                      className="block flex-shrink-0"
                      alt="users-icon"
                    />
                  </div>
                  <Label
                    htmlFor=""
                    className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl tracking-[-0.015em]"
                  >
                    {opportunity?.impact_starts}
                  </Label>
                  <span className="text-[#64748B] text-xs block font-normal">
                    +It’s a factor of marketing success
                  </span>
                </div>
              </div>
              <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg w-full flex items-center justify-between gap-2">
                <h3 className="text-[#020617] font-semibold text-2xl mb-1 block tracking-[-0.015em] flex-shrink-0 flex-grow">
                  Outcome Accuracy
                </h3>
                <h3 className="text-[#020617] font-semibold text-2xl mb-1 block tracking-[-0.015em] flex-shrink-0">
                  Score: {opportunity?.feasibility_number}
                </h3>
              </div>
              <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg w-full flex items-center justify-between gap-2">
                <h3 className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl tracking-[-0.015em] flex-shrink-0 flex-grow">
                  Adoption Easiness
                </h3>
                <h3 className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl tracking-[-0.015em] flex-shrink-0">
                  Score: 0
                </h3>
              </div>
              <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg w-full">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="text-[#020617] font-semibold text-left text-lg sm:text-xl lg:text-2xl mb-1 tracking-[-0.015em] py-0 hover:no-underline border-none">
                      KPIs Impact
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <p className="text-[#64748B] text-xs block font-normal">
                        This the list of KPIs and the expected impact of
                        implementing the chosen solution on your <br />
                        process.
                      </p>
                      <ul className="max-w-[256px] w-full">
                        <li className="py-3 px-2 border-b border-solid border-[#D1D5DB] flex items-center flex-row justify-between">
                          <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-32">
                            Growth Margin
                          </span>
                          <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-24">
                            0% Increase
                          </span>
                        </li>
                        <li className="py-3 px-2 border-b border-solid border-[#D1D5DB] flex items-center flex-row justify-between">
                          <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-32">
                            ARR
                          </span>
                          <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-24">
                            0% Descrease
                          </span>
                        </li>
                        <li className="py-3 px-2 border-b border-solid border-[#D1D5DB] flex items-center flex-row justify-between">
                          <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-32">
                            NPS
                          </span>
                          <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-24">
                            0% Increase
                          </span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              {caseToSolution && (
                <div className="bg-white border border-solid border-inputBorder p-6 rounded-lg w-full">
                  <Accordion type="single" collapsible className="w-full" defaultValue="item-2">
                    <AccordionItem value="item-2" className="border-none">
                      <AccordionTrigger className="text-[#020617] font-semibold text-left text-lg sm:text-xl lg:text-2xl mb-1 tracking-[-0.015em] py-0 hover:no-underline border-none">
                        Compliance
                      </AccordionTrigger>
                      <AccordionContent className="pb-0">
                        <p className="text-[#64748B] text-xs block font-normal">
                          The compliance criteria showing how the proposed tool
                          meets industry standards and <br />
                          regulations.
                        </p>
                        <ul className="max-w-[335px] w-full">
                          {caseToSolution.solution_entry_reviews &&
                            caseToSolution.solution_entry_reviews.map(
                              (tts: any) => {
                                return (
                                  <li className="py-3 px-2 border-b border-solid border-[#D1D5DB] flex items-center flex-row justify-between" key={tts.id}>
                                    <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-[calc(100%_-_50px)]">
                                      {tts.feasibility_criteria_name}
                                    </span>
                                    <span className="text-[#1C1F1F] text-sm font-normal flex-shrink-0 w-6">
                                      {tts.score}
                                    </span>
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 lg:gap-5">
              <div className="bg-white border border-solid border-inputBorder rounded-lg p-4 h-auto flex-shrink-0">
                <Label
                  htmlFor=""
                  className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl mb-4 block"
                >
                  Opportunity Status
                </Label>
                <Select
                  onValueChange={handleStatusChanged}
                  value={opportunity?.status_id || ""}
                >
                  <SelectTrigger
                    className="w-full"
                    style={{
                      color: getStatusColor(opportunity?.status_id),
                      borderColor: getStatusColor(opportunity?.status_id),
                    }}
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status: any) => (
                      <SelectItem
                        key={status.id}
                        value={status.id}
                        style={{ color: status.hex_colour_value || "#9CA5AF" }}
                      >
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-white border border-solid border-inputBorder rounded-lg p-4 h-auto flex-shrink-0">
                <Label
                  htmlFor=""
                  className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl mb-3 block"
                >
                  Implementation Period
                </Label>
                <span className="block text-[#475569] text-sm mb-1">
                  Planned Period for Implementation{" "}
                </span>
                <Select
                  value={opportunity?.period}
                  onValueChange={handlePeriodChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {plannedPeriods.map((period: any, index: number) => (
                      <SelectItem value={period} key={index}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-white border border-solid border-inputBorder rounded-lg p-4 h-auto flex-shrink-0">
                <Label
                  htmlFor=""
                  className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl mb-3 block"
                >
                  Assigned Department
                </Label>
                <Select
                  value={opportunity?.department_id || ""}
                  onValueChange={handleDepartMentChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department: any) => (
                      <SelectItem value={department.id} key={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-white border border-solid border-inputBorder rounded-lg p-4 h-auto flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#020617] tracking-[-0.03em]">
                    Compliance Risk
                  </span>
                  {opportunity?.task_risk && (
                    <Image
                      loader={myLoader}
                      src={riskiconLevel[opportunity?.task_risk]}
                      width={20}
                      height={20}
                      alt="measure-icon"
                    />
                  )}
                </div>
                <Label
                  htmlFor=""
                  className="text-[#020617] font-semibold text-lg sm:text-xl lg:text-2xl mb-1 block tracking-[-0.015em]"
                >
                  {opportunity?.task_risk ? opportunity?.task_risk : "NA"}
                </Label>
                <span className="text-[#64748B] text-xs block font-normal">
                  Requires countermeasures
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpportunityDetails;

OpportunityDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout360>{page}</Layout360>;
};
