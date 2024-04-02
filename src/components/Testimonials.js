import React from "react";

function Testimonials(props, ref) {
  return (
    <div className="button_options" ref={ref}>
      <h3>OUR TESTIMONIALS</h3>
      <p>Our objectives are:</p>
      <ul>
        <li>To create a friendly and welcoming community</li>
        <li>To promote diversity and inclusivity</li>
        <li>To foster a sense of belonging among neighbors</li>
      </ul>
    </div>
  );
}

export default React.forwardRef(Testimonials);