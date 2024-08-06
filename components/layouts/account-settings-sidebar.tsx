import { useTranslations } from "next-intl";
import { Role } from "@/types";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";
import {useClerk} from "@clerk/nextjs";

const SidebarLink = styled(Link)`
  color: #6a7381;
  line-height: 20px;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  font-size: 14px;
  font-weight: 600;
`;

const SidebarLinkTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1a262d;
  padding: 0.5rem;
`;

export const AccountSettingsSidebar = () => {
  const t = useTranslations('waipify.ui');
  const {session} = useClerk();

  const isOwner = session?.user?.publicMetadata['organizationRole'] == Role.OWNER
  const companyName = (session?.user?.publicMetadata['organizationName'] as string) || "";

  return (
    <div className="w-60 fixed left-0 top-0 h-full bg-white flex flex-col z-10 border border-border">
      <div className="w-full h-12 flex items-center px-4 border-b border-border">
        <Link href={{
          pathname: "/360/[viewmode]/dashboard",
          query: { viewmode: "aimanager" },
        }}>
          <Image
            src="/Logox141.png"
            alt="logo"
            width="140"
            height={32}
            className=""
          />
        </Link>
      </div>
      <div className="p-4">
        {isOwner && (
          <div className="flex flex-col mb-6">
            <SidebarLinkTitle>{companyName}</SidebarLinkTitle>
            <SidebarLink href="/account-settings">
              {t("account_settings.account_settings")}
            </SidebarLink>
            <SidebarLink href="/divisions">
              {t("account_settings.divisions")}
            </SidebarLink>
            <SidebarLink href="/departments">
              {t("account_settings.departments")}
            </SidebarLink>
            <SidebarLink href="/members">
              {t("account_settings.members")}
            </SidebarLink>
            <SidebarLink href="/usage">
              {t("account_settings.usage.usage")}
            </SidebarLink>
            {/* <SidebarLink href="/billing-settings">
              {t("account_settings.billing_settings")}
            </SidebarLink> */}
          </div>
        )}
        <div className="flex flex-col">
          <SidebarLinkTitle>{t("account_settings.user")}</SidebarLinkTitle>
          <SidebarLink href="/user-settings">
            {t("account_settings.user_settings")}
          </SidebarLink>
        </div>
      </div>
    </div>
  );
};
