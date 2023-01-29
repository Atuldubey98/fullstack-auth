import React from "react";
import useQuery from "../hooks/useQuery";
import { useContext } from "react";
import Product from "../components/Product";
import { useEffect } from "react";
import Header from "../components/Header";
import { ProductContext } from "../contexts/ProductsContext";
import PageLayout from "./PageLayout";
import ProductService from "../api/ProductService";
import { PRODUCTS_LOADED, PRODUCTS_LOADING } from "../reducers/productReducer";
import AddModal from "../components/AddModal";
import FilterComponent from "../components/FilterComponent";
import { useParams } from "react-router-dom";
import { useState } from "react";
const AddProductsPage = () => {
  const { state, productDispatch } = useContext(ProductContext);
  const { loading, error, products, filter } = state;
  const { limit, search } = filter;
  let { page } = useParams();
  const [pages, setPages] = useState(0);
  page = typeof page === "string" ? parseInt(page) : 1;
  useEffect(() => {
    productDispatch({ type: PRODUCTS_LOADING });
    (async () => {
      const [{ products, count, totalPages }, { categories }] =
        await Promise.all([
          await ProductService.getAllProducts(limit, page, search),
          await ProductService.getAllCategories(),
        ]);
      setPages(() => {
        return count > 0 ? totalPages : 0;
      });
      productDispatch({
        type: PRODUCTS_LOADED,
        payload: {
          categories,
          products,
        },
      });
    })();
  }, [limit, page, search]);
  return (
    <PageLayout>
      <Header />
      <FilterComponent pages={pages} />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="products">
          {products?.map((product) => (
            <Product {...product} key={product.id} />
          ))}
          {products?.length === 0 && <div>{"No products found"}</div>}
        </div>
      )}
      {error && <div>{error}</div>}
      <AddModal />
    </PageLayout>
  );
};

export default AddProductsPage;
