import { DEFAULT_LOCALE, LocaleContext } from "@/components/locale";
// translation
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/redux/provider";
import "@/styles/globals.css";
import { deDE, enUS } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
// styles of nprogress
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import type { NextPage } from "next";
import { NextIntlClientProvider } from "next-intl";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
// nprogress module
import "nprogress/nprogress.css";
import Modal from "react-modal";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// Set the app element for react-modal
Modal.setAppElement("#__next");

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const timeZone = "Europe/Vienna";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ClerkProvider
      {...pageProps}
      localization={router.locale === "en" ? enUS : deDE}
    >
      <Providers>
        <LocaleContext.Provider
          value={{ locale: pageProps.locale ?? DEFAULT_LOCALE }}
        >
          <CssBaseline />
          <NextIntlClientProvider
            locale={router.locale}
            timeZone={timeZone}
            messages={pageProps.messages}
          >
            {getLayout(<Component {...pageProps} />)}
          </NextIntlClientProvider>
          <Toaster />
        </LocaleContext.Provider>
      </Providers>
    </ClerkProvider>
  );
}

export default MyApp;
