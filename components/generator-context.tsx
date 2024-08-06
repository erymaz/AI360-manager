import React, { useContext } from "react";

export const GeneratorContext = React.createContext<{ name?: string }>({
  name: "",
});

export const useGeneratorContext = () => {
  const context = useContext(GeneratorContext);
  return context;
};
