import { createContext, useEffect, useReducer } from "react";

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    // Avoids parsing "null" or "undefined" strings and handles empty storage
    if (!storedUser || storedUser === "undefined") return null;
    return JSON.parse(storedUser);
  } catch (error) {
    return null;
  }
};

const INITIAL_CONTEXT = {
  user: getInitialUser(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_CONTEXT);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_CONTEXT);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
