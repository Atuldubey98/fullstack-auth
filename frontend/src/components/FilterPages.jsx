import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const FilterPages = ({ pages }) => {
  let { page } = useParams();
  page = typeof page === "string" ? parseInt(page) : 1;
  const [skip, setSkip] = useState(0);
  const displayPages = Array.from(Array(pages).keys()).filter(
    (value) => value + 1 > skip && value + 1 <= Math.min(skip + 5, pages)
  );

  const navigate = useNavigate();
  function onPageIncrement() {
    if (page >= pages) return;
    navigate(`/products/${++page}`);
    setSkip((prev) => prev + 1);
  }
  function onPageDecrement() {
    if (page === 1) return;
    navigate(`/products/${--page}`);
    setSkip((prev) => prev - 1);
  }
  return (
    <div className="filter__pages">
      {page > 1 && (
        <button onClick={onPageDecrement}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      {displayPages.map((p) => (
        <Link
          style={{
            padding: 6,
            backgroundColor: p === page - 1 && "#5d7272",
          }}
          to={`/products/${p + 1}`}
          key={p}
        >
          {p + 1}
        </Link>
      ))}
      {page < pages && (
        <button onClick={onPageIncrement}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};

export default FilterPages;
