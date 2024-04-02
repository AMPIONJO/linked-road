import React, { forwardRef, useImperativeHandle } from "react";

function Objectives (props, ref) {
  // useImperativeHandle(ref, () => ({
  //   getObjectives() {
  //     return [
  //       "To create a friendly and welcoming community",
  //       "To promote diversity and inclusivity",
  //       "To foster a sense of belonging among neighbors"
  //     ];
  //   }
  // }));

  console.log("Objectives component is rendered"); // Add this line to check if the component is rendered

  console.log(props); // Add this line to check if the component is receiving props correctly
  return (
    <div className="button_options" id="our-objectives" ref={ref}>
      <h3>OUR OBJECTIVES</h3>
      <p>Our objectives are:</p>
      <ul>
        <li>To create a friendly and welcoming community</li>
        <li>To promote diversity and inclusivity</li>
        <li>To foster a sense of belonging among neighbors</li>
      </ul>
    </div>
  );
}

export default forwardRef(Objectives);

