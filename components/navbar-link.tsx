import styled from "@emotion/styled";
import Link from "next/link";
import { useMemo } from "react";
import { ComponentPropsWithRef } from "react";

const StyledLink = styled(Link)<{ active: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #25333c;
  font-weight: 600;
  font-size: 18px;
  margin-left: 2rem;
  padding-bottom: 0px;
  letter-spacing: 0px;
  border-bottom: ${({ active }) =>
    active === 'true' ? "3px solid #1F75FF;" : "3px solid #FFFFFF"};

  img {
    margin-right: 0.5rem;
  }
`;

interface ActiveRoutesProp {
  activeroutes: string[]
};

export const NavbarLink = (props: ComponentPropsWithRef<typeof Link> & ActiveRoutesProp) => {
  const currentPath = window.location.pathname;
  const isActive = useMemo(() => {
    for (let activeRoute of props.activeroutes) {
      if (currentPath.includes(activeRoute)) {
        return 'true';
      }
    }
    return 'false';
  }, [
    props.activeroutes,
    currentPath,
  ]);

  return (
    <StyledLink {...props} active={isActive} />
  )
};
