import React, { useEffect, useRef } from "react";
import Objectives from "./Objectives";
import Testimonials from "./Testimonials";
import Milestones from "./Milestones";
import "../components/OptionsPage.css";
import { Routes, Route } from "react-router-dom";

function Options() {
  const objectivesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const milestonesRef = useRef(null);

  console.log(window.location.pathname)
  
    if (window.location.pathname === "/options/objectives") {
      return(<Objectives/>)
    } else if (window.location.pathname === "/options/testimonials") {
      return(<Testimonials/>)
    } else if (window.location.pathname === "/options/milestones") {
      return(<Milestones/>)
    }
  

  console.log(objectivesRef); // Add this line to check if the objectivesRef is being set correctly

  return (
    <div className="options-container">
      {/* <Routes>
        <Route path="/options/objectives" element={<Objectives/>} ref={objectivesRef}/>
        <Route path="/options/testimonials" element={<Testimonials ref={testimonialsRef} />} />
        <Route path="/options/milestones" element={<Milestones ref={milestonesRef} />} />
      </Routes> */}
    </div>
  );
}

export default Options;






