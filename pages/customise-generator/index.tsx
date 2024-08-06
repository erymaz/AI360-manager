import buildingsIcon from "../../public/buildings.svg";
import locationIcon from "../../public/location.svg";
import {
  AuthFormActions,
  AuthFormFooter,
} from "@/components/onboarding/auth-form";
import {
  CustomiseItem,
  CustomiseItemsList,
  CustomiseItemsListMobile,
} from "@/components/onboarding/customise-item";
import { MobileOnboardingFooter } from "@/components/onboarding/mobile-onboarding-footer";
import { MobileOnboardingHeader } from "@/components/onboarding/mobile-onboarding-header";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { Steps } from "@/components/onboarding/steps";
import { loadAiGenerators } from "@/generators/listing";
import { localizeMeta } from "@/helpers/localization";
import { request } from "@/helpers/request";
import { useLocalStorage } from "@/helpers/use-local-storage";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { AiGenerator } from "@/types";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {useTranslations} from "next-intl";

const CustomiseGeneratorContainer = styled.div`
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

const schema = yup.object({
  generators: yup
    .array()
    .min(1, "You need to select at least one generator")
    .required(),
});

export const getServerSideProps = withRequiredAuthentication(
  async (ctx: GetServerSidePropsContext, { locale, messages }) => {
    const aiGenerators = loadAiGenerators(ctx);
    const allGenerators = localizeMeta(
      await aiGenerators,
      ctx
    ) as AiGenerator[];
    return {
      props: { allGenerators, locale, messages },
    };
  }
);

export default function CustomiseGenerator({
  allGenerators,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations('waipify.ui');
  const [workspaceName, setWorkspaceName] =
    useLocalStorage<string>("workspaceName");
  const [showError, setShowError] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<FormSchema>({
    defaultValues: { generators: [] },
    resolver: yupResolver(schema),
  });

  const value = watch();

  // Add a state variable for the search input
  const [searchInput, setSearchInput] = useState("");

  // Update the search input state when the user types in the search bar
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Filter the generators based on the search input
  const searchInputLower = searchInput.toLowerCase();
  const filteredGenerators = allGenerators.filter((ag) => {
    const { title, description, tags = [] } = ag;
    return [title, description, tags.join(' ')].some(text =>
      (text as string).toLowerCase().includes(searchInputLower)
    );
  });

  const onSubmit = useCallback(
    async ({ generators }: FormSchema) => {
      setLoading(true);
      try {
        await request(`/api/workspaces`, {
          body: {
            generators,
            workspaceName,
          },
        });
        setWorkspaceName("");
        router.push("/");
      } catch (e) {
        setShowError((e as { error: string }).error);
      }

      // Submit form data, redirect to home/workspaces and clear the storage
      setLoading(false);
    },
    [router, setWorkspaceName, workspaceName]
  );

  const isSelected = useCallback(
    (name: string) => {
      return value.generators.includes(name);
    },
    [value]
  );

  const selectGenerator = (name: string, checked?: boolean) => {
    const newValue = checked
      ? [...value.generators, name]
      : value.generators.filter((item) => item !== name);
    setValue("generators", newValue);
  };

  const ListItemsController = () => {
    return (
      <Controller
        control={control}
        name="generators"
        render={() => (
          <>
            {filteredGenerators.map((item) => (
              <CustomiseItem
                generator={item}
                key={item.name}
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
    );
  };

  return (
    <>
      {isDesktopView ? (
        <OnboardingLayout>
          <CustomiseGeneratorContainer>
            <Typography
              component="h2"
              fontSize={24}
              textAlign="center"
              fontWeight="bold"
            >
              {t("general.add_and_customize")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <CustomiseItemsList>
                <ListItemsController />
              </CustomiseItemsList>
              {errors.generators ? (
                <Typography color="error">
                  {errors.generators.message}
                </Typography>
              ) : (
                <></>
              )}
              <AuthFormFooter>
                <Steps>Step 3 of 3</Steps>
                <AuthFormActions>
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading && (
                      <CircularProgress
                        sx={{ marginRight: "1rem" }}
                        size={20}
                        color="inherit"
                      />
                    )}
                    Finish
                  </Button>
                </AuthFormActions>
              </AuthFormFooter>
            </form>
          </CustomiseGeneratorContainer>
        </OnboardingLayout>
      ) : (
        <>
          <MobileOnboardingHeader>
            {t("general.add_and_customize")}
          </MobileOnboardingHeader>
          <Box
            sx={{
              padding: "0 1rem",
              marginBottom: "-2rem",
              display: "flex",
              justifyContent: "center",
              marginTop: "8rem",
            }}
          >
            <TextField
              label={t("general.search")}
              variant="outlined"
              value={searchInput}
              onChange={handleSearchInputChange}
              fullWidth
              sx={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#F5F7F9",
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomiseItemsListMobile>
              <ListItemsController />
            </CustomiseItemsListMobile>
            {errors.generators ? (
              <Typography color="error">{errors.generators.message}</Typography>
            ) : (
              <></>
            )}
          </form>
          <MobileOnboardingFooter
            loading={loading}
            step={3}
            onNext={handleSubmit(onSubmit)}
            onNextText={"Finish"}
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
    </>
  );
}
