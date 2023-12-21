import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    console.log("Login Info:", loginInfo);
  };

  const handleFormErrors = (loginInfo) => {
    console.log("Login Info:", loginInfo);
    const errors = {};

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!loginInfo.email.trim()) {
      errors.email = "Email is required.";
    } else if (!regexEmail.test(loginInfo.email.trim())) {
      errors.email = "Invalid email format.";
    }

    const lengthRegex = /.{8,}/;

    if (!loginInfo.password.trim()) {
      errors.password = "Password is required.";
    } else if (!lengthRegex.test(loginInfo.password.trim())) {
      errors.password = "Password must be at least 8 characters.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(handleFormErrors(loginInfo));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (isSubmit && Object.keys(formErrors).length === 0) {
      console.log("API Called"); // TODO:
    }
  }, [formErrors]);
  return (
    <Container>
      <Row>
        <Col md={5}></Col>
        <Col md={7}>
          <h3>Login for Chatbot</h3>
          <Form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={loginInfo.email}
              required
            />
            {formErrors.email && (
              <p>
                <small>{formErrors.email}</small>
              </p>
            )}
            <br />
            <br />
            <label>Pasword</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={loginInfo.password}
              required
            />
            {formErrors.password && (
              <p>
                <small>{formErrors.password}</small>
              </p>
            )}
            <br />
            <br />
            <Button type="submit">Log in</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
