const initalState = {
    active: undefined,
    list: []
};

const reducer = (state, action) => {
   
    switch (action.type) {
      case "GET":
            return {
                active: action.payload.list[0],
                list: action.payload.list,
                new: action.payload.new,
            }
        case "SWITCH":
            return {
                ...state,
                active: action.payload,
            }
       
      case "CREATE":
        return {
          active: action.payload.created,
          list: [action.payload.created, action.payload.list],
        }
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