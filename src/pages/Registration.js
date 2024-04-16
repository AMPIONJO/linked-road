import React, { useState } from "react";
import { Form, Button, Col, Row, Container, NavDropdown } from "react-bootstrap";
import axios from "axios";
import '../pages/Registration.css';
import logo from "../images/TransLogo.png";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import 'firebase/firestore';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 import { GoogleAuthProvider } from "firebase/auth";
 import { firebaseConfig, firebase } from "../firebaseConfig";
 import Select from 'react-select';
  
initializeApp(firebaseConfig);


const auth = getAuth();
const firestore = getFirestore();
const googleProvider = new GoogleAuthProvider();

const Registration = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    zone: "", // Default value
    address: "",
    preferredCommittee: "", // New field for preferred committee
    paymentCode: "",
    password: "",
    confirmPassword: "",
    paymentDetails: [], // Initialize paymentDetails as an empty array
  });
  
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState([]);


    // Define mapping of zones to addresses
    const zonesAddresses = {
      "Zone A": ["Tiebae Drive", "Kigathi Drive", "Kahinga Drive", "Link Road Crescent"],
      "Zone B": ["Country Drive", "Kings Drive", "Dagimu Drive", "Cherry Drive", "Kageche Drive", "Muchiri Drive", "Muite Drive","Link Road Crescent", "Kikuyu Link Road"],
      "Zone C": ["Nyaga Drive","Mondonye Drive", "Matathi Drive", "Levilla Drive", "Stima Drive", "Kikuyu Link Road"],
    };

    const handleTermsChange = (event) => {
      setAcceptedTerms(event.target.checked);
    };

    const handleDownload = () => {
        // If the PDF is stored statically in the public directory
    window.open('/docs/CONSTITUTIONRESIDENTS.pdf', '_blank');

    // If the PDF is stored in Firebase Storage (replace 'your_pdf.pdf' with the actual filename)
    // firebase.storage().ref('path/to/your_pdf.pdf').getDownloadURL().then((url) => {
    //   window.open(url, '_blank');
    // }).catch((error) => {
    //   console.error('Error generating download URL:', error);
    // });
    };

    const handleSelectInputChange = (selectedOptions, fieldName) => {
      const { name, type, value } = selectedOptions;
      if (fieldName === 'paymentDetails') {
          const selectedValues = selectedOptions.map((option) => option.value);
          setFormData({
           ...formData,
           paymentDetails: selectedValues, // Update payment details in the form data
          });
      } else if (fieldName === 'zone') {
        setFormData({
          ...formData,
          [fieldName]: selectedOptions.value,
          address: ''
        });
      } else if (fieldName === 'address') {
        setFormData({
          ...formData,
          [fieldName]: selectedOptions.value
        });
      }
    };
    
    const handleSelectChange = (selectedOptions, { name }) => {
      const selectedValues = selectedOptions.map((option) => option.value);
      setFormData({
        ...formData,
        [name]: selectedValues, // Update selected options in the form data
      });
    };

    const handleInputChange = (event, selectedOptions) => {
      const { name, type, value } = event.target;
    
      if (type === "select-multiple") {
          // Handle changes in the payment details dropdown
          // const selectedValues = selectedOptions.map((option) => option.value);
          // setFormData({
          //   ...formData,
          //   paymentDetails: selectedValues, // Update payment details in the form data
          // });
      } else if (name === "zone") {
        // If the selected zone changes, update both the zone and the address options
        setFormData({
          ...formData,
          [name]: value,
          address: '', // Set address to an empty string when a new zone is selected
        });
      } else {
        // If another input changes, update only that specific field in the form data
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };
    
    

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    // Check if the form is valid according to browser's built-in validation
    if (!form.checkValidity()) {
      event.stopPropagation();
      // Trigger validation styles
      setValidated(true);
      toast.error("Please fill out all required fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }
  
    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      event.stopPropagation();
      setValidated(true);
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }
  
    // Check if terms are accepted
    if (!acceptedTerms) {
      toast.error("Please accept the terms to register", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }
  
    // Check if payment details are selected
    if (selectedPaymentDetails.length === 0) {
      toast.error("Please select at least one payment detail", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }
  
    // If all conditions are met, proceed with registration
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log(user.uid); // logs the UID to the console
        
        // Increment the total user count in Firestore and use it as the membership number
        const userRef = collection(firestore, "users");
        getDocs(userRef).then((querySnapshot) => {
          const userCount = querySnapshot.size + 1; // Increment the count by 1 for the new user
          addDoc(userRef, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            estateName: formData.zone,
            address: formData.address,
            preferredCommittee: formData.preferredCommittee,
            paymentCode: formData.paymentCode,
            paymentDetails: selectedPaymentDetails, // Include the selected payment details
            membershipNumber: userCount,  // Assign the membership number
            uid: user.uid  // add the UID to the document
          });
        });
  
        setValidated(true);
        navigate("/");
        toast.success("Registration successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }) 
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      });
  };
  
  
  
  
const handleGoogleSignIn = (event) => {
  event.preventDefault();

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // You can save additional user data to Firebase's Firestore or Realtime Database here
      setValidated(true);
      toast.success("Sign Up successful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};


  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, loginFormData.email, loginFormData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log(user.uid); // logs the UID to the console
        navigate("/");
        toast.success("Login successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
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
        <Col md={6} className="d-flex justify-content-center align-items-center" className="register-image">
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
                <Button className="me-2" onClick={handleLoginClick}>LOGIN</Button>
                <Button onClick={handleRegisterClick}>REGISTER</Button>
              </div>
              <div class="slide-2">
              <Form noValidate validated={validated} onSubmit={handleRegistration} className="registration-form mt-4">
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
    value={formData.phoneNumber}
    onChange={handleInputChange}
  />
  <Form.Control.Feedback type="invalid" className="feedback">
    Please provide a valid phone number.
  </Form.Control.Feedback>
</Form.Group>
<Form.Group controlId="zone">
  <Form.Label className="mb-0">Zone</Form.Label>
  <div className="position-relative">
    <select
      required
      className="form-select rounded-end"
      name="zone"
      value={formData.zone}
      onChange={(selectedOption) => handleInputChange(selectedOption, { name: 'zone' })}
    >
      <option value="" disabled={!formData.zone}>
        {formData.zone ? 'Select Zone' : 'Select Zone First'}
      </option>
      <option value="Zone A">Zone A</option>
      <option value="Zone B">Zone B</option>
      <option value="Zone C">Zone C</option>
    </select>
  </div>
  <Form.Control.Feedback type="invalid" className="feedback">
    Please select a zone.
  </Form.Control.Feedback>
</Form.Group>

<Form.Group controlId="address">
  <Form.Label className="mb-0">Address</Form.Label>
  <div className="position-relative">
    <select
      required
      className="form-select rounded-end"
      name="address"
      value={formData.address}
      onChange={(selectedOption) => handleInputChange(selectedOption, { name: 'address' })}
      disabled={!formData.zone}
    >
      <option value="">
        {formData.zone ? 'Select Address' : 'Select Zone First'}
      </option>
      {formData.zone && zonesAddresses[formData.zone].map((addr, index) => (
        <option key={index} value={addr}>
          {addr}
        </option>
      ))}
    </select>
  </div>
  <Form.Control.Feedback type="invalid" className="feedback">
    Please provide an address.
  </Form.Control.Feedback>
</Form.Group>

<Form.Group controlId="preferredCommittee">
  <Form.Label className="mb-0">Preferred Committee to Serve in:</Form.Label>
  <Form.Control
    as="select"
    name="preferredCommittee"
    value={formData.preferredCommittee}
    onChange={handleInputChange} // Make sure this handler updates the formData state correctly
    required
  >
    <option value="">Select a Committee</option>
    <option value="Environment">Environment</option>
    <option value="Membership">Membership</option>
    <option value="Infrastructure">Infrastructure</option>
    <option value="Security">Security</option>
    <option value="None">None</option>
  </Form.Control>
  <Form.Control.Feedback type="invalid">
    Please choose a preferred committee to serve in.
  </Form.Control.Feedback>
</Form.Group>

<Form.Group controlId="paymentDetails" className="mb-3">
  <Form.Label className="mb-0">Payment Details</Form.Label>
  <div className="position-relative">
    <Select
      isMulti
      options={[
        { value: 'Joining Fee', label: 'Joining Fee Kshs 500' },
        { value: 'Individual Annual Subs Jan - Dec', label: 'Individual Annual Subs Jan - Dec Kshs 2000' },
        { value: 'Individual Semi-Annual Subs Jan - June', label: 'Individual Semi-Annual Subs Jan - June Kshs 1000' },
        { value: 'Individual Semi-Annual Subs July - Dec', label: 'Individual Semi-Annual Subs July - Dec Kshs 1000' },
        { value: 'Corporate Members Joining Fee', label: 'Corporate Members A and B Joining Fee Kshs 1000' },
        { value: 'Corporate Member A Annual Subs', label: 'Corporate Member A Annual Subs Kshs 10000' },
        { value: 'Corporate Member B Annual Subs', label: 'Corporate Member B Annual Subs Kshs 5000' },
        // Add other options...
      ]}
      value={selectedPaymentDetails.map(option => ({ value: option, label: option }))} // Map selectedPaymentDetails to match option format
      onChange={(selectedOptions) => setSelectedPaymentDetails(selectedOptions.map(option => option.value))}
    />
  </div>
  <Form.Control.Feedback type="invalid" className="feedback">
    Please select at least one payment detail.
  </Form.Control.Feedback>
</Form.Group>
    <Form.Group controlId="paymentCode">
                      <Form.Label className="mb-0">Payment Code</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="paymentCode"
                        placeholder="Enter your Payment Code(Mpesa Code/Bank Code)"
                        value={formData.paymentCode}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid" className="feedback">
                        Please provide a first name.
                      </Form.Control.Feedback>
                    </Form.Group>
<Form.Group controlId="password">
  <Form.Label className="mb-0">Password</Form.Label>
  <Form.Control
    required
    type="password"
    name="password"
    placeholder="Enter Password"
    value={formData.password}
    onChange={handleInputChange}
  />
  <Form.Control.Feedback type="invalid" className="feedback">
    Please provide a password.
  </Form.Control.Feedback>
</Form.Group>
<Form.Group controlId="confirmPassword">
  <Form.Label className="mb-0">Confirm Password</Form.Label>
  <Form.Control
    required
    type="password"
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleInputChange}
  />
  <Form.Control.Feedback type="invalid" className="feedback">
    Please confirm your password.
  </Form.Control.Feedback>
</Form.Group>
<Form.Group controlId="terms">
        <Form.Check
          required
          label="I confirm that I have read the constitution and do hereby accept the obligations and Membership to Link Road Residents Association"
          onChange={handleTermsChange}
          checked={acceptedTerms}
        />
 </Form.Group>

      {/* <Button variant="secondary" onClick={handleDownload}>
        Download Constitution
      </Button> */}

<Button type="submit" variant="primary" className="w-100 mt-4">
  Register
</Button>
{/* <Button onClick={handleGoogleSignIn}>Sign up with Google</Button> */}
<ToastContainer autoClose={2000} />
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
      LOGIN
    </Button>
    <Button onClick={handleRegisterClick}>REGISTER</Button>
  </div>
  </div>
  </div>
  <Form noValidate validated={validated} onSubmit={handleLogin} className="registration-form mt-4">
    <Form.Group controlId="loginEmail">
      <Form.Label className="mb-0">Email</Form.Label>
      <Form.Control
        required
        type="email"
        name="email"
        placeholder="Enter Email"
        value={loginFormData.email}
        onChange={handleLoginInputChange}
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
        name="password"
        placeholder="Enter Password"
        value={loginFormData.password}
        onChange={handleLoginInputChange}
      />
      <Form.Control.Feedback type="invalid">
        Please provide a password.
      </Form.Control.Feedback>
    </Form.Group>
    <Button type="submit" variant="primary" className="w-100 mt-4">
      Login
    </Button>
    {/* <Button
  variant="link"
  type="button"
  onClick={() => {
    auth.sendPasswordResetEmail(resetEmail).then(() => {
      toast.success("Password reset email sent", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }}
>
  Forgot Password?
</Button> */}
    <ToastContainer autoClose={2000} />
  </Form>
</div>
)}
</Col>
<Col md={6} className="d-flex justify-content-center align-items-center">
<div className="button-container">
  <button className="download-button" onClick={handleDownload}>
    Download Constitution
  </button>
</div>
          </Col>
</Row>
</Container>
</div>
);
};

export default Registration;



