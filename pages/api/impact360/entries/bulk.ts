import prisma, { getNewUUID } from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import { getWaipifyMasterUserID } from "@/lib/services/userdetails";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authData: AuthData
) {
  const { organization_id, report_id, filial_id, original_id } = req.query;
  const { business_area_ids, case_ids } = req.body;

  if (req.method === "POST") {
    if (!organization_id || !report_id || !filial_id) {
      return res.status(400).json({
        error: "Organization ID, Report ID and Filial ID can't be empty."
      });
    }

    try {
      const masterUserId = await getWaipifyMasterUserID();

      const user_organization = await prisma.organizations.findFirst({
        where: { id: organization_id as string },
      });

      let entryQuery = `select 
        e.id,
        e.name,
        e.case_id, 
        e.task_id, 
        e.is_winner,
        e.winner_solution_id, 
        e.winner_solution_is_custom, 
        e.report_id,
        e.department_id,
        e.planned, 
        c.name as case_name,
        t.name as task_name, 
        t.risk as task_risk,
        d.name as department,
        pr.name as provider_name, 
        pr.logo as provider_logo ,  
        so.description as description,
        IF(e.winner_solution_is_custom = 0, pr.name, mo.name) AS entry_solution_name,
        IF(e.winner_solution_is_custom = 0, pr.logo, "") AS entry_solution_logo,
        so.name as solution_name,
        so.organization_creator_id as organization_creator_id,
        so.has_api as has_api, 
        so.has_user_friendly_ui as has_user_friendly_ui,
        so.has_grpc as has_grpc, 
        so.has_extension as has_extension,
        so.is_platform as is_platform, 
        so.has_incumbent_integration as has_incumbent_integration,
        cts.needs_allocation as needs_allocation,
        cts.impact_starts as impact_starts,
        cts.feasibility_number as feasibility_number,
        sta.name as status,
        sta.hex_colour_value as status_colour,
        bi.id as business_impact_id,
        bi.repeats_yearly as repeats_yearly,
        bi.time_per_outcomes as time_per_outcomes,
        bi.time_per_outcomes_after_ai as time_per_outcomes_after_ai,
        bi.reduced_process_time_from as reduced_process_time_from,
        bi.reduced_process_time_to as reduced_process_time_to,
        bi.employee_hourly_rate as employee_hourly_rate,
        bi.total_cost_yearly as total_cost_yearly,
        bi.total_cost_yearly_after_ai as total_cost_yearly_after_ai,
        bi.can_perform_other_tasks as can_perform_other_tasks,
        bi.has_high_replacement_cost as has_high_replacement_cost,
        bi.has_direct_impact as has_direct_impact,
        bi.open_new_revenue_stream as open_new_revenue_stream,
        bi.revenue_increase_with_ai as revenue_increase_with_ai,
        bi.comments as business_impact_comments,
        bi.is_not_quantifiable as is_not_quantifiable,
        bi.estimated_value as genai_impact,
        bi.strategic_value as strategic_value,
        ba.id as business_area_id,
        ba.name as business_area_name,
        opp.id as opportunity_id,
        opp.name as opportunity_name,
        opp.organization_creator_id as opportunity_ocid,
        ind.id as industry_id,
        ind.name as industry_name,
        cat.id as industry_category_id,
        cat.name as category_name,
        oro.name as objective_name 
        FROM entries e 
        left join cases c on c.id=e.case_id
        left join tasks t on t.id=e.task_id
        left join reports rp on rp.id=e.report_id
        left join departments d on d.id=e.department_id
        left join organization_objectives oro on oro.id=e.objective_id
        left join case_to_solution cts on cts.solution_id=e.winner_solution_id AND cts.case_id=e.case_id
        left join solutions so on so.id=e.winner_solution_id
        left join models mo on mo.id=e.winner_solution_id
        left join providers pr on pr.id=so.provider_id
        left join statuses sta on sta.id=e.status_id
        left join case_to_solution_reviews ctsr on ctsr.case_to_solution_id=cts.id
        left join feasibility_criteria fc on fc.id= ctsr.feasibility_criteria_id
        left join business_impact bi on bi.entry_id=e.id
        left join business_areas ba on ba.id=e.business_area_id
        left join opportunities opp on opp.id=e.opportunity_id
        left join industries ind on ind.id=e.industry_id
        left join industry_categories cat on cat.id=e.industry_category_id
        WHERE e.creator_organization_id = '${masterUserId}' AND e.original_id IS NULL`;

      if (original_id) {
        entryQuery += ` AND e.id='${original_id}'`;
      } else {
        if (case_ids?.length) {
          const caseIdArr = case_ids.join("','");
          entryQuery += ` AND e.case_id IN ('${caseIdArr}')`;
        } else if (business_area_ids?.length) {
          const businessAreaIdArr = business_area_ids.join("','");
          entryQuery += ` AND e.business_area_id IN ('${businessAreaIdArr}')`;
        }
      }

      // if (classification[x].industry_id) {
      //   entryQuery = `${entryQuery} AND e.industry_id='${classification[x].industry_id}'`;
      // }

      // if (classification[x].industry_category_id) {
      //   entryQuery = `${entryQuery} AND e.industry_category_id='${classification[x].industry_category_id}'`;
      // } else {
      //   entryQuery = `${entryQuery} AND e.industry_category_id IS NULL`;
      // }

      entryQuery = `${entryQuery} group by e.id, cts.id, bi.id, ba.id, opp.id, cat.id order by e.created_at desc`;
      const entries: any[] = await prisma.$queryRawUnsafe(entryQuery);

      let failedCount = 0;
      let successCount = 0;
      let duplicate = 0
      if (entries.length > 0) {
        const lastEntry = await prisma.entries.findFirst({
          where: {
            report_id: report_id as string,
          },
          orderBy: [
            {
              created_at: "desc",
            },
          ],
          take: 1,
        });

        let reference = "";
        if (lastEntry) {
          reference = await getNewReference(lastEntry.reference || '');
        } else {
          const report = await prisma.reports.findFirstOrThrow({
            where: { id: report_id as string },
          });
          const filial = await prisma.filials.findFirstOrThrow({
            where: { id: report.filial_id! },
          });
          const filialName = String(filial.name)
            ?.toUpperCase()
            ?.split(" ")
            ?.join("");
          const filialAbbr = `${filialName[0]}${filialName[1]}`;

          let reportAbbr = "";
          const reportName = String(report.name)
            ?.toUpperCase()
            ?.split(" ")
            ?.join("");
          if (reportName?.length > 2) {
            reportAbbr = `${reportName[0]}${reportName[1]}${reportName[2]}`;
          } else {
            reportAbbr = `${reportName[0]}${reportName[1]}`;
          }
          const prefix = `${filialAbbr}-${reportAbbr}-`;
          const _entries = await prisma.entries.findMany({
            where: {
              reference: {
                contains: prefix,
              },
            },
            distinct: ["report_id"],
          });
          if (!_entries.length) {
            reference = `${prefix}000001`;
          } else {
            const newSuffix = String.fromCharCode(_entries.length + 64);
            reference = `${prefix}${newSuffix}-000001`;
          }
        }

        for (let entry of entries) {
          const exEntry = await prisma.entries.findFirst({
            where: { original_id: entry.id , creator_organization_id: user_organization?.creator_id },
          });

          if (exEntry) {
            duplicate += 1
            continue;
          }

          await handleCreateEntry(
            entry,
            reference,
            report_id as string,
            user_organization,
            filial_id as string
          )
            .then(() => successCount++)
            .catch((e) => {
              failedCount += 1;
            });
          reference = await getNewReference(reference);
        }
      }

      return res.status(200).json({
        message: "Bulk entries created successfully",
        faildCount: failedCount,
        duplicate: duplicate,
        successCount: successCount
      });
    } catch (e: any) {
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getNewReference(lastId: string) {
  const index = Number(lastId?.lastIndexOf("-"));
  const prefix = lastId?.slice(0, index + 1);
  const uN = Number(lastId?.slice(index + 1));
  return `${prefix}${(uN + 1).toString().padStart(6, "0")}`;
}

async function handleCreateEntry(
  entry: any,
  reference: string,
  report_id: string,
  org: any,
  filial_id: string
) {
  try {
    const promiseArr = [];
    const newEntryId = getNewUUID();

    let case_id: string;
    let task_id: string;
    let opportunity_id: string | null = null;
    let feasibility_number: any = 0;
    let department_id: string = "";

    const exCase = await prisma.cases.findFirst({
      where: { name: entry.case_name, organization_creator_id: org.creator_id },
    });

    if (exCase) {
      case_id = exCase?.id;
    } else {
      case_id = getNewUUID();
      const caseDetails = {
        id: case_id,
        name: entry.case_name,
        organization_creator_id: org.creator_id,
        industry_id: entry.industry_id,
        country_id: org.country_id,
        original_id: entry.case_id,
      };
      promiseArr.push(prisma.cases.create({ data: caseDetails }));
    }

    const exTask = await prisma.tasks.findFirst({
      where: { name: entry.task_name, organization_creator_id: org.creator_id },
    });

    if (exTask) {
      task_id = exTask?.id;
    } else {
      task_id = getNewUUID();
      const taskDetails = {
        id: task_id,
        name: entry.task_name,
        organization_creator_id: org.creator_id,
        case_id: case_id,
        risk: entry.task_risk,
        original_id: entry.task_id,
      };
      promiseArr.push(prisma.tasks.create({ data: taskDetails }));
    }

    if (entry.opportunity_name) {
      const exOpportunity = await prisma.opportunities.findFirst({
        where: {
          name: entry.opportunity_name,
          organization_creator_id: org.creator_id,
        },
      });
  
      if (exOpportunity) {
        opportunity_id = exOpportunity?.id;
      } else {
        opportunity_id = getNewUUID();
        const opportunityDetails = {
          id: opportunity_id,
          name: entry.opportunity_name,
          organization_creator_id: org.creator_id,
          country_id: org.country_id,
        };
        promiseArr.push(
          prisma.opportunities.create({ data: opportunityDetails })
        );
      }
    }

    // const solution = await prisma.case_to_solution.findMany({
    //   where: { entry_id: entry.id },
    // });

    // if (solution.length > 0) {
    //   const ttsArray = [];
    //   const ttsrArray = [];
    //   for (let i = 0; i < solution.length; i++) {
    //     const tts_id = getNewUUID();
    //     if (entry.winner_solution_id === solution[i].id) {
    //       winner_solution_id = tts_id;
    //       feasibility_number = solution[i].feasibility_number;
    //     }

    //     const ttsDetails = {
    //       id: tts_id,
    //       solution_id: solution[i].solution_id,
    //       task_id: task_id,
    //       entry_id: newEntryId,
    //       feasibility_number: solution[i].feasibility_number,
    //       impact_starts: solution[i].impact_starts,
    //       needs_allocation: solution[i].needs_allocation,
    //       suggested: solution[i].suggested,
    //     };

    //     ttsArray.push(ttsDetails);

    //     const task_to_solution_reviews =
    //       await prisma.task_to_solution_reviews.findMany({
    //         where: {
    //           task_to_solution_id: solution[i].id,
    //           entry_id: solution[0].entry_id,
    //         },
    //       });

    //     for (let j = 0; j < task_to_solution_reviews.length; j++) {
    //       const ttsr_id = getNewUUID();
    //       const ttsrDetails = {
    //         id: ttsr_id,
    //         task_to_solution_id: tts_id,
    //         feasibility_criteria_id:
    //           task_to_solution_reviews[j].feasibility_criteria_id,
    //         entry_id: newEntryId,
    //         score: task_to_solution_reviews[j].score,
    //         comment: task_to_solution_reviews[j].comment,
    //       };

    //       ttsrArray.push(ttsrDetails);
    //     }
    //   }
    //   promiseArr.push(prisma.task_to_solution.createMany({ data: ttsArray }));
    //   promiseArr.push(
    //     prisma.task_to_solution_reviews.createMany({ data: ttsrArray })
    //   );
    // }

    // const taskmodels = await prisma.task_to_model.findMany({
    //   where: { entry_id: entry.id },
    // });

    // if (taskmodels.length > 0) {
    //   const ttmArray = [];

    //   for (let i = 0; i < taskmodels.length; i++) {
    //     const ttm_id = getNewUUID();
    //     if (entry.winner_solution_id === taskmodels[i].id) {
    //       winner_solution_id = ttm_id;
    //       winner_solution_is_custom = true;
    //     }

    //     const ttsDetails = {
    //       id: ttm_id,
    //       model_id: taskmodels[i].model_id,
    //       task_id: task_id,
    //       entry_id: newEntryId,
    //       model_capabilities: taskmodels[i].model_capabilities,
    //       development_description: taskmodels[i].development_description,
    //       suggested: taskmodels[i].suggested,
    //     };

    //     ttmArray.push(ttsDetails);
    //   }
    //   promiseArr.push(prisma.task_to_model.createMany({ data: ttmArray }));
    // }

    const business_impact_id = getNewUUID();

    const business_impact_details = {
      id: business_impact_id,
      entry_id: newEntryId,
      repeats_yearly: entry.repeats_yearly,
      time_per_outcomes: entry.time_per_outcomes,
      time_per_outcomes_after_ai: entry.time_per_outcomes_after_ai,
      reduced_process_time_from: entry.reduced_process_time_from,
      reduced_process_time_to: entry.reduced_process_time_to,
      employee_hourly_rate: entry.employee_hourly_rate,
      total_cost_yearly: entry.total_cost_yearly,
      total_cost_yearly_after_ai: entry.total_cost_yearly_after_ai,
      can_perform_other_tasks: !!entry.can_perform_other_tasks,
      has_high_replacement_cost: !!entry.has_high_replacement_cost,
      has_direct_impact: !!entry.has_direct_impact,
      open_new_revenue_stream: !!entry.open_new_revenue_stream,
      revenue_increase_with_ai: entry.revenue_increase_with_ai,
      comments: entry.business_impact_comments,
      is_not_quantifiable: !!entry.is_not_quantifiable,
      estimated_value: entry.genai_impact,
      strategic_value: entry.strategic_value,
    };

    promiseArr.push(
      prisma.business_impact.create({ data: business_impact_details })
    );

    if (entry.department_id) {
      const department = await prisma.departments.findFirst({
        where: { name: entry.department_name, filial_id: filial_id },
      });
      if (department) {
        department_id = department?.id;
      } else {
        department_id = getNewUUID();
        const departmentDetails = {
          id: department_id,
          name: entry.department,
          filial_id: filial_id,
        };
        promiseArr.push(prisma.departments.create({ data: departmentDetails }));
      }
    }

    const entoobjectives = await prisma.entry_to_objectives.findMany({
      where: { entry_id: entry.id },
    });

    if (entoobjectives.length > 0) {
      for (let i = 0; i < entoobjectives.length; i++) {
        let objective_id = "";
        const objective = await prisma.organization_objectives.findFirst({
          where: { id: entoobjectives[i].objective_id as string },
        });

        if (objective) {
          const exObjective = await prisma.organization_objectives.findFirst({
            where: { name: objective.name, filial_id: filial_id },
          });

          if (!exObjective) {
            const { id, created_at, ...new_details } = objective;
            objective_id = getNewUUID();
            const objDetails = {
              ...new_details,
              id: objective_id,
              filial_id: filial_id,
            };
            promiseArr.push(
              prisma.organization_objectives.create({ data: objDetails })
            );
          } else {
            objective_id = exObjective?.id;
          }
        }

        const enobj_id = getNewUUID();
        const objDetails = {
          id: enobj_id,
          objective_id: objective_id,
          entry_id: newEntryId,
        };
        promiseArr.push(
          prisma.entry_to_objectives.create({ data: objDetails })
        );
      }
    }

    const entoInitiative = await prisma.entry_to_initiatives.findMany({
      where: { entry_id: entry.id },
    });

    if (entoInitiative.length > 0) {
      for (let i = 0; i < entoInitiative.length; i++) {
        if (entoInitiative[i].initiative_id) {
          let initiative_id = "";
          const initiative = await prisma.initiatives.findFirst({
            where: { id: entoInitiative[i].initiative_id as string },
          });

          if (initiative) {
            const exInitiative = await prisma.initiatives.findFirst({
              where: { name: initiative.name, filial_id: filial_id },
            });

            if (!exInitiative) {
              const { id, created_at, ...new_details } = initiative;
              initiative_id = getNewUUID();
              const objDetails = {
                ...new_details,
                id: initiative_id,
                filial_id: filial_id,
              };
              promiseArr.push(prisma.initiatives.create({ data: objDetails }));
            } else {
              initiative_id = exInitiative?.id;
            }
          }

          const eninit_id = getNewUUID();
          const objDetails = {
            id: eninit_id,
            initiative_id: initiative_id,
            entry_id: newEntryId,
          };
          promiseArr.push(
            prisma.entry_to_initiatives.create({ data: objDetails })
          );
        }
      }
    }

    const entry_details = {
      id: newEntryId,
      reference: reference,
      name: entry.name,
      industry_category_id: entry.industry_category_id,
      industry_id: entry.industry_id,
      business_area_id: entry.business_area_id,
      opportunity_id: opportunity_id,
      case_id: case_id,
      task_id: task_id,
      winner_solution_id: entry.winner_solution_id,
      winner_solution_is_custom: entry.winner_solution_is_custom,
      is_winner: entry.is_winner == 0 ? false : true,
      feasibility_number: feasibility_number ? Number(feasibility_number) : 0,
      department_id: department_id,
      report_id: report_id,
      creator_organization_id: org.creator_id,
      original_id: entry.id,
    };

    promiseArr.push(prisma.entries.create({ data: entry_details }));

    return Promise.all(promiseArr);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return withApiProtect(handler)(req, res);
}
