import styled from "@emotion/styled";
import { ReactNode, createContext, useContext, useState } from "react";

export const StyledGeneratorLayout = styled.div`
  display: flex;
`;

const GeneratorLayoutContext = createContext<{
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}>({
  sidebarOpen: true,
  toggleSidebar: () => {},
});

export const useGeneratorLayout = () => {
  return useContext(GeneratorLayoutContext);
};

export const GeneratorLayout = ({ children }: { children?: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  return (
    <GeneratorLayoutContext.Provider value={{ toggleSidebar, sidebarOpen }}>
      <StyledGeneratorLayout>{children}</StyledGeneratorLayout>
    </GeneratorLayoutContext.Provider>
  );
};
