import Layout360 from "@/components/layouts/Layout360";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export const getServerSideProps = withRequiredAuthentication(
    async (ctx, {organisation, organization360, locale, messages}) => {
        return {
            props: {
                companyName: organisation.companyName,
                organization360,
                locale,
                messages
            },
        };
    }
);

const Matching = ({
  companyName,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <>
      <div>Matching</div>
    </>
  );
}

Matching.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout360>
      {page}
    </Layout360>
  );
}

export default Matching;
