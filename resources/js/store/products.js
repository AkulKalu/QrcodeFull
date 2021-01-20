const initalState = {
    all: []
};



const reducer = (state, action) => {
    const {type, payload } = action;
    
    switch (type) {
      case "GET":
        return {
            ...state,
            ...payload.products,
        }
      
      case "CREATE":
        return {
          ...state,
          ...payload,
        }
      case "EDIT":
        return {
          ...state,
          ...payload,
        }
    case "DELETE":
        return {
          ...state,
          ...payload, 
        }
    default:
      return state;
    }
  };


  export const products = {
      state : initalState,
      reducer : reducer
  }