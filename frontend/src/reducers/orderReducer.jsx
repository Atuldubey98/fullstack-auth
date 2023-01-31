export const ADDRESS_LOADING = "ADDRESS_LOADING";
export const ADDRESS_ERROR = "ADDRESS_ERROR";
export const ADDRESS_LOADED = "ADDRESS_LOADED";
export const ON_ADDRESS_CHANGE = "ON_ADDRESS_CHANGE";
export const ADDRESS_ADD = "ADDRESS_ADD";
export const ADDRESS_SELECT = "ADDRESS_SELECT";

export const STRIPE_PROMISE_LOADED = "STRIPE_PROMISE_LOADED";
export const STRIPE_PROMISE_LOADING = "STRIPE_PROMISE_LOADING";
export const STRIPE_PROMISE_ERROR = "STRIPE_PROMISE_ERROR";

export const CLIENT_SECRET_LOADED = "CLIENT_SECRET_LOADED";
export const CLIENT_SECRET_LOADING = "CLIENT_SECRET_LOADING";
export const CLIENT_SECRET_ERROR = "CLIENT_SECRET_ERROR";
export const orderIntial = {
  addresses: [],
  clientSecret: {
    data: "",
    loading: false,
    error: "",
  },
  stripePromise: {
    data: null,
    loading: false,
    error: "",
  },
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
    case CLIENT_SECRET_LOADING:
      return {
        ...state,
        clientSecret: { ...state.clientSecret, loading: true },
      };

    case CLIENT_SECRET_LOADED: {
      return {
        ...state,
        clientSecret: {
          ...state.clientSecret,
          data: payload,
          loading: false,
        },
      };
    }
    case CLIENT_SECRET_ERROR: {
      return {
        ...state,
        clientSecret: {
          ...state.clientSecret,
          error: payload,
          loading: false,
        },
      };
    }
    case STRIPE_PROMISE_LOADED: {
      return {
        ...state,
        stripePromise: {
          ...state.stripePromise,
          data: payload,
          loading: false,
        },
      };
    }
    case STRIPE_PROMISE_LOADING: {
      return {
        ...state,
        stripePromise: { ...state.stripePromise, loading: true },
      };
    }
    case STRIPE_PROMISE_ERROR: {
      return {
        ...state,
        stripePromise: {
          ...state.stripePromise,
          error: payload,
          loading: false,
        },
      };
    }
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
