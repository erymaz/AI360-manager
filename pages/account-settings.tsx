"use client";

import { Content } from "@/components/content";
import { DeleteOrganisationModal } from "@/components/delete-organisation-modal";
import { StyledTextField } from "@/components/form-control";
import { HeadingNav } from "@/components/heading-nav";
import {
    AuthForm,
    AuthFormActions,
    AuthFormFooter,
    AuthFormTitle,
} from "@/components/onboarding/auth-form";
import { request } from "@/helpers/request";
import {
    COUNTRIES,
    getLocalizedCountries,
    Industry,
    LocalizedCountry,
    OrganisationDetailsFormData,
} from "@/lib/models/organisation-details.model";
import {withRequiredAuthentication} from "@/lib/services/auth";
import * as organisationService from "@/lib/services/organisation";
import styled from "@emotion/styled";
import {joiResolver} from "@hookform/resolvers/joi";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormLabel,
    Snackbar,
    Typography,
} from "@mui/material";
import Joi from "joi";
import {InferGetServerSidePropsType} from "next";
import router from "next/router";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LayoutAccount from "@/components/layouts/LayoutAccount";
import {useClerk} from "@clerk/nextjs";
import {useTranslations} from "next-intl";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

const DeleteOrganisationButton = styled(Button)`
    color: #6a7381;
    line-height: 20px;
    text-decoration: none;
    display: block;
    margin-top: 1rem;
    text-align: right;
    text-transform: none;
`;

export const getServerSideProps = withRequiredAuthentication(
    async (ctx, {organisation, clerkUserId, role, locale, organization360, messages}) => {

        const accountSettingsData =
            await organisationService.findOrganisationDetails(organisation.tenantId, clerkUserId);
        const {id, tenantId, ...defaultValues} = accountSettingsData;
        const countries = getLocalizedCountries(locale);

        return {
            props: {
                id,
                tenantId,
                defaultValues,
                namesDisabled: clerkUserId !== id,
                role,
                countries,
                locale,
                companyName: organisation.companyName,
                organization360,
                messages
            },
        };
    }
);

const schema = Joi.object<OrganisationDetailsFormData>({
    firstName: Joi.string().required().allow(null).messages({
        "string.empty": `account_settings.required`,
    }),
    lastName: Joi.string().required().allow(null).messages({
        "string.empty": `account_settings.required`,
    }),
    companyName: Joi.string().required().messages({
        "string.empty": `account_settings.required`,
    }),
    email: Joi.string()
        .required()
        .email({tlds: {allow: false}})
        .messages({
            "string.empty": `account_settings.required`,
            "string.email": `account_settings.not_valid`,
        }),
    companyWebsite: Joi.string().uri().optional().allow("").messages({
        "string.uri": `account_settings.not_valid`,
    }),
    addressLine1: Joi.string().required().messages({
        "string.empty": `account_settings.required`,
    }),
    addressLine2: Joi.string().required().allow(null),
    city: Joi.string().required().messages({
        "string.empty": `account_settings.required`,
    }),
    state: Joi.string().required().messages({
        "string.empty": `account_settings.required`,
    }),
    postalCode: Joi.string().required().messages({
        "string.empty": `account_settings.required`,
    }),
    country: Joi.string()
        .required()
        .equal(...COUNTRIES.map((country) => country.iso2))
        .messages({
            "string.empty": `account_settings.required`,
            "any.only": `account_settings.one_of`,
        }),
    taxId: Joi.string().optional().allow(null, ""),
    industry: Joi.object<Industry>()
        .required()
        .equal(
            ...Object.values(Industry).filter(
                (value) => value !== Industry.not_selected
            )
        )
        .messages({
            "string.empty": `account_settings.required`,
            "any.only": `account_settings.one_of`,
        }),
});

const AccountSettings = ({
  id,
  tenantId,
  defaultValues,
  namesDisabled,
  role,
  countries,
  companyName,
  organization360,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [showError, setShowError] = useState<boolean | string>(false);
  const [successAlert, setSuccessAlert] = useState<boolean | string | undefined>(false);
  const [loading, setLoading] = useState(false);
  const [impOrganization, setImpOrganization] = useState<any>(null);
  const [industries, setIndustries] = useState([]);
  const [deleteOrganisationModalOpened, setDeleteOrganisationModalOpened] = useState(false);
  const {signOut} = useClerk();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {isDirty, errors},
    } = useForm<OrganisationDetailsFormData>({
        defaultValues,
        resolver: joiResolver(schema),
    });

    useLayoutEffect(() => {
        loadIndustries()
        if (companyName) {
            loadOrganization();
        }
    }, []);

    const loadIndustries = async () => {
        await request<{ industries?: any }>(`/api/impact360/industries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res) {
                setIndustries(res?.industries);
            }
        });
    }

    const loadOrganization = async () => {
        try {
            await request<{ organizations?: any }>(
                `/api/impact360/organization?name=${companyName}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then(async (res) => {
                if (res) {
                    setImpOrganization(res?.organizations[0]);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    const onSubmit = async (formData: OrganisationDetailsFormData) => {
        const industry: any = industries.find((item: any) => {
            return item.name == formData.industry
        })
        if (!impOrganization || !industry) {
            return;
        }
        setLoading(true);
        try {
            await Promise.all([
                request(`/api/organisations`, {
                    method: "PUT",
                    body: {id, tenantId, ...formData},
                }),
                request(`/api/impact360/organization/${impOrganization.id}`, {
                    method: "PUT",
                    body: {
                        "industry_id": industry.id,
                    },
                }),
            ])
            setSuccessAlert(t("account_settings.successfully_updated"));
        } catch (e) {
            setShowError(t("general.something_went_wrong"));
        }
        setLoading(false);
    };
    const t = useTranslations('waipify.ui');

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <HeadingNav
        title={t("account_settings.account_settings")}
        onBack={() => router.back()}
      />
      <Content>
        <AuthForm>
          <AuthFormTitle>
            {t("account_settings.organisation_details")}
          </AuthFormTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom={1} margin={0}>
              <Box display={"inline-block"} width={"32%"} marginRight={"1%"}>
                <FormLabel htmlFor="firstName">
                  {t("account_settings.admin_first_name")}
                </FormLabel>
                <StyledTextField
                  fullWidth
                  id="firstName"
                  disabled={namesDisabled || loading}
                  {...register("firstName")}
                />
              </Box>
              <Box display={"inline-block"} width={"32%"} marginLeft={"1%"}>
                <FormLabel htmlFor="lastName">
                  {t("account_settings.admin_last_name")}
                </FormLabel>
                <StyledTextField
                  fullWidth
                  id="lastName"
                  disabled={namesDisabled || loading}
                  {...register("lastName")}
                />
              </Box>
              {errors.firstName?.message ? (
                <Typography color="error">
                  {t("account_settings.admin_first_name")}{" "}
                  {t(errors.firstName.message)}
                </Typography>
              ) : (
                <></>
              )}
              {errors.lastName?.message ? (
                <Typography color="error">
                  {t("account_settings.admin_last_name")}{" "}
                  {t(errors.lastName.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={1} marginBottom={1} width={"66%"}>
              <FormLabel htmlFor="email">
                {t("account_settings.admin_email")}
              </FormLabel>
              <StyledTextField
                fullWidth
                id="email"
                disabled={true}
                {...register("email")}
              />
              {errors.email?.message ? (
                <Typography color="error">
                  {t("account_settings.admin_email")}{" "}
                  {t(errors.email.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={1} marginBottom={1} margin={0}>
              <Box display={"inline-block"} width={"66%"} marginRight={"1%"}>
                <FormLabel htmlFor="companyName">
                  {t("account_settings.company_name")}
                </FormLabel>
                <StyledTextField
                  fullWidth
                  id="companyName"
                  disabled={loading}
                  {...register("companyName")}
                />
              </Box>
              <Box display={"inline-block"} width={"32%"} marginRight={"1%"}>
                <FormLabel htmlFor="industry"></FormLabel>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      paddingTop: 0,
                      paddingBottom: 0,
                    },
                  }}
                  clearOnBlur
                  id="industry"
                  disabled={loading}
                  options={Object.entries(Industry)
                    .filter(([, value]) => value !== Industry.not_selected)
                    .map(([key, value]) => {
                      return { key, value };
                    })}
                  getOptionLabel={(option: {
                    key: string;
                    value: Industry;
                  }) => t(`account_settings.industry.${option.key}`)}
                  onChange={(e, industryEntry) => {
                    setValue(
                      "industry",
                      industryEntry?.value ?? Industry.not_selected,
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                      }
                    );
                  }}
                  renderInput={(params) => (
                    <StyledTextField
                      {...params}
                      fullWidth
                      id="industry"
                      disabled={loading}
                      placeholder={t("account_settings.industry")}
                    />
                  )}
                  defaultValue={
                    Object.entries(Industry)
                      .filter(
                        ([, value]) =>
                          value === defaultValues.industry &&
                          value !== Industry.not_selected
                      )
                      .map(([key, value]) => {
                        return { key, value };
                      })[0] ?? null
                  }
                />
              </Box>
              {errors.companyName?.message ? (
                <Typography color="error">
                  {t("account_settings.company_name")}{" "}
                  {t(errors.companyName.message)}
                </Typography>
              ) : (
                <></>
              )}
              {errors.industry?.message ? (
                <Typography color="error">
                  {t("account_settings.industry")}{" "}
                  {t(errors.industry.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={1} marginBottom={1} width={"66%"}>
              <FormLabel htmlFor="companyWebsite">
                {t("account_settings.website")}
              </FormLabel>
              <StyledTextField
                fullWidth
                id="companyWebsite"
                disabled={loading}
                placeholder="for example https://www.waipify.com"
                {...register("companyWebsite")}
              />
              {errors.companyWebsite?.message ? (
                <Typography color="error">
                  {t("account_settings.website")}{" "}
                  {t(errors.companyWebsite.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={4}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#1a262d",
                }}
              >
                {t("account_settings.address")}
              </Typography>
            </Box>
            <Box marginTop={1} marginBottom={1}>
              <FormLabel htmlFor="country"></FormLabel>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    paddingTop: 0,
                    paddingBottom: 0,
                  },
                }}
                clearOnBlur
                id="country"
                disabled={loading}
                options={countries}
                getOptionLabel={(option: LocalizedCountry) =>
                  `${option.flag} ${option.name}`
                }
                onChange={(e, country) => {
                  setValue("country", country?.iso2 ?? "", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    fullWidth
                    id="country"
                    disabled={loading}
                    placeholder={t("account_settings.country")}
                  />
                )}
                defaultValue={
                  countries.filter(
                    (country) => country.iso2 === defaultValues.country
                  )[0] ?? null
                }
              />
              {errors.country?.message ? (
                <Typography color="error">
                  {t("account_settings.country")} {t(errors.country.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={1} marginBottom={1}>
              <FormLabel htmlFor="addressLine1"></FormLabel>
              <StyledTextField
                fullWidth
                id="addressLine1"
                disabled={loading}
                placeholder={t("account_settings.address1")}
                {...register("addressLine1")}
              />
              {errors.addressLine1?.message ? (
                <Typography color="error">
                  {t("account_settings.address1")}{" "}
                  {t(errors.addressLine1.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={1} marginBottom={1}>
              <FormLabel htmlFor="addressLine2"></FormLabel>
              <StyledTextField
                fullWidth
                id="addressLine2"
                disabled={loading}
                placeholder={t("account_settings.address2")}
                {...register("addressLine2")}
              />
              {errors.addressLine2?.message ? (
                <Typography color="error">
                  {t("account_settings.address2")}{" "}
                  {t(errors.addressLine2.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginBottom={1} margin={0}>
              <Box display={"inline-block"} width={"49%"} marginRight={"1%"}>
                <FormLabel htmlFor="city"></FormLabel>
                <StyledTextField
                  fullWidth
                  id="city"
                  disabled={loading}
                  placeholder={t("account_settings.city")}
                  {...register("city")}
                />
              </Box>
              <Box display={"inline-block"} width={"49%"} marginLeft={"1%"}>
                <FormLabel htmlFor="postalCode"></FormLabel>
                <StyledTextField
                  fullWidth
                  id="postalCode"
                  disabled={loading}
                  placeholder={t("account_settings.postal_code")}
                  {...register("postalCode")}
                />
              </Box>
              {errors.city?.message ? (
                <Typography color="error">
                  {" "}
                  {t("account_settings.city")} {t(errors.city.message)}
                </Typography>
              ) : (
                <></>
              )}
              {errors.postalCode?.message ? (
                <Typography color="error">
                  {t("account_settings.postal_code")}{" "}
                  {t(errors.postalCode.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={1} marginBottom={1}>
              <FormLabel htmlFor="state"></FormLabel>
              <StyledTextField
                fullWidth
                id="state"
                disabled={loading}
                placeholder={t("account_settings.state")}
                {...register("state")}
              />
              {errors.state?.message ? (
                <Typography color="error">
                  {" "}
                  {t("account_settings.state")} {t(errors.state.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box marginTop={4} marginBottom={1}>
              <FormLabel htmlFor="taxId">
                {t("account_settings.tax_id")}
              </FormLabel>
              <StyledTextField
                fullWidth
                id="taxId"
                disabled={loading}
                {...register("taxId")}
              />
              {errors.taxId?.message ? (
                <Typography color="error">
                  {t(errors.taxId.message)}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <AuthFormFooter>
              <AuthFormActions style={{ width: "100%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isDirty || loading}
                >
                  {loading && (
                    <CircularProgress
                      sx={{ marginRight: "1rem" }}
                      size={20}
                      color="inherit"
                    />
                  )}
                  {t("account_settings.save")}
                </Button>
                <DeleteOrganisationButton
                  onClick={() => setDeleteOrganisationModalOpened(true)}
                  disabled={loading}
                >
                  {t("account_settings.delete_organisation")}
                </DeleteOrganisationButton>
              </AuthFormActions>
            </AuthFormFooter>
          </form>
        </AuthForm>
        <Snackbar
          open={!!showError}
          autoHideDuration={3000}
          onClose={() => setShowError(false)}
        >
          <Alert severity="error">{showError}</Alert>
        </Snackbar>
        <Snackbar
          open={!!successAlert}
          autoHideDuration={3000}
          onClose={() => setSuccessAlert(undefined)}
        >
          <Alert severity="success">{successAlert}</Alert>
        </Snackbar>
        {deleteOrganisationModalOpened && (
          <DeleteOrganisationModal
            open={deleteOrganisationModalOpened}
            onClose={() => setDeleteOrganisationModalOpened(false)}
            onComplete={handleLogout}
            tenantId={tenantId}
          />
        )}
      </Content>
    </div>
  );
}

AccountSettings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  )
}

export default AccountSettings;
