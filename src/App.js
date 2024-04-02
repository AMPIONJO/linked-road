import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import About from './pages/About';
import OptionsPage from './components/OptionsPage';
import Registration from './pages/Registration';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <NavMenu />
        <div className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<HeroSection />} />
            <Route path="/registers" element={<Registration />} />
            <Route path="/options/*" element={<OptionsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/latest-blog" element={<Blog />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}



export default App;

