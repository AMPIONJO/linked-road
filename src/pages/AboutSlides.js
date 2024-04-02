import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../pages/AboutSlides.css';
import image1 from '../images/Bull.jpeg';
import image2 from '../images/Cert.jpeg';
import image3 from '../images/Neighbours.jpg';
import image4 from '../images/final.jpeg';
import image5 from '../images/work.jpeg';
import image6 from '../images/linkroad.jpg';
import image7 from '../images/water.jpg';
import image8 from '../images/KaraAwards.jpg';
import logo from "../images/TransLogo.png";



const AboutSlides = () => {
  const [showImages, setShowImages] = useState(false);

  const handleSlideChange = (index) => {
    // Check if the slide index is the "Our Achievements" slide (index 2)
    if (index === 2 || index === 1) {
      setShowImages(true); // Show the images when "Our Achievements" slide is active
    } else {
      setShowImages(false); // Hide the images for other slides
    }
  };

  return (
    <Carousel indicators={true} onSelect={handleSlideChange}>
         <Carousel.Item>
         <div className="slide-container">
  <h3>OUR HISTORY</h3>
  <p>
  The Link Road Residents Association located in Kikuyu, Kenya, emerged in 2008/09 from the belief that united efforts foster community prosperity. Official registration in 2012 followed meticulous structuring led by visionary founders, including Jane W. Ngugi, David L. Karanja, and Allan Ngugi. The organization's formative phase prioritized road development agenda, initiating crucial relationships with local and national government bodies, laying the foundation for sustained growth and development.
  </p>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ textAlign: 'left' }}>
      <strong style={{ color: 'green' }}>Leadership (2009 - 2017):</strong>
      <br />
      {/* Apply specific style to left-align list items */}
      <ul style={{ paddingLeft: '20px', listStylePosition: 'inside' }}>
        <li>D. L. Karanja - Chairman</li>
        <li>G. Karanja - Vice Chairman</li>
        <li>Jane W. Ngugi - Secretary</li>
        <li>Peter Muchiri - Treasurer</li>
        <li>Allan Ngugi - Roads Committee Chairman</li>
        <li>Ngige Mondo -  Environment and Water Committee Chairman</li>
        <li>Major Stanley Kiama - Security Committee Chairman</li>
        <li>Advisory Members(Legal)</li>
      </ul>
    </div>
    <div className="navbar-logo-side">
      <img src={logo} alt="LinkRoad Logo" />
    </div>
    <div style={{ textAlign: 'left' }}>
      <strong style={{ color: 'green' }}>Incumbent Leadership:</strong>
      <br />
      {/* Apply specific style to center-align list items */}
      <ul style={{ paddingLeft: '20px', listStylePosition: 'inside' }}>
        <li>Dan Mugo - Chairman</li>
        <li>Jane W. Ngugi - Secretary</li>
        <li>Peter Muchiri - Treasurer</li>
        <li>Ngige Mondo - Infrastructure Committee Chairman</li>
        <li>Tony Gachie - Environment Committee Chairman</li>
        <li>Peter Keni - Security Committee Chairman</li>
        <li>* - Membership Committee Chairman</li>
      </ul>
    </div>
  </div>
</div>

      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-container">
          <h3>OUR MISSION</h3>
          <p>Our mission centers on communal advancement, fostering a cohesive and empowered community. Addressing security challenges, lobbying and maintaining essential infrastructures, ensuring reliable water and power supplies, and championing environmental standards remain our core pursuits. Embracing a non-partisan approach, we seek collaboration with like-minded entities to collectively enhance societal well-being.</p>
          {showImages && (
            <div className="images-container">
              <img className="mission-image" src={image5} alt="Mission 1" />
              <img className="mission-image" src={image6} alt="Mission 2" />
              <img className="mission-image" src={image7} alt="Mission 3" />
              <img className="mission-image" src={image4} alt="Mission 4" />
            </div>
          )}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-container">
          <h3>OUR ACHIEVEMENTS</h3>
          <p>The Association has garnered numerous accomplishments since its inception. Significantly, achieving bitumen standards for Link Road E1507 and other infrastructural development, this underscores our dedication. Our influence secured street lighting installations, water supply enhancements, and oversaw existing infrastructural adherence. Acknowledged by Kenya Alliance of Residents Association (KARA) for promoting and safeguarding public interests, our commitment continues with ongoing initiatives, ranging from preserving an environmental friendly neighborhood, protecting public land and road reserve spaces to bolstering security measures. We remain steadfast in our pursuit of a flourishing community, shaping a brighter and safer future for all residents.</p>
          {showImages && (
            <div className="images-container">
              <img className="achievement-image" src={image1} alt="Achievement 1" />
              <img className="achievement-image" src={image8} alt="Achievement 2" />
              <img className="achievement-image" src={image2} alt="Achievement 3" />
              <img className="achievement-image" src={image3} alt="Achievement 4" />
            </div>
          )}
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default AboutSlides;

