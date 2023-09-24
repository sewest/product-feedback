import { createContext, useContext, useReducer } from "react";
import initialData from "../assets/data/data.json";

const AppContext = createContext(null);

const AppDispatchContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialData);

  //Get the total number of suggestions
  const getSuggestionCount = () => {
    return state.productRequests.filter((item) => item.status === "suggestion").length;
  };

  const getDataByStatus = (status) => {
    return state.productRequests.filter((item) => item.status === status);
  };

  const getRequestById = (id) => {
    return state.productRequests.find((item) => item.id === id);
  };

  return (
    <AppContext.Provider value={{ state, getSuggestionCount, getDataByStatus, getRequestById }}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

function appReducer(state, action) {}
