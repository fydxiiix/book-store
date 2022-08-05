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
      basketBooks: action.payload,
    };
  }
  if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
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
  const [filterByPrice, setFilterByPrice] = React.useState([0, 999]);
  const [minMax, setMinMax] = React.useState([0, 999]);

  const limit = 3;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getBooks = () => {
    fetch(
      `${booksApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);
        setPagesCount(count);
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
    let check = basket.products.find((item) => {
      return item.id === bookToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === bookToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(bookToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return parseInt(prev) + parseInt(item.subPrice);
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getBooksFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_BOOKS_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  const getPrices = () => {
    fetch(booksApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

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
    dispatch(action);
  };

  const deleteBookFromCart = (id) => {
    let basket = JSON.parse(localStorage.getItem("basket"));

    console.log(basket);
    basket.totalPrice = basket.products.filter((item) => {
      // вернуть все кроме того айтем с которым совпадает айди из аргумента
    });
    //  вызвать функцию гет для корзины
  };
  React.useEffect(() => {
    getPrices();
    getBasketCount();
  }, []);

  const data = {
    books: state.books,
    basketBooks: state.basketBooks,
    basketCount: state.basketCount,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    minMax,
    getPrices,
    addBookToBasket,
    getBooks,
    getBooksFromBasket,
    setFilterByPrice,
    setSearchWord,
    setCurrentPage,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default Provider;
