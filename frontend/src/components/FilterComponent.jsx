import React, { useRef } from "react";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductsContext";
import { ON_FILTER_CHANGE } from "../reducers/productReducer";
import { Link, redirect, useNavigate } from "react-router-dom";
const FilterComponent = ({ pages }) => {
  const options = [{ value: 5 }, { value: 10 }, { value: 15 }];
  const navigate = useNavigate();
  const searchRef = useRef();
  const { productDispatch, state } = useContext(ProductContext);
  const onChangeLimit = (e) => {
    const { name, value } = e.target;
    productDispatch({ type: ON_FILTER_CHANGE, payload: { name, value } });
    navigate("/products/1");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const value = searchRef.current.value;
    const name = "search";
    productDispatch({ type: ON_FILTER_CHANGE, payload: { name, value } });
    navigate("/products/1");
  };
  return (
    <div className="filter">
      <select name="limit" id="id" onChange={onChangeLimit}>
        {options?.map((option) => (
          <option {...option} key={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <div className="filter__pages">
        {Array.from(Array(pages).keys()).map((page) => (
          <Link style={{ padding: 6 }} to={`/products/${page + 1}`} key={page}>
            {page + 1}
          </Link>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          defaultValue={state.filter.search}
          name="search"
          ref={searchRef}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterComponent;
