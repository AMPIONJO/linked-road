import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import About from './pages/About';
import Registration from './pages/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        <NavMenu />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<HeroSection />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

