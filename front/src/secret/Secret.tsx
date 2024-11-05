import { Route, Routes } from "react-router-dom";
import { ContextWrapper } from "../context/ContextWrapper";
import { Terms } from "../pages/Terms";
import { Theater } from "../pages/user/Theater";

const Secret = () => {
  return (
    <>
      <ContextWrapper>
        <Routes>
          <Route path="/terms" element={<Terms />} />
          <Route path="/theater" element={<Theater />} />
        </Routes>
      </ContextWrapper>
    </>
  );
};

export default Secret;
