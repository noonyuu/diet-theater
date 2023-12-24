import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
