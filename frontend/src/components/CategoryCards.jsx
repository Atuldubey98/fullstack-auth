import React from "react";
import "./CategoryCards.css";
import mensclothing from "../assets/shirt.jpg";
import accessories from "../assets/bag.jpg";
import gadgets from "../assets/mobile.jpg";
import jewellary from "../assets/jewel.jpg";
import CategoryCard from "./CategoryCard";

const CategoryCards = () => {
  const categoryCards = [
    {
      key: 0,
      img: {
        src: mensclothing,
        alt: "Mens Clothing",
      },
      description:
        "Online Shopping for Men - Browse & buy from a wide range of men's clothing, menswear & accessories online at best prices ✯Fast Shipping ✯Amazing Offers.",
      title: "Men's Clothing",
    },
    {
      key: 1,
      img: {
        src: accessories,
        alt: "Accessories",
      },
      description:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quis eos aut, labore, distinctio delectus omnis libero repellendus ipsa pariatur unde enim earum eaque amet eius error debitis voluptate asperiores.",
      title: "Accessories",
    },
    {
      key: 2,
      img: {
        src: gadgets,
        alt: "Mobile & Laptops",
      },
      description:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quis eos aut, labore, distinctio delectus omnis libero repellendus ipsa pariatur unde enim earum eaque amet eius error debitis voluptate asperiores.",
      title: "Mobile & Laptops",
    },
    {
      key: 3,
      img: {
        src: jewellary,
        alt: "Jewellaries",
      },
      description:
        " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quis eos aut, labore, distinctio delectus omnis libero repellendus ipsa pariatur unde enim earum eaque amet eius error debitis voluptate asperiores.",
      title: "Jewellaries",
    },
  ];
  return (
    <div className="category__cardsWrapper">
      <div className="category__cards">
        {categoryCards.map((category) => (
          <CategoryCard {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
