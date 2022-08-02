import React from "react";
import { booksApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_BOOKS") {
    return {
      ...state,
      books: action.payload,
    };
  }
  return state;
};

function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    books: [],
  });
  const getBooks = () => {
    fetch(booksApi)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_BOOKS",
          payload: data,
        };
        dispatch(action);
      });
  };
  const data = {
    getBooks,
    books: state.books,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default Provider;
// чтобы получить товар и сохранить
