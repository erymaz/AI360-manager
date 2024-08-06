"use client";

import {getAuth, buildClerkProps, clerkClient} from "@clerk/nextjs/server";
import {GetServerSideProps} from "next";
import {Role, UserWorkspaceDto, WorkspaceRole} from "@/types";
import * as organisationService from "@/lib/services/organisation";
import {useAuth} from "@clerk/nextjs";
import {useRef, useState} from "react";
import {LinearProgress} from "@mui/material";
import {useRouter} from "next/router";
import {request} from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const {userId, orgId, orgRole} = getAuth(ctx.req);
    console.log('Index page(server): userId, orgId, orgRole => ', userId, orgId, orgRole);

    if (!userId) {
        return {
            redirect: {
                destination: "/sign-up",
                permanent: false,
            },
        };
    }

    const user = await clerkClient.users.getUser(userId);
    const organizationId = user.publicMetadata.organizationId as string;

    // Redirect logic based on organization setup stage and role
    if (organizationId || orgId) {
        const organisation = await clerkClient.organizations.getOrganization({organizationId: orgId || organizationId});
        if (!organizationId) {
            // New invited user
            await clerkClient.users.updateUser(userId, {
                publicMetadata: {
                    organizationId: organisation.id,
                    organizationName: organisation.name,
                    organizationRole: orgRole,
                },
            });
        }

        const setupStage = await organisationService.getOrganisationOnboardingStepIndex(orgId || organizationId);
        if (orgRole === Role.OWNER) {
            if (setupStage === 0) {
                return {
                    redirect: {
                        destination: "/create-account",
                        permanent: false,
                    },
                };
            } else if (setupStage === 1) {
                return {
                    redirect: {
                        destination: "/name-report",
                        permanent: false,
                    },
                };
            } else if (setupStage === 2) {
                return {
                    redirect: {
                        destination: "/360/aimanager/report",
                        permanent: false,
                    },
                };
            } else {
                return {
                    redirect: {
                        destination: "/360/aimanager/report",
                        permanent: false,
                    },
                };
            }
        } else {
            return {
                redirect: {
                    destination: "/360/aimanager/report",
                    permanent: false,
                },
            };
        }
    }

    return {
        props: {
            ...buildClerkProps(ctx.req, {user}),
        },
    };
};

const Home = (props: any) => {
    const {isLoaded, userId, orgId} = useAuth();
    console.log('Index page(client): userId, orgId => ', userId, orgId);

    const [user, setUser] = useState(props.__clerk_ssr_state.user);
    const router = useRouter();
    const organizationCreatedRef = useRef(false);

    useLayoutEffect(() => {
        if (!isLoaded && !userId) {
            router.push("/sign-up");
        }
    }, [isLoaded, userId, router]);

    useLayoutEffect(() => {
        const handleOrganizationDetails = async () => {
            if (!organizationCreatedRef.current) {
                organizationCreatedRef.current = true;
                const {id, emailAddresses} = user;
                const response = await fetch('/api/organisations/create-organization', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: id,
                        organisationName: `${emailAddresses[0].emailAddress.split("@")[0]}`
                    }),
                });

                const data = await response.json();

                setUser((prevUser: any) => ({
                    ...prevUser,
                    publicMetadata: {
                        ...prevUser.publicMetadata,
                        organizationId: data.organization.id,
                        organizationName: data.organization.name,
                        organizationRole: Role.OWNER,
                    },
                }));

                await request<UserWorkspaceDto>(`/api/user-workspaces`, {
                    method: "POST",
                    body: {
                        tenantId: data.organization.id,
                        workspaceId: data.organization.id,
                        workspaceRole: WorkspaceRole.CREATOR,
                        userId: id,
                        email: emailAddresses[0].emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                });
            }
        };

        if (user && !user.publicMetadata?.organizationId && !orgId) {
            handleOrganizationDetails();
        }
    }, [user, orgId]);

    useLayoutEffect(() => {
        const handleSessionDetails = async () => {
            const setupStage = await request<number>(`/api/organisations/setupstage`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (user.publicMetadata.organizationRole === Role.OWNER) {
                if (setupStage === 0) {
                    router.push("/create-account");
                } else if (setupStage === 1) {
                    router.push("/name-report");
                } else if (setupStage === 2) {
                    router.push("/360/aimanager/report");
                } else {
                    router.push("/360/aimanager/report");
                }
            } else {
                router.push("/360/aimanager/report");
            }
        };

        if (user?.publicMetadata?.organizationId) {
            handleSessionDetails();
        }
    }, [user?.publicMetadata?.organizationId, router]);

    if (!isLoaded || !userId) {
        return <LinearProgress/>;
    }

    return null;
};

export default Home;
