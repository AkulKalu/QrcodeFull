
const initalState = {
    list: []
};

const reducer = (state, action) => {
    
    switch (action.type) {
      case "GET":
            return {
               ...state,
               ...action.payload.products
            }
       
        case "CREATE":
          return {
            ...state,
            list: [action.payload.created, ...state.list],
          }
        case "EDIT":
          let editedList = [...state.list];
          editedList[action.payload.idx] = action.payload.updated;
          return {
            ...state,
            list: editedList,
          }
      case "DELETE":
          let deletedList = [...state.list];
          deletedList.splice(action.payload.idx, 1);
          return {
            ...state,
            list: deletedList,
          }
      default:
        return state;
    }
  };


  export const products = {
      state : initalState,
      reducer : reducer
  }