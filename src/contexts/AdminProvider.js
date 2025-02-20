import React from "react";
import axios from "axios";
import { API } from "../helpers/const";

export const AdminContext = React.createContext();

const Init_State = {
  adminProducts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ADMIN_PRODUCTS":
      return { ...state, adminProducts: action.payload };
    default:
      return state;
  }
};

const AdminProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, Init_State);

  // ! Create

  const createProduct = async (newManga) => {
    try {
      await axios.post(API, {
        ...newManga,
        genres: [],
        rate: [
          {
            rateAvg: 0,
            rateAmount: 0,
            rateSum: 0,
          },
        ],
        comments: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ! Read

  const getAdminProducts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_ADMIN_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! Delete

  const deleteAdminProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getAdminProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ! Update

  const saveEditedProduct = async (product) => {
    try {
      await axios.patch(`${API}/${product.id}`, {
        ...product,
        price: +product.price,
      });
      getAdminProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        createProduct,
        getAdminProducts,
        deleteAdminProduct,
        saveEditedProduct,
        adminProducts: state.adminProducts,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
