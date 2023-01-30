export const ADDRESS_LOADING = "ADDRESS_LOADING";
export const ADDRESS_ERROR = "ADDRESS_ERROR";
export const ADDRESS_LOADED = "ADDRESS_LOADED";
export const ON_ADDRESS_CHANGE = "ON_ADDRESS_CHANGE";
export const ADDRESS_ADD = "ADDRESS_ADD";
export const ADDRESS_SELECT = "ADDRESS_SELECT";
export const orderIntial = {
  addresses: [],
  selectedAddress: 0,
  address: {
    block: "",
    area: "",
    pincode: 0,
    landmark: "",
    city: "",
  },
  loading: false,
  error: "",
};
export const orderReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADDRESS_SELECT:
      return {
        ...state,
        selectedAddress: payload,
      };
    case ON_ADDRESS_CHANGE:
      return {
        ...state,
        address: { ...state.address, [payload.name]: payload.value },
      };
    case ADDRESS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADDRESS_LOADED:
      return {
        ...state,
        loading: false,
        addresses: payload,
      };
    case ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADDRESS_ADD:
      return {
        ...state,
        addresses: [...state.addresses, payload],
      };
    default:
      break;
  }
};
