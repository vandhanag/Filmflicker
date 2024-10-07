// SortedMovies.js
import React from 'react';

const SortedMovies = ({ movies }) => {
  // Sort the movies by average rating in descending order
  const sortedMovies = [...movies].sort((a, b) => b.averageRating - a.averageRating);

  return (
    <div>
      <h3>Movies Sorted by Rating</h3>
      <div className="row">
        {sortedMovies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={movie.image} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Year: {movie.year}</p>
                <p className="card-text">Genre: {movie.genre}</p>
                <p className="card-text">Language: {movie.language}</p>
                <p className="card-text">Average Rating: {movie.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortedMovies;
