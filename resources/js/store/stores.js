
const initalState = {
    active: undefined,
    list: null
};

const reducer = (state, action) => {
    
    switch (action.type) {
      case "GET":
            return {
                active: action.payload.stores.list[0],
                list: action.payload.stores.list,
                new: action.payload.stores.new,
            }
        case "SWITCH":
            return {
                ...state,
                active: action.payload,
            }
       
        case "CREATE":
          return {
            ...state,
            active: action.payload.created,
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
          let active = action.payload.deleted == state.active.id ? deletedList[0] : state.active;
          return {
            ...state,
            active: active,
            list: deletedList,
          }
      default:
        return state;
    }
  };


  export const stores = {
      state : initalState,
      reducer : reducer
  }