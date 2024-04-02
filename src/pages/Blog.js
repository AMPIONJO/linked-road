import React, { useEffect }  from 'react';
import './Blog.css'; // You can create a CSS file for styling

function Blog() {

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
      }, []);

  return (
    <div className="blog-container">
      <h1>Welcome to Our Neighborhood Blog</h1>
      <p>Date: September 24, 2023</p>
      <p>Author: John Doe</p>
      <div className="blog-content">
        <p>
          <strong>The Importance of Community:</strong> 
          In our neighborhood, we value the sense of community and togetherness. It's not just about the houses and streets;
          it's about the people who call this place home.
        </p>
        <p>
          We come together for various events and initiatives, from neighborhood clean-ups to organizing local festivals that bring joy to both young and old. Our shared experiences and friendships are what make this neighborhood truly special.
        </p>
        <p>
          As we move forward, let's continue to foster connections, share stories, and work towards making our neighborhood an even better place to live. Stay tuned for more blog posts that celebrate our community!
        </p>
        <p>
          <strong>Our Rich History:</strong> Our neighborhood has a fascinating history. Did you know that it was founded in the late 19th century? The historic district is filled with charming, century-old homes and landmarks.
        </p>
        <p>
          <strong>Community Initiatives:</strong> We're proud of the various community initiatives that have taken shape here. From the creation of our community garden to the renovation of our local playground, these projects demonstrate what we can achieve when we come together.
        </p>
        <p>
          <strong>How You Can Get Involved:</strong> We encourage all residents to get involved in shaping the future of our neighborhood. Whether you have ideas for improvements or want to volunteer for upcoming events, your contribution matters.
        </p>
        <p>
          We hope you find our blog informative and inspiring. If you have any topics you'd like us to cover or if you'd like to contribute your own stories, please feel free to reach out. Together, we can make our neighborhood an even better place to call home!
        </p>
      </div>
    </div>
  );
}

export default Blog;
