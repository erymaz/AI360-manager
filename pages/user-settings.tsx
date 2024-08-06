import { HeadingNav } from "@/components/heading-nav";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { InferGetServerSidePropsType } from "next";
import router from "next/router";
import LayoutAccount from "@/components/layouts/LayoutAccount";
import { UserProfile } from "@clerk/nextjs";

export const getServerSideProps = withRequiredAuthentication(
    async (ctx, {organisation, role, locale, organization360, messages}) => {
        return {
            props: {
                companyName: organisation.companyName,
                role,
                locale,
                organization360,
                messages
            },
        };
    }
);

const UserSettings = ({
  companyName,
  role,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <HeadingNav title="User Settings" onBack={() => router.back()} />
      <UserProfile routing={"hash"} appearance={{}}/>
    </div>
  );
}

UserSettings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutAccount>
      {page}
    </LayoutAccount>
  )
}

export default UserSettings;
