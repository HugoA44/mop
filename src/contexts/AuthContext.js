import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  loginWithCredentials,
  registerWithRegistrationCredentials,
} from "../services/Api";

const AuthContext = createContext();

const actionTypes = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
  ERROR: "ERROR",
};

const initialState = {
  token: null,
  user: null,
  error: null,
  loading: false,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...initialState,
        token: action.data.token,
        user: action.data.user,
      };
    case actionTypes.REGISTER:
      return {
        ...initialState,
        token: action.data.token,
        user: action.data.user,
      };
    case actionTypes.ERROR:
      return {
        ...initialState,
        error: action.data.error,
      };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const loadStoredState = async () => {
      const storedState = await rehydrateAuth();
      if (storedState) {
        dispatch({
          type: actionTypes.LOGIN,
          data: {
            user: storedState.user,
            token: storedState.token,
          },
        });
      }
    };
    loadStoredState();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await persistAuth(state);
    };
    saveData();
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside a AuthProvider");
  return context;
};

const loginUser = async (credentials, dispatch) => {
  try {
    const data = await loginWithCredentials(credentials);
    dispatch({
      type: actionTypes.LOGIN,
      data: { user: data, token: data.accessToken },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ERROR,
      data: { error: error.message },
    });
  }
};

/**
 * registerUser
 * @param { props } registrationCredentials Credentials for registration email or username + password requireds
 * @returns { Function } register user with registerWithRegistrationCredentials function
 */

const registerUser = async (registrationCredentials, dispatch) => {
  try {
    const data = await registerWithRegistrationCredentials(
      registrationCredentials
    );
    dispatch({
      type: actionTypes.REGISTER,
      data: { user: data, token: data.accessToken },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ERROR,
      data: { error: error.message },
    });
  }
};

const logoutUser = async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.LOGOUT,
    });
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

const persistAuth = async (data) => {
  try {
    await AsyncStorage.setItem("AUTH", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

const rehydrateAuth = async () => {
  try {
    const data = await AsyncStorage.getItem("AUTH");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
  }
};

export {
  useAuth,
  AuthProvider,
  actionTypes,
  loginUser,
  logoutUser,
  registerUser,
};
