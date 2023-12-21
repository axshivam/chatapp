import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);





  const handleChange = async (e) => {
    const {name, value} = e.target;

    setSignupInfo({
      ...signupInfo,
      [name]: value
    });

    console.log("Name & Value", name, value);
  }

  const handleFormErrors = (signupInfo) => {
    const errors = {};

    const regexName = /^[^*|\":<>[\]{}`\\()'!#%^_+,./~?;@&$]+$/;

    if (!signupInfo.name.trim()) {
      errors.name = "Name is required.";
    } else if (!regexName.test(signupInfo.name.trim())) {
      errors.name = "Invalid characters in the name.";
    }

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!signupInfo.email.trim()) {
      errors.email = "Email is required.";
    } else if (!regexEmail.test(signupInfo.email.trim())) {
      errors.email = "Invalid email format.";
    }

    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!signupInfo.password.trim()) {
      errors.password = "Password is required.";
    } else if (!lengthRegex.test(signupInfo.password.trim())) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!uppercaseRegex.test(signupInfo.password.trim())) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!lowercaseRegex.test(signupInfo.password.trim())) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!numberRegex.test(signupInfo.password.trim())) {
      errors.password = "Password must contain at least one number.";
    } else if (!specialCharacterRegex.test(signupInfo.password.trim())) {
      errors.password = "Password must contain at least one special character.";
    }

    if (!signupInfo.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (signupInfo.confirmPassword.trim() !== signupInfo.password.trim()) {
      errors.confirmPassword = "Confirm password and password should be same.";
    }

    const regexNumber = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

    if (!signupInfo.mobileNumber) {
      errors.mobileNumber = "Phone number is required.";
    } else if (!regexNumber.test(signupInfo.mobileNumber)) {
      errors.mobileNumber = "Phone number is not valid.";
    }
    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(handleFormErrors(signupInfo));

    setIsSubmit(true);
  };


  useEffect(() => {
    console.log("formErrors:", formErrors);
    if(isSubmit && Object.keys(formErrors).length === 0) {
      console.log("Signup API");
    }
  });

  return (
    <>
      <Container>
        <Row>
          <Col md={5}></Col>
          <Col md={7}>
            <h3>Signup for Chatbot</h3>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <br />
              <input
                type="text"
                placeholder="Name"
                value={signupInfo.name}
                name="name"
                onChange={handleChange}
                maxLength={40}
                required
              />
              {formErrors.name && (<p><small>{formErrors.name}</small></p>)}
              <br /> <br />
              <label>Email</label>
              <br />
              <input
                type="email"
                placeholder="Email"
                value={signupInfo.email}
                name="email"
                onChange={handleChange}
                maxLength={40}
                required
              />
              {formErrors.email && (<p><small>{formErrors.email}</small></p>)}
              <br /> <br />
              <label>Password</label>
              <br />
              <input
                type="password"
                placeholder="Password"
                value={signupInfo.password}
                name="password"
                onChange={handleChange}
                maxLength={30}
                required
              />
              {formErrors.password && (<p><small>{formErrors.password}</small></p>)}
              <br /> <br />
              <label>Confirm Password</label>
              <br />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signupInfo.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                maxLength={30}
                required
              />
              {formErrors.confirmPassword && (<p><small>{formErrors.confirmPassword}</small></p>)}
              <br /> <br />
              <label>Mobile Number</label>
              <br />
              <input
                type="text"
                placeholder="Mobile Number"
                value={signupInfo.mobileNumber}
                name="mobileNumber"
                onChange={handleChange}
                maxLength={10}
                required
              />
              {formErrors.mobileNumber && (<p><small>{formErrors.mobileNumber}</small></p>)}
              <br /> <br />
              <button type="submit">Sign UP</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
