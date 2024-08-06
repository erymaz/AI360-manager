"use client";

import AddGeneratorModal from "@/components/ai-generators-library/add-generator-modal";
import {GeneratorCard} from "@/components/ai-generators-library/generator-card";
import Navbar from "@/components/navbar";
import {loadAiGenerators} from "@/generators/listing";
import {localizeMeta} from "@/helpers/localization";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import {styles} from "@/styles/ai-generators-library.styles";
import {AiGenerator} from "@/types";
import {Box, Grid, TextField} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import React, {useState} from "react";
import {useTranslations} from "next-intl";

export const getServerSideProps = withRequiredAuthentication(
    async (
        ctx: GetServerSidePropsContext,
        {organisation, clerkUserId, role, locale, organization360, messages}
    ) => {
        const aiGenerators = loadAiGenerators(ctx);
        const allGenerators = localizeMeta(
            await aiGenerators,
            ctx
        ) as AiGenerator[];
        const allWorkspaces = await workspaceService.getAllWorkspaces(
            organisation.tenantId,
            clerkUserId,
            role
        );

        return {
            props: {
                allGenerators,
                allWorkspaces,
                locale,
                companyName: organisation.companyName,
                organization360,
                messages
            },
        };
    }
);

export default function AiGeneratorsLibrary({
                                                allGenerators,
                                                allWorkspaces,
                                                companyName,
                                                organization360
                                            }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [open, setOpen] = React.useState(false);
    const t = useTranslations('waipify.ui');
    const handleClose = () => setOpen(false);

    const handleOpen = (generator: string) => {
        setSelectedGenerator(generator);
        return setOpen(true);
    };

    const [selectedGenerator, setSelectedGenerator] = useState<string | null>(
        null
    );

    // Add a state variable for the search input
    const [searchInput, setSearchInput] = useState("");

    // Update the search input state when the user types in the search bar
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    // Filter the generators based on the search input
    const searchInputLower = searchInput.toLowerCase();
    const filteredGenerators = allGenerators.filter((ag) => {
        const {title, description, tags = []} = ag;
        return [title, description, tags.join(' ')].some(text =>
            (text as string).toLowerCase().includes(searchInputLower)
        );
    });

    return (
        <Box sx={styles.page}>
            <Navbar companyName={companyName} organization360={organization360}/>
            <Box sx={styles.mainContainer}>
                <Box sx={styles.titleSectionContainer}>
                    <Box sx={styles.titleContainer}>{t("ai-generators.title")}</Box>
                    <Box sx={styles.subtitleContainer}>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t("ai-generators.header"),
                            }}
                        ></p>
                    </Box>
                    <Box>
                        <TextField
                            label={t("general.search")}
                            variant="outlined"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            fullWidth
                            sx={{
                                width: "100%",
                                maxWidth: "560px",
                                borderRadius: "8px",
                                backgroundColor: "#F5F7F9",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={styles.midSection}>
                    <Box sx={styles.midSectionTitle}>{t("general.ai-generators")}</Box>
                </Box>
                <AddGeneratorModal
                    open={open}
                    onClose={handleClose}
                    generator={selectedGenerator}
                    allWorkspaces={allWorkspaces}
                />
                <Box sx={styles.bottomSection}>
                    <Grid container spacing={{xs: 2, md: 3}}>
                        {filteredGenerators.map((ag, idx) => {
                            return (
                                <GeneratorCard
                                    key={`${ag.id}-${idx}`}
                                    title={ag.title}
                                    image={ag.image}
                                    description={ag.description}
                                    cost={ag.cost_per_use}
                                    popularity={ag.popularity}
                                    onClick={() => handleOpen(ag.name)}
                                    xs={6}
                                />
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
