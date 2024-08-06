"use client";

import { useToast } from "../ui/use-toast";
import BusinessImpactNew from "./BusinessImpactNew";
import Company from "./Company";
import InitEntry from "./InitEntry";
import Recommendation from "./Recommendation";
import SolutionsReviewsList from "./SolutionsReviewsList";
import { ModalCancel, DeleteRecord } from "@/components/side-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { request } from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import {
  getAllIntiatives,
  getEntryInitiatives,
  getEntryObjectives,
  getEntryTaskModel,
  getEntryCaseSolutions,
} from "@/lib/api/impact360";
import { errors } from "@/lib/config";
import Image from "next/image";
import { useState } from "react";

const headerTabs = [
  "Opportunity Description",
  "AI Tools Selection",
  "Business Impact",
  "Recommendation",
  "Company Objectives",
];

const validSchema = [
  "case_id",
  "task_id",
  "business_area_id",
  "winner_solution_id",
];

function CreateNewReport({
  open,
  impOrganization,
  reportId,
  filialId,
  eeId,
  isEdit,
  // cases,
  departments,
  businessAreas,
  industries,
  feasibilityCriteria,
  setIsOpen,
  // setCases,
}: {
  open: boolean;
  impOrganization: any;
  reportId: any;
  filialId: any;
  eeId: any;
  isEdit: boolean;
  // cases: any;
  industries: any;
  departments: any;
  businessAreas: any;
  feasibilityCriteria: any;
  setIsOpen: (value: boolean) => void;
  // setCases: (value: any) => void;
}) {
  const { toast } = useToast();

  const [entryId, setEntryId] = useState<any>(null);
  const [checkFormData, setCheckFormData] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [validation, setValidation] = useState<any>({});
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isEntryDeleteModel, setIsEntryDeleteModel] = useState(false);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [initiatives, setIntiatives] = useState([]);
  const [objectives, setObjectives] = useState([]);

  useLayoutEffect(() => {
    if (filialId && open) {
      loadIntiatives();
      loadObjectives();
    }
  }, [filialId, open]);

  useLayoutEffect(() => {
    if (eeId) {
      setEntryId(eeId.id);
      setInitDetails();
    } else {
      setFormData({
        industry_id: impOrganization.industry_id
      });
    }
  }, [eeId]);

  const handleAlert = (
    title: string,
    description: string,
    type: "success" | "error"
  ) => {
    toast({
      title: title,
      description: description,
      variant: type === "error" ? "destructive" : "default",
      className: `custom_toast${type === "success" ? " bg-success" : ""}`,
      open: true,
    });
  };

  const setInitDetails = async () => {
    setIsLoading(true);

    const objectiveDetails = await getEntryObjective(eeId.id);
    const iniatiativeDetials = await getEntryInitiative(eeId.id);
    const solutions = await handleEntryCaseToSolution(eeId.id, eeId.case_id);
    const ex_model = await handleTaskToModel(eeId.id);

    const new_details = {
      case_id: eeId.case_id,
      case_name: eeId.case_name,
      task_id: eeId.task_id,
      task_name: eeId.task_name,
      task_risk: eeId.task_risk,
      winner_solution_id: eeId.winner_solution_id,
      winner_solution_is_custom:
        eeId.winner_solution_is_custom === 1 ? true : false,
      business_impact_id: eeId.business_impact_id,
      is_not_quantifiable: eeId.is_not_quantifiable === 1 ? true : false,
      can_perform_other_tasks:
        eeId.can_perform_other_tasks === 1 ? true : false,
      has_high_replacement_cost:
        eeId.has_high_replacement_cost === 1 ? true : false,
      has_direct_impact: eeId.has_direct_impact === 1 ? true : false,
      open_new_revenue_stream:
        eeId.open_new_revenue_stream === 1 ? true : false,
      business_impact_comments: eeId.business_impact_comments,
      repeats_yearly: eeId.repeats_yearly,
      time_per_outcomes: eeId.time_per_outcomes,
      time_per_outcomes_after_ai: eeId.time_per_outcomes_after_ai,
      strategic_value: eeId.strategic_value,
      reduced_process_time_from: eeId.reduced_process_time_from,
      reduced_process_time_to: eeId.reduced_process_time_to,
      employee_hourly_rate: eeId.employee_hourly_rate,
      total_cost_yearly: eeId.total_cost_yearly,
      total_cost_yearly_after_ai: eeId.total_cost_yearly_after_ai,
      revenue_increase_with_ai: eeId.revenue_increase_with_ai,
      genai_impact: eeId.genai_impact,
      assessment: eeId.assessment,
      department_id: eeId.department_id,
      ...objectiveDetails,
      ...iniatiativeDetials,
      ...solutions,
      ...ex_model,
      business_area_id: eeId.business_area_id,
      business_area_name: eeId.business_area_name,
      opportunity_id: eeId.opportunity_id,
      opportunity_name: eeId.opportunity_name,
      opportunity_ocid: eeId.opportunity_ocid,
      industry_id: eeId.industry_id || impOrganization?.industry_id,
      industry_name: eeId.industry_name,
      industry_category_id: eeId.industry_category_id,
      category_name: eeId.category_name,
    };
    setFormData(new_details);
    setCheckFormData(new_details);
    setIsEnabled(handleValid(new_details));
    setIsLoading(false);
  };

  const getEntryObjective = async (enId: string) => {
    return getEntryObjectives(enId)
      .then(async (res: any) => {
        const cr_ojectives = res;
        if (cr_ojectives && cr_ojectives.length) {
          const new_Objective: any = [];
          for (let i = 0; i < cr_ojectives.length; i++) {
            const deitals = {
              value: cr_ojectives[i].objective_id,
              label: cr_ojectives[i].name,
            };
            new_Objective.push(deitals);
          }
          return { objective_id: new_Objective };
        }
        return {};
      })
      .catch(() => {});
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

  const handleEntryCaseToSolution = async (enId: string, caseId: string) => {
    return getEntryCaseSolutions(enId, caseId)
      .then((res: any) => {
        if (res && res.length) {
          const details: any = { entrytools: res };
          if (
            eeId &&
            !eeId.winner_solution_is_custom &&
            eeId?.winner_solution_id
          ) {
            const winner_solution_data = res.filter((data: any) => {
              return data.solution_id === eeId.winner_solution_id;
            });
            if (winner_solution_data && winner_solution_data.length) {
              details.winner_solution_data = winner_solution_data[0];
            }
          }
          return details;
        }
        return {};
      })
      .catch(() => {});
  };

  const handleTaskToModel = async (enId: string) => {
    return getEntryTaskModel(enId)
      .then((res: any) => {
        if (res && res.length) {
          const details: any = { entrytomodels: res };
          if (
            eeId &&
            eeId.winner_solution_is_custom &&
            eeId?.winner_solution_id
          ) {
            const winner_solution_data = res.filter((data: any) => {
              return data.model_id === eeId.winner_solution_id;
            });
            if (winner_solution_data && winner_solution_data.length) {
              details.winner_solution_data = winner_solution_data[0];
            }
          }
          return details;
        }
        return {};
      })
      .catch(() => {});
  };

  const loadObjectives = async () => {
    if (filialId) {
      await request<{ objectives?: any }>(
        `/api/impact360/objectives?filialId=${filialId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res: any) => {
        const cr_ojectives = res?.objectives;
        if (cr_ojectives && cr_ojectives.length) {
          const new_Objective: any = [];
          for (let i = 0; i < cr_ojectives.length; i++) {
            const deitals = {
              value: cr_ojectives[i].id,
              label: cr_ojectives[i].name,
            };
            new_Objective.push(deitals);
          }
          setObjectives(new_Objective);
        }
      });
    }
  };

  const loadIntiatives = async () => {
    getAllIntiatives(filialId).then(async (res: any) => {
      if (res) {
        const cr_initiative = res?.initiatives;
        if (cr_initiative && cr_initiative.length) {
          const new_initiative: any = [];
          for (let i = 0; i < cr_initiative.length; i++) {
            const deitals = {
              value: cr_initiative[i].id,
              label: cr_initiative[i].name,
              period: cr_initiative[i].period,
            };
            new_initiative.push(deitals);
          }
          setIntiatives(new_initiative);
        }
      }
    });
  };

  const closeDeleteModel = () => {
    setIsEntryDeleteModel(false);
  };

  const handleTabChange = async (index: number, event?: any) => {
    if (event) {
      event.preventDefault();
    }
    let newIndex = index;
    if (index === tabIndex) return;
    if (index > tabIndex) {
      newIndex = verifyTabChange(index);
    } else {
      setTabIndex(newIndex);
      return;
    }

    let { error, errObj } = validateTabChange(formData);

    if (error) {
      setValidation({
        ...validation,
        ...errObj,
      });
      return;
    }

    if (!error) {
      handleStepChange(newIndex);
      setValidation({});
      setTabIndex(newIndex);
    }
  };

  const handleStepChange = (crindex: number) => {
    if (crindex === 2) {
      // if (formData?.winner_solution_id && !formData?.winner_solution_data) {
      //   const valuearr = formData?.winner_solution_id.split(",");
      //   const newSelectSolution = aITools
      //     ?.filter((val: any) => valuearr.includes(val.id))
      //     .map((tool: any) => ({ id: tool.id, value: tool.provider_name }));
      //   setFormData({
      //     ...formData,
      //     winner_solution_data: newSelectSolution,
      //   });
      // }
    }
  };

  const handleValid = (data: any) => {
    for (let key of validSchema) {
      if (!data[key]) {
        return false;
      }
    }
    return true;
  };

  const validateTabChange = (formData: any) => {
    let error = false;
    let errObj: any = {};
    if (tabIndex === 0) {
      if (!formData.case_id || !formData.case_name) {
        error = true;
        errObj["case_id"] = errors.reruired;
      }

      if (!formData.task_id || !formData.task_name) {
        error = true;
        errObj["task_id"] = errors.reruired;
      }

      if (!formData.business_area_id) {
        error = true;
        errObj["business_area_id"] = errors.reruired;
      }
    } else if (tabIndex === 1) {
      if (!formData.winner_solution_id) {
        error = true;
        errObj["winner_solution_id"] = "Solution is required";
      }
    }
    return { error, errObj };
  };

  const verifyTabChange = (index: number): number => {
    let tab = index;
    if (index === 1) {
      if (
        !formData.case_id ||
        !formData.task_id ||
        !formData.business_area_id
      ) {
        return 0;
      }
    } else if (index === 2) {
      if (!formData.winner_solution_id) {
        return verifyTabChange(1);
      }
    }
    return tab;
  };

  const handleOrgCase = async () => {
    if (impOrganization.creator_id !== formData?.case_ocid) {
      return request(`/api/impact360/cases`, {
        method: "POST",
        body: {
          name: formData?.case_name,
          industry_id: impOrganization.industry_id,
          country_id: impOrganization.country_id,
          region_id: null,
          description: null,
          original_id: formData?.case_id,
          organization_id: impOrganization.id,
        },
      })
        .then((res: any) => {
          if (res) {
            return { success: true, id: res.case.id };
          }
        })
        .catch((err) => ({ success: false, error: err.error }));
    } else {
      return { success: true, id: formData?.case_id };
    }
  };

  const handleOrgTask = async () => {
    if (impOrganization.creator_id !== formData?.task_ocid) {
      return await request(`/api/impact360/tasks`, {
        method: "POST",
        body: {
          case_id: formData.case_id,
          name: formData?.task_name,
          organization_id: impOrganization.id,
          original_id: formData?.task_id,
          description: "",
          risk: formData.task_risk,
        },
      })
        .then((res: any) => {
          if (res) {
            return { success: true, id: res.task.id };
          }
        })
        .catch((err) => ({ success: false, error: err.error }));
    } else if (
      formData?.task_id &&
      checkFormData?.task_risk !== formData?.task_risk
    ) {
      return await request(`/api/impact360/tasks/${formData?.task_id}`, {
        method: "PUT",
        body: {
          risk: formData?.task_risk,
        },
      })
        .then((res: any) => {
          if (res) {
            return { success: true, id: formData?.task_id };
          }
        })
        .catch((err) => ({ success: false, error: err.error }));
    } else {
      return { success: true, id: formData?.task_id };
    }
  };

  const updateCaseDetails = async (name: string) => {
    if (checkFormData.case_name !== name) {
      return await request(`/api/impact360/cases/${formData?.case_id}`, {
        method: "PUT",
        body: {
          name: name,
        },
      });
    }
    return true;
  };

  const updateTaskDetails = async (name: string, risk: string) => {
    if (checkFormData.task_name !== name || checkFormData.task_risk !== risk) {
      return await request(`/api/impact360/tasks/${formData?.task_id}`, {
        method: "PUT",
        body: {
          name,
          risk,
        },
      });
    }
    return true;
  };

  const handleParamChange = (value: any, type?: string, set?: Boolean) => {
    const new_Data = {
      ...formData,
      ...value,
    };

    if (type) {
      setValidation({
        ...validation,
        [type]: "",
      });
    }

    if (set) {
      setCheckFormData(new_Data);
    }
    setFormData(new_Data);

    if (handleValid(new_Data)) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  const handleInitiative = async (entry_id: string) => {
    const valArray = [];

    if (!checkFormData?.initiative_id) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/initiatives/`, {
          method: "POST",
          body: {
            initiative_id: [formData?.initiative_id],
          },
        })
      );
    } else if (
      checkFormData?.initiative_id &&
      checkFormData?.initiative_id != formData?.initiative_id
    ) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/initiatives/`, {
          method: "PUT",
          body: {
            initiative_id: formData?.initiative_id,
          },
        })
      );
    }

    if (formData?.period && formData?.initiative_id) {
      valArray.push(
        request(`/api/impact360/initiatives/${formData.initiative_id}`, {
          method: "PUT",
          body: {
            period: formData?.period,
          },
        })
      );
    }

    return valArray;
  };

  const handleObjective = (entry_id: string) => {
    let previoue_ids = checkFormData.objective_id
      ? checkFormData.objective_id.map((initId: any) => initId.value)
      : [];
    let new_ids = formData.objective_id
      ? formData.objective_id.map((initId: any) => initId.value)
      : [];

    let new_init = previoue_ids.length
      ? new_ids.filter((element: any) => !previoue_ids.includes(element))
      : new_ids;

    let delete_init = previoue_ids.length
      ? previoue_ids.filter((element: any) => !new_ids.includes(element))
      : [];

    const valArray = [];

    if (new_init.length > 0) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/objectives`, {
          method: "POST",
          body: {
            objective_id: new_init,
          },
        })
      );
    }

    if (delete_init.length > 0) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/objectives/remove`, {
          method: "POST",
          body: {
            objective_id: delete_init,
          },
        })
      );
    }

    return valArray;
  };

  const handleModels = (entry_id: string) => {
    const valArray = [];
    let new_entrytools = formData?.entrytomodels ?? [];

    let previoue_ids = checkFormData?.entrytomodels
      ? checkFormData.entrytomodels.map((mdata: any) => mdata.id)
      : [];

    let new_ids = new_entrytools.map((mdata: any) => mdata.id);

    if (new_entrytools.length > 0) {
      let new_init = previoue_ids.length
        ? new_entrytools.filter(
            (element: any) => !previoue_ids.includes(element.id)
          )
        : new_entrytools;

      if (new_init.length > 0) {
        new_init = new_init.map((val: any) => ({
          id: val.id,
          task_id: val.task_id,
          model_id: val.model_id,
          entry_id: entry_id,
          model_capabilities: val.model_capabilities,
          development_description: val.development_description,
          suggested: val.suggested,
        }));

        valArray.push(
          request(`/api/impact360/entries/${entry_id}/model`, {
            method: "POST",
            body: {
              models: new_init,
            },
          })
        );
      }
    }

    let delete_init = previoue_ids.length
      ? previoue_ids.filter((element: any) => !new_ids.includes(element))
      : [];

    if (delete_init.length > 0) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/model/remove`, {
          method: "POST",
          body: {
            task_to_model_id: delete_init,
          },
        })
      );
    }

    return Promise.all(valArray);
  };

  const handleAITools = (entry_id: string) => {
    const valArray = [];
    let new_entrytools = formData.entrytools ?? [];

    let previoue_ids = checkFormData?.entrytools
      ? checkFormData.entrytools.map((mdata: any) => mdata.id)
      : [];

    let new_ids = new_entrytools.map((mdata: any) => mdata.id);

    let new_review_list: any = [];
    let update_review_list: any = [];
    for (let i = 0; i < new_entrytools.length; i++) {
      if (new_entrytools[i].is_new) {
        new_review_list = new_review_list.concat(
          new_entrytools[i].solution_entry_reviews
        );
      } else {
        update_review_list = update_review_list.concat(
          new_entrytools[i].solution_entry_reviews
        );

        if (new_entrytools[i]?.is_case_to_solution_changed) {
          valArray.push(
            request(
              `/api/impact360/entries/${entry_id}/solutions/${new_entrytools[i].id}`,
              {
                method: "PUT",
                body: {
                  case_id: new_entrytools[i].case_id,
                  solution_id: new_entrytools[i].solution_id,
                  needs_allocation: new_entrytools[i].needs_allocation,
                  impact_starts: new_entrytools[i].impact_starts,
                  suggested: new_entrytools[i].suggested,
                  feasibility_number: new_entrytools[i].feasibility_number,
                },
              }
            )
          );
        }
      }

      if (new_entrytools[i].is_solution_changed) {
        const details = {
          name: new_entrytools[i].solution_name,
          description: new_entrytools[i].description,
          documentation_url: new_entrytools[i].documentation_url,
          features: new_entrytools[i].features,
          benefits: new_entrytools[i].benefits,
          has_api: new_entrytools[i].has_api,
          has_user_friendly_ui: new_entrytools[i].has_user_friendly_ui,
          has_grpc: new_entrytools[i].has_grpc,
          has_extension: new_entrytools[i].has_extension,
          is_platform: new_entrytools[i].is_platform,
          has_incumbent_integration:
            new_entrytools[i].has_incumbent_integration,
          model_id: new_entrytools[i].model_id,
          version: new_entrytools[i].version,
        };
        valArray.push(
          request(`/api/impact360/solutions/${new_entrytools[i].solution_id}`, {
            method: "PUT",
            body: details,
          })
        );
      }
    }

    new_review_list = new_review_list.map((review: any) => {
      return {
        ...review,
        // entry_id: entry_id,
        feasibility_criteria_name: undefined,
      };
    });

    update_review_list = update_review_list.map((review: any) => {
      return {
        ...review,
        // entry_id: entry_id,
        feasibility_criteria_name: undefined,
      };
    });

    if (new_entrytools.length > 0) {
      let new_init = previoue_ids.length
        ? new_entrytools.filter(
            (element: any) => !previoue_ids.includes(element.id)
          )
        : new_entrytools;

      if (new_init.length > 0) {
        new_init = new_init.map((val: any) => ({
          id: val.id,
          case_id: val.case_id,
          solution_id: val.solution_id,
          // entry_id: entry_id,
          feasibility_number: val.feasibility_number,
          impact_starts: val.impact_starts,
          needs_allocation: val.needs_allocation,
          suggested: val.suggested,
        }));

        valArray.push(
          request(`/api/impact360/entries/${entry_id}/solutions`, {
            method: "POST",
            body: {
              solutions: new_init,
            },
          })
        );

        valArray.push(
          request(
            `/api/impact360/entries/${entry_id}/case_to_solution_reviews`,
            {
              method: "POST",
              body: {
                fecibility_criteria_ids: new_review_list,
              },
            }
          )
        );
      }
    }

    if (update_review_list.length) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/case_to_solution_reviews`, {
          method: "PUT",
          body: {
            fecibility_criteria_ids: update_review_list,
          },
        })
      );
    }

    let delete_init = previoue_ids.length
      ? previoue_ids.filter((element: any) => !new_ids.includes(element))
      : [];

    if (delete_init.length > 0) {
      valArray.push(
        request(`/api/impact360/entries/${entry_id}/solutions/remove`, {
          method: "POST",
          body: {
            case_to_solution_id: delete_init,
          },
        })
      );
    }

    return Promise.all(valArray);
  };

  const handleCloseModel = () => {
    setEntryId(null);
    setTabIndex(0);
    setValidation({});
    setFormData({});
    setCheckFormData({});
    setIsOpen(false);
  };

  const getBusinessImpace = async (entry_id?: string) => {
    let currentCost =
      Number(formData.time_per_outcomes || 0) *
      Number(formData.employee_hourly_rate || 1);

    if (formData.repeats_yearly) {
      currentCost = currentCost * Number(formData.repeats_yearly);
    }

    if (formData.total_cost_yearly) {
      currentCost = currentCost + Number(formData.total_cost_yearly);
    }

    let costAfterAI =
      Number(formData.time_per_outcomes_after_ai || 0) *
      Number(formData.employee_hourly_rate || 1);

    if (formData.repeats_yearly) {
      costAfterAI = costAfterAI * Number(formData.repeats_yearly);
    }

    if (formData.total_cost_yearly) {
      costAfterAI = costAfterAI + Number(formData.total_cost_yearly);
    }

    const estimated_value =
      currentCost -
      costAfterAI +
      Number(formData.revenue_increase_with_ai || 0);

    const businessImpactValue = {
      entry_id: !formData?.business_impact_id ? entry_id : undefined,
      repeats_yearly: formData.repeats_yearly,
      time_per_outcomes: formData.time_per_outcomes,
      time_per_outcomes_after_ai: formData.time_per_outcomes_after_ai,
      reduced_process_time_from: formData.reduced_process_time_from,
      reduced_process_time_to: formData.reduced_process_time_to,
      employee_hourly_rate: formData.employee_hourly_rate,
      total_cost_yearly: formData.total_cost_yearly,
      total_cost_yearly_after_ai: formData.total_cost_yearly_after_ai,
      can_perform_other_tasks: formData.can_perform_other_tasks,
      has_high_replacement_cost: formData.has_high_replacement_cost,
      has_direct_impact: formData.has_direct_impact,
      open_new_revenue_stream: formData.open_new_revenue_stream,
      revenue_increase_with_ai: formData.revenue_increase_with_ai,
      comments: formData.business_impact_comments,
      is_not_quantifiable: formData.is_not_quantifiable,
      strategic_value: formData.strategic_value?.toString(),
      estimated_value: estimated_value.toFixed(2),
    };

    if (formData?.business_impact_id) {
      return request(
        `/api/impact360/business_impact/${formData?.business_impact_id}`,
        {
          method: "PUT",
          body: businessImpactValue,
        }
      );
    } else {
      return request(`/api/impact360/business_impact`, {
        method: "POST",
        body: businessImpactValue,
      });
    }
  };

  const createEntry = async (entries: any) => {
    return request<{ entry?: any }>(`/api/impact360/entries`, {
      method: "POST",
      body: entries,
    })
      .then((res: any) => {
        if (res) {
          handleAlert("Entry", "Entry Create Successfully", "success");
          return res.entry.id;
        }
        return false;
      })
      .catch((err) => {
        handleAlert("Create Entry", err.error, "error");
        return false;
      });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const [my_case, my_task]: any = await Promise.all([
      handleOrgCase(),
      handleOrgTask(),
    ]);

    const entrydetails = {
      case_id: my_case.id,
      task_id: my_task.id,
      business_area_id: formData.business_area_id,
      opportunity_id: formData.opportunity_id || null,
      department_id: formData.department_id,
      winner_solution_id: formData.winner_solution_id,
      winner_solution_is_custom: formData?.winner_solution_is_custom ?? false,
      assessment: formData.assessment,
      creator_organization_id: impOrganization
        ? impOrganization.creator_id
        : null,
      report_id: reportId ? reportId : null,
      planned: formData?.planned,
      industry_id: formData?.industry_id || null,
      industry_category_id: formData?.industry_category_id || null,
    };

    try {
      const new_entry: any = await createEntry(entrydetails);

      if (new_entry) {
        const valArray = [];
        valArray.push(getBusinessImpace(new_entry));
        valArray.concat(handleInitiative(new_entry));
        valArray.concat(handleObjective(new_entry));
        valArray.concat(handleAITools(new_entry));
        valArray.concat(handleModels(new_entry));
        await Promise.all(valArray);
      }
    } catch (e) {
      console.log(e);
    }
    handleCloseModel();
    setIsLoading(false);
  };

  const updateEntry = async (entries: any, entryId: any) => {
    return request<{ entry?: any }>(`/api/impact360/entries/${entryId}`, {
      method: "PUT",
      body: entries,
    })
      .then((res: any) => {
        if (res) {
          handleAlert("Entry", "Entry Update Successfully", "success");
          return true;
        }
      })
      .catch((err) => {
        handleAlert("Update Entry", err.error, "error");
        return false;
      });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    // await Promise.all([
    //   updateCaseDetails(formData?.case_name),
    //   updateTaskDetails(formData?.task_name, formData?.task_risk),
    // ]);

    const entrydetails = {
      case_id: formData.case_id,
      task_id: formData.task_id,
      business_area_id: formData.business_area_id,
      opportunity_id: formData.opportunity_id || null,
      department_id: formData.department_id,
      winner_solution_id: formData.winner_solution_id,
      winner_solution_is_custom: formData?.winner_solution_is_custom ?? false,
      assessment: formData.assessment,
      creator_organization_id: impOrganization
        ? impOrganization.creator_id
        : null,
      report_id: reportId ? reportId : null,
      planned: formData?.planned,
      industry_id: formData?.industry_id || null,
      industry_category_id: formData?.industry_category_id || null,
    };

    try {
      await updateEntry(entrydetails, entryId);
      const valArray = [];
      valArray.push(getBusinessImpace(entryId));
      valArray.concat(handleInitiative(entryId));
      valArray.concat(handleObjective(entryId));
      valArray.concat(handleAITools(entryId));
      valArray.concat(handleModels(entryId));
      await Promise.all(valArray);
    } catch (e) {
      console.log(e);
    }
    handleCloseModel();
    setIsLoading(false);
  };

  const handleDeleteEntry = async () => {
    setIsDeleteLoading(true);
    await request(`/api/impact360/entries/${entryId}`, {
      method: "DELETE",
    }).then(() => {
      setIsDeleteLoading(false);
      handleAlert("Entry", "Entry deleted successfully", "success");
      handleCloseModel();
      closeDeleteModel();
    });
  };

  return (
    <>
      <Drawer direction="right" open={open} onClose={handleCloseModel}>
        <DrawerOverlay className="bg-transparent"></DrawerOverlay>
        <DrawerContent
          className="max-h-screen h-full max-w-[880px] ml-auto p-5 px-[19px] rounded-none border-l border-solid border-inputBorder"
          draggable={false}
          data-vaul-no-drag={false}
        >
          <div className="flex items-center justify-between mb-[20px] gap-[25px]">
            <ModalCancel
              className="absolute top-0 -left-3 !border !border-solid !border-[#E2E8F0] !bg-[#F1F5F9] !p-1.5 z-30"
              type="button"
              onClick={handleCloseModel}
            >
              <Image
                src={"/close.svg"}
                width={12}
                height={12}
                className="filter brightness-75"
                alt="close-the-popup"
              />
            </ModalCancel>
            <h3 className="text-[#0F172A] text-base leading-6 font-semibold">
              {isEdit ? (
                <>
                  Update AI Opportunity - <span>{formData.task_name}</span>
                </>
              ) : (
                "Create AI Opportunity"
              )}
            </h3>
            {isEdit && (
              <DeleteRecord
                type="button"
                className="text-[#EF4444] border border-solid border-[#EF4444] rounded-md max-w-fit ml-auto hover:text-white hover:bg-[#EF4444] transition-all duration-300 ease-in"
                onClick={() => setIsEntryDeleteModel(true)}
              >
                Delete this record
              </DeleteRecord>
            )}
            <AlertDialog open={isEntryDeleteModel}>
              <AlertDialogContent className="pt-10 pb-9 gap-8">
                <AlertDialogHeader>
                  <AlertDialogDescription className="text-center">
                    Are you sure you want to delete this record? You will lose
                    all the information associated with this entry.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center">
                  <AlertDialogAction
                    className="min-w-28"
                    onClick={handleDeleteEntry}
                  >
                    Yes
                  </AlertDialogAction>
                  <AlertDialogCancel
                    className="min-w-28"
                    onClick={closeDeleteModel}
                  >
                    No
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              onClick={isEdit ? handleUpdate : handleCreate}
              disabled={!isEnabled}
              className="bg-none block max-w-fit min-w-[77px] px-4 py-2 bg-[#1D5BD8] hover:bg-white hover:text-[#1D5BD8] border border-solid border-[#1D5BD8] w-auto h-10 rounded-md text-white text-sm leading-relaxed disabled:opacity-20 transition-all duration-300 ease-in"
            >
              {isLoading ? <span className="loader"></span> : ""}{" "}
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
          <div className="pt-4 pb-0 flex-shrink-0 flex-grow flex flex-col">
            {isLoading && (
              <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)]">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primaryColor motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="z-20 !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            )}
            <Tabs className="flex-shrink-0 flex-grow" value={`tab_${tabIndex}`}>
              <TabsList>
                {headerTabs.map(
                  (head: string, index: number) =>
                    head !== "Product Metrics" && (
                      <li key={index}>
                        <TabsTrigger
                          value={`tab_${index}`}
                          onClick={(event) => handleTabChange(index, event)}
                          className={`block ${
                            tabIndex === index ? "active" : ""
                          }`}
                        >
                          {head}
                        </TabsTrigger>
                      </li>
                    )
                )}
              </TabsList>
              <TabsContent
                className="max-h-[calc(100vh_-_180px)] h-full overflow-auto !pt-0 my-[25px] scroll-smooth -mr-3 custom-scrollbar"
                value="tab_0"
              >
                <InitEntry
                  impOrganization={impOrganization}
                  handleParamChange={handleParamChange}
                  validation={validation}
                  formData={formData}
                  // cases={cases}
                  industries={industries}
                  businessAreas={businessAreas}
                  departments={departments}
                  // setCases={setCases}
                />
              </TabsContent>
              <TabsContent
                className="max-h-[calc(100vh_-_180px)] h-full overflow-auto !pt-0 mt-[25px] -mr-3 scroll-smooth custom-scrollbar"
                value="tab_1"
              >
                <SolutionsReviewsList
                  handleParamChange={handleParamChange}
                  validation={validation}
                  formData={formData}
                  details={{
                    entryId: entryId,
                    organization: impOrganization.id,
                    organization_creator_id: impOrganization.creator_id,
                    case_id: formData?.case_id,
                    task_id: formData?.task_id,
                    reportId: reportId,
                    is_superadmin: impOrganization.is_superadmin,
                    is_supervisor: impOrganization.is_supervisor,
                  }}
                  isEdit={isEdit}
                  feasibilityCriteria={feasibilityCriteria}
                />
              </TabsContent>
              <TabsContent
                className="max-h-[calc(100vh_-_180px)] h-full overflow-auto !pt-0 mt-[25px] -mr-3 scroll-smooth custom-scrollbar"
                value="tab_2"
              >
                <BusinessImpactNew
                  handleParamChange={handleParamChange}
                  formData={formData}
                  impOrganization={impOrganization}
                  filialId={filialId}
                  validation={validation}
                />
              </TabsContent>
              <TabsContent
                className="max-h-[calc(100vh_-_180px)] h-full overflow-auto !pt-0 mt-[25px] -mr-3 scroll-smooth custom-scrollbar"
                value="tab_3"
              >
                <Recommendation
                  validation={validation}
                  handleParamChange={handleParamChange}
                  formData={formData}
                />
              </TabsContent>
              <TabsContent
                className="max-h-[calc(100vh_-_180px)] h-full overflow-auto !pt-0 mt-[25px] scroll-smooth"
                value="tab_4"
              >
                <Company
                  initiatives={initiatives}
                  objectives={objectives}
                  validation={validation}
                  handleParamChange={handleParamChange}
                  formData={formData}
                  entry_id={entryId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateNewReport;
