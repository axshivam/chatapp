import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
    console.log("Login Info:", loginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted...");
  };
  return (
    <Container>
      <Row>
        <Col md={5}></Col>
        <Col md={7}>
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
            <br />
            <br />
            <Button type="submit">
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
