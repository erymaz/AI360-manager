"use client";

import { HeadingNav } from "@/components/heading-nav";
import { request } from "@/helpers/request";
import {useTranslations} from "next-intl";
import { withRequiredAuthentication } from "@/lib/services/auth";
import * as organisationService from "@/lib/services/organisation";
import styled from "@emotion/styled";
import {Alert, Box, Button, FormLabel, IconButton, Snackbar, Typography, CircularProgress} from "@mui/material";
import {StyledTextField} from "@/components/form-control";
import {InferGetServerSidePropsType} from "next";
import router from "next/router";
import {useState} from "react";
import {AddOutlined, EditOutlined, DeleteOutline, SaveOutlined} from "@mui/icons-material";
import {getLocalizedCountries} from "@/lib/models/organisation-details.model";
import {CountrySelect} from "@/components/onboarding/country-select";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import LayoutAccount from "@/components/layouts/LayoutAccount";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

const Title = styled.h2<{ fontSize?: string }>`
    font-size: ${({fontSize}) => fontSize || "1.5rem"};
    font-weight: bold;
    line-height: normal;
    margin-bottom: 0.6rem;
    color: #1a262d;
`

const Description = styled.p`
    font-size: 14px;
    color: #6a7381;
`

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`

const FillalName = styled.div`
    font-size: 18px;
    font-weight: 400;
    margin-right: 10px;
`

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

interface FormSchema {
    name: string;
    country: string;
    address: string;
    address_number: string;
    city: string;
    zip_code: string;
    state: string;
}

const schema = yup.object({
    name: yup.string().required("Name is required"),
    country: yup.string().required("Country is required"),
});

const Divisions = ({
  defaultValues,
  role,
  companyName,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const t = useTranslations('waipify.ui');

  const [showError, setShowError] = useState<boolean | string>(false);
  const [successAlert, setSuccessAlert] = useState<
    boolean | string | undefined
  >(false);
  const [loading, setLoading] = useState(false);
  const [impOrganization, setImpOrganization] = useState<any>(null);
  const [fillals, setFillals] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [countries, setCountries] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        control,
    } = useForm<FormSchema>({
        resolver: yupResolver(schema),
    });

    useLayoutEffect(() => {
        loadCountry()
        if (companyName) {
            loadOrganization();
        }
    }, []);

    const getFilialData = async (org: string) => {
        await request<{ filials?: any }>(`/api/impact360/filial/${org}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res) {
                setFillals(res?.filials);
            }
        });
    };

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
                    getFilialData(res?.organizations[0].id);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const loadCountry = async () => {
        await request<{ countries?: any }>(`/api/impact360/countries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            if (res) {
                setCountries(res?.countries);
            }
        });
    }

    const onSave = async () => {
        if (!impOrganization?.id || !name || !selected) {
            setShowError(t("general.something_went_wrong"));
            return;
        }
        setLoading(true);
        try {
            if (selected) {
                await request(`/api/impact360/filial/${impOrganization.id}/${selected.id}`, {
                    method: "PUT",
                    body: {
                        name,
                    },
                });
            }
        } catch (e) {
            setShowError(t("general.something_went_wrong"));
        }
        setName("");
        setSelected(null);
        setLoading(false);
    };

    const onSubmit = async (form: FormSchema) => {
        setLoading(true);
        const countryDetail: any = countries.find((item: any) => {
            return item.id == form.country
        })

        try {
            await request(`/api/impact360/filial/${impOrganization.id}`, {
                method: "POST",
                body: {
                    name: form.name,
                    address: form.address,
                    address_number: form.address_number,
                    zip_code: form.zip_code,
                    country_id: countryDetail.id,
                    deletable: true
                },
            });
            getFilialData(impOrganization.id);
            setShowForm(false);
            reset();
        } catch (e) {
            setShowError(t("general.something_went_wrong"));
        }
        setLoading(false);
    }

  const onDelete = async (id: string): Promise<void> => {
    try {
      await request(`/api/impact360/filial/${impOrganization.id}/${id}`, {
        method: "DELETE",
      });
      const _fillals = fillals.filter(_ => _.id !== id);
      setFillals(_fillals);
    } catch (e) {
      setShowError(t("general.something_went_wrong"));
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <HeadingNav
        title={t("account_settings.divisions_branches")}
        onBack={() => router.back()}
      />
      <div className="bg-white p-8 rounded-lg">
        <Title>
          {t("account_settings.organisation_divisions")}
        </Title>
        <Description className="mb-6">
          If you want to have different organizations, divisions, branches from your company with separate access or reprots please add them here
        </Description>

        {fillals.map((fillial: any, index: number) => {
          return (
            <FlexBox key={index}>
              {selected?.id !== fillial.id ?
                <FillalName>{fillial["name"]}</FillalName> :
                <StyledTextField
                  id="name_edit"
                  placeholder="Name"
                  value={name}
                  style={{ marginRight: 6, marginBottom: 6 }}
                  onChange={(e)=>setName(e.target.value)}
                />
              }
              {selected?.id !== fillial.id ?
                <IconButton
                  aria-label="edit"
                  edge="end"
                  style={{ marginRight: 6 }}
                  onClick={()=>{
                    setSelected(fillial);
                    setName(fillial.name);
                  }}
                >
                  <EditOutlined />
                </IconButton> :
                <IconButton
                  aria-label="save"
                  edge="end"
                  style={{ marginRight: 6 }}
                  onClick={onSave}
                >
                  <SaveOutlined />
                </IconButton>
              }

              {fillial.deletable && <IconButton
                aria-label="settings"
                edge="end"
                style={{ marginRight: 6 }}
                onClick={()=>onDelete(fillial.id)}
              >
                <DeleteOutline />
              </IconButton>}
              {!fillial.deletable && <Description>
                Default (it was created when you create your organization)
              </Description>}
            </FlexBox>
          );
        })}

        <FlexBox style={{ cursor: 'pointer', marginTop: 20 }} onClick={()=>setShowForm(true)}>
          <AddOutlined color="info" /> <span style={{ color: '#0288d1' }}>Add new division</span>
        </FlexBox>

        {showForm &&
        <form
          style={{ marginTop: 20, borderRadius: 8, padding: 16, border: '1px solid #ebeaea' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box marginBottom={2}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <StyledTextField
              fullWidth
              id="name"
              {...register("name")}
            />
            {errors.name ? (
              <Typography color="error">
                {errors.name.message}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Title style={{ marginTop: 30 }} fontSize="1rem">
            {t("account_settings.address")}
          </Title>
          <Description>
            Address of the division/branch
          </Description>
          <Box marginBottom={1}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelect value={field?.value} onChange={field?.onChange} countries={countries}
                />
              )}
            />
            {errors.country ? (
              <Typography color="error">{errors.country.message}</Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box marginBottom={1}>
            <StyledTextField
              fullWidth
              id="address"
              placeholder="Address Line1"
              {...register("address")}
            />
            {errors.address ? (
              <Typography color="error">
                {errors.address.message}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box marginBottom={1}>
            <StyledTextField
              fullWidth
              id="address_number"
              placeholder="Address Line2"
              {...register("address_number")}
            />
            {errors.address_number ? (
              <Typography color="error">
                {errors.address_number.message}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box marginBottom={1}>
            <Box display={"inline-block"} width={"49%"}>
              <StyledTextField
                fullWidth
                id="city"
                placeholder="City"
                {...register("city")}
              />
              {errors.city ? (
                <Typography color="error">
                  {errors.city.message}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Box display={"inline-block"} width={"49%"} marginLeft={"2%"}>
              <StyledTextField
                fullWidth
                id="zip_code"
                placeholder="Postal Code"
                {...register("zip_code")}
              />
              {errors.zip_code ? (
                <Typography color="error">
                  {errors.zip_code.message}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </Box>
          <Box marginBottom={2}>
            <StyledTextField
              fullWidth
              id="state"
              placeholder="State"
              {...register("state")}
            />
            {errors.state ? (
              <Typography color="error">
                {errors.state.message}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
          <Box marginTop={2} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              style={{ marginRight: 10 }}
            >
              {loading ? (
                <CircularProgress
                  sx={{ marginRight: "1rem" }}
                  size={20}
                  color="inherit"
                />
              ): 'Create'}
            </Button>
            <Button
              variant="outlined"
              onClick={()=>{
                setShowForm(false)
              }}
            >
              {t("general.cancel")}
            </Button>
          </Box>
        </form>}
        <Snackbar
          open={!!showError}
          autoHideDuration={3000}
          onClose={() => setShowError(false)}
        >
          <Alert severity="error">{showError}</Alert>
        </Snackbar>
      </div>
    </div>
  );
}

Divisions.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  )
}

export default Divisions;
