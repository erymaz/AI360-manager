"use client"

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Clipboard,
  Zap,
  Codesandbox,
  Code,
} from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import {useClerk} from "@clerk/nextjs";

const DashboardSidebar = () => {
  const router = useRouter();
  const t = useTranslations('waipify.ui');
  const {session} = useClerk();

  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location?.pathname;
  }

  const [currentPath, setCurrentPath] = useState<string>("");
  const [view, setView] = useState<string>("");

  useEffect(() => {
    const viewMode = (router.query?.viewmode as string) || "";
    setView(viewMode)
    setCurrentPath(pathname);
  }, [router.query?.viewmode, pathname]);

  return (
    <div className="group hover:w-44 w-14 fixed left-0 top-0 h-full bg-white flex flex-col z-20 border border-border">
      <div className="w-full h-12 flex justify-center items-center border-b border-border">
        <Link href={{
          pathname: "/360/[viewmode]/report",
          query: { viewmode: "aimanager" },
        }}>
          <Image
            src="/logo.svg"
            alt="logo"
            width="32"
            height={32}
            className="block group-hover:hidden"
          />
          <Image
            src="/Logox141.png"
            alt="logo"
            width="140"
            height={32}
            className="hidden group-hover:block"
          />
        </Link>
      </div>
      <div className="flex-1 px-2 py-6 space-y-2">
        <div>
          <Link
            href={`/360/${view ? view : "aimanager"}/report`}
          >
            <div className={`w-full h-10 flex items-center px-2 rounded-md hover:bg-muted ${currentPath.includes(`360/${view ? view : "aimanager"}/report`) ? 'bg-muted' : ''}`}>
              <Clipboard className="w-5 text-primary" />
              <span className="hidden group-hover:block ml-3 font-semibold text-sm text-primary">
                {t("sidebar.reports")}
              </span>
            </div>
          </Link>
        </div>
        <div>
          <Link
            href={`/360/${view ? view : "aimanager"}/dashboard`}
          >
            <div className={`w-full h-10 flex items-center px-2 rounded-md hover:bg-muted ${currentPath.includes(`360/${view ? view : "aimanager"}/dashboard`) ? 'bg-muted' : ''}`}>
              <LayoutDashboard className="w-5 text-primary" />
              <span className="hidden group-hover:block ml-3 font-semibold text-sm text-primary">
                {t("sidebar.dashboard")}
              </span>
            </div>
          </Link>
        </div>
        <div>
          <Link
            href={`/360/${view ? view : "aimanager"}/ai-solutions`}
          >
            <div className={`w-full h-10 flex items-center px-2 rounded-md hover:bg-muted ${currentPath.includes(`360/${view ? view : "aimanager"}/ai-solutions`) ? 'bg-muted' : ''}`}>
              <Zap className="w-5 text-primary" />
              <span className="hidden group-hover:block ml-3 font-semibold text-sm text-primary">
                {t("sidebar.ai-solutions")}
              </span>
            </div>
          </Link>
        </div>
        {/* <div>
          <Link
            href={`/360/${view ? view : "aimanager"}/ai-models`}
          >
            <div className={`w-full h-10 flex items-center px-2 rounded-md hover:bg-muted ${currentPath.includes(`360/${view ? view : "aimanager"}/ai-models`) ? 'bg-muted' : ''}`}>
              <Codesandbox className="w-5 text-primary" />
              <span className="hidden group-hover:block ml-3 font-semibold text-sm text-primary">
                {t("sidebar.ai-models")}
              </span>
            </div>
          </Link>
        </div> */}
        {session?.user?.firstName === 'Murat' && <div>
          <Link
            href={`/360/${view ? view : "aimanager"}/developer`}
          >
            <div className={`w-full h-10 flex items-center px-2 rounded-md hover:bg-muted ${currentPath.includes(`360/${view ? view : "aimanager"}/developer`) ? 'bg-muted' : ''}`}>
              <Code className="w-5 text-primary" />
              <span className="hidden group-hover:block ml-3 font-semibold text-sm text-primary">
                Developer
              </span>
            </div>
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default DashboardSidebar;
