import prisma from "@/lib/prisma";
import {withApiProtect} from "@/lib/services/auth";
import Joi from "joi";
import type {NextApiRequest, NextApiResponse} from "next";
import {getAuth} from "@clerk/nextjs/server";

const providerSchema = Joi.object({
    name: Joi.string().required(),
    logo: Joi.string().allow(null).allow(""),
    type: Joi.string().allow(null).allow(""),
    description: Joi.string().allow(null).allow(""),
    headquarters_city_id: Joi.string().allow(null).allow(""),
    headquarters_country_id: Joi.string().allow(null).allow(""),
    headquarters_address_line: Joi.string().allow(null).allow(""),
    headquarters_address_number: Joi.string().allow(null).allow(""),
    headquarters_zip_code: Joi.string().allow(null).allow(""),
});

async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const {providerId} = req.query;

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    if (req.method === "PUT") {
        try {
            await prisma.providers.findFirstOrThrow({
                where: {id: String(providerId)},
            });
            const data = req.body;
            await providerSchema.validateAsync(data);

            const provider = await prisma.providers.update({
                where: {id: String(providerId)},
                data: req.body,
            });

            return res.status(201).json({provider});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "DELETE") {
        try {
            await prisma.providers.findFirstOrThrow({
                where: {id: String(providerId)},
            });

            let solutions: any = await prisma.solutions.findMany({
                where: {provider_id: String(providerId)},
                select: {id: true},
            });

            solutions = solutions.map((solv: any) => solv.id);

            let case_to_solution: any = await prisma.case_to_solution.findMany({
                where: {solution_id: {in: solutions}},
                select: {id: true},
            });

            case_to_solution = case_to_solution.map((solv: any) => solv.id);

            let case_to_solution_reviews: any =
                await prisma.case_to_solution_reviews.findMany({
                    where: {case_to_solution_id: {in: case_to_solution}},
                    select: {id: true},
                });

            case_to_solution_reviews = case_to_solution_reviews.map(
                (solv: any) => solv.id
            );

            const deleteArray = [];
            if (case_to_solution_reviews.length) {
                deleteArray.push(
                    prisma.case_to_solution_reviews.deleteMany({
                        where: {
                            id: {in: case_to_solution_reviews},
                        },
                    })
                );
            }

            if (case_to_solution.length) {
                deleteArray.push(
                    prisma.case_to_solution.deleteMany({
                        where: {
                            id: {in: case_to_solution},
                        },
                    })
                );
            }

            if (solutions.length) {
                deleteArray.push(
                    prisma.solutions.deleteMany({
                        where: {
                            id: {in: solutions},
                        },
                    })
                );
            }

            deleteArray.push(
                prisma.providers.delete({
                    where: {id: String(providerId)},
                })
            );

            await Promise.all(deleteArray);

            return res.status(200).json({message: "Provider deleted successfully"});
        } catch (e: any) {
            return res.status(500).json({
                error: e.toString(),
            });
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
    return withApiProtect(handler)(req, res);
}
