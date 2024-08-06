import {FormField} from "@/types";
import * as acceptLanguageParser from "accept-language-parser";
import {GetServerSidePropsContext} from "next";

export const getLocale = ({query,  locale: sessionLocale}: GetServerSidePropsContext) => {
    const locale =
        acceptLanguageParser.parse((query.locale as string) || sessionLocale)?.[0]
            ?.code || "en";
    return locale === "en" ? "en-US" : locale;
};

function localizeField(field: any, locale: string) {
    if (typeof field !== "object" || field === null) {
        return field ?? "";
    }

    if (Array.isArray(field)) {
        return field.map((option) => {
            const localizedOption = {...option};
            localizedOption.label = localizeField(option.label, locale);
            return localizedOption;
        });
    }

    return field[locale] ?? field["en-US"] ?? "";
}

export function localizeForm(
    formList: FormField[],
    ctx: GetServerSidePropsContext
): FormField[] {
    const locale = getLocale(ctx);

    return formList.map((field) => {
        const localizedLabel = localizeField(field.label, locale);
        const localizedPlaceholder = localizeField(field.placeholder, locale);
        const localizedOptions = localizeField(field.options, locale);

        if (field.name === "translations") {
            field.value = [locale];
        }

        return {
            ...field,
            label: localizedLabel,
            placeholder: localizedPlaceholder,
            options: localizedOptions,
            ...(field.fields
                ? {
                    fields: localizeForm(field.fields, ctx),
                }
                : {}),
        };
    });
}

export function localizeMeta(
    aiGenerators: Record<string, any>[],
    ctx: GetServerSidePropsContext
) {
    const locale = getLocale(ctx);
    return aiGenerators.map((aiGenerator) => {
        const localizedTitle = localizeField(aiGenerator.title, locale);
        const localizedDescription = localizeField(aiGenerator.description, locale);

        return {
            ...aiGenerator,
            title: localizedTitle,
            description: localizedDescription,
        };
    });
}
