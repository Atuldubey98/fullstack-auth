import React, { memo, useContext } from "react";
import Modal from "react-modal";
import { ProductContext } from "../contexts/ProductsContext";
import { UIContext } from "../contexts/UIContext";
import AddProductModalForm from "./AddProductModalForm";
const AddModal = () => {
  Modal.setAppElement("#root");
  const { modalIsOpen, closeModal } = useContext(UIContext);
  const { state, productDispatch } = useContext(ProductContext);
  const { categories } = state;
  const onProductAdd = () => {};
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        className="close"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{ backgroundColor: "black", color: "white" }}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
      <AddProductModalForm
        categories={categories}
        onProductAdd={onProductAdd}
        state={state}
      />
    </Modal>
  );
};

export default memo(AddModal);
