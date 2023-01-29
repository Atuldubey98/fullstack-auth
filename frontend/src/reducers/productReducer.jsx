export const productsInitialState = {
  products: [],
  categories: [],
  loading: false,
  error: "",
  totalCount: 0,
  product: {
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "Select Category",
  },
  filter: {
    limit: 5,
    search: "",
  },
  addedProduct: null,
  addProductLoading: false,
  addProductError: null,
};

export const PRODUCTS_LOADING = "PRODUCTS_LOADING";
export const PRODUCTS_ERROR = "PRODUCTS_ERROR";
export const PRODUCTS_LOADED = "PRODUCTS_LOADED";

export const ON_INPUT_CHANGE = "ON_INPUT_CHANGE";

export const ADD_PRODUCT_LOADING = "ADD_PRODUCT_LOADING";
export const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";
export const ADD_PRODUCT_LOADED = "ADD_PRODUCT_LOADED";

export const ON_FILTER_CHANGE = "ON_FILTER_CHANGE";

export const productReducer = (state, action) => {
  switch (action.type) {
    case ON_INPUT_CHANGE:
      return {
        ...state,
        product: {
          ...state.product,
          [action.payload.name]: action.payload.value,
        },
      };
    case PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_LOADED:
      return {
        ...state,
        products: action.payload.products,
        categories: action.payload.categories,
        loading: false,
      };
    case PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_PRODUCT_LOADING:
      return {
        ...state,
        addProductLoading: true,
      };
    case ADD_PRODUCT_LOADED:
      return {
        ...state,
        addProductLoading: false,
        addedProduct: action.payload,
        products: [...state.products, action.payload],
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        addProductLoading: false,
        addProductError: action.payload,
      };
    case ON_FILTER_CHANGE:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.payload.name]: [action.payload.value],
        },
      };
    default:
      return state;
  }
};
