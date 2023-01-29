export const registerInitialState = {
  email: "",
  password: "",
  name: "",
  error: "",
  loading: false,
  message: "",
};
export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_LOADED = "REGISTER_LOADED";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const ON_INPUT_CHANGE = "ON_INPUT_CHANGE";
export const REGISTER_ERROR_CLEAR = "REGISTER_ERROR_CLEAR";
export const registerReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_LOADED:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: "",
      };
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "",
      };
    case ON_INPUT_CHANGE:
      return {
        ...state,
        loading: false,
        error: "",
        [action.payload.name]: action.payload.value,
      };
    case REGISTER_ERROR_CLEAR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};
