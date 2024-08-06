import {
  AuthFormActions,
  AuthFormFooterMobile,
} from "@/components/onboarding/auth-form";
import { Steps } from "@/components/onboarding/steps";
import { Button, CircularProgress } from "@mui/material";

export const MobileOnboardingFooter = ({
  loading,
  step,
  onNext,
  onNextText,
}: {
  loading: boolean;
  step: number;
  onNext: () => Promise<void>;
  onNextText: string
}) => {
  return (
    <AuthFormFooterMobile>
      <Steps>Step {step} of 2</Steps>
      <AuthFormActions>
        <Button
          sx={{
            paddingLeft: "2em",
            paddingRight: "2em",
            color: "#fff",
            backgroundColor: "#1f75ff",
          }}
          onClick={onNext}
          variant="outlined"
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
          {onNextText}
        </Button>
      </AuthFormActions>
    </AuthFormFooterMobile>
  );
};
