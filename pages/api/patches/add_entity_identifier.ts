import prisma from "@/lib/prisma";
import { withApiProtect, AuthData } from "@/lib/services/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import {getAuth} from "@clerk/nextjs/server";
import {sleep} from "@/helpers/utils";

// Add new identifier to existing entities
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  authData: AuthData
) {
  const {userId} = getAuth(req);
  if (!userId) {
      return res.status(401).json({error: "User must be logged in"});
  }

  if (req.method === "POST") {
    await startProcess();
    return res.status(200).json({ message: 'started' });
  }
}

async function startProcess() {
  const referencePrefixes: string[] = [];
  const referencesQuery = `SELECT e.reference FROM entries e WHERE e.reference IS NOT NULL;`;
  const references = await prisma.$queryRawUnsafe(referencesQuery) as {reference: string}[];
  for (const refe of references) {
    const lastIndex = refe.reference.lastIndexOf("-");
    if (lastIndex > 0) {
      const pre = refe.reference.slice(0, lastIndex+1);
      if (!referencePrefixes.includes(pre)) {
        referencePrefixes.push(pre);
      }
    }
  }

  const getValidPrefix = (originPrefix: string): string => {
    const samePrefixes = referencePrefixes.filter(_ => _.startsWith(originPrefix));
    if (!samePrefixes.length) {
      return originPrefix;
    } else {
      const newSuffix = String.fromCharCode(samePrefixes.length + 64);
      return `${originPrefix}${newSuffix}-`;
    }
  }

  try {
    // Get filials
    const filialsMap: Record<string, any> = {};
    const filials = await prisma.filials.findMany();
    for (const filial of filials) {
      filialsMap[filial.id] = filial;
    }

    // Get all reports
    const reportsGroupedByFilial: Record<string, any[]> = {};
    const reportsMap: Record<string, any> = {};
    const reports = await prisma.reports.findMany();
    for (const report of reports) {
      if (!report.filial_id) {
        continue;
      }
      reportsMap[report.id] = report;
      if (!reportsGroupedByFilial[report.filial_id]) {
        reportsGroupedByFilial[report.filial_id] = [];
      }
      reportsGroupedByFilial[report.filial_id].push(report);
    }

    for (const filialId in reportsGroupedByFilial) {
      const reportsInFilial = reportsGroupedByFilial[filialId];
      if (!reportsInFilial.length) {
        continue;
      }

      const filial = filialsMap[filialId];
      if (!filial) {
        continue;
      }
      const filialName = String(filial.name)?.toUpperCase()?.split(' ')?.join('');
      const filialAbbr = `${filialName[0]}${filialName[1]}`;

      const entityQueries = [];
      for (const report of reportsInFilial) {
        if (report.id) {
          entityQueries.push(
            prisma.entries.findMany({
              orderBy: [{
                created_at: 'asc'
              }],
              where: {
                report_id: String(report.id),
              },
            })
          );
        }
      }
      const entriesByReport = await Promise.all(entityQueries);

      for (const entries of entriesByReport) {
        if (!entries.length) {
          continue;
        }
        const reportId = entries[0]?.report_id;
        if (!reportId) {
          continue;
        }
        const report = reportsMap[reportId];
        if (!report) {
          continue;
        }

        let prefix = '';
        if (entries[0].reference) {
          const lastIndex = entries[0].reference.lastIndexOf("-");
          if (lastIndex > 0) {
            prefix = entries[0].reference.slice(0, lastIndex+1);
          }
        } else {
          let reportAbbr = '';
          const reportName = String(report.name)?.toUpperCase()?.split(' ')?.join('');
          if (reportName?.length > 2) {
            reportAbbr = `${reportName[0]}${reportName[1]}${reportName[2]}`;
          } else {
            reportAbbr = `${reportName[0]}${reportName[1]}`;
          }
          const _prefix = `${filialAbbr}-${reportAbbr}-`;
          prefix = getValidPrefix(_prefix);
          referencePrefixes.push(prefix);
        }

        const updateQueries = [];
        let index = 0;
        for (const entry of entries) {
          if (!entry.id) {
            continue;
          }
          index += 1;
          if (entry.reference) {
            continue;
          }
          updateQueries.push(prisma.entries.update({
            data: {
              reference: `${prefix}${(index).toString().padStart(6, '0')}`
            },
            where: {
              id: entry.id,
            },
          }))
        }
        await Promise.all(updateQueries);
        await sleep(10);
      }
    }

    console.log('-----------finished');
  } catch (e: any) {
    console.log(e);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return withApiProtect(handler)(req, res);
}
