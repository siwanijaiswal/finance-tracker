import React, { useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOutUser } from "../../utils/firebase/firebase";
import { toast } from "react-toastify";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logoutFunc = () => {
    try {
      signOutUser()
        .then(() => {
          toast.success("user logged out");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar-menu">
      <p className="logo"> Financely </p>
      {user && (
        <p className="logo link" onClick={logoutFunc}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
