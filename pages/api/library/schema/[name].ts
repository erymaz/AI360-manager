import type {NextApiRequest, NextApiResponse} from "next";
import NextCors from "nextjs-cors";
import {AuthData, withApiProtect} from "@/lib/services/auth";
import {getAuth} from "@clerk/nextjs/server";

function localizeForm(formList: Record<string, any>[], locale: any) {
    return formList.map((field) => {
        const localizedLabel = field.label.hasOwnProperty(locale)
            ? field.label[locale]
            : field.label["en-US"];

        return {
            ...field,
            label: localizedLabel,
        };
    });
}

async function handler(req: NextApiRequest, res: NextApiResponse, {locale: userLocale}: AuthData) {

    const {userId} = getAuth(req);

    if (!userId) {
        return res.status(401).json({error: "User must be logged in"});
    }


    if (req.method !== "GET") {
        res.status(405).send({message: "Only GET requests allowed"});
        return;
    }

    const {name, locale: queryLocale} = req.query;
    const locale = queryLocale ?? userLocale

    // Import and respond with the schema
    // Return 404 if there is no schema
    try {
        const {getFormSchema} = await import(`@/generators/${name}/main`);
        const loadedSchema = getFormSchema();
        const localizedFormSchema = localizeForm(loadedSchema, locale);
        res.status(200).json({data: localizedFormSchema});
    } catch (err) {
        // If the import fails (e.g., the file does not exist)
        if ((err as { code: string }).code === "ERR_MODULE_NOT_FOUND") {
            res.status(404).send({message: `Generator "${name}" not found`});
        } else {
            // Handle other errors
            res.status(500).json({error: err});
        }
    }
}

export default async function apiHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: "*",
        optionsSuccessStatus: 200,
    });

    return withApiProtect(handler)(req, res);
}
