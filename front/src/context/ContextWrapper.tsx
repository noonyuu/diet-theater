import React, { useReducer, useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [terms, setTerms] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        terms,
        setTerms,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
