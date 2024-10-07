import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Ensure you have this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MovieList = () => {
  // Load reviews from local storage
  const loadReviewsFromLocalStorage = () => {
    const savedReviews = localStorage.getItem('movieReviews');
    return savedReviews ? JSON.parse(savedReviews) : {};
  };

  // Initial list of movies
  const [movies] = useState([
    { id: 1, title: 'Titanic', year: 1990, genre: 'Romance', language: 'English', image: '/mov_img/titanic.jpeg' },
    { id: 2, title: 'Romeo and Juliet', year: 2010, genre: 'Romance', language: 'English', image: '/mov_img/romeoandjuliet.jpeg' },
    { id: 3, title: 'The Dark Knight', year: 2008, genre: 'Action', language: 'English', image: '/mov_img/thedarkknight.jpeg' },
    { id: 4, title: 'Avatar', year: 2006, genre: 'Sci-Fi', language: 'English', image: '/mov_img/avatar.jpeg' },
    { id: 5, title: 'The Mysterious Head', year: 2011, genre: 'Thriller', language: 'English', image: '/mov_img/themysterioushead.jpeg' },
    { id: 6, title: 'Lagaan', year: 2001, genre: 'Drama', language: 'Hindi', image: '/mov_img/lagaan.jpg' },
    { id: 7, title: 'Dilwale Dulhania Le Jayenge', year: 1995, genre: 'Romance', language: 'Hindi', image: '/mov_img/ddlj.jpeg' },
    { id: 8, title: '3 Idiots', year: 2009, genre: 'Comedy', language: 'Hindi', image: '/mov_img/3idiots.jpg' },
    { id: 9, title: 'Bahubali: The Beginning', year: 2015, genre: 'Action', language: 'Telugu', image: '/mov_img/bahubali1.jpg' },
    { id: 10, title: 'Bahubali: The Conclusion', year: 2017, genre: 'Action', language: 'Telugu', image: '/mov_img/bahubali2.jpg' },
    { id: 11, title: 'PK', year: 2014, genre: 'Comedy', language: 'Hindi', image: '/mov_img/pk.jpg' },
    { id: 12, title: 'Chennai Express', year: 2013, genre: 'Action', language: 'Hindi', image: '/mov_img/chennai_express.jpg' },
    { id: 13, title: 'Kabir Singh', year: 2019, genre: 'Romance', language: 'Hindi', image: '/mov_img/kabir_singh.jpg' },
    { id: 14, title: 'Zindagi Na Milegi Dobara', year: 2011, genre: 'Adventure', language: 'Hindi', image: '/mov_img/zindagi.jpg' },
    { id: 15, title: 'Gully Boy', year: 2019, genre: 'Drama', language: 'Hindi', image: '/mov_img/gully_boy.jpg' },
    { id: 16, title: 'Dangal', year: 2016, genre: 'Biographical', language: 'Hindi', image: '/mov_img/dangal.jpg' },
    { id: 17, title: 'Super 30', year: 2019, genre: 'Biographical', language: 'Hindi', image: '/mov_img/super30.jpg' },
    { id: 18, title: 'Sultan', year: 2016, genre: 'Action', language: 'Hindi', image: '/mov_img/sultan.jpg' },
    { id: 19, title: 'Andhadhun', year: 2018, genre: 'Thriller', language: 'Hindi', image: '/mov_img/andhadhun.jpeg' },
    { id: 20, title: 'Queen', year: 2013, genre: 'Comedy', language: 'Hindi', image: '/mov_img/queen.jpeg' },
  ]);

  const [query, setQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortedMovies, setSortedMovies] = useState(null);
  const [reviews] = useState(loadReviewsFromLocalStorage());

  const saveReviewsToLocalStorage = (newReviews) => {
    localStorage.setItem('movieReviews', JSON.stringify(newReviews));
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
    const results = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery));
    setFilteredMovies(results);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const calculateAverageRating = (movieId) => {
    const movieReviews = reviews[movieId] || [];
    if (movieReviews.length === 0) return 0;
    const totalRating = movieReviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / movieReviews.length;
  };

  const handleSortByRating = () => {
    const moviesWithRating = movies.map(movie => ({
      ...movie,
      avgRating: calculateAverageRating(movie.id),
    }));
    const sorted = moviesWithRating.sort((a, b) => b.avgRating - a.avgRating);
    setSortedMovies(sorted);
  };

  const goBack = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mt-5">
      <header>
        <h1><FontAwesomeIcon icon={faFilm} /> Movie List</h1>
        <Link to="/profile" className="btn btn-info mb-3">
          <FontAwesomeIcon icon={faUser} /> View Profile
        </Link>
        <button className="btn btn-primary mb-3" onClick={handleSortByRating}>
          Sort by Rating
        </button>
      </header>
      {!selectedMovie ? (
        <>
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
            {(sortedMovies || filteredMovies).length > 0 ? (
              (sortedMovies || filteredMovies).map(movie => (
                <div key={movie.id} className="col-md-4 mb-4">
                  <div className="card h-100 movie-card" onClick={() => handleMovieClick(movie)}>
                    <img src={movie.image} className="card-img-top" alt={movie.title} />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text">Year: {movie.year}</p>
                      <p className="card-text">Genre: {movie.genre}</p>
                      <p className="card-text">Language: {movie.language}</p>
                      <p className="card-text">Average Rating: {calculateAverageRating(movie.id).toFixed(1)}</p>
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
        <MovieDetails 
          movie={selectedMovie} 
          goBack={goBack} 
          calculateAverageRating={calculateAverageRating} 
          reviews={reviews} 
          saveReviewsToLocalStorage={saveReviewsToLocalStorage} 
        />
      )}
    </div>
  );
};

const MovieDetails = ({ movie, goBack, calculateAverageRating, reviews, saveReviewsToLocalStorage }) => {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || rating <= 0 || !username) {
      alert("Please provide a username, rating, and review.");
      return;
    }

    const newReview = {
      username,
      rating,
      review: reviewText,
      movieTitle: movie.title, // Add movie title
      movieYear: movie.year // Add movie year
    };

    const movieReviews = reviews[movie.id] || [];
    const updatedReviews = { ...reviews, [movie.id]: [...movieReviews, newReview] };
    saveReviewsToLocalStorage(updatedReviews);

    setUsername('');
    setRating(0);
    setReviewText('');
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={goBack}>
        Go Back
      </button>
      <h2>{movie.title} ({movie.year})</h2>
      <img src={movie.image} alt={movie.title} className="img-fluid mb-3" />
      <p>Genre: {movie.genre}</p>
      <p>Language: {movie.language}</p>
      <p>Average Rating: {calculateAverageRating(movie.id).toFixed(1)}</p>

      <h3>Add Your Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea
            className="form-control"
            id="review"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit Review</button>
      </form>

      <h3>Reviews:</h3>
      {reviews[movie.id] && reviews[movie.id].length > 0 ? (
        reviews[movie.id].map((review, index) => (
          <div key={index} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{review.username} - {review.movieTitle} ({review.movieYear})</h5>
              <p className="card-text">Rating: {review.rating}/5</p>
              <p className="card-text">Review: {review.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review this movie!</p>
      )}
    </div>
  );
};

export default MovieList;
