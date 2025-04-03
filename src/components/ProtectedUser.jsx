import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedUser = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo")) || null;

  useEffect(() => {
    if (!user || user?.email === "suhagrana.q@gmail.com") {
      toast.warning("Login first to access Cart page!", { toastId: "login-warning" }); 
      navigate("/login", { replace: true });
    }
  }, []); // Removed `user` and `navigate` to prevent re-runs

  return user && user.email !== "suhagrana.q@gmail.com" ? children : null;
};

export default ProtectedUser;
