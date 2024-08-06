import { InferGetServerSidePropsType } from "next";
import Layout360 from "@/components/layouts/Layout360";
import { withRequiredAuthentication } from "@/lib/services/auth";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { withCurrency } from "@/helpers/utils";

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

const aiServices = [
  {
    id: 1,
    img: '/ai_service1.png',
    title: 'Work Better with AI',
    desc: 'Work Better with AI is an introductory AI crash course designed to kickstart your workforce’s to make the most of AI at work. In 90 minutes, your team will gain confidence and acquire the skills to start using autonomously tools such as Claude and ChatGPT.',
    popularity: 'High',
    price: '1200€'
  },
  {
    id: 2,
    img: '/ai_service2.png',
    title: 'Train the AI trainer',
    desc: 'Train-the-Trainer is a training approach that builds in-house expertise in AI so that your teams have always an internal reference that can support them and provide them knowledge when they need it.\n We make sure that your internal trainers have the tools and resources to keep your organization ahead of the curve in AI with 8 hours training and monthly support.',
    popularity: 'High',
    price: '3600€'
  },
  {
    id: 3,
    img: '/ai_service3.png',
    title: 'Custom AI development',
    desc: 'Sometimes the best approach to obtain accurate AI-generated outcomes that produce a great economic impact on our processes is a custom development.\n Our partners have years of experience in AI developments and provide the maximum quality and reliability.',
    popularity: 'High',
    price: 'Custom price'
  },
  {
    id: 4,
    img: '/ai_service4.png',
    title: 'Embed a Senior AI Developer in Your Team',
    desc: 'Only a small percentage of software developers have real experience in AI (12%). Add the necessary skills to your team to achieve reliable results with AI with professionals with proven experience from our partners.',
    popularity: 'High',
    price: '5600€/month'
  },
]

const Developer = (
{
  companyName,
  organization360
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col p-6">
      <h5 className="flex items-center text-sm">
        <span className="text-foreground">Home Page</span>
        <ChevronRight className="w-4 mx-2 text-muted-foreground" />
        <span className="text-muted-foreground">Request AI Services</span>
      </h5>

      <div className="w-full max-w-[1160px] grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 mt-4">
        {aiServices.map(service =>
          <div key={service.id} className="flex flex-col rounded-xl bg-white">
            <img src={service.img} alt="service" className="w-full rounded-t-xl" />
            <div className="flex-1 flex flex-col justify-between p-5">
              <div>
                <h2 className="text-black text-lg font-semibold">{service.title}</h2>
                <p className="mt-2 text-black">
                  {service.desc}
                </p>
              </div>
              <div className="w-full mt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground text-sm">
                    {/* <span className="mr-1">Popularity:</span>
                    <span className="">{service.popularity}</span> */}
                  </div>
                  <span className="text-lg font-semibold">
                    {service.price}
                  </span>
                </div>
                <Button className="w-full mt-4">
                  Request
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
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
