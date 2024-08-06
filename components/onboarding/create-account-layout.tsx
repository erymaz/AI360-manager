import { FormContainer, FormContainerMobile } from "./form-container";
import { FreeTrial } from "./free-trial";
import { OnboardingLayout } from "./onboarding-layout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode } from "react";

export const CreateAccountLayout = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <OnboardingLayout>
      {isDesktopView ? (
        <FormContainer>
          <FreeTrial />
          {children}
        </FormContainer>
      ) : (
        <FormContainerMobile>{children}</FormContainerMobile>
      )}
    </OnboardingLayout>
  );
};
