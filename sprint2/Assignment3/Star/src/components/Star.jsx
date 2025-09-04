import React from "react";

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? "gold" : "none"}
      stroke="gray"
      strokeWidth="1.5"
      width="30"
      height="30"
      style={{ cursor: "pointer", transition: "fill 0.2s" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        d="M10 1.5l2.763 5.598 6.177.898-4.47 4.356 1.055 6.158L10 15.75l-5.525 2.76 
           1.055-6.158-4.47-4.356 6.177-.898L10 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Star;
