import { Content } from "./content";
import { Footer } from "./footer";
import { Logo } from "./logo";
import { Main } from "./main";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode } from "react";

export const OnboardingLayout = ({ children }: { children?: ReactNode }) => {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up("md"));

  return isDesktopView ? (
    <Main>
      <Content>
        <Logo
          src="/Logox141.png"
          width={200}
          height={35}
          alt="wAIpify"
          priority={true}
        />
        {children}
      </Content>
      <Footer>&copy; wAIpify, 2023</Footer>
    </Main>
  ) : (
    <>{children}</>
  );
};
