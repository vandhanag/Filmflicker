import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Signup from './Signup';
import Login from './Login';
import MovieList from './MovieList';
import ProfilePage from './ProfilePage';
import SortedMovieList from './SortedMovieList'; // Import the new component
import './global.css'; // Importing global CSS

const App = () => {
  const [user, setUser] = useState(null); 
  const [reviews, setReviews] = useState({}); // Store reviews globally

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/movies" element={<MovieList setReviews={setReviews} />} /> {/* Pass setReviews */}
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/sorted-movies" element={<SortedMovieList reviews={reviews} />} /> {/* Add new route */}
      </Routes>
    </Router>
  );
};

export default App;
