"use client";

import { HeadingNav } from "@/components/heading-nav";
import { request } from "@/helpers/request";
import {useTranslations} from "next-intl";
import { withRequiredAuthentication } from "@/lib/services/auth";
import * as organisationService from "@/lib/services/organisation";
import styled from "@emotion/styled";
import {
    Alert,
    Box,
    Button,
    FormLabel,
    IconButton,
    Snackbar,
    Typography,
    CircularProgress,
    Select,
    MenuItem
} from "@mui/material";
import {StyledTextField} from "@/components/form-control";
import {InferGetServerSidePropsType} from "next";
import router from "next/router";
import {useState} from "react";
import {AddOutlined, EditOutlined, DeleteOutline, SaveOutlined} from "@mui/icons-material";
import {getLocalizedCountries} from "@/lib/models/organisation-details.model";
import {useForm} from "react-hook-form";
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
}

const schema = yup.object({
    name: yup.string().required("Name is required"),
});

const Departments = ({
  id,
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
  const [selectedFillal, setSelectedFillal] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [name, setName] = useState<string>("");

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
        if (companyName) {
            loadOrganization();
        }
    }, []);

    useLayoutEffect(() => {
        if (selectedFillal) {
            getDepartmentData(selectedFillal)
        }
    }, [selectedFillal]);

    const getFilialData = async (org: string) => {
        await request<{ filials?: any }>(`/api/impact360/filial/${org}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res) {
                setFillals(res.filials);
                setSelectedFillal(res.filials[0].id);
            }
        });
    };

    const getDepartmentData = async (filialId: string) => {
        await request<{ departments?: any }>(`/api/impact360/department?filial_id=${filialId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res) {
                setDepartments(res.departments);
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

    const onSave = async () => {
        if (!name || !selected) {
            setShowError(t("general.something_went_wrong"));
            return;
        }
        setLoading(true);
        try {
            if (selected) {
                await request(`/api/impact360/department/${selected.id}`, {
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

        try {
            await request(`/api/impact360/department`, {
                method: "POST",
                body: {
                    name: form.name,
                    filial_id: selectedFillal
                },
            });
            getDepartmentData(selectedFillal!);
            setShowForm(false);
            reset();
        } catch (e) {
            setShowError(t("general.something_went_wrong"));
        }
        setLoading(false);
    }

  const onDelete = async (id: string): Promise<void> => {
    try {
      await request(`/api/impact360/department/${id}`, {
        method: "DELETE",
      });
      const _departments = departments.filter(_ => _.id !== id);
      setDepartments(_departments);
    } catch (e) {
      setShowError(t("general.something_went_wrong"));
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <HeadingNav
        title={t("account_settings.departments")}
        onBack={() => router.back()}
      />
      <div className="bg-white p-8 rounded-lg">
        <Title>
          Company Details
        </Title>
        <Description className="mb-8">Organization/division</Description>

        <Select
          sx={{ mb: "20px" }}
          value={selectedFillal}
          onChange={() => {}}
          inputProps={{ "aria-label": "Without label" }}
        >
          {fillals.map((fillal, index) => (
            <MenuItem
              key={fillal.id}
              value={fillal.id}
              onClick={() => {
                setSelectedFillal(fillal.id);
              }}
            >
              {fillal.name}
            </MenuItem>
          ))}
        </Select>

        {departments.map((department: any, index: number) => {
          return (
            <FlexBox key={index}>
              {selected?.id !== department.id ?
                <FillalName>{department["name"]}</FillalName> :
                <StyledTextField
                  id="name_edit"
                  placeholder="Name"
                  value={name}
                  style={{ marginRight: 6, marginBottom: 6 }}
                  onChange={(e)=>setName(e.target.value)}
                />
              }
              {selected?.id !== department.id ?
                <IconButton
                  aria-label="edit"
                  edge="end"
                  style={{ marginRight: 6 }}
                  onClick={()=>{
                    setSelected(department);
                    setName(department.name);
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

              <IconButton
                aria-label="settings"
                edge="end"
                style={{ marginRight: 6 }}
                onClick={()=>onDelete(department.id)}
              >
                <DeleteOutline />
              </IconButton>
            </FlexBox>
          );
        })}

        <FlexBox style={{ cursor: 'pointer', marginTop: 20 }} onClick={()=>setShowForm(true)}>
          <AddOutlined color="info" /> <span style={{ color: '#0288d1' }}>Add new department</span>
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

Departments.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  )
}

export default Departments;
