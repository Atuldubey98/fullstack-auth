import React from "react";
import "./CategoryCard.css";
const CategoryCard = (category) => {
  const { img, description, title } = category;
  return (
    <div className="category__card">
      <div className="category__cardImg">
        <img {...img} />
      </div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default CategoryCard;
