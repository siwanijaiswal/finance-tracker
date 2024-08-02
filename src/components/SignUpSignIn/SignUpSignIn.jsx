import React from "react";
import "./SignUpSignIn.css";
import { useState } from "react";
import FormInput from "../FormInput/FormInput.jsx";
import Button from "../Button/Button.jsx";

const defaultFormFields = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpSignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onClick = () => {
    console.log("error");
  };

  return (
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
        <Button type="button" onClick={onClick}>
          {" "}
          Signup With Email
        </Button>
        <p style={{ textAlign: "center", margin: 0 }}>Or</p>
        <Button blue={true} onClick={onClick}>
          {" "}
          Signup With Google
        </Button>
      </form>
    </div>
  );
};

export default SignUpSignIn;
