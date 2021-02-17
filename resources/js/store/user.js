

const initalState = {
  info: null,
  transactions: {
    all : []
  },
  shippments: {
    all: [],
  }
}

const reducer = (state, action) => {
   let {type, payload} = action;
    switch (type) {
      case "LOGIN":
        return {
            info: payload.user, 
            transactions: payload.transactions, 
            shippments: payload.shippments, 
        }
        
      case "LOGOUT":
        sessionStorage.removeItem('QrNoLoadScreen');
        window.location.replace( window.location.origin);
        return null;
      case "SHIPPMENT_SENT":
        return {
          ...state,
          shippments: {
            ...payload
            }
          };
      default:
        return state;
    }
  };


  export const user = {
      state : initalState,
      reducer : reducer
  }