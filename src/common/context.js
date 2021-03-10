import React, { createContext, useReducer } from "react";

// Create Context Object
const initialState = {
  profile: {},
};
export const CommonContext = createContext(initialState);
export const CommonContextProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "setProfile":
        return { ...state, profile: action.payload };
      default:
        return state;
    }
  }, initialState);
  return (
    <CommonContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CommonContext.Provider>
  );
};
