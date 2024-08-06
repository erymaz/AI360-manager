"use client";

import { Container } from "@/components/container";
import { Content } from "@/components/content";
import { HeadingNav } from "@/components/heading-nav";
import {
  formatDate,
  HistoryItem,
  HistoryTable,
  sortByDatetime,
  truncateString,
} from "@/components/history";
import Navbar from "@/components/navbar";
import { Page } from "@/components/page";
import { getGenerations } from "@/lib/api/generation";
import { withRequiredAuthentication } from "@/lib/services/auth";
import * as workspaceService from "@/lib/services/workspace";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import {useTranslations} from "next-intl";

export const getServerSideProps = withRequiredAuthentication(
  async (
    ctx: GetServerSidePropsContext,
    { organisation, clerkUserId, role, locale, organization360, messages }
  ) => {
    const { workspaceId } = ctx.query;
    const workspace = await workspaceService.getWorkspaceByTenantAndId(
      organisation.tenantId,
      workspaceId!.toString(),
      clerkUserId,
      role
    );
    if (!workspace) {
      return {
        redirect: {
          destination: "/workspaces",
          permanent: false,
        },
      };
    }
    const generationPromises = workspace.generators.map(
      async (name) => await getGenerations(name, organisation.tenantId)
    );
    const historyItems: HistoryItem[] = await Promise.all(
      generationPromises
    ).then((res) =>
      sortByDatetime(
        res
          .map((x) => x.map((y) => y as unknown as HistoryItem))
          .reduce(
            (all, generations) => [
              ...all,
              ...generations.map((item) => ({
                generatorName: item.generatorName,
                formattedDate: formatDate(item.datetime),
                datetime: formatDate(item.datetime),
                title: truncateString(item.result),
                _id: item._id.toString(),
              })),
            ],
            [] as any
          )
      )
    );

    return {
      props: {
        workspace,
        historyItems,
        locale,
        companyName: organisation.companyName,
        organization360,
        messages
      },
    };
  }
);

export default function History({
  workspace,
  historyItems,
  companyName,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const t = useTranslations('waipify.ui');
  const router = useRouter();
  const workspaceId = router.query.workspaceId;

  return (
    <Page>
      <Navbar companyName={companyName} organization360={organization360} />
      <Container>
        <HeadingNav
          title={t("history.title")}
          subtitle={workspace.workspaceName}
          onBack={() => router.push(`/workspaces/${workspaceId}`)}
        />
        <Content>
          <HistoryTable historyItems={historyItems} />
        </Content>
      </Container>
    </Page>
  );
}
