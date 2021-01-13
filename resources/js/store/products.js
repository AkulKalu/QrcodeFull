const initalState = {
    list: []
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
            list: [payload.created, ...state.list],
          }
        case "EDIT":
          let editedList = [...state.list];
          console.log( payload.updated);
          editedList[payload.idx] = payload.updated;
          return {
            ...state,
            ...payload,
            list: editedList,
          }
      case "DELETE":
          let deletedList = [...state.list];
          deletedList.splice(payload.idx, 1);
          return {
            ...state,
            ...payload,
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