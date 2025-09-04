import React, { useState, useEffect } from "react";
import Star from "./Star";

const FeedbackRating = ({ numberOfStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);        
  const [hover, setHover] = useState(0);          

  useEffect(() => {
    const savedRating = localStorage.getItem("feedback-rating");
    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, []);

  useEffect(() => {
    if (rating > 0) {
      localStorage.setItem("feedback-rating", rating);
    } else {
      localStorage.removeItem("feedback-rating");
    }
    if (onRatingChange) onRatingChange(rating);
  }, [rating, onRatingChange]);

  return (
    <div className="feedback-container">
      <div className="stars">
        {Array.from({ length: numberOfStars }, (_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={starValue}
              filled={starValue <= (hover || rating)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(starValue)}
            />
          );
        })}
      </div>

      <p className="rating-text">
        {rating > 0
          ? `You rated: ${rating}/${numberOfStars}`
          : "No rating selected"}
      </p>

      {rating > 0 && (
        <button className="clear-btn" onClick={() => setRating(0)}>
          Clear Rating
        </button>
      )}
    </div>
  );
};

export default FeedbackRating;
