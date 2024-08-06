import styled from "@emotion/styled";
import {Tooltip, tooltipClasses, styled as matStyled} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

const SidebarWraper = styled.div<{ view: string }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 79px;
    height: calc(100% - 60px);
    top: 60px;
    z-index: 8;
    overflow: hidden auto;
    background: ${({view}) => (view === "admin" ? "#000;" : "#1e428a")};
    padding-top: 40px;
    position: fixed;
    padding-bottom: 40px;
    transition: 0.3s all ease;

    &.scrolled {
        top: 0;
        height: 100%;
    }
`;
const SidebarUl = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
const SidebarLi = styled.li`
    position: relative;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 20px;
`;
const SidebarA = styled(Link)<{ active: string }>`
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 8px;
    padding-bottom: 2px;
    border-bottom: ${({active}) =>
            active === 'true' ? "4px solid #FFBB0A;" : "4px solid rgba(0,0,0,0)"};
    text-decoration: none;
`;
const CustomTooltip = matStyled(({className, ...props}: any) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme, view}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: view === "admin" ? "#000;" : "#1e428a",
        color: "#FFFFFF",
        fontSize: 14,
    },
}));

const WAPSidebar = ({view}: { view?: any }) => {
    const [scroll, setScroll] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const t = useTranslations('waipify.ui');

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 10);
        });
        setCurrentPath(window.location.pathname);
    }, [view]);

    return (
        <>
            <SidebarWraper
                className={scroll ? "wap-sidebar scrolled" : "wap-sidebar"}
                view={view ? view : ""}
            >
                <SidebarUl>
                    {view !== "admin" && (
                        <CustomTooltip title={t("sidebar.dashboard")} placement="right" view={view}>
                            <SidebarLi>
                                <SidebarA
                                    href={`/360/${view ? view : "aimanager"}/dashboard`}
                                    active={currentPath.includes(`360/${view ? view : "aimanager"}/dashboard`) ? 'true' : 'false'}
                                >
                                    <Image
                                        src="/dashboard.png"
                                        alt="dashboard"
                                        width={32}
                                        height={32}
                                    />
                                </SidebarA>
                            </SidebarLi>
                        </CustomTooltip>
                    )}
                    {view !== "admin" && (
                        <CustomTooltip title={t("sidebar.report")} placement="right" view={view}>
                            <SidebarLi>
                                <SidebarA
                                    href={`/360/${view ? view : "aimanager"}/report`}
                                    active={currentPath.includes(`360/${view ? view : "aimanager"}/report`) ? 'true' : 'false'}
                                    style={{letterSpacing: -1}}
                                >
                                    360°
                                </SidebarA>
                            </SidebarLi>
                        </CustomTooltip>
                    )}
                    <CustomTooltip title={t("sidebar.use_case")} placement="right" view={view}>
                        <SidebarLi>
                            <SidebarA
                                href={`/360/${view ? view : "aimanager"}/use-case`}
                                active={currentPath.includes(`360/${view ? view : "aimanager"}/use-case`) ? 'true' : 'false'}
                            >
                                <Image src="/uml.png" alt="uml" width={32} height={32}/>
                            </SidebarA>
                        </SidebarLi>
                    </CustomTooltip>
                    <CustomTooltip title={t("sidebar.ai-solutions")} placement="right" view={view}>
                        <SidebarLi>
                            <SidebarA
                                href={`/360/${view ? view : "aimanager"}/ai-solutions`}
                                active={currentPath.includes(`360/${view ? view : "aimanager"}/ai-solutions`) ? 'true' : 'false'}
                            >
                                <Image src="/phone.png" alt="phone" width={32} height={32}/>
                            </SidebarA>
                        </SidebarLi>
                    </CustomTooltip>
                    <CustomTooltip title={t("sidebar.ai-models")} placement="right" view={view}>
                        <SidebarLi>
                            <SidebarA
                                href={`/360/${view ? view : "aimanager"}/ai-models`}
                                active={currentPath.includes(`360/${view ? view : "aimanager"}/ai-models`) ? 'true' : 'false'}
                            >
                                <Image
                                    src="/dimensions.png"
                                    alt="dimensions"
                                    width={32}
                                    height={32}
                                />
                            </SidebarA>
                        </SidebarLi>
                    </CustomTooltip>
                    {view === "admin" && (
                        <CustomTooltip title={t("sidebar.ecosystem")} placement="right" view={view}>
                            <SidebarLi>
                                <SidebarA
                                    href={`/360/${view ? view : "aimanager"}/ecosystem`}
                                    active={currentPath.includes(`360/${view ? view : "aimanager"}/ecosystem`) ? 'true' : 'false'}
                                >
                                    <Image
                                        src="/computer.png"
                                        alt="computer"
                                        width={32}
                                        height={32}
                                    />
                                </SidebarA>
                            </SidebarLi>
                        </CustomTooltip>
                    )}
                    {/* <CustomTooltip title={t("sidebar.policies")} placement="right" view={view}>
            <SidebarLi>
              <SidebarA
                href={`/360/${view ? view : "aimanager"}/policies`}
                active={currentPath.includes(`360/${view ? view : "aimanager"}/policies`) ? 'true' : 'false'}
              >
                <Image
                  src="/insurance.png"
                  alt="insurance"
                  width={32}
                  height={32}
                />
              </SidebarA>
            </SidebarLi>
          </CustomTooltip> */}
                    {/* {view !== "admin" && (
            <CustomTooltip title={t("sidebar.launcher")} placement="right" view={view}>
              <SidebarLi>
                <SidebarA
                  href={`/360/${view ? view : "aimanager"}/launcher`}
                  active={currentPath.includes(`360/${view ? view : "aimanager"}/launcher`) ? 'true' : 'false'}
                >
                  <Image
                    src="/launch.png"
                    alt="launch"
                    width={32}
                    height={32}
                  />
                </SidebarA>
              </SidebarLi>
            </CustomTooltip>
          )} */}
                    {view === "admin" && (
                        <CustomTooltip title="Matching" placement="right" view={view}>
                            <SidebarLi>
                                <SidebarA
                                    href={`/360/admin/matching`}
                                    active={currentPath.includes(`360/admin/matching`) ? 'true' : 'false'}
                                >
                                    <Image
                                        src="/matching.png"
                                        alt="Matching"
                                        width={32}
                                        height={32}
                                    />
                                </SidebarA>
                            </SidebarLi>
                        </CustomTooltip>
                    )}
                </SidebarUl>

                {/* <SidebarUl>
          <CustomTooltip title={t("sidebar.document")} placement="right" view={view}>
            <SidebarLi>
              <SidebarA
                href={`/360/${view ? view : "aimanager"}/document`}
                active={currentPath.includes(`360/${view ? view : "aimanager"}/document`) ? 'true' : 'false'}
              >
                <Image
                  src="/document.png"
                  alt="launch"
                  width={32}
                  height={32}
                />
              </SidebarA>
            </SidebarLi>
          </CustomTooltip>
          <CustomTooltip title={t("sidebar.settings")} placement="right" view={view}>
            <SidebarLi>
              <SidebarA
                href={`/360/${view ? view : "aimanager"}/settings`}
                active={currentPath.includes(`360/${view ? view : "aimanager"}/settings`) ? 'true' : 'false'}
              >
                <Image src="/setting.png" alt="launch" width={32} height={32} />
              </SidebarA>
            </SidebarLi>
          </CustomTooltip>
        </SidebarUl> */}
            </SidebarWraper>
        </>
    );
};

export default WAPSidebar;
