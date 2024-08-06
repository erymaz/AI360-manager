import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const taskToModelReviewSchema = Joi.object({
    task_to_model_id: Joi.string().required(),
    feasibility_criteria_id: Joi.string().required(),
    reviewer_organization_id: Joi.string().required(),
    entry_id: Joi.string().allow(null).allow(""),
    score: Joi.number().required(),
    comment: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {entry_id, model_id, task_id} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let task_to_model_reviews: any = [];
            let baseQuery = `SELECT 
      fttsr.feasibility_criteria_id as feasibility_criteria_id, 
      fttsr.score as score, 
      fttsr.comment as comment FROM
      (
        SELECT 
        finn.feasibility_criteria_id as feasibility_criteria_id, 
        finn.score as score, 
        finn.comment as comment,
        ROW_NUMBER() OVER (PARTITION BY finn.feasibility_criteria_id) fnum
        FROM 
          (
            (SELECT 
              inn.feasibility_criteria_id as feasibility_criteria_id, 
              inn.score as score, 
              inn.comment as comment FROM
              (SELECT 
                ttsr.feasibility_criteria_id, 
                ttsr.score,
                ttsr.comment,
                ROW_NUMBER() OVER (PARTITION BY ttsr.feasibility_criteria_id ORDER BY ttsr.created_at desc) num
                FROM task_to_model_reviews ttsr 
                LEFT JOIN task_to_model tts ON tts.id=ttsr.task_to_model_id
                WHERE tts.entry_id="${entry_id}" AND tts.task_id="${task_id}"
              ) inn
              WHERE inn.num = 1)
            UNION ALL
            (SELECT 
              innt.feasibility_criteria_id as feasibility_criteria_id, 
              innt.score as score, 
              innt.comment as comment FROM
              (SELECT 
                ttsrt.feasibility_criteria_id, 
                ttsrt.score,
                ttsrt.comment,
                ROW_NUMBER() OVER (PARTITION BY ttsrt.feasibility_criteria_id ORDER BY ttsrt.created_at desc) numt
                FROM task_to_model_reviews ttsrt 
                LEFT JOIN task_to_model ttst ON ttst.id=ttsrt.task_to_model_id
                WHERE ttst.task_id="${task_id}"
              ) innt
              WHERE innt.numt = 1)
            UNION ALL
            (SELECT 
              innr.feasibility_criteria_id as feasibility_criteria_id, 
              innr.score as score, 
              innr.comment as comment FROM
              (SELECT 
                rr.feasibility_criteria_id, 
                rr.score,
                rr.comment,
                ROW_NUMBER() OVER (PARTITION BY rr.feasibility_criteria_id ORDER BY rr.created_at desc) numr
                FROM reviews rr 
                WHERE rr.model_id="${model_id}"
              ) innr
              WHERE innr.numr = 1)
          ) finn
      ) fttsr WHERE fttsr.fnum = 1
      `;

            task_to_model_reviews = await prisma.$queryRawUnsafe(baseQuery);
            return res.status(200).json({task_to_model_reviews});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "POST") {
        try {
            const {fecibility_criteria_ids} = req.body;

            if (fecibility_criteria_ids && fecibility_criteria_ids.length > 0) {
                const fecibility_criteria_array: any = [];
                for (let i = 0; i < fecibility_criteria_ids.length; i++) {
                    const data = {
                        id: getNewUUID(),
                        created_at: new Date().toISOString(),
                        ...fecibility_criteria_ids[i],
                    };
                    fecibility_criteria_array.push(data);
                }

                const task_to_model_review =
                    await prisma.task_to_model_reviews.createMany({
                        data: fecibility_criteria_array,
                    });
                return res.status(201).json({task_to_model_review});
            }
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        try {
            const {fecibility_criteria_ids} = req.body;
            if (fecibility_criteria_ids) {
                const transect_arr = [];
                for (let i = 0; i < fecibility_criteria_ids.length; i++) {
                    const {id, ...data} = fecibility_criteria_ids[i];
                    transect_arr.push(
                        prisma.task_to_model_reviews.update({
                            where: {id: String(id)},
                            data: data,
                        })
                    );
                }
                const business_impact_value = await prisma.$transaction(transect_arr);
                return res.status(201).json(business_impact_value);
            }
        } catch (error) {
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
