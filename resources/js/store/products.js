import { type } from "jquery";

const initalState = {
    list: []
};

const reducer = (state, action) => {
    const {type, payload } = action;
    console.log(payload);
    switch (type) {
      case "GET":
            return {
               ...state,
               ...payload.products,
               categories : payload.products.list.map( prod => prod.category)
            }
       
        case "CREATE":
          return {
            ...state,
            list: [payload.created, ...state.list],
          }
        case "EDIT":
          let editedList = [...state.list];
          editedList[payload.idx] = payload.updated;
          return {
            ...state,
            list: editedList,
          }
      case "DELETE":
          let deletedList = [...state.list];
          deletedList.splice(payload.idx, 1);
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