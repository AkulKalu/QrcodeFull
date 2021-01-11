

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
   
    switch (action.type) {
      case "LOGIN":
        return {
            info: action.payload.user, 
            transactions: action.payload.transactions, 
            shippments: action.payload.shippments, 
        }
       
      case "LOGOUT":
        window.location.replace( window.location.origin);
        return null;
      default:
        return state;
    }
  };


  export const user = {
      state : initalState,
      reducer : reducer
  }