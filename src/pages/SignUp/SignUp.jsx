import React from "react";
import Header from "../../components/Header/Header";
import SignUpSignIn from "../../components/SignUpSignIn/SignUpSignIn";
import "./SignUp.css";

const SignUp = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <SignUpSignIn />
      </div>
    </>
  );
};

export default SignUp;
