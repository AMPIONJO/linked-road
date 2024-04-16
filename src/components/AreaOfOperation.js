import React from 'react';
import mapImage1 from '../images/Zones.png';
import mapImage2 from '../images/8.jpg';

const AreaOfOperation = () => {
  return (
    <div className="area-of-operation">
      <h2>Area of Operation</h2>
      <div className="maps-container">
        <figure>
          <img src={mapImage1} alt="Map showing area of operation" />
          <figcaption>Zones</figcaption>
        </figure>
        {/* <img src={mapImage2} alt="Another map showing area of operation" /> */}
        {/* Add more images or structure as needed */}
      </div>
    </div>
  );
};

export default AreaOfOperation;
