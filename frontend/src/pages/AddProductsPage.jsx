import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../api/ProductService";
import CartProducts from "../components/CartProducts";
import FilterComponent from "../components/FilterComponent";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Product from "../components/Product";
import { ProductContext } from "../contexts/ProductsContext";
import { UIContext } from "../contexts/UIContext";
import { PRODUCTS_LOADED, PRODUCTS_LOADING } from "../reducers/productReducer";
import "./AddProductsPage.css";
import PageLayout from "./PageLayout";
const AddProductsPage = () => {
  const { state, productDispatch } = useContext(ProductContext);
  const { sideCart } = useContext(UIContext);

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
        <Loading />
      ) : (
        <div className="cart__wrapper">
          <div className="products">
            {products?.map((product) => (
              <Product {...product} key={product.id} />
            ))}
            {products?.length === 0 && <div>{"No products found"}</div>}
          </div>
          {sideCart && <CartProducts />}
        </div>
      )}
      {error && <div>{error}</div>}
    </PageLayout>
  );
};

export default AddProductsPage;
