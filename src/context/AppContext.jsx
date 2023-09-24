import { createContext, useContext, useReducer } from "react";
import data from "../assets/data/data.json";

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

  //So this was a pain to figure out. Here's an article about the basics for a refresher:
  //https://www.javascripttutorial.net/javascript-array-sort/
  const getSortedSuggestions = () => {
    // Switch statement to handle different sort orders
    switch (state.sortOrder) {
      case "Most Upvotes":
        // Sort the productRequests array in descending order based on upvotes count
        return state.productRequests.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));

      case "Least Upvotes":
        // Sort the productRequests array in ascending order based on upvotes count
        return state.productRequests.sort((a, b) => (a.upvotes || 0) - (b.upvotes || 0));

      case "Most Comments":
        // Sort the productRequests array in descending order based on total comments count
        return state.productRequests.sort((a, b) => {
          // Calculate total comments count for each product request
          // We need the sum of the comments and replies here. We also need to default to 0 if there are no comments or replies. Same down below for least comments.
          const aTotalComments = (a.comments?.length || 0) + (a.comments?.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0) || 0);
          const bTotalComments = (b.comments?.length || 0) + (b.comments?.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0) || 0);
          // Sort based on total comments count in descending order
          return bTotalComments - aTotalComments;
        });

      case "Least Comments":
        // Sort the productRequests array in ascending order based on total comments count
        return state.productRequests.sort((a, b) => {
          // Calculate total comments count for each product request
          const aTotalComments = (a.comments?.length || 0) + (a.comments?.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0) || 0);
          const bTotalComments = (b.comments?.length || 0) + (b.comments?.reduce((sum, comment) => sum + (comment.replies?.length || 0), 0) || 0);
          // Sort based on total comments count in ascending order
          return aTotalComments - bTotalComments;
        });

      default:
        // Default case: Sort the productRequests array in descending order based on upvotes count
        return state.productRequests.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }
  };

  // Provide the state and the helper functions to the child components
  return (
    <AppContext.Provider value={{ state, getSuggestionCount, getDataByStatus, getRequestById, getSortedSuggestions }}>
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
  switch (action.type) {
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
}

const initialData = {
  ...data,
  sortOrder: "Most Upvotes",
};
