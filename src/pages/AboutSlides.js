import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../pages/AboutSlides.css';

const AboutSlides = () => {
  return (
    <Carousel indicators={true}>
      <Carousel.Item>
        <div className="slide-container">
          <h3>OUR HISTORY</h3>
          <p> The Link Road Residents Association was established in 2008/09 to address issues affecting residents within its area of jurisdiction. The association was formally registered with the Registrar of Societies in 2012, and the founder members were Jane W. Ngugi, David L Karanja, and Allan Ngugi. </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-container">
          <h3>OUR MISSION</h3>
          <p> The association set out to pursue its Road Development Agenda (Link Road E1507) and establish strategic relationships with government agencies, law enforcement agencies, and the private sector to maintain security, upkeep and maintenance of the road infrastructure, clean water supply, electrical power, refuse and garbage disposal, and transportation services for our residents.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-container">
          <h3>OUR ACHIEVEMENTS</h3>
          <p>The association has achieved several milestones, including formal registration under the Societies Act (CAP 108), promotion of national integration and cohesion within its membership, the successful construction of Link Road E1507 to bitumen standards, and securing the road and its reserve through surveying and boundary securing.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default AboutSlides;

