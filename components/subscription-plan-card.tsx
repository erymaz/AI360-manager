import styled from "@emotion/styled";
import { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Plan } from "@/lib/models/subscription.model";
import { CheckOutlined } from "@mui/icons-material";

const StyledPlanCardContainer = styled.div`
  width: 100%;
  max-width: 360px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
`;

const StyledPlanCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  transition: all 0.15s ease-in;
  cursor: pointer;
`;

const StyledPlanPrice = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  color: #000000;

  & span {
    font-size: 16px;
    margin-left: 4px;
  }
`;

const StyledPlanTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  margin: 12px 0;
  color: #000000;
`;

const StyledPlanButton = styled.button`
  appearance: none;
  display: inline-block;
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-size: 1rem;
  text-align: center;
  background-color: #1c58d8;
  cursor: pointer;
  border-radius: 10px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  padding: 0.5rem 1rem;

  &:disabled {
    background-color: gray;
    color: #ccc;
  }
`;

const StyledPlanFeaturesContainer = styled.div`
  margin-top: 16px;
  padding: 12px 0;
`

const StyledPlanFeature = styled.div`
  display: flex;
  gap: 8px;
  font-size: 16px;
  margin-top: 6px;
`

export const SubscriptionPlanCard = ({
  plan,
  currentPlan,
  generatorName,
  workspaceId
}: {
  plan: Plan;
  currentPlan: string;
  generatorName: string;
  workspaceId: string;
}) => {
  const router = useRouter();

  const navigateToUpgrade = (priceId: string) => {
    router.push(
      `/subscription/activate/?generatorName=${encodeURIComponent(generatorName)}&workspaceId=${encodeURIComponent(workspaceId)}&priceId=${priceId}`
    );
  };

  return (
    <StyledPlanCardContainer>
      <StyledPlanCard>
        <StyledPlanPrice>
          €{plan.price / 100}
          <span>month</span>
        </StyledPlanPrice>
        <StyledPlanTitle>
          {plan.name}
        </StyledPlanTitle>
        <StyledPlanButton
          onClick={() => navigateToUpgrade(plan.prices[0].id)}
          disabled={currentPlan === plan.name}
        >
          {currentPlan === plan.name ? 'Current' : 'Upgrade'}
        </StyledPlanButton>
        <StyledPlanFeaturesContainer>
          {plan.features.map(feature => 
            <StyledPlanFeature key={feature.name}>
              <CheckOutlined color="success" />
              {feature.name}
            </StyledPlanFeature>
          )}
        </StyledPlanFeaturesContainer>
      </StyledPlanCard>
    </StyledPlanCardContainer>
  );
};
