import React from 'react';
import './Services.css'; // Import the CSS file
import umbrellaImage from '../images/Umbrella3.jpg'; // Import the umbrella image
import tshirtImage from '../images/TShirts2.jpg'; // Import the T-shirt image
import capImage from '../images/Mugs2.jpg'; // Import the cap image
import carImage from '../images/Car2.jpg'; // Import the cap image
import matImage from '../images/Mat.jpg'; // Import the cap image

const Services = () => {
  return (
    <div>
      {/* Merchandise */}
      <div className="merchandise-container">
        <h3 className="merchandise-title">PURCHASE MERCHANDISE</h3>
        <div className="merchandise-items">
          <div className="merchandise-item">
            <img src={umbrellaImage} alt="Umbrella" className="merchandise-image" />
            <div className="merchandise-details">
              <p>Umbrella</p>
              <b>Ksh.1000</b>
              {/* <button className="add-to-cart-button">Add to Cart</button> */}
            </div>
          </div>
          <div className="merchandise-item">
            <img src={carImage} alt="Car" className="merchandise-image" />
            <div className="merchandise-details">
              <p>Car Cover</p>
              <b>Ksh.3800</b>
              {/* <button className="add-to-cart-button">Add to Cart</button> */}
            </div>
          </div>
          <div className="merchandise-item">
            <img src={matImage} alt="Mat" className="merchandise-image" />
            <div className="merchandise-details">
              <p>Door Mat</p>
              <b>Ksh.2200</b>
              {/* <button className="add-to-cart-button">Add to Cart</button> */}
            </div>
          </div>
          <div className="merchandise-item">
            <img src={capImage} alt="Cap" className="merchandise-image" />
            <div className="merchandise-details">
              <p>Mugs</p>
              <b>Ksh.600</b>
              {/* <button className="add-to-cart-button">Add to Cart</button> */}
            </div>
          </div>
          <div className="merchandise-item">
            <img src={tshirtImage} alt="T-shirt" className="merchandise-image" />
            <div className="merchandise-details">
              <p>T-shirt(S,M,L)</p>
              <b>Ksh.1500(Adults)</b>
              <b>Ksh.1000(Children)</b>
              {/* <button className="add-to-cart-button">Add to Cart</button> */}
            </div>
          </div>
          {/* Add more items as needed */}
        </div>
      </div>

      {/* Payment Options */}
      <div className="payment-options">
        <div className="payment-widget">
          <div className="mpesa-payment-widget">
            <h3 className="mpesa-payment-title">MPESA Paybill Payment</h3>
            <p>Paybill Number:</p>
            <b>7011542</b>
            <p>Account:</p>
            <b>(Type Your Name#Name of Merchandise)</b>
            <br></br>
            <b>(eg. Mike Mwango#Umbrella)</b>
          </div>
        </div>

        <div className="payment-widget">
          <div className="bank-payment-widget">
            <h3 className="bank-payment-title">Bank Payment</h3>
            <p>Bank Name: Co-operative Bank of Kenya</p>
            <p>Paybill Number:</p>
            <b>400200</b>
            <p>Account Name:</p>
            <b>Link Road Residents Association</b>
            <p>Account Number:</p>
            <b>01192860145800</b>
            <br></br>
            <p>You can visit the nearest bank branch to make a payment.</p>
            <b>(Indicate Your Name and Purpose)</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
