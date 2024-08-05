import React from "react";
import "./SignUp.css";
import { useState } from "react";
import FormInput from "../FormInput/FormInput.jsx";
import Button from "../Button/Button.jsx";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.js";
import SignIn from "../SignIn/SignIn.jsx";
import { Link } from "react-router-dom";

const defaultFormFields = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signUpWithEmail = async (event) => {
    event.preventDefault();
    await createAuthUserWithEmailAndPassword(
      fullName,
      email,
      password,
      confirmPassword,
      setLoading
    );
    resetFormFields();
  };

  return (
    <div className="wrapper">
      <div className="signup-wrapper">
        <h2 className="signUp-header">
          {" "}
          Sign Up On <span style={{ color: "var(--theme)" }}>Financely.</span>
        </h2>
        <form>
          <FormInput
            label={"Full Name"}
            placeholder={"John Doe"}
            type="text"
            required
            name="fullName"
            onChange={handleChange}
            value={fullName}
          />
          <FormInput
            label={"Email"}
            placeholder={"JohnDoe@gmail.com"}
            type="email"
            required
            name="email"
            onChange={handleChange}
            value={email}
          />
          <FormInput
            label={"Password"}
            placeholder={"Your Password"}
            type="password"
            required
            name="password"
            onChange={handleChange}
            value={password}
          />
          <FormInput
            label={"Confirm Password"}
            placeholder={"Confirm Password"}
            type="password"
            required
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
          />
          <Button type="button" disabled={loading} onClick={signUpWithEmail}>
            {loading ? "loading..." : "Signup With Email"}
          </Button>
          <p style={{ textAlign: "center", margin: 0 }}>Or</p>
          <Button blue={true} disabled={loading} onClick={signUpWithEmail}>
            {loading ? "loading..." : "Signup With Google"}
          </Button>
          <Link className="p-login" to="/">
            Or Have an Account Already? Click here
          </Link>
        </form>
      </div>{" "}
    </div>
  );
};

export default SignUpSignIn;
