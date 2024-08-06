"use client";

import {SectionTitle} from "@/components/section-title";
import {request} from "@/helpers/request";
import {withRequiredAuthentication} from "@/lib/services/auth";
import {Box, CircularProgress} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import * as React from "react";
import {useClerk} from "@clerk/nextjs";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

export const getServerSideProps = withRequiredAuthentication(
    async (ctx: GetServerSidePropsContext, {locale, organization360, messages}) => ({
        props: {locale, organization360, messages},
    }),
    {allowPending: true}
);

export default function PendingPage({
                                        organization360,
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const {signOut} = useClerk()

    useLayoutEffect(() => {
        request(`/api/auth/refetch-session`).then(
            () => router.replace("/create-account"),
            () => signOut()
        );
    }, [router]);

    return (
        <Box sx={{background: "#F6F7F9", minHeight: "100vh"}}>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{padding: "32px 140px", width: "100%"}}>
                    <Box sx={{display: "flex"}}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: "10px",
                                    marginLeft: "10px",
                                    minWidth: "200px",
                                }}
                            >
                                <SectionTitle mb={3} sx={{display: "flex"}}></SectionTitle>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <CircularProgress
                            sx={{marginRight: "1rem"}}
                            size={20}
                            color="inherit"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
