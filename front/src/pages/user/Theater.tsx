import React, { useEffect } from "react";
import "./theater.css";

export const Theater = () => {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return <div></div>;
};
