import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Ensure you have this CSS file

const MovieList = () => {
  // Initial list of movies
  const [movies] = useState([
    { id: 1, title: 'Titanic', year: 1990 },
    { id: 2, title: 'Romeo and Juliet', year: 2010 },
    { id: 3, title: 'The Dark Knight', year: 2008 },
    { id: 4, title: 'Avatar', year: 2006 },
    { id: 5, title: 'The Mysterious Head', year: 2011 },
  ]);

  // State to manage search query and filtered movies
  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filter movies based on search query
    const results = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery)
    );
    setFilteredMovies(results);
  };

  // Handle movie click
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container mt-5">
      {!selectedMovie ? (
        <>
          <header className="mb-4">
            <h1 className="text-center">Movie List</h1>
          </header>

          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search for movies..."
              value={query}
              onChange={handleSearchChange}
            />
          </div>

          <div className="row">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <div key={movie.id} className="col-md-4 mb-3">
                  <div className="card" onClick={() => handleMovieClick(movie)}>
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">Year: {movie.year}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center">No movies found.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <MovieDetails movie={selectedMovie} goBack={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

const MovieDetails = ({ movie, goBack }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [notification, setNotification] = useState('');

  // Handle star click for rating
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  // Handle review text change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // Handle submit button click
  const handleSubmit = () => {
    // Simulate submitting the review
    setNotification('Review submitted!');
    // Clear rating and review fields
    setRating(0);
    setReview('');

    // Remove notification after 2 seconds
    setTimeout(() => setNotification(''), 2000);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={goBack}>
        Back to Movie List
      </button>
      <div className="notification-container">
        {notification && (
          <div className="notification">
            {notification}
          </div>
        )}
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">Year: {movie.year}</p>
          <div className="mb-3">
            <h6>Rate this movie:</h6>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`star ${star <= rating ? 'text-warning' : 'text-muted'}`}
                style={{ cursor: 'pointer', fontSize: '1.5em' }}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="mb-3">
            <h6>Write a review:</h6>
            <textarea
              className="form-control"
              rows="4"
              value={review}
              onChange={handleReviewChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
