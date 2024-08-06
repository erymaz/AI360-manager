import { CheckboxFormControl } from "@/components/checkbox-form-control";
import { StyledTextField } from "@/components/form-control";
import {
  AuthForm,
  AuthFormActions,
  AuthFormFooter,
  AuthFormTitle,
} from "@/components/onboarding/auth-form";
import { CountrySelect } from "@/components/onboarding/country-select";
import { CreateAccountLayout } from "@/components/onboarding/create-account-layout";
import { FreeTrial } from "@/components/onboarding/free-trial";
import { IndustrySelect } from "@/components/onboarding/industry-select";
import { MobileOnboardingFooter } from "@/components/onboarding/mobile-onboarding-footer";
import { Steps } from "@/components/onboarding/steps";
import { request } from "@/helpers/request";
import { useLocalStorage } from "@/helpers/use-local-storage";
import * as organisationService from "@/lib/services/organisation";
import { Role } from "@/types";
import { useOrganizationList, useUser } from "@clerk/nextjs";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface FormSchema {
  companyName: string;
  firstName: string;
  lastName: string;
  country: string;
  industry: string;
  termsAgreement: boolean;
}

const schema = yup.object({
  companyName: yup.string().required("Company name is required"),
  termsAgreement: yup
    .boolean()
    .required("You need to agree to the terms and conditions"),
});

type Industry = {
  id?: string;
  name: string;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  const user = await clerkClient.users.getUser(userId);

  const organizationId = user?.publicMetadata?.organizationId;
  const userRole = user?.publicMetadata?.organizationRole as String;

  if (!organizationId || typeof organizationId !== "string" || !userRole) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  }

  const setupStage =
    await organisationService.getOrganisationOnboardingStepIndex(
      organizationId
    );
  if (userRole !== Role.OWNER) {
    if (setupStage > 1) {
      return {
        redirect: {
          destination: "/360/aimanager/report",
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/pending",
          permanent: false,
        },
      };
    }
  }

  if (setupStage === 1) {
    return {
      redirect: {
        destination: "/name-report",
        permanent: false,
      },
    };
  } else if (setupStage > 1) {
    return {
      redirect: {
        destination: "/360/aimanager/report",
        permanent: false,
      },
    };
  }

  const { locale } = ctx;
  const messages = (await import(`../../messages/${locale || "en"}.json`))
    .default;

  return {
    props: {
      locale,
      messages,
    },
  };
};

function CreateAccount() {
  const [showError, setShowError] = useState<boolean | string>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [, setLocal] = useLocalStorage<string>("organisationId");
  const [, setFilialLocal] = useLocalStorage<string>("defaultFilialId");
  const { setActive } = useOrganizationList();
  const { user } = useUser();

  const userId = user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });

  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

  const organizationId = user?.publicMetadata?.organizationId as string;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const loadUserDetails = async () => {
      const userRole = user?.publicMetadata?.organizationRole as String;

      const setupStage = await request<number>(
        `/api/organisations/setupstage`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (userRole !== Role.OWNER) {
        if (setupStage > 1) {
          router.push("/360/aimanager/report");
        } else {
          router.push("/pending");
        }
      }

      if (setupStage === 1) {
        router.push("/name-report");
      } else if (setupStage > 1) {
        router.push("/360/aimanager/report");
      }
    };

    loadUserDetails();
  }, [userId]);

  useEffect(() => {
    loadCountry();
    loadIndustry();
  }, []);

  const loadIndustry = async () => {
    await request<{ industries?: any }>(`/api/impact360/industries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res) {
        setIndustries(res?.industries);
      }
    });
  };

  const loadCountry = async () => {
    await request<{ countries?: any }>(`/api/impact360/countries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res) {
        setCountries(res?.countries);
      }
    });
  };

  const onSubmit = useCallback(
    async (form: FormSchema) => {
      setLoading(true);
      const countryDetail: any = await countries.find(
        (item: any) => item.id == form.country
      );
      const industryDetail: any = await industries.find(
        (item: any) => item.id == form.industry
      );

      try {
        const organization: any = await request(`/api/organisations`, {
          method: "POST",
          body: {
            ...form,
            organisationId: form.companyName,
            country: countryDetail.iso2,
            industry: industryDetail.name,
            country_id: form.country,
            industry_id: form.industry,
            locale_id: "",
          },
        });
        if (setActive && organizationId)
          await setActive({ organization: organizationId });

        if (organization) {
          const classificationRequest = request<{ industry?: any }>(
            `/api/impact360/classifications`,
            {
              method: "POST",
              body: {
                organization_id: organization.id,
                industry_id: form.industry,
                industry_category_id: "",
              },
            }
          );

          const defaultFilialRequest = request<{ filial?: any }>(
            `/api/impact360/filial/${organization.id}`,
            {
              method: "POST",
              body: {
                name: form.companyName,
                address: "",
                address_number: "",
                zip_code: "",
                country_id: form.country,
              },
            }
          );

          const [_, defaultFilial] = await Promise.all([
            classificationRequest,
            defaultFilialRequest,
          ]);
          
          setFilialLocal(defaultFilial.filial.id);
        }
        setLocal(form.companyName);
        router.replace("/name-report");
      } catch (e) {
        const { error } = e as { error: string };
        setShowError(error);
      }
      setLoading(false);
    },
    [countries, industries, router, setLocal, setFilialLocal]
  );

  return (
    <CreateAccountLayout>
      <AuthForm>
        <AuthFormTitle>Create your account</AuthFormTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            marginBottom={2}
            sx={{
              display: "flex",
              gap: ".5rem",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <StyledTextField
                fullWidth
                id="firstName"
                {...register("firstName")}
              />
              {errors.firstName ? (
                <Typography color="error">
                  {errors.firstName.message}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <StyledTextField
                fullWidth
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName ? (
                <Typography color="error">{errors.lastName.message}</Typography>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box marginBottom={2}>
            <FormLabel htmlFor="companyName">Company name</FormLabel>
            <StyledTextField
              fullWidth
              id="companyName"
              {...register("companyName")}
            />
            {errors.companyName ? (
              <Typography color="error">
                {errors.companyName.message}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box marginBottom={2}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelect
                  value={field?.value}
                  onChange={field?.onChange}
                  countries={countries}
                />
              )}
            />
            {errors.country ? (
              <Typography color="error">{errors.country.message}</Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box marginBottom={2}>
            <FormLabel htmlFor="industry">Industry</FormLabel>
            <Controller
              name="industry"
              control={control}
              render={({ field }) => (
                <IndustrySelect
                  value={field?.value}
                  onChange={field?.onChange}
                  industries={industries}
                />
              )}
            />
            {errors.industry ? (
              <Typography color="error">{errors.industry.message}</Typography>
            ) : (
              <></>
            )}
          </Box>
          <CheckboxFormControl>
            <Controller
              name="termsAgreement"
              control={control}
              render={({ field: { value, ref, ...field } }) => (
                <Checkbox
                  sx={{ padding: 0, marginRight: "1rem" }}
                  {...field}
                  inputRef={ref}
                  checked={!!value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <span>
              I have read and agree to the{" "}
              <Link
                href="https://www.aimanager360.com/privacy-policy"
                target="_blank"
              >
                Privacy policy
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.aimanager360.com/terms-of-use"
                target="_blank"
              >
                Terms of service
              </Link>
            </span>
          </CheckboxFormControl>
          {errors.termsAgreement ? (
            <Typography color="error">
              {errors.termsAgreement.message}
            </Typography>
          ) : (
            <></>
          )}
          {isDesktopView ? (
            <></>
          ) : (
            <Box marginTop={2}>
              <FreeTrial />
            </Box>
          )}
          {isDesktopView ? (
            <AuthFormFooter>
              <Steps>Step 1 of 2</Steps>
              <AuthFormActions>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  fullWidth={false}
                >
                  {loading && (
                    <CircularProgress
                      sx={{ marginRight: "1rem" }}
                      size={20}
                      color="inherit"
                    />
                  )}
                  Create Account
                </Button>
              </AuthFormActions>
            </AuthFormFooter>
          ) : (
            <></>
          )}
        </form>
      </AuthForm>
      <Snackbar
        open={!!showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">{showError}</Alert>
      </Snackbar>
      {isDesktopView ? (
        <></>
      ) : (
        <MobileOnboardingFooter
          loading={loading}
          step={1}
          onNext={handleSubmit(onSubmit)}
          onNextText={"Create Account"}
        />
      )}
    </CreateAccountLayout>
  );
}

export default CreateAccount;
