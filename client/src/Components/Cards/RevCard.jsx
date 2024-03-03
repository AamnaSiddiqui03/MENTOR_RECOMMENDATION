// ReviewCard.jsx
import React from 'react';
import '../../assets/css/review.css';

const ReviewCard = (props) => {
  const headings = Array.from({ length: props.rating }, (_, index) => index);
  return (
    <div className="revstudent-review-card">
      <div className="revstudent-toptag">{props.tag}</div>
      <img className="revstudent-user-avatar" src={props.photo} alt="User Avatar" />
      <p className="revstudent-review-content">
        {props.content}
      </p>
      <p className="revstudent-reviewer-info">
        - {props.name}, {props.role}
      </p>
      <p className="revstudent-website-info">
       
      </p>
      <div className="revstudent-star-rating">
        
      {headings.map((_, index) => (
       <span key={index} className="revstudent-star">★</span> 
      ))}
       
      </div>
    </div>
  );
};

export default ReviewCard;
