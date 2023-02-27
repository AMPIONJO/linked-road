import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import '../pages/Registration.css';
import logo from "../images/TransLogo.png";

const Registration = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    estateName: "",
    address: ""
  });
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Comment out the axios.post call if you don't have an API endpoint
      axios.post("your_api_endpoint", formData).then((response) => {
        console.log(response.data);
      });
    }
    setValidated(true);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
  }

  const handleLoginClick = () => {
    setShowLoginForm(true);
  }

  return (
    <div class="page-container">
    <Container fluid>
      <Row>
        <Col md={6} className="d-flex justify-content-center align-items-center">
         <div class="left-half">
          <img
            src={logo}
            alt="placeholder"
            className="img-fluid"
          />
          </div>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          {!showLoginForm ? (
            <div className="w-100">
            <div class="right-half">
              <div className="slide-1">
                <Button className="me-2" onClick={handleLoginClick}>Sign In</Button>
                <Button onClick={handleRegisterClick}>Sign Up</Button>
              </div>
              <div class="slide-2">
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="registration-form mt-4">
                <Row>
                  <Col>
                    <Form.Group controlId="firstName">
                      <Form.Label className="mb-0">First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        placeholder="Enter your First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid" className="feedback">
                        Please provide a first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="lastName">
                      <Form.Label className="mb-0">Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        placeholder="Enter your Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid" className="feedback">
                        Please provide a last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="email">
                  <Form.Label className="mb-0">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="phoneNumber">
  <Form.Label className="mb-0">Phone Number</Form.Label>
  <Form.Control
    required
    type="tel"
    name="phoneNumber"
    placeholder="Enter Phone Number"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    value={formData.phoneNumber}
    onChange={handleInputChange}
  />
  <Form.Control.Feedback type="invalid" className="feedback">
    Please provide a valid phone number.
  </Form.Control.Feedback>
</Form.Group>
<Form.Group controlId="estateName">
  <Form.Label className="mb-0">Estate Name</Form.Label>
  <Form.Control
    required
    type="text"
    name="estateName"
    placeholder="Enter Estate Name"
    value={formData.estateName}
    onChange={handleInputChange}
  />
  <Form.Control.Feedback type="invalid" className="feedback">
    Please provide an estate name.
  </Form.Control.Feedback>
</Form.Group>
<Form.Group controlId="address">
  <Form.Label className="mb-0">Address</Form.Label>
  <Form.Control
    required
    type="text"
    name="address"
    placeholder="Enter Address"
    value={formData.address}
    onChange={handleInputChange}
  />
  <Form.Control.Feedback type="invalid" className="feedback">
    Please provide an address.
  </Form.Control.Feedback>
</Form.Group>
<Button type="submit" variant="primary" className="w-100 mt-4">
  Register
</Button>
</Form>
</div>
</div>
</div>
) : (
<div className="w-100">
  <div className="d-flex justify-content-center">
  <div class="right-half">
  <div className="slide-1">
    <Button className="me-2" onClick={handleLoginClick}>
      Sign In
    </Button>
    <Button onClick={handleRegisterClick}>Sign Up</Button>
  </div>
  </div>
  </div>
  <Form noValidate validated={validated} onSubmit={handleSubmit} className="registration-form mt-4">
    <Form.Group controlId="loginEmail">
      <Form.Label className="mb-0">Email</Form.Label>
      <Form.Control
        required
        type="email"
        name="loginEmail"
        placeholder="Enter Email"
      />
      <Form.Control.Feedback type="invalid">
        Please provide a valid email.
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="loginPassword">
      <Form.Label className="mb-0">Password</Form.Label>
      <Form.Control
        required
        type="password"
        name="loginPassword"
        placeholder="Enter Password"
      />
      <Form.Control.Feedback type="invalid">
        Please provide a password.
      </Form.Control.Feedback>
    </Form.Group>
    <Button type="submit" variant="primary" className="w-100 mt-4">
      Login
    </Button>
  </Form>
</div>
)}
</Col>
</Row>
</Container>
</div>
);
};

export default Registration;



