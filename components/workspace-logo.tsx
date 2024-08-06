import { colorIcons, lightenDarkenColor } from "./color-icons";
import { Logo } from "./logo-templates";
import { WorkspaceDto } from "@/types";
import styled from "@emotion/styled";
import { useMemo } from "react";

export const StyledLogoImage = styled.img<{ size?: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  object-fit: contain;
  border-radius: 8px;
  margin-right: 1rem;
`;

const StyledLogo = styled.div<{ size?: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  padding: 10px;
  border-radius: 8px;
  background: #73ffd7;
  border: 1px solid #73ffd7;
  margin-right: 1rem;
`;

export const cachedWorkspaces: Record<string, WorkspaceDto | undefined> = {};

export const WorkspaceLogo = ({
  workspace,
  size = "medium",
}: {
  workspace: WorkspaceDto;
  size?: "small" | "medium" | "large";
}) => {
  cachedWorkspaces[workspace.id] = workspace;
  const lightColor = useMemo(() => {
    return lightenDarkenColor(
      colorIcons[workspace.template?.color || "green"],
      110
    );
  }, [workspace.template?.color]);

  const sizeMap = {
    small: "2.5rem",
    medium: "3.5rem",
    large: "4.5rem",
  } as const;

  const logoSize = sizeMap[size];

  return workspace?.logoUrl ? (
    <StyledLogoImage size={logoSize} src={workspace.logoUrl} />
  ) : (
    <StyledLogo
      size={logoSize}
      style={{
        background: lightColor,
        border: "1px solid " + lightColor,
      }}
    >
      <Logo
        name={workspace?.template?.name}
        fill={lightColor}
        stroke={colorIcons[workspace?.template?.color || "green"]}
        width="100%"
        height="100%"
        style={{ display: "block" }}
      />
    </StyledLogo>
  );
};
