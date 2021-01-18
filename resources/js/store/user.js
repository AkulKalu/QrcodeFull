

const initalState = {
  info: null,
  transactions: {
    list : []
  },
  shippments: {
    list: []
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
        window.location.replace( window.location.origin);
        return null;
      case "SHIPPMENT_SENT":
        console.log(payload);
        return state;
      default:
        return state;
    }
  };


  export const user = {
      state : initalState,
      reducer : reducer
  }