import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductsContext";
import { ON_FILTER_CHANGE } from "../reducers/productReducer";
import "./FilterComponent.css";
import FilterPages from "./FilterPages";
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
      <div className="filter__limitPage">
        <label htmlFor="limit">Products per page :</label>
        <select name="limit" id="id" onChange={onChangeLimit}>
          {options?.map((option) => (
            <option {...option} key={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <FilterPages pages={pages} />
      </div>
      <form onSubmit={onSubmit}>
        <div className="input">
          <input
            type="text"
            defaultValue={state.filter.search}
            name="search"
            ref={searchRef}
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default FilterComponent;
