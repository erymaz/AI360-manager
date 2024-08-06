import styled from "@emotion/styled";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Box, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";

import { withRequiredAuthentication } from "@/lib/services/auth";
import * as stripeService from "@/lib/services/stripe";
import { SubscriptionPlanCard } from "@/components/subscription-plan-card";
import { Page } from "@/components/page";
import Navbar from "@/components/navbar";
import { Container } from "@/components/container";

export const PlanItemsList = styled(Box)`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const getServerSideProps = withRequiredAuthentication(
  async (ctx: GetServerSidePropsContext, { organisation, organization360, locale, messages }) => {
    const plans = await stripeService.getPricingModels();

    const workspaceId = ctx.query.workspaceId as string;
    const generatorName = ctx.query.generatorName as string;

    return {
      props: {
        workspaceId,
        generatorName,
        companyName: organisation.companyName,
        currentPlan: organisation.plan || '',
        organization360,
        plans,
        locale,
          messages
      },
    };
  },
  { requireOwner: true }
);

export default function SelectPlan({
  companyName,
  organization360,
  plans,
  currentPlan,
  workspaceId,
  generatorName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  // const { t } = useTranslation();

  return (
    <Page>
      <Navbar companyName={companyName} organization360={organization360}/>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <IconButton
            style={{ border: "solid 1px #D7DBE0", borderRadius: "8px" }}
            aria-label="generator"
            onClick={() => router.back()}
          >
            <ArrowBack />
          </IconButton>
          <Box sx={{ color: "#1A262D", marginLeft: 2, fontSize: 18 }}>
            Back
          </Box>
        </Box>
        <PlanItemsList>
          {plans.map(plan =>
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              currentPlan={currentPlan}
              workspaceId={workspaceId}
              generatorName={generatorName}
            />
          )}
        </PlanItemsList>
      </Container>
    </Page>
  );
}
