import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AboutSlides from './AboutSlides';
import logo from "../images/TransLogo.png";
import '../pages/About.css';

const About = () => {
  return (
    <div className="about">
      <Container fluid>
        <Row>
          <Col md={6} className="about-image">
            <img src={logo} alt="about" />
          </Col>
          <Col md={6}>
            <AboutSlides />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;








