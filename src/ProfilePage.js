import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [userName, setUserName] = useState('');
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedReviewText, setUpdatedReviewText] = useState('');
  const [updatedRating, setUpdatedRating] = useState(0); // State for updated star rating

  // Load reviews from localStorage when the component mounts
  useEffect(() => {
    const storedReviews = localStorage.getItem('movieReviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName) {
      setError('Please enter your name.');
      return;
    }
  
    const userReviews = Object.keys(reviews).flatMap((movieId) => {
      const movieReviews = reviews[movieId] || [];
      return movieReviews
        .filter(review => review.username && review.username.toLowerCase() === userName.toLowerCase())
        .map(review => ({
          ...review,
          movieTitle: review.movieTitle, // Include movie title
          movieYear: review.movieYear,   // Include movie year
        }));
    });
  
    if (userReviews.length === 0) {
      setError('No reviews found for this user.');
      setUserReviews([]);
    } else {
      setUserReviews(userReviews);
      setError('');
    }
  };
  

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setUpdatedReviewText(review.review); // Pre-fill the textarea with the existing review text
    setUpdatedRating(review.rating); // Pre-fill the rating with the existing rating
  };

  const handleUpdateReview = () => {
    if (!updatedReviewText) {
      setError('Please enter your updated review.');
      return;
    }

    const updatedReviews = { ...reviews };

    // Update the specific review in the movieReviews
    for (const movieId in updatedReviews) {
      updatedReviews[movieId] = updatedReviews[movieId].map((review) => {
        if (review.username === selectedReview.username && review.review === selectedReview.review) {
          return { ...review, review: updatedReviewText, rating: updatedRating }; // Update the review text and rating
        }
        return review; // Return the unchanged review
      });
    }

    // Update the userReviews state to reflect the changes
    setUserReviews(prevUserReviews => {
      return prevUserReviews.map(review => {
        if (review.username === selectedReview.username && review.review === selectedReview.review) {
          return { ...review, review: updatedReviewText, rating: updatedRating }; // Update the review in userReviews
        }
        return review; // Return the unchanged review
      });
    });

    setReviews(updatedReviews);
    localStorage.setItem('movieReviews', JSON.stringify(updatedReviews));
    setSelectedReview(null);
    setUpdatedReviewText('');
    setUpdatedRating(0); // Reset the updated rating
  };

  const handleDeleteReview = (reviewToDelete) => {
    const updatedReviews = { ...reviews };

    // Filter out the review to delete
    for (const movieId in updatedReviews) {
      updatedReviews[movieId] = updatedReviews[movieId].filter((review) => {
        return !(review.username === reviewToDelete.username && review.review === reviewToDelete.review);
      });
    }

    setReviews(updatedReviews);
    localStorage.setItem('movieReviews', JSON.stringify(updatedReviews));

    // Update userReviews to reflect the deletion
    setUserReviews(userReviews.filter((review) => review !== reviewToDelete));
  };

  return (
    <div className="container mt-5">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Your Name:</label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Fetch Reviews</button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {userReviews.length > 0 && (
  <div className="mt-4">
    <h2>Your Reviews</h2>
    <ul className="list-group">
      {userReviews.map((review, index) => (
        <li key={index} className="list-group-item">
          <strong>{review.movieTitle} ({review.movieYear})</strong>
          <p>Rating: {review.rating} ★</p>
          <p>Review: {review.review}</p>
          <button
            className="btn btn-warning mt-2"
            onClick={() => handleEditClick(review)}
          >
            Edit Review
          </button>
          <button
            className="btn btn-danger mt-2 ml-2"
            onClick={() => handleDeleteReview(review)}
          >
            Delete Review
          </button>
        </li>
      ))}
    </ul>
  </div>
)}


      {selectedReview && (
        <div className="mt-4">
          <h2>Edit Review</h2>
          <textarea
            className="form-control"
            value={updatedReviewText}
            onChange={(e) => setUpdatedReviewText(e.target.value)}
            rows="3"
          />
          <div className="mt-2">
            <label>Star Rating:</label>
            <select
              className="form-control"
              value={updatedRating}
              onChange={(e) => setUpdatedRating(parseInt(e.target.value))}
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 ★</option>
              <option value={2}>2 ★</option>
              <option value={3}>3 ★</option>
              <option value={4}>4 ★</option>
              <option value={5}>5 ★</option>
            </select>
          </div>
          <button className="btn btn-success mt-2" onClick={handleUpdateReview}>
            Update Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;