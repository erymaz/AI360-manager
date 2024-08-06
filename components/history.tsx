import {useViewport} from "@/helpers/use-viewport";
import styled from "@emotion/styled";
import {Visibility} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {useRouter} from "next/router";
import React from "react";
import {useTranslations} from "next-intl";
import { useClerk } from "@clerk/nextjs";

export const StyledTable = styled.table`
    width: 100%;

    td {
        padding: 1rem;
    }

    th {
        padding: 1rem;
        text-transform: uppercase;
        text-align: left;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
    }

    tbody tr:not(:last-child) td {
        border-bottom: 1px solid #edeef3;
    }
`;

export const HistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export const tabLabels: Record<string, string> = {
    "en-US": "English",
    es: "Spanish",
    de: "German",
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    as: "Assamese",
    ay: "Aymara",
    az: "Azerbaijani",
    bm: "Bambara",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bho: "Bhojpuri",
    bs: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    ceb: "Cebuano",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    co: "Corsican",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    dv: "Dhivehi",
    doi: "Dogri",
    nl: "Dutch",
    eo: "Esperanto",
    et: "Estonian",
    ee: "Ewe",
    fil: "Filipino (Tagalog)",
    fi: "Finnish",
    fr: "French",
    fy: "Frisian",
    gl: "Galician",
    ka: "Georgian",
    el: "Greek",
    gn: "Guarani",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    hi: "Hindi",
    hmn: "Hmong",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    ilo: "Ilocano",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    jv: "Javanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    rw: "Kinyarwanda",
    gom: "Konkani",
    ko: "Korean",
    kri: "Krio",
    ku: "Kurdish",
    ckb: "Kurdish (Sorani)",
    ky: "Kyrgyz",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    ln: "Lingala",
    lt: "Lithuanian",
    lg: "Luganda",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mai: "Maithili",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    "mni-Mtei": "Meiteilon (Manipuri)",
    lus: "Mizo",
    mn: "Mongolian",
    my: "Myanmar (Burmese)",
    ne: "Nepali",
    no: "Norwegian",
    ny: "Nyanja (Chichewa)",
    or: "Odia (Oriya)",
    om: "Oromo",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    pa: "Punjabi",
    qu: "Quechua",
    ro: "Romanian",
    ru: "Russian",
    sm: "Samoan",
    sa: "Sanskrit",
    gd: "Scots Gaelic",
    nso: "Sepedi",
    sr: "Serbian",
    st: "Sesotho",
    sn: "Shona",
    sd: "Sindhi",
    si: "Sinhala (Sinhalese)",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tl: "Tagalog (Filipino)",
    tg: "Tajik",
    ta: "Tamil",
    tt: "Tatar",
    te: "Telugu",
    th: "Thai",
    ti: "Tigrinya",
    ts: "Tsonga",
    tr: "Turkish",
    tk: "Turkmen",
    ak: "Twi (Akan)",
    uk: "Ukrainian",
    ur: "Urdu",
    ug: "Uyghur",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    zu: "Zulu",
};

export function composeOutputByLocale(data: Record<string, any>[] | string) {
    if (typeof data === "string") return data;

    const filteredData = data.filter(
        ({locale, contentType, result}) =>
            locale && (typeof result.body === "string" || Array.isArray(result.body)),
    );

    return filteredData.reduce(
        (acc: Record<string, string>, {locale, result}) => {
            if (typeof result.body === "string") {
                acc[locale] = result.body;
            } else if (Array.isArray(result.body)) {
                acc[locale] = result.body.reduce(
                    (
                        bodyString: string,
                        {value, name}: { value?: string; name?: string }
                    ) => {
                        return value
                            ? `${bodyString}${name ? `${name}:\n` : ""}${value}\n\n\n`
                            : bodyString;
                    },
                    ""
                );
            }
            return acc;
        },
        {}
    );
}

export function renderHistoryOutput(data: Record<string, any>[] | string) {
    const resultByLocale = composeOutputByLocale(data);
    if (typeof resultByLocale === "string") return resultByLocale;

    return Object.entries(resultByLocale)
        .map(([locale, value]) => `${value.trim()}\n\n`)
        .join("\n")
        .trim();
}

export type HistoryItem = {
    _id: string;
    tenantId: string;
    userId: string;
    formData: {
        property_for: string;
        address: string;
        dont_show_exact_address: string;
        property_type: string;
        occupation_status: string;
        sq_meter: string;
        number_rooms: string;
        has_basement: string;
        year_of_construction: string;
        year_of_renovation: string;
        energy_certificate_validity_till: string;
        property_is_ideal_for: string;
        translations: string;
    };
    generatorName: string;
    result: any;
    datetime: string;
    workspaceId: string;

    formattedDate: string;
    title: string;
};

export const truncateString = (str: string = "", n: number = 30): string => {
    if (str.length <= n) {
        return str;
    }
    return str.substring(0, n) + "...";
};

export const sortByDatetime = (array: HistoryItem[]) => {
    return [...array].sort((a, b) => {
        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
    });
};

export const formatDate = (dateString?: string) => {
    if (!dateString) {
        return;
    }
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    } as const;

    return new Date(dateString).toLocaleDateString("en-US", options);
};

const Title = ({data}: { data: { result: { body: string } }[] | string }) => {
    if (typeof data === "string") {
        return <>{truncateString(data)}</>;
    }
    if (Array.isArray(data?.[0]?.result?.body)) {
        let title = "";
        try {
            title = truncateString(data?.[0]?.result?.body?.[0]?.value);
        } catch (e) {
            title = "Error rendering title";
        }

        return <>{title}</>;
    }

    let title = "";
    try {
        title = truncateString(data?.[0]?.result?.body);
    } catch (e) {
        title = "";
    }
    return <>{title}</>;
};

export const HistoryTable = ({
                                 historyItems,
                             }: {
    historyItems?: HistoryItem[];
}) => {
    const t = useTranslations('waipify.ui');
    const {session} = useClerk();
    const router = useRouter();
    const workspaceId = router.query.workspaceId;
    const {isDesktop} = useViewport();

    return (
        <StyledTable>
            <thead>
            <tr>
                {isDesktop && (
                    <>
                        <th>{t("history.header.title")}</th>
                        <th>{t("history.header.content_type")}</th>
                    </>
                )}
                <th>{t("history.header.date_generated")}</th>
                <th>{t("history.header.generated_by")}</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {historyItems?.map((item: HistoryItem) => (
                <tr key={item._id}>
                    {isDesktop && (
                        <>
                            <td>
                                <Title data={item.title || item.result}></Title>
                            </td>
                            <td>{t("history.generated")}</td>
                        </>
                    )}
                    <td>{item.formattedDate || formatDate(item.datetime)}</td>
                    <td>
                        {/* TODO: use userId and fetch the user name */}
                        {session?.user.firstName} {session?.user.lastName}
                    </td>
                    <td>
                        <Tooltip title="View">
                            <IconButton
                                href={`/generator/${item.generatorName}?workspaceId=${workspaceId}&historyId=${item._id}`}
                                sx={{
                                    border: "1px solid #EDEEF3",
                                    borderRadius: "8px",
                                }}
                            >
                                <Visibility/>
                            </IconButton>
                        </Tooltip>
                    </td>
                </tr>
            ))}
            </tbody>
        </StyledTable>
    );
};
