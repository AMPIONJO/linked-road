import React from "react";
import "../components/HeroSection.css";
import PictureButton from "./PictureButton";

function HeroSection() {
  return (
    <div className="hero-container">
      <img src="/images/WeLoveThisPlace.jpg" alt="hero section" className="hero-image" />
      <div className="hero-textbox">
        <p className="hero-text">Because good neighbours don't just happen</p>
      </div>
      <div className="hero-buttons">
        <PictureButton title="Our Objectives" imageSrc="/images/RedForestLane.jpg" />
        <PictureButton title="Neighbour testimonials" imageSrc="/images/Milestones.jpg" />
        <PictureButton title="Our Milestones" imageSrc="/images/Neighbours.jpg" />
      </div>
    </div>
  );
}

export default HeroSection;


