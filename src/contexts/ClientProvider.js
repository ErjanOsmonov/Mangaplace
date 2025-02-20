import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { API } from "../helpers/const";

export const ClientContext = React.createContext();

const Init_State = {
  products: null,
  productDetail: null,
  favorite: null,
  comments: null,
  rate: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_DETAIL":
      return { ...state, productDetail: action.payload };
    case "GET_FAVORITE": {
      return { ...state, favorite: action.payload };
    }
    case "GET_COMMENTS": {
      return { ...state, comments: action.payload };
    }
    case "GET_RATE": {
      return { ...state, rate: action.payload };
    }
    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, Init_State);

  // ! Read

  const getProducts = async () => {
    try {
      const response = await axios(`${API}${window.location.search}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetail = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_PRODUCT_DETAIL",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! Pagination

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  useEffect(() => {
    if (state.products) {
      setPosts(state.products);
    }
  }, [state.products]);
  const indexOfLastProduct = currentPage * postsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductsCount = posts.length;

  // ! add in Read

  const addAndDeleteProductInFavorite = (product) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));

    if (!favorite) {
      favorite = {
        products: [],
      };
    }

    let mangaProduct = {
      product: product,
      count: 1,
    };

    let check = favorite.products.find((item) => {
      return item.product.id === product.id;
    });

    if (!check) {
      favorite.products.push(mangaProduct);
    } else {
      favorite.products = favorite.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }

    localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavorite();
  };

  const checkProductInFavorite = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
      };
    }

    let check = favorite.products.find((item) => {
      return item.product.id === id;
    });

    if (!check) {
      return false;
    } else {
      return true;
    }
  };

  const getFavorite = async () => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
      };
    }

    let action = {
      type: "GET_FAVORITE",
      payload: favorite,
    };

    dispatch(action);
  };

  const deleteFavorite = async (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    favorite.products = favorite.products.filter((product) => {
      return product.product.id !== id;
    });
    localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavorite();
  };

  const addComment = async (comment, product) => {
    try {
      await axios.patch(`${API}/${product.id}`, {
        ...product,
        comments: [...product.comments, comment],
      });
      getComments(product.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_COMMENTS",
        payload: response.data.comments,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! Rate

  const updateRate = async (newRate, productId) => {
    try {
      let response = await axios(`${API}/${productId}`);
      // response.data.rate[0].uids.map((item) => {
      //   if (item === uid) {
      //     return;
      //   }
      // });
      // response.data.rate[0].rateAmount += 1;
      // response.data.rate[0].rateSum += newRate;
      // response.data.rate[0].rateAvg =
      //   response.data.rate[0].rateSum / response.data.rate[0].rateAmount;

      // await axios.patch(`${API}/${productId}`, response.data);
      let product = response.data;
      product.rate.map((item) => {
        item.rateAmount += 1;
        item.rateSum = item.rateSum + newRate;
        item.rateAvg = Math.ceil((item.rateSum / item.rateAmount) * 10) / 10;
      });
      await axios.patch(`${API}/${productId}`, product);
      getRate(productId);
    } catch (error) {
      console.log(error);
    }
  };

  // ! getRate

  const getRate = async (productId) => {
    try {
      const response = await axios(`${API}/${productId}`);
      let action = {
        type: "GET_RATE",
        payload: response.data.rate,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <ClientContext.Provider
      value={{
        getProducts: getProducts,
        getProductDetail,
        setCurrentPage,
        getFavorite,
        addAndDeleteProductInFavorite,
        checkProductInFavorite,
        addComment,
        getComments,
        deleteFavorite,
        updateRate,
        getRate,
        // products: state.products,
        products: currentPosts,
        productDetail: state.productDetail,
        currentPage,
        postsPerPage,
        totalProductsCount,
        comments: state.comments,
        favorite: state.favorite,
        rate: state.rate,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
