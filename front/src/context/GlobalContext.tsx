import exp from "constants";
import React from "react";

export const GlobalContext = React.createContext({
  terms: false,
  setTerms: (value: boolean) => {},
});
