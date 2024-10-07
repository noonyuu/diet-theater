import { useNavigate } from "react-router-dom";

var path = import.meta.env.VITE_APP_HISTORY_PATH;

export const History = () => {
  const navigate = useNavigate();
  const url = path;
  return <div>History</div>;
};
