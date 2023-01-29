import { useEffect, useReducer } from "react";
import {
  productReducer,
  productsInitialState,
  PRODUCTS_ERROR,
  PRODUCTS_LOADED,
  PRODUCTS_LOADING,
  ADD_PRODUCT_LOADING,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_LOADED,
} from "../reducers/productReducer";
import ProductService from "../api/ProductService";
import { useState } from "react";
import useQuery from "./useQuery";
const useProducts = () => {
  const [state, dispatch] = useReducer(productReducer, productsInitialState);
  const max = Math.max(...state.products.map((product) => product.id)) + 1;
  const [limit, setLimit] = useState(5);
  const onChangeLimit = (e) => {
    setLimit(e.target.value);
  };
  const query = useQuery();
  console.log(limit);
  const page = query.get("page") ? query.get("page") : 1;
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: PRODUCTS_LOADING });
        const [responseProducts, responseCategories] = await Promise.all([
          await ProductService.getAllProducts(limit, page),
          await ProductService.getAllCategories(),
        ]);

        dispatch({
          type: PRODUCTS_LOADED,
          payload: {
            products: responseProducts.products,
            categories: responseCategories.categories,
          },
        });
      } catch (error) {
        dispatch({
          type: PRODUCTS_ERROR,
          payload: error.response.data.message,
        });
      }
    })();
  }, [limit]);

  async function onProductAdd(productToAdd) {
    try {
      dispatch({ type: ADD_PRODUCT_LOADING });
      const { product } = await ProductService.addProduct(productToAdd);
      dispatch({ type: ADD_PRODUCT_LOADED, payload: product });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_ERROR,
        payload: error.response.data.message,
      });
    }
  }
  return {
    onProductAdd,
    max,
    onChangeLimit,
    state,
  };
};

export default useProducts;
