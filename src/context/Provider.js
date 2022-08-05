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
  if (action.type === "GET_BOOKS_FROM_FAVORITE") {
    return {
      ...state, 
      favoriteBooks: action.payload,
    };
  }
  if (action.type === "GET_FAVORITE_COUNT") {
    return {
      ...state,
      favoriteCount: action.payload,
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
    favoriteBooks: {
      products: [], 
      totalPrice:0,
    }, 
    favoriteCount:0,
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

  const addBookToFavorite = (book) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        totalPrice: 0,
        products: [],
      };
    }
    let bookToFavorite = {
      ...book,
      count: 1,
      subPrice: book.price,
    };
    let check = favorite.products.find((item) => {
      return item.id === bookToFavorite.id;
    });
    if (check) {
      favorite.products = favorite.products.map((item) => {
        if (item.id === bookToFavorite.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      favorite.products.push(bookToFavorite);
    }
    favorite.totalPrice = favorite.products.reduce((prev, item) => {
      return parseInt(prev) + parseInt(item.subPrice);
    }, 0);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavoriteCount();
  };


  const getBooksFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_BOOKS_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  const getBooksFromFavorite = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    let action = {
      type: "GET_BOOKS_FROM_FAVORITE",
      payload: favorite,
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


  const getFavoriteCount = () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
      };
    }
    let action = {
      type: "GET_FAVORITE_COUNT",
      payload: favorite.products.length,
    };
    dispatch(action);
  };
React.useEffect(() => {
  getPrices();
  getFavoriteCount()
}, [])

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
    favoriteBooks: state.favoriteBooks,
    favoriteCount: state.favoriteCount,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    minMax,
    getPrices,
    addBookToBasket,
    addBookToFavorite,
    getBooks,
    getBooksFromBasket,
    getBooksFromFavorite,
    setFilterByPrice,
    setSearchWord,
    setCurrentPage,
  };
  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default Provider;
