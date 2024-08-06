import buildingsIcon from "../../public/buildings.svg";
import locationIcon from "../../public/location.svg";
import {
    AuthFormActions,
    AuthFormFooter,
} from "@/components/onboarding/auth-form";
import {
    CustomiseItem,
    CustomiseItemsList,
} from "@/components/onboarding/customise-item";
import {OnboardingLayout} from "@/components/onboarding/onboarding-layout";
import {loadAiGenerators} from "@/generators/listing";
import {request} from "@/helpers/request";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import styled from "@emotion/styled";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    Alert,
    Button,
    CircularProgress,
    Snackbar,
    Typography,
} from "@mui/material";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import * as yup from "yup";
import {useTranslations} from "next-intl";

const AddGeneratorContainer = styled.div`
    padding: 2rem;
    background-color: #fff;
    box-shadow: 0px 10px 14px -12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
`;

interface FormSchema {
    generators: string[];
}

const icons: any = {
    real_estate: buildingsIcon,
    location: locationIcon,
    bikes: locationIcon,
} as const;

export interface Generator {
    name: string;
    title: Record<string, string>;
    image: string;
    description: Record<string, string>;
    contentType: string;
    cost_per_use: number;
    popularity: number;
}

const schema = yup.object({
    generators: yup
        .array()
        .min(1, "You need to select at least one generator")
        .required(),
});

export const getServerSideProps = withRequiredAuthentication(
    async (
        ctx: GetServerSidePropsContext,
        {organisation, clerkUserId, role, locale, messages}
    ) => {
        const {workspaceId} = ctx.query;
        if (!workspaceId) {
            console.log("no workspaceId provided");
            return {
                props: {
                    existingGenerators: {generators: []},
                    workspaceId: "",
                    locale,
                    messages
                },
            };
        }

        const existingGenerators = await workspaceService.getWorkspaceGenerators(
            organisation.tenantId,
            workspaceId!.toString(),
            clerkUserId,
            role
        );

        return {
            props: {
                existingGenerators,
                workspaceId: workspaceId.toString(),
                locale,
                messages
            },
        };
    }
);

export default function AddGenerator({
                                         existingGenerators,
                                         workspaceId,
                                     }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [generators, setGenerators] = useState<Generator[]>([]);
    const [showError, setShowError] = useState<boolean | string>(false);
    const [loading, setLoading] = useState(false);
    const [returning, setReturning] = useState(false);
    const router = useRouter();
    const t = useTranslations('waipify.ui');

    const {
        handleSubmit,
        formState: {errors},
        control,
        watch,
        setValue,
    } = useForm<FormSchema>({
        defaultValues: {...existingGenerators},
        resolver: yupResolver(schema),
    });

    const value = watch();
    value.generators ??= [];

    const onSubmit = useCallback(
        async ({generators}: FormSchema) => {
            setLoading(true);
            try {
                await request(`/api/workspaces/${workspaceId}/generators`, {
                    method: "PUT",
                    body: {
                        generators,
                    },
                });
                router.push(`/workspaces/${workspaceId}`);
            } catch (e) {
                setShowError((e as { error: string }).error);
            }

            // Submit form data, redirect to home/workspaces and clear the storage
            setLoading(false);
        },
        [router, workspaceId]
    );

    const onBack = () => {
        setReturning(true);
        router.push("/workspaces");
        setReturning(false);
    };

    const isSelected = useCallback(
        (name: string) => {
            return value.generators?.includes(name);
        },
        [value]
    );

    const selectGenerator = (name: string, checked?: boolean) => {
        const newValue = checked
            ? [...value.generators, name]
            : value.generators.filter((item) => item !== name);
        setValue("generators", newValue);
    };

    return (
        <OnboardingLayout>
            <AddGeneratorContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography
                        component="h2"
                        fontSize={24}
                        textAlign="center"
                        fontWeight="bold"
                    >
                        {t("general.add_generator_to_workspace")}
                    </Typography>
                    <CustomiseItemsList>
                        <Controller
                            control={control}
                            name="generators"
                            render={() => (
                                <>
                                    {generators.map((item) => (
                                        <CustomiseItem
                                            key={item.name}
                                            generator={item}
                                            checked={isSelected(item.name)}
                                            onChange={(e) =>
                                                selectGenerator(
                                                    item.name,
                                                    (e.target as { checked?: boolean }).checked
                                                )
                                            }
                                        />
                                    ))}
                                </>
                            )}
                        />
                    </CustomiseItemsList>
                    {errors.generators ? (
                        <Typography color="error">{errors.generators.message}</Typography>
                    ) : (
                        <></>
                    )}
                    <AuthFormFooter>
                        <AuthFormActions>
                            <Button type="submit" variant="contained" disabled={loading}>
                                {loading && (
                                    <CircularProgress
                                        sx={{marginRight: "1rem"}}
                                        size={20}
                                        color="inherit"
                                    />
                                )}
                                Save
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                disabled={returning}
                                onClick={onBack}
                            >
                                {returning && (
                                    <CircularProgress
                                        sx={{marginRight: "1rem"}}
                                        size={20}
                                        color="inherit"
                                    />
                                )}
                                Return
                            </Button>
                        </AuthFormActions>
                    </AuthFormFooter>
                </form>
            </AddGeneratorContainer>
            <Snackbar
                open={!!showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
            >
                <Alert severity="error">{showError}</Alert>
            </Snackbar>
        </OnboardingLayout>
    );
}
