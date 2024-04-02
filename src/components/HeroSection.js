import React , { useRef , useState, useEffect} from "react";
import "../components/HeroSection.css";
import PictureButton from "./PictureButton";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import { firestore } from "../firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

// Sample testimonials data
const testimonialsData = [
  {
    id: 1,
    author: "John",
    quote: "This community has changed my life. The connections I've made here are invaluable."
  },
  {
    id: 2,
    author: "Mercy",
    quote: "I've never experienced such a welcoming and supportive neighborhood. Thank you!"
  },
  // Add more testimonials
  {
    id: 3,
    author: "Rose",
    quote: "A community that cares"
  },
  {
    id: 4,
    author: "Chris",
    quote: "United as neighbors, bound by compassion; I am my brother's keeper, safeguarding our shared community's dreams."
  },
  {
    id: 5,
    author: "Mike",
    quote: "I like bird watching in the serene environment."
  },{
    id: 6,
    author: "David",
    quote: "Home to one of the best Golf courses in Kenya, Sigona Golf Club."
  },
];

const faqData = [
  {
    id: 1,
    question: "How do I join the community?",
    answer: "To join our community, visit the 'Register' page and fill out the registration form."
  },
  {
    id: 2,
    question: "Are there any membership fees?",
    answer: "Yes, there is a joining fee of Ksh.500. Our community charges Ksh.2000 annual subscription billed annually/semi annually(Twice per year i.e June and December) with access to all services provided. You can refer to the constitution for further information on types of Membership and respective Subscription fees" 
  },
  {
    id: 3,
    question: "How can I contribute to community projects?",
    answer: "You can contribute to community projects by joining relevant committees and initiatives. Stay updated on our platform to find projects that match your interests and skills."
  },
   {
     id: 4,
     question: "Is there a way to connect with neighbors?",
     answer: "Absolutely! We have activities that allow you to connect with your neighbors. You can also participate in our community forums and discussions to stay engaged."
  },
  // {
  //   id: 5,
  //   question: "What types of events are organized by the community?",
  //   answer: "Our community organizes a wide range of events, including workshops, social gatherings, volunteering opportunities, and cultural celebrations. You can find details about upcoming events on our community calendar."
  // },
  // Add more FAQ entries
];


const sampleEvents = [
  {
    id: 1,
    title: "COMMITTEE MEETING",
    date: new Date(2024, 2, 16), // September 1, 2023
    description: "Join us for a neighborhood cleanup event to keep our community clean and beautiful.",
  },
  {
    id: 2,
    title: "THEMATIC COMMITTEE MEETINGS",
    date: new Date(2024, 2, 2), // September 10, 2023
    description: "Visit the local farmers market to support local vendors and enjoy fresh produce.",
  },
  {
    id: 3,
    title: "AGM and Thanksgiving",
    date: new Date(2024, 2, 30), // September 10, 2023
    description: "Join us for a neighborhood annual AGM and Thanksgiving.",
  },
  {
    id: 4,
    title: "Membership Drive",
    date: new Date(2023, 11, 1), // September 10, 2023
    description: "Join us for our Membership Drive.",
  },
  {
    id: 5,
    title: "Membership Drive",
    date: new Date(2024, 2, 31), // September 10, 2023
    description: "End of Membership Drive.",
  },
  {
    id: 6,
    title: "Quater 2 Activity",
    date: new Date(2024, 3, 1), // September 10, 2023
    description: "Q2 Activity",
  },
  {
    id: 7,
    title: "THEMATIC COMMITTEE MEETINGS",
    date: new Date(2024, 3, 15), // September 10, 2023
    description: "Q2 Activity",
  },
  {
    id: 8,
    title: "COMMITTEE MEETING",
    date: new Date(2024, 5, 29), // September 10, 2023
    description: "Q2 Activity",
  },
  {
    id: 9,
    title: "THEMATIC COMMITTEE MEETINGS",
    date: new Date(2024, 8, 14), // September 10, 2023
    description: "Q2 Activity",
  },
  {
    id: 10,
    title: "COMMITTEE MEETING",
    date: new Date(2024, 8, 28), // September 10, 2023
    description: "Q2 Activity",
  },
  {
    id: 11,
    title: "THEMATIC COMMITTEE MEETINGS",
    date: new Date(2024, 10, 16), // September 10, 2023
    description: "Q2 Activity",
  },
  {
    id: 12,
    title: "COMMITTEE MEETING",
    date: new Date(2024, 10, 30), // September 10, 2023
    description: "Q2 Activity",
  },
  // Add more sample events
];



function HeroSection() {

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null); // Define activeFaq state
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [userCount, setUserCount] = useState(0);
    // Add a state to track whether the testimonial is fading out or fading in
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isInitialFadeIn, setIsInitialFadeIn] = useState(false); // Add state for initial fade-in

    useEffect(() => {
      setIsInitialFadeIn(true); // Start the initial fade-in animation
      setTimeout(() => {
        setIsInitialFadeIn(false);
      }, 2000); // End the initial fade-in animation after 2 seconds
  
      const interval = setInterval(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setCurrentTestimonialIndex(
            (prevIndex) => (prevIndex + 1) % testimonialsData.length
          );
          setIsFadingOut(false);
        }, 2000);
      }, 7000);
  
      // Fetch user count after animations have finished
      setTimeout(() => {
        fetchUserCount();
      }, 3000); // Adjust the timing based on your animations
  
      return () => {
        clearInterval(interval);
      };
    }, []); // Empty dependency array to run this effect only once

  const toggleFaq = (faqId) => {
    if (faqId === activeFaq) {
      setActiveFaq(null);
    } else {
      setActiveFaq(faqId);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    // Perform subscription logic here
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the email input after subscription
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    // Function to handle mouse enter event on a calendar event
  const handleEventHover = (eventId) => {
    setHoveredEvent(eventId);
  };

  // Function to handle mouse leave event on a calendar event
  const handleEventLeave = () => {
    setHoveredEvent(null);
  };

   // Function to handle event title click
   const handleEventClick = (eventId) => {
    setHoveredEventId(hoveredEventId === eventId ? null : eventId);
  };

   // Function to fetch and count users
   const fetchUserCount = async () => {
    try {
      const usersCollection = collection(firestore, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const count = querySnapshot.size; // Get the number of documents in the collection
      setUserCount(count);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };
  
  return (
    <div className="hero-container">
    <img src="/images/RedForestLane.jpg" alt="hero section" className="hero-image" />
    <div className="hero-overlay" />
    <div className="hero-textbox">
      <b className="hero-topic">Link Road Residents Association - Kikuyu, Kenya</b>
      {/* <br></br>
      <b className="hero-topic">Kikuyu, Kenya</b> */}
      <p className="hero-introduction">
        Welcome to our community-driven platform where neighbors come together to create positive change.
      </p>
      <Link to="/registers">
        <button className="cta-button">Get Involved</button>
      </Link>
    </div>
  <div className="featured-content">
    <div className="featured-title">
    <h2>Because good neighbours don't just happen</h2>
    {/* <p className="hero-text">Because good neighbours don't just happen</p> */}
    </div>
      <div className="content-card">
        <div className="card-content">
          <img src="/images/14.jpg" alt="Featured 1" />
          <img src="/images/8.jpg" alt="Featured 3" />
          <img src="/images/10.png" alt="Featured 2" />
          
          {/* <div className="text-content">
            <h3>Community Spotlight</h3>
            <p>Read about the inspiring initiatives of our community members.</p>
            <Link to="/community-spotlight" className="read-more-link">Read More</Link>
          </div> */}
        </div>
      </div>
      {/* <div className="content-card">
        <div className="card-content">
          <img src="/images/10.png" alt="Featured 2" />
          <div className="text-content">
            <h3>Latest Blog Post</h3>
            <p>Explore our latest article on fostering strong neighborhood connections.</p>
            <Link to="/latest-blog" className="read-more-link">Read More</Link>
          </div>
        </div>
      </div>
      {/* Add more content cards */}
      {/* <div className="content-card">
        <div className="card-content">
          <img src="/images/8.jpg" alt="Featured 3" />
          <div className="text-content">
            <h3>Upcoming Event</h3>
            <p>Join us for an exciting event that will bring neighbors together.</p>
            <Link to="/upcoming-events" className="read-more-link">Read More</Link>
          </div>
        </div>
      </div> */} 
      {/* <div className="content-card">
        <div className="card-content">
          <img src="/images/Neighbours.jpg" alt="Featured 4" />
          <div className="text-content">
            <h3>Success Story</h3>
            <p>Learn how a neighbor's initiative positively impacted the community.</p>
            <Link to="/success-story" className="read-more-link">Read More</Link>
          </div>
        </div>
      </div> */}
      {/* Add more content cards */}
  </div>
  <div className="statistics-section">
      <div className="statistics-container">
        <div className="statistic">
          <h3>Community Members</h3>
          <p>Over {userCount}+ neighbors joined and counting.</p>
        </div>
        <div className="statistic">
          <h3>Collaborations</h3>
          <p>Successfully collaborated on 20+ community projects.</p>
        </div>
        {/* <div className="statistic">
          <h3>Positive Outcomes</h3>
          <p>Countless positive changes made in our neighborhood.</p>
        </div> */}
        {/* Add more statistics */}
      </div>
    </div>
    {/* <div className="call-to-action-buttons">
      <Link to="/learn-more" className="cta-button">Learn More</Link>
      <Link to="/join-us" className="cta-button">Join Us</Link>
      <Link to="/explore-features" className="cta-button">Explore Features</Link>
    </div> */}
    <div className="section-divider"></div>

    <div className="testimonial-slider">
        <h2>What Our Neighbors Say</h2>
        <div
          className={`testimonial ${
            isInitialFadeIn ? "fade-in" : "" // Apply initial fade-in class
          } ${isFadingOut ? "fade-out" : ""}`}
          id="testimonial"
        >
          <p>{testimonialsData[currentTestimonialIndex].quote}</p>
          <b className="testimonial-author">
            {testimonialsData[currentTestimonialIndex].author}
          </b>
        </div>
      </div>

    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className={`faq-item ${faq.id === activeFaq ? "active" : ""}`}
          >
            <h3 onClick={() => toggleFaq(faq.id)}>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>

    {/* <div className="newsletter-section">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay up-to-date with the latest news and updates.</p>
        <form onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div> */}

      {/* <div className="section-divider"></div>  */}

     <div className="calendar-section">
      <h2>Community Calendar</h2>
      <p>Explore upcoming events and activities in our neighborhood.</p>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date, view }) => {
          const matchingEvents = sampleEvents.filter(
            (event) =>
              event.date.getDate() === date.getDate() &&
              event.date.getMonth() === date.getMonth() &&
              event.date.getFullYear() === date.getFullYear()
          );

          if (view === "month" && matchingEvents.length > 0) {
            return matchingEvents.map((event) => (
              <div
                key={event.id}
                className={`calendar-event ${
                  hoveredEvent === event.id ? "active" : ""
                }`}
                onClick={() => handleEventClick(event.id)}
                onMouseEnter={() => handleEventHover(event.id)}
                onMouseLeave={handleEventLeave}
              >
                {event.title}
                {hoveredEvent === event.id && (
                  <div className="event-tooltip">
                    <p>{event.title}</p>
                    {/* You can add more details of the event here */}
                  </div>
                )}
              </div>
            ));
          }
        }}
      />
    </div>

      {/* <div className="hero-buttons">
        <Link to="/options/objectives" className="hero-button-link">
          <PictureButton title="Our Objectives" imageSrc="/images/RedForestLane.jpg"  />
        </Link>
        <Link to="/options/testimonials" className="hero-button-link">
          <PictureButton title="Neighbour testimonials" imageSrc="/images/Milestones.jpg" />
        </Link>
        <Link to="/options/milestones" className="hero-button-link">
          <PictureButton title="Our Milestones" imageSrc="/images/Neighbours.jpg" />
        </Link>
      </div> */}
    </div>
  );
}

export default HeroSection;







