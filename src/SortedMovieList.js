import React from 'react';

const SortedMovieList = ({ reviews }) => {
  const movies = [
    { id: 1, title: 'Titanic', year: 1990, genre: 'Romance', language: 'English', image: '/mov_img/titanic.jpeg' },
    { id: 2, title: 'Romeo and Juliet', year: 2010, genre: 'Romance', language: 'English', image: '/mov_img/romeoandjuliet.jpeg' },
    // Add all other movies...
  ];

  // Calculate average rating for each movie
  const getAverageRating = (movieId) => {
    const movieReviews = reviews[movieId];
    if (!movieReviews || movieReviews.length === 0) return 0;
    
    const totalRating = movieReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / movieReviews.length;
  };

  // Sort movies by average rating in descending order
  const sortedMovies = [...movies].sort((a, b) => getAverageRating(b.id) - getAverageRating(a.id));

  return (
    <div className="container mt-5">
      <h1>Movies Sorted by Rating</h1>
      <div className="row">
        {sortedMovies.map(movie => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={movie.image} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Year: {movie.year}</p>
                <p className="card-text">Genre: {movie.genre}</p>
                <p className="card-text">Language: {movie.language}</p>
                <p className="card-text">Average Rating: {getAverageRating(movie.id).toFixed(1)}</p> {/* Display average rating */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortedMovieList;
