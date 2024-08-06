import * as React from "react";
import { createContext, useContext } from "react";

export const DEFAULT_LOCALE = "en-US";

export type LocaleContextType = {
  locale: string;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: DEFAULT_LOCALE,
});

export const useLocale = () => {
  return useContext(LocaleContext);
};
