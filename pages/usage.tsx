import { HeadingNav } from "@/components/heading-nav";
import { MonetaryAmount } from "@/components/monetary-amount";
import { useTranslations } from "next-intl";
import { withRequiredAuthentication } from "@/lib/services/auth";
import * as billingService from "@/lib/services/billing";
import styled from "@emotion/styled";
import {InferGetServerSidePropsType} from "next";
import router from "next/router";
import LayoutAccount from "@/components/layouts/LayoutAccount";

const UsageSettingsTitle = styled.div`
    color: #1a262d;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    padding: 0.5rem;
`;

const UsageSettingsText = styled.div`
    color: #6a7381;
    line-height: 20px;
    padding: 0.5rem;
`;

const UsageSettingsTotalAmount = styled.div`
    color: #207be5;
    font-size: 36px;
    line-height: 24px;
    padding: 0.5rem;
`;

export const getServerSideProps = withRequiredAuthentication(
    async (ctx, {organisation, locale, role, organization360, messages}) => {
        const {tenantId} = organisation;
        let currentUsageAmount: number;
        let date: string;

        const billingCycle = await billingService.getOrCreateBillingCycle(
            tenantId,
            new Date()
        );
        currentUsageAmount = billingCycle.currentUsageAmount;
        date = billingCycle.startsAt.toLocaleDateString(locale, {
            month: "long",
            year: "numeric",
        });

        return {
            props: {
                companyName: organisation.companyName,
                currentUsageAmount,
                date,
                role,
                locale,
                organization360,
                messages
            },
        };
    }
);

const Usage = ({
  companyName,
  currentUsageAmount,
  date,
  role,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const t = useTranslations('waipify.ui');

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <HeadingNav title="Usage Limits" onBack={() => router.back()} />
      <div className="bg-white p-8 rounded-lg">
        <UsageSettingsTitle>
          {t("account_settings.usage.current_usage")}
        </UsageSettingsTitle>
        <UsageSettingsText>
          {t("account_settings.usage.on_current_billing_cycle")}{" "}
          ({date})
        </UsageSettingsText>
        <UsageSettingsTotalAmount>
          <MonetaryAmount centCost={currentUsageAmount} />
        </UsageSettingsTotalAmount>
      </div>
    </div>
  );
}

Usage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  )
}

export default Usage;
