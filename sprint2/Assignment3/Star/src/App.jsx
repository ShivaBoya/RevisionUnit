import React, { useState } from "react";
import FeedbackRating from "./components/Rating";

function App() {
  const [selectedRating, setSelectedRating] = useState(null);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>⭐ Feedback Rating Component</h1>
      <FeedbackRating
        numberOfStars={5}
        onRatingChange={(rating) => setSelectedRating(rating)}
      />
      <p style={{ marginTop: "20px", color: "blue" }}>
        {selectedRating !== null && `Parent received rating: ${selectedRating}`}
      </p>
    </div>
  );
}

export default App;
