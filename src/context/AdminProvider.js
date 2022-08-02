import React from "react";
import { booksApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_BOOKS") {
    return {
      ...state,
      books: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    books: [],
  });

  const getBooks = () => {
    fetch(booksApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_BOOKS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deleteBook = (id) => {
    fetch(`${booksApi}/${id}`, {
      method: "DELETE",
    }).then(() => getBooks());
  };

  const data = {
    books: state.books,
    getBooks,
    deleteBook,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
