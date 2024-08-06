import { useState, useRef, useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import Layout360 from "@/components/layouts/Layout360";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { request } from "@/helpers/request";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';

export const getServerSideProps = withRequiredAuthentication(
  async (ctx, { organisation, organization360, locale, messages }) => {
    return {
      props: {
        companyName: organisation.companyName,
        organization360,
        locale,
        messages,
      },
    };
  }
);

const Developer = (
{
  companyName,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const inputRef = useRef(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMask, setShowMask] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', function(event) {
      if (event.key === '.') {
        setShowMask(false);
      }
    });
  }, []);

  const addIdentifierForEntries = async () => {
    setIsLoading(true);

    await request<{ cases?: any }>(
      `/api/patches/add_entity_identifier`,
      {
        method: "POST",
      }
    ).then((res) => {
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }

  const moveOrgIndustry = async () => {
    setIsLoading(true);
    await request<{ cases?: any }>(
      `/api/patches/move_org_industry`,
      {
        method: "POST",
        body: {
        },
      }
    ).then((res) => {
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }

  const moveTaskToSolution = async () => {
    setIsLoading(true);
    await request<{ cases?: any }>(
      `/api/patches/case_to_solution`,
      {
        method: "POST",
        body: {
        },
      }
    ).then((res) => {
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }

  const moveTaskToSolutionReviews = async () => {
    setIsLoading(true);
    await request<{ cases?: any }>(
      `/api/patches/case_to_solution_reviews`,
      {
        method: "POST",
        body: {
        },
      }
    ).then((res) => {
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }

  return (
    <div className="relative flex-1 flex flex-col p-6 min-h-screen">
      <h1 className="text-lg font-bold text-red-600">
        Dangerous to perform these actions without guide. Please ask developer.
      </h1>
      <div className="mt-4">
        <Button onClick={addIdentifierForEntries}>
          Add identifiers for entries
        </Button>
      </div>
      <div className="mt-4">
        <Button onClick={moveOrgIndustry}>
          Move ORG industry to classification
        </Button>
      </div>
      <div className="mt-4">
        <Button onClick={moveTaskToSolution}>
          Move task_to_solution to case_to_solution
        </Button>
      </div>
      <div className="mt-4">
        <Button onClick={moveTaskToSolutionReviews}>
          Move task_to_solution_reviews to case_to_solution_reviews
        </Button>
      </div>

      {/* Mask */}
      {showMask && <div className="absolute left-0 top-0 w-full h-full z-10 bg-white bg-opacity-60" />}
    </div>
  );
}

Developer.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout360>
      {page}
    </Layout360>
  );
}

export default Developer;
