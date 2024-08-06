import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { Locale } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

const extractCurrentLocaleKey = (localeKey: string): string => {
  const currentLocaleEntry = Object.entries(Locale).find((localeEntry) =>
    localeEntry[1].includes(localeKey)
  );
  if (!currentLocaleEntry) {
    return "en";
  }
  return currentLocaleEntry[0];
};

export const LocaleMenu = () => {
  const t = useTranslations("waipify.ui");
  const { locale, locales, query, pathname, push } = useRouter();
  const { toast } = useToast();

  const otherLocale = locales?.find((cur) => cur !== locale);

  const [currentDisplayLocaleKey, setCurrentDisplayLocaleKey] = useState(
    extractCurrentLocaleKey(locale!)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale !== locale) {
      setLoading(true);
      try {
        await push({
          pathname,
          query,
        }, undefined, { locale: newLocale });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to change language",
        });
      }
    }
  };

  return (
    <Select
      value={currentDisplayLocaleKey || undefined}
      onValueChange={(value) => {
        setCurrentDisplayLocaleKey(value);
        handleLocaleChange(otherLocale!);
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(Locale).map((entry) => (
          <SelectItem key={entry[0]} value={entry[0]}>
            <div className="flex items-center gap-x-2">
              {loading && <Spinner className="text-primaryColor" />}
              <span>{t(`navbar.locale.options.${entry[0]}`)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
