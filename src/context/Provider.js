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
  if (action.type === "GET_BOOKS_FROM_BASKET") {
    return {
      ...state, 
      basketBooks: action.payload
    }
  }
  if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state, 
      basketCount: action.payload
    }
  }
  return state;
};

function Provider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    books: [],
    basketBooks: {
      products: [], 
      totalPrice: 0,
    },
    basketCount: 0,
  });

const [searchWord, setSearchWord] = React.useState("");


  const getBooks = () => {
    fetch(`${booksApi}?q=${searchWord}`)
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

  

const addBookToBasket = (book) => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  if (!basket) {
    basket = {
      totalPrice: 0, 
      products: [],
    };
  }
  let bookToBasket = {
    ...book, 
    count: 1, 
    subPrice: book.price,
  };
let check = basket.products.find ((item) => {
  return item.id === bookToBasket.id;
});
if (check) {
  basket.products = basket.products.map((item) => {
    if (item.id === bookToBasket.id) {
      item.count ++; 
      item.subPrice = item.count * item.price;
      return item;
    }
    return item;
  }); 
} else {
  basket.products.push(bookToBasket);
}
basket.totalPrice = basket.products.reduce((prev, item) => {
  return prev + item.subPrice;
}, 0);
localStorage.setItem("basket", JSON.stringify(basket));
getBasketCount()
};

const getBooksFromBasket = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let action = {
    type: "GET_BOOKS_FROM_BASKET",
    payload: basket,
  }
  dispatch(action)
}

const getBasketCount = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  if (!basket) {
    basket = {
      products: [],
    };
  }
  let action = {
    type: "GET_BASKET_COUNT",
    payload: basket.products.length,
  };
  dispatch(action)
}
React.useEffect(() => {
  getBasketCount()
}, [])


  const data = {
    books: state.books,
    searchWord, 
    basketBooks: state.basketBooks,
    basketCount: state.basketCount,
    getBooks,
setSearchWord,
addBookToBasket,
getBooksFromBasket
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default Provider;
// чтобы получить товар и сохранить
