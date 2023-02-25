import React from "react";
import "../components/PictureButton.css";

function PictureButton(props) {
  return (
    <div className="picture-button">
      <p className="picture-button-title" class="all-caps">{props.title}</p>
      <img src={props.imageSrc} alt={props.title} className="picture-button-image" />
    </div>
  );
}

export default PictureButton;
