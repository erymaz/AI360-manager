import prisma, {getNewUUID} from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const caseToSolutionReviewSchema = Joi.object({
    case_to_solution_id: Joi.string().required(),
    feasibility_criteria_id: Joi.string().required(),
    reviewer_organization_id: Joi.string().required(),
    score: Joi.number().required(),
    comment: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {solution_id, case_id} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "GET") {
        try {
            let case_to_solution_reviews: any = [];
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
                            ctsr.feasibility_criteria_id, 
                            ctsr.score,
                            ctsr.comment,
                            ROW_NUMBER() OVER (PARTITION BY ctsr.feasibility_criteria_id ORDER BY ctsr.created_at desc) num
                            FROM case_to_solution_reviews ctsr
                            LEFT JOIN case_to_solution cts ON cts.id=ctsr.case_to_solution_id
                            WHERE cts.case_id="${case_id}"
                        ) inn
                        WHERE inn.num = 1)
                        UNION ALL
                        (SELECT 
                        innt.feasibility_criteria_id as feasibility_criteria_id, 
                        innt.score as score, 
                        innt.comment as comment FROM
                        (SELECT 
                            ctsrt.feasibility_criteria_id, 
                            ctsrt.score,
                            ctsrt.comment,
                            ROW_NUMBER() OVER (PARTITION BY ctsrt.feasibility_criteria_id ORDER BY ctsrt.created_at desc) numt
                            FROM case_to_solution_reviews ctsrt
                            LEFT JOIN case_to_solution ctst ON ctst.id=ctsrt.case_to_solution_id
                            WHERE ctst.case_id="${case_id}"
                        ) innt
                        WHERE innt.numt = 1)
                        UNION ALL
                        (SELECT 
                        innts.feasibility_criteria_id as feasibility_criteria_id, 
                        innts.score as score, 
                        innts.comment as comment
                        FROM
                        (SELECT 
                            ctsrts.feasibility_criteria_id, 
                            ctsrts.score,
                            ctsrts.comment,
                            ROW_NUMBER() OVER (PARTITION BY ctsrts.feasibility_criteria_id ORDER BY ctsrts.created_at desc) numt
                            FROM case_to_solution_reviews ctsrts 
                            LEFT JOIN case_to_solution ctsts ON ctsts.id=ctsrts.case_to_solution_id
                            LEFT JOIN solutions ctstsl ON ctstsl.id=ctsts.solution_id
                            WHERE ctstsl.id="${solution_id}"
                        ) innts
                        WHERE innts.numt = 1)
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
                            WHERE rr.solution_id="${solution_id}"
                        ) innr
                        WHERE innr.numr = 1)
                    ) finn
                ) fttsr WHERE fttsr.fnum = 1`;

            case_to_solution_reviews = await prisma.$queryRawUnsafe(baseQuery);
            return res.status(200).json({case_to_solution_reviews});
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

                const case_to_solution_reviews =
                    await prisma.case_to_solution_reviews.createMany({
                        data: fecibility_criteria_array,
                    });
                return res.status(201).json({case_to_solution_reviews});
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
                        prisma.case_to_solution_reviews.update({
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
