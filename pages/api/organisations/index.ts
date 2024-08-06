import {NextApiRequest, NextApiResponse} from "next";
import prisma, {getNewUUID} from "@/lib/prisma";
import Joi from "joi";

import {
    COUNTRIES,
    Industry,
    OrganisationDetailsFormDto,
    RegistrationFormData,
} from "@/lib/models/organisation-details.model";
import * as organisationService from "@/lib/services/organisation";
import * as subscriptionService from "@/lib/services/subscription";
import {clerkClient, getAuth} from "@clerk/nextjs/server";

const registrationDataSchema = Joi.object<RegistrationFormData>({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    billingInfo: Joi.object({
        billingAddress: Joi.object({
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string().optional(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            postalCode: Joi.string().required(),
        }).optional(),
        taxId: Joi.string().optional(),
    }).optional(),
    companyName: Joi.string().required(),
    companyWebsite: Joi.string().uri(),
    organisationId: Joi.string()
        .required()
        .external(async (value, helpers) => {
            const existingEntry = await organisationService.doesOrganisationExist(
                value
            );

            if (existingEntry) {
                throw new Error(
                    "There is already a company with this ID created in our system"
                );
            }

            return value;
        }),
    phoneNumber: Joi.string().optional(),
    termsAgreement: Joi.boolean().valid(true).required(),
    marketingConsent: Joi.boolean().optional(),
    country: Joi.string()
        .required()
        .equal(...COUNTRIES.map((country) => country.iso2)),
    industry: Joi.object<Industry>()
        .required()
        .equal(...Object.values(Industry)),
    country_id: Joi.string().required(),
    industry_id: Joi.string().required(),
    locale_id: Joi.string().allow(null).allow(""),
});

const organisationDetailsFormData = Joi.object<OrganisationDetailsFormDto>({
    id: Joi.string().required(),
    tenantId: Joi.string().required(),
    firstName: Joi.string().required().allow(null),
    lastName: Joi.string().required().allow(null),
    companyName: Joi.string().required(),
    email: Joi.string().required(),
    companyWebsite: Joi.string().uri().allow(null, ""),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().required().allow(null),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string()
        .required()
        .equal(...COUNTRIES.map((country) => country.iso2)),
    taxId: Joi.string().optional().allow(null, ""),
    industry: Joi.object<Industry>()
        .required()
        .equal(...Object.values(Industry)),
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }

    const user = await clerkClient.users.getUser(userId);


    if (req.method === "POST") {
        const {body} = req;
        let error, value;

        try {
            value = await registrationDataSchema.validateAsync(body);
        } catch (err) {
            error = err;
        }

        if (error || !value) {
            res.status(400).json({
                error: error?.toString() ?? "organisation form validation failed",
            });
            return;
        }

        try {
            if (body.locale_id) {
                await prisma.locale.findFirstOrThrow({
                    where: {id: body.locale_id},
                });
            }
            await prisma.industries.findFirstOrThrow({
                where: {id: body.industry_id},
            });

            let organization_detail = await prisma.organizations.findFirst({
                where: {name: body.companyName},
            });

            if (organization_detail) {
                throw new Error("Organization name already exist!");
            }

            delete (value as any).country_id;
            delete (value as any).industry_id;
            delete (value as any).locale_id;

            const orgId = user?.publicMetadata?.organizationId as string;
            const [_, organization] = await Promise.all([
                await organisationService.createOrganisation(user, value),
                prisma.organizations.create({
                    data: {
                        id: getNewUUID(),
                        waipify_organization_id: orgId,
                        creator_id: user.id,
                        name: body.companyName,
                        industry_id: body.industry_id,
                        country_id: body.country_id,
                        locale_id: body.locale_id,
                    },
                }),
            ]);

            await clerkClient.organizations.updateOrganization(orgId, {
                name: body.companyName,
            });

            await clerkClient.users.updateUserMetadata(userId, {
                publicMetadata: {
                    ...user.publicMetadata,
                    organizationName: body.companyName,
                },
            });
      
            await clerkClient.users.updateUser(userId, {
                firstName: body.firstName,
                lastName: body.lastName,
            });

            res.status(201).json(organization);
        } catch (e: any) {
            res.status(500).json({
                error: e.toString(),
            });
        }
    } else if (req.method === "PUT") {
        const {body} = req;
        let error, value;


        try {
            value = await organisationDetailsFormData.validateAsync(body);
        } catch (err) {
            error = err;
        }

        if (error || !value) {
            res.status(400).json({
                error:
                    error?.toString() ?? "Update organisation form validation failed",
            });
            return;
        }

        try {
            const organisation360 = await prisma.organizations.findFirst({
                where: {waipify_organization_id: value.tenantId},
            });
            if (!organisation360?.id) {
                return res.status(400).json({
                    error: 'Can\'t find organization.',
                });
            }
            await Promise.all([
                organisationService.updateOrganisationDetails(value),
                prisma.organizations.update({
                    where: {id: organisation360.id},
                    data: {
                        name: value.companyName,
                    },
                }),
            ]);
            res.status(200).json(body);
        } catch (e: any) {
            res.status(500).json({
                error: e.toString(),
            });
        }
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
