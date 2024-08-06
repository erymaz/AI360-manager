import {Container} from "@/components/container";
import {Content} from "@/components/content";
import Navbar from "@/components/navbar";
import {Page} from "@/components/page";
import {withRequiredAuthentication} from "@/lib/services/auth";
import {Role} from "@/types";
import styled from "@emotion/styled";
import {InferGetServerSidePropsType} from "next";
import {useTranslations} from "next-intl";

const BlockedPageTitle = styled.div`
    color: #1a262d;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    padding: 0.5rem;
`;

const BlockedPageText = styled.div`
    color: #6a7381;
    line-height: 20px;
    padding: 0.5rem;
`;

export const getServerSideProps = withRequiredAuthentication(
    async (ctx, {organisation, role, locale, organization360, messages}) => {
        if (!organisation.blockedAt) {
            return {
                redirect: {
                    destination: "/workspaces",
                    permanent: false,
                },
            };
        }

        return {
            props: {
                role,
                locale,
                companyName: organisation.companyName,
                organization360,
                messages
            },
        };
    },
    {allowBlocked: true}
);

export default function BlockedSubscription({
                                                role,
                                                companyName,
                                                organization360,
                                            }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const isOwner = role === Role.OWNER;
    const t = useTranslations('waipify.ui');
    return (
        <Page>
            <Navbar companyName={companyName} organization360={organization360}/>
            <Container>
                <Content>
                    <BlockedPageTitle>{t("blocked_page.title")}</BlockedPageTitle>
                    <BlockedPageText>
                        {t(
                            isOwner
                                ? "blocked_page.message_for_admin"
                                : "blocked_page.message_for_user"
                        )}
                    </BlockedPageText>
                </Content>
            </Container>
        </Page>
    );
}
