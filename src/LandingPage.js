import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpeg';
import image4 from './images/image4.jpg';
import image5 from './images/image5.jpeg';

function LandingPage() {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleAbout = () => {
    setShowAbout(!showAbout);
    setShowContact(false);
  };

  const toggleContact = () => {
    setShowContact(!showContact);
    setShowAbout(false);
  };

  return (
    <div className="landing-page">
      <div className="top-bar">
        <div className="logo">FilmFlicker</div>
        <button className="btn btn-primary" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="btn btn-about" onClick={toggleAbout}>
          About Us
        </button>
        <button className="btn btn-contact" onClick={toggleContact}>
          Contact Us
        </button>
      </div>

      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">Discover Your Next Favorite Movie!</h1>
          <p className="landing-subtitle">Personalized movie recommendations just for you.</p>

          <div className="catchy-images">
            <img src={image1} alt="Catchy Image 1" className="catchy-image" />
            <img src={image2} alt="Catchy Image 2" className="catchy-image" />
            <img src={image3} alt="Catchy Image 3" className="catchy-image" />
            <img src={image4} alt="Catchy Image 4" className="catchy-image" />
            <img src={image5} alt="Catchy Image 5" className="catchy-image" />
          </div>

          {showAbout && (
            <div className="about-section">
              <h2>About Us</h2>
              <p>
                Our movie recommendation system is designed to provide personalized movie suggestions based on your preferences.
                Sign up or log in to start exploring!
              </p>
            </div>
          )}

          {showContact && (
            <div className="contact-section">
              <h2>Contact Us</h2>
              <p>
                Have questions or feedback? Reach out to us at:
              </p>
              <p>Email: support@movie-recommendation.com</p>
              <p>Phone: +123-456-7890</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
