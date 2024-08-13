import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import MovieList from './MovieList';
import './LoginSignup.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
