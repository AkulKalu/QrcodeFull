
const initalState = {
    active: undefined,
    all: []
};

const reducer = (state, action) => {
    const {payload , type} = action;
   
    switch (type) {
      case "GET":
            return {
                active: payload.stores.all[0],
                all: payload.stores.all,
                new: payload.stores.new,
            }
        case "SWITCH":
            return {
                ...state,
                active: payload,
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
            ...payload.stores,
          }
      default:
        return state;
    }
  };


  export const stores = {
      state : initalState,
      reducer : reducer
  }
  