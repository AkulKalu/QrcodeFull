import {login, logout } from '../Functions/server'

const initalState = null;

const reducer = (state, action) => {
   
    switch (action.type) {
      case "LOGIN":
        return {
            ...action.payload
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