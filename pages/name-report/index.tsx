import userTick from "../../public/usertick.svg";
import {StyledTextField} from "@/components/form-control";
import {AuthFormActions, AuthFormFooter} from "@/components/onboarding/auth-form";
import {Banner} from "@/components/onboarding/banner";
import {MobileOnboardingFooter} from "@/components/onboarding/mobile-onboarding-footer";
import {OnboardingLayout} from "@/components/onboarding/onboarding-layout";
import {Steps} from "@/components/onboarding/steps";
import {WorkspaceContainer} from "@/components/onboarding/workspace-container";
import {withRequiredAuthentication} from "@/lib/services/auth";
import {yupResolver} from "@hookform/resolvers/yup";
import {Alert, Box, Button, Typography, Snackbar} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {request} from "@/helpers/request";
import {useTranslations} from "next-intl";

export const getServerSideProps = withRequiredAuthentication(
    async (ctx: GetServerSidePropsContext, {organisation, locale, organization360, messages}) => {
        return {
            props: {
                locale,
                organisation,
                organization360,
                messages
            },
        };
    }
);

interface FormSchema {
    reportName: string;
}

export default function FirstReport({
                                        organisation,
                                        organization360,
                                    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const t = useTranslations('waipify.ui');
    const router = useRouter();
    const theme = useTheme();
    const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState<boolean | string>(false);

    const getFilialData = async (org: string) => {
        const res = await request<{ filials?: any }>(`/api/impact360/filial/${org}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res?.filials[0]?.id || '';
    };

    const loadOrganization = async (companyName: string) => {
        try {
            const res = await request<{ organizations?: any }>(
                `/api/impact360/organization?name=${companyName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return await getFilialData(res?.organizations[0].id);
        } catch (error) {
            console.log(error);
        }
    };

    const schema = yup.object({
        reportName: yup.string().required(t("name_report.name_required")),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormSchema>({
        resolver: yupResolver(schema),
    });

  const onSubmit = useCallback(
    async (form: FormSchema) => {
      setLoading(true);
      const date = new Date().toJSON();
      try {
        let filialId = (localStorage.getItem("defaultFilialId"))?.replaceAll('"', '');
        if (!filialId) {
          if (organization360?.id) {
            filialId = await getFilialData(organization360.id);
          } else {
            const companyName = organisation.organisationId ?? (localStorage.getItem("organisationId"))?.replaceAll('"', '');
            if (companyName) {
              filialId = await loadOrganization(companyName);
            }
          }
        }
        await request(`/api/impact360/report/${filialId}`, {
          method: "POST",
          body: {
            name: form.reportName,
            preview_url: "preview test",
            slug: "slug test",
            time_zone: date,
            default_currency_code: "eu",
            default_locale: "test",
          },
        }).then((res: any) => {
          router.replace("/360/aimanager/report").finally(() => setLoading(false));
        });
      } catch (e: any) {
        const { error } = e as { error: string };
        setShowError(error);
      }
    },
    [router]
  );

    const BannerBlock = () => {
        return (
            <Banner
                title={t("name_workspace.congrats")}
                icon={<Image src={userTick.src} alt="" width={64} height={64}/>}
            >
                {t("name_workspace.header")}
            </Banner>
        );
    };

    const FormBlock = ({py, px}: { py: number, px: number }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box py={py} px={px}>
                    <Typography fontSize={24} fontWeight="bold" mb={3}>
                        {t("name_report.name_first_report")}
                    </Typography>
                    <StyledTextField fullWidth {...register("reportName")} />
                    {errors.reportName ? (
                        <Typography color="error">
                            {errors.reportName.message}
                        </Typography>
                    ) : (
                        <></>
                    )}
                </Box>
                {isDesktopView ? (
                    <AuthFormFooter>
                        <Steps>Step 2 of 2</Steps>
                        <AuthFormActions>
                            <Button variant="contained" type="submit">
                                {t("general.finish")}
                            </Button>
                        </AuthFormActions>
                    </AuthFormFooter>
                ) : (
                    <></>
                )}
            </form>
        );
    };

    return (
        <OnboardingLayout>
            {isDesktopView ? (
                <>
                    {/* <BannerBlock /> */}
                    <WorkspaceContainer>
                        <FormBlock py={10} px={11}/>
                    </WorkspaceContainer>
                </>
            ) : (
                <>
                    <FormBlock py={5} px={4}/>
                    <Box paddingLeft={4} paddingRight={4}>
                        <BannerBlock/>
                    </Box>
                    <MobileOnboardingFooter
                        loading={loading}
                        step={2}
                        onNext={handleSubmit(onSubmit)}
                        onNextText={t("general.finish")}
                    />
                </>
            )}
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
