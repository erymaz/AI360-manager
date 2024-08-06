import * as organisationRepository from "@/lib/api/organisation";
import {Organisation} from "@/lib/api/organisation";
import prisma from "@/lib/prisma";
import {Role} from "@/types";
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import {GetServerSidePropsResult, PreviewData} from "next/types";
import {ParsedUrlQuery} from "querystring";
import {clerkClient, getAuth} from "@clerk/nextjs/server";

export interface AuthData {
    clerkUserId: string;
    locale: string;
    organisation: Organisation;
    organization360?: any;
    role: Role;
    messages?: any;
}

export type GetServerSidePropsWithAuth<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
> = (
    context: GetServerSidePropsContext<Q, D>,
    auth: AuthData
) => Promise<GetServerSidePropsResult<P>>;

export function withRequiredAuthentication<T extends { [key: string]: any }>(
    handler: GetServerSidePropsWithAuth<T>,
    options?: {
        allowBlocked?: boolean;
        allowPending?: boolean;
        requireOwner?: boolean;
        requireMember?: boolean;
    }
): GetServerSideProps<T> {
    return async (context: GetServerSidePropsContext) => {
        const {req} = context;


        const {userId} = getAuth(req);

        if (!userId) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        const user = await clerkClient.users.getUser(userId);

        const organizationId = user?.publicMetadata?.organizationId;
        const role = user?.publicMetadata?.organizationRole as Role;

        if (!organizationId || typeof (organizationId) !== "string" || !role) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        const organisation = await organisationRepository.findOrganisation(
            organizationId
        );


        if (!organisation) {
            if (role === Role.OWNER) {
                return {
                    redirect: {
                        destination: "/create-account",
                        permanent: false,
                    },
                };
            }
        } else if (isAccessBlocked(organisation) && !options?.allowBlocked) {
            return {
                redirect: {
                    destination: "/blocked",
                    permanent: false,
                },
            };
        }

        if (isAccessPending(role) && !options?.allowPending) {
            return {
                redirect: {
                    destination: "/pending",
                    permanent: false,
                },
            };
        }

        if (role !== Role.OWNER && options?.requireOwner) {
            return {
                redirect: {
                    destination: "/workspaces",
                    permanent: false,
                },
            };
        }

        let organization360 = await prisma.organizations.findFirst({
            where: {name: String(organisation?.companyName)},
        });

        if (organization360) {
            organization360 = JSON.parse(JSON.stringify(organization360));
        }

        const {locale} = context;
        const messages = (await import(`../../messages/${locale}.json`)).default;

        return handler(context, {
            clerkUserId: userId,
            locale: "en-US",
            organisation,
            organization360,
            role,
            messages,
        });
    };
}

export const withApiProtect = (
    handler: (req: NextApiRequest, res: NextApiResponse, auth: AuthData) => void
) => {
    return async (
        request: NextApiRequest,
        response: NextApiResponse
    ): Promise<void> => {

        const {userId} = getAuth(request);

        if (!userId) {
            return void response.status(401).end("Authentication required");
        }


        const user = await clerkClient.users.getUser(userId);

        const organizationId = user?.publicMetadata?.organizationId;
        const role = user?.publicMetadata?.organizationRole as Role;

        if (!organizationId || typeof (organizationId) !== "string" || !role) {
            return void response.status(401).end("Authentication required");
        }

        const organisation = await organisationRepository.findOrganisation(
            organizationId
        );


        if (
            !organisation ||
            isAccessBlocked(organisation) ||
            isAccessPending(role)
        ) {
            return void response.status(403).end("Profile setup not completed");
        }

        let organization360 = await prisma.organizations.findFirst({
            where: {name: String(organisation.companyName)},
        });

        if (organization360) {
            organization360 = JSON.parse(JSON.stringify(organization360));
        }

        return handler(request, response, {
            clerkUserId: userId,
            locale: "en-US",
            organisation,
            organization360,
            role,
        });
    };
};

function isAccessBlocked(organisation: Organisation): boolean {
    return Boolean(organisation.blockedAt);
}

function isAccessPending(role: Role): boolean {
    return Role.NO_ROLE === role;
}
