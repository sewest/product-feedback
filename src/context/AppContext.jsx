import { createContext, useContext, useReducer } from "react";
import initialData from "../assets/data/data.json";

// Create a context to hold the state of the app
const AppContext = createContext(null);

// Create a context to hold the dispatch function for updating the state
const AppDispatchContext = createContext(null);

// The main provider component that wraps the app
export function AppProvider({ children }) {
  // Use the useReducer hook to manage the state of the app
  const [state, dispatch] = useReducer(appReducer, initialData);

  // Get the total number of suggestions from the state
  const getSuggestionCount = () => {
    return state.productRequests.filter((item) => item.status === "suggestion").length;
  };

  // Get the data by status from the state
  const getDataByStatus = (status) => {
    return state.productRequests.filter((item) => item.status === status);
  };

  // Get a request by its ID from the state
  const getRequestById = (id) => {
    return state.productRequests.find((item) => item.id === id);
  };

  // Provide the state and the helper functions to the child components
  return (
    <AppContext.Provider value={{ state, getSuggestionCount, getDataByStatus, getRequestById }}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

// Custom hook to access the app state
export function useAppState() {
  return useContext(AppContext);
}

// Custom hook to access the dispatch function
export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

// The reducer function for updating the state
function appReducer(state, action) {
  // ... implementation of the reducer ...
}
