import { useState } from "react";

function TrainerReviews() {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, trainerName: "John", comment: "Great class!" },
    { id: 2, trainerName: "Sarah", comment: "Very motivating!" },
  ]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitReview = () => {
    if (review) {
      setReviews([...reviews, { id: reviews.length + 1, trainerName: "hend", comment: review }]);
      setReview("");
    }
  };

  return (
    <div className="reviews">
      <h3>Trainer Reviews</h3>
      <textarea
        value={review}
        onChange={handleReviewChange}
        placeholder="Write your review..."
      ></textarea>
      <button onClick={handleSubmitReview}>Submit Review</button>
      <div className="reviews-list">
        {reviews.map((r) => (
          <div key={r.id}>
            <h4>{r.trainerName}:</h4>
             <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerReviews;
