import React from "react";
import "./SignIn.css";
import { useState } from "react";
import FormInput from "../FormInput/FormInput.jsx";
import Button from "../Button/Button.jsx";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.js";
import { Link } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithEmail = async (event) => {
    event.preventDefault();
    console.log("email", email);
    console.log("password", password);
    resetFormFields();
  };

  return (
    <div className="wrapper">
      <div className="signup-wrapper">
        <h2 className="signUp-header">
          {" "}
          Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
        </h2>
        <form>
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
          <Button type="button" disabled={loading} onClick={signInWithEmail}>
            Login Using Email and Password
          </Button>
          <p style={{ textAlign: "center", margin: 0 }}>Or</p>
          <Button blue={true} disabled={loading} onClick={signInWithEmail}>
            Login Using Google
          </Button>
          <Link className="p-login" to="/sign-up">
            Or Don't Have An Account? Click Here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
