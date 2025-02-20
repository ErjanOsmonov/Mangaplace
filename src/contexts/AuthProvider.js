import React, { useEffect, useReducer } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

const Init_State = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, Init_State);

  const googleProvider = new GoogleAuthProvider();

  const AuthWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      let action = {
        type: "CHECK_USER",
        payload: user,
      };
      dispatch(action);
    });
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ AuthWithGoogle, user: state.user, logout: logout, checkUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
