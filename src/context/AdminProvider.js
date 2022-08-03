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
  if (action.type === "GET_BOOK_TO_EDIT") {
    return {
      ...state,
      bookToEdit: action.payload,
    }
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    books: [],
    bookToEdit: null
  });

  const sendNewBook = (newBook) => {
    fetch(booksApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
  };

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

  const getBookToEdit = (id) => {
    fetch(`${booksApi}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      let action = { 
        type: "GET_BOOK_TO_EDIT",
        payload: data
      }
      dispatch(action)
    })
  }

const saveEditedBook = (editedBook) => {
fetch (`${booksApi}/${editedBook.id}`, {
  method: "PATCH", 
  headers: {
    "Content-Type": "application/json",
  }, 
  body: JSON.stringify(editedBook)
})
}

  const data = {
    books: state.books,
    bookToEdit: state.bookToEdit, 
    getBooks,
    deleteBook,
    sendNewBook,
    getBookToEdit,
    saveEditedBook
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
