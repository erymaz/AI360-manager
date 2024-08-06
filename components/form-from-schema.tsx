import { FormFooter } from "./form-footer";
import { FormItem } from "./form-item";
import { useGeneratorLayout } from "./generator-layout";
import { MonetaryAmount } from "@/components/monetary-amount";
import {
  isSubscriptionValid,
  SubscriptionInfo,
  SubscriptionStatus,
} from "@/lib/models/subscription.model";
import { FormField, FormFieldType, Role } from "@/types";
import styled from "@emotion/styled";
import { AutoFixHighOutlined, BoltOutlined } from "@mui/icons-material";
import { Alert, Button, Link, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {useTranslations} from "next-intl";

const UpgradePlanLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
`;

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PriceDescription = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 14px;
  color: #9097ac;
  margin: 0 0px 5px 0;
`;

const FormFromSchema = ({
  schema = [],
  onFormSubmit,
  subscriptionInfo,
  generatorName,
  cost,
  workspaceId,
  loading,
  value,
  role,
}: {
  schema: FormField[];
  onFormSubmit?: (fieldData: Record<string, any>) => void;
  subscriptionInfo: SubscriptionInfo;
  generatorName: string;
  cost: number;
  workspaceId: string;
  loading?: boolean;
  value?: Record<string, any>;
  role: Role;
}) => {
  const t = useTranslations('waipify.ui');
  const [hasError, setHasError] = useState(false);
  const router = useRouter();
  const { toggleSidebar } = useGeneratorLayout();

  const form = useForm({
    defaultValues:
      value ||
      schema.reduce((all, field) => {
        if (field.formFieldType === FormFieldType.Group) {
          return {
            ...all,
            [field.name]: field.value,
            ...field.fields?.reduce(
              (all, field) => ({ ...all, [field.name]: field.value }),
              {}
            ),
          };
        }
        return {
          ...all,
          [field.name]: field.value,
        };
      }, {}),
  });

  useEffect(() => {
    if (value) {
      form.reset(value);
    }
  }, [form, value]);

  const formFields = schema.map((field, index) => (
    <FormItem key={index} field={field} />
  ));

  const handleSubmit = useCallback(
    (event: any) => {
      if (!onFormSubmit) {
        return;
      }
      toggleSidebar();
      onFormSubmit(event);
    },
    [onFormSubmit, toggleSidebar]
  );

  const navigateToUpgrade = () => {
    router
      .push(
        `/subscription/select-plan/?generatorName=${encodeURIComponent(
          generatorName
        )}&workspaceId=${encodeURIComponent(workspaceId)}`
      )
      .finally(() => (loading = false));
  };

  const onGenerate = () => {
    const hasErrors = !!Object.keys(form.formState.errors).length;
    if (hasErrors) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (form.formState.isSubmitting && !form.formState.isValid) {
      setHasError(true);
    }
  }, [form.formState.isSubmitting, form.formState.isValid]);
  const isOnValidSubscription = true; //isSubscriptionValid(subscriptionInfo);
  const canSubmit = isOnValidSubscription && !loading;
  const isOwner = role === Role.OWNER;

  return (
    <FormProvider {...form}>
      <StyledForm onSubmit={form.handleSubmit(handleSubmit)} method="post">
        {formFields}
        {onFormSubmit && (
          <FormFooter>
            <Button
              sx={{
                ":disabled": {
                  backgroundColor: "rgba(31,117,255,0.35)",
                },
              }}
              endIcon={<AutoFixHighOutlined />}
              variant="contained"
              fullWidth
              type="submit"
              disabled={!canSubmit}
              onClick={onGenerate}
            >
              {isOnValidSubscription && t("general.generate")}
              {!isOnValidSubscription && t("general.activate_subscription")}
            </Button>
            {isOwner && (
              <UpgradePlanLink onClick={navigateToUpgrade}>
                {/* {t("general.activate_subscription_after_trial")} */}
                Upgrade your plan
                <BoltOutlined />
              </UpgradePlanLink>
            )}
          </FormFooter>
        )}
      </StyledForm>
      <Snackbar
        open={!!hasError}
        autoHideDuration={5000}
        onClose={() => setHasError(false)}
      >
        <Alert severity="error">{t("general.invalid_form")}</Alert>
      </Snackbar>
    </FormProvider>
  );
};

export default FormFromSchema;
