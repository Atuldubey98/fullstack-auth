import React, { memo, useContext, useState } from "react";
import { UIContext } from "../contexts/UIContext";
import Loading from "./Loading";
const AddProductModalForm = ({ categories, onProductAdd, state }) => {
  const { closeModal } = useContext(UIContext);
  const [productFields, setProductFields] = useState({
    category: categories.length > 0 ? categories[0] : "",
    title: "",
    description: "",
    price: 0,
    image: "",
  });
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.keys(productFields).some((key) => productFields[key].length <= 0)
    ) {
      console.log(productFields);
      return;
    }
    
    onProductAdd(productFields);
    closeModal();
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setProductFields({ ...productFields, [name]: value });
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="input__control">
        <label htmlFor="title">Title</label>
        <input
          onChange={onChange}
          name="title"
          type="text"
          placeholder="Title"
        />
      </div>
      <div className="input__control">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          onChange={onChange}
          placeholder="Price"
        />
      </div>
      <div className="input__control">
        <label htmlFor="image">Image</label>
        <input
          type="url"
          placeholder="Image"
          name="image"
          onChange={onChange}
        />
      </div>
      <div className="input__control">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description"
          name="description"
          onChange={onChange}
        />
      </div>
      <div className="input__control">
        <label htmlFor="description">Category</label>
        <select name="category" id="category" onChange={onChange}>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div
        className="close"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.addProductLoading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            style={{ backgroundColor: "green", color: "white" }}
          >
            ADD
          </button>
        )}
      </div>
    </form>
  );
};

export default memo(AddProductModalForm);
