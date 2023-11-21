import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutHandler = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (onLogout) {
      onLogout();
      navigate("/login");
    }
  }, [navigate, onLogout]);

  return null;
};

export default LogoutHandler;
