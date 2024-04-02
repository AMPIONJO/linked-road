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
            <AboutSlides />
        </Row>
      </Container>
    </div>
  );
};

export default About;








