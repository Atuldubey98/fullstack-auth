export const CART_ADD = "CART_ADD";
export const CART_REMOVE = "CART_REMOVE";
export const initialCart = {
  cartProducts: [],
};
export const cartReducer = (state, action) => {
  let index = -1;
  const { payload, type } = action;
  switch (type) {
    case CART_ADD:
      index = state.cartProducts.findIndex(
        (product) => product.id === payload.id
      );
      if (index === -1) {
        return {
          ...state,
          cartProducts: [...state.cartProducts, action.payload],
        };
      }
      state.cartProducts[index].quantity++;
      return {
        ...state,
      };
    case CART_REMOVE:
      index = state.cartProducts.findIndex(
        (product) => product.id === payload.id
      );
      if (index === -1) {
        return {
          ...state,
        };
      }
      if (state.cartProducts[index].quantity - 1 <= 0) {
        return {
          ...state,
          cartProducts: state.cartProducts.filter(
            (product) => product.id !== payload.id
          ),
        };
      }
      state.cartProducts[index].quantity--;
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
