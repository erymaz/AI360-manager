"use client";

import { HeadingNav } from "@/components/heading-nav";
import LayoutAccount from "@/components/layouts/LayoutAccount";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { OrganizationProfile, useClerk, useOrganizationList } from "@clerk/nextjs";
import { InferGetServerSidePropsType } from "next";
import router from "next/router";
import {useState} from "react";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

export const getServerSideProps = withRequiredAuthentication(
  async (ctx, { organisation, role, locale, organization360, messages }) => {
    return {
      props: {
        companyName: organisation.companyName,
        role,
        locale,
        organization360,
        messages,
      },
    };
  }
);

const Members = ({
  companyName,
  role,
  organization360,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user, organization } = useClerk();
  const { setActive } = useOrganizationList();

  const [activated, setActivated] = useState(false);

  useLayoutEffect(() => {
    const handleOrganizationActive = async () => {
      if (!organization?.id) {
        if (user && setActive && user.publicMetadata.organizationId) {
          const id = user.publicMetadata.organizationId as string;
          await setActive({ organization: id });
          setActivated(true);
        }
      }
    };
    handleOrganizationActive();
  }, [user]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <HeadingNav title="Members" onBack={() => router.back()} />
      {(organization?.id || activated) && (
        <OrganizationProfile routing={"hash"} />
      )}
    </div>
  );
};

Members.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutAccount>{page}</LayoutAccount>;
};

export default Members;
