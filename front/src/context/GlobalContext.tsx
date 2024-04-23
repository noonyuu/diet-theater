import React from "react";

export const GlobalContext = React.createContext({
  profile: [] as {
    id: string;
    name: string;
    avatar_url: string;
    email: string;
  }[],
  setProfile: (
    value: {
      id: string;
      name: string;
      avatar_url: string;
      email: string;
    }[]) => {},
});
