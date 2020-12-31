const initalState = {
    active: undefined,
    list: []
};

const reducer = (state, action) => {
   
    switch (action.type) {
      case "GET":
            return {
                active: action.payload[0],
                list: action.payload
            }
        case "SWITCH":
            return {
                ...state,
                active: action.payload,
            }
       
      case "CREATE":
       
        return state;
      case "EDIT":
    
        return state;
    case "DELETE":

        return state;
      default:
        return state;
    }
  };


  export const stores = {
      state : initalState,
      reducer : reducer
  }