import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [profile, setProfile] = useState<
    { id: string; name: string; avatar_url: string; email: string }[]
  >([]);

  return (
    <GlobalContext.Provider
      value={{
        profile,
        setProfile,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
