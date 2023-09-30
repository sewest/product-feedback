import { createContext, useContext, useReducer, useEffect, useCallback, useState } from "react";
import data from "../assets/data/data.json";

// Create a context to hold the state of the app
const AppContext = createContext(null);

// Create a context to hold the dispatch function for updating the state
const AppDispatchContext = createContext(null);

// The main provider component that wraps the app
export function AppProvider({ children }) {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  // The reducer function for updating the state
  function appReducer(state, action) {
    switch (action.type) {
      case "SET_SORT_ORDER":
        return { ...state, sortOrder: action.payload };
      case "LOAD_STATE":
        return { ...action.payload, sortOrder: state.sortOrder };
      case "SET_CATEGORY":
        return { ...state, category: action.payload };
      case "UPVOTE":
        return {
          ...state,
          productRequests: state.productRequests.map((item) => {
            if (item.id === action.payload) {
              return { ...item, upvotes: item.upvotes + 1 };
            }
            return item;
          }),
        };
      case "ADD_FEEDBACK":
        const newFeedback = {
          id: state.productRequests.length + 1,
          ...action.payload,
        };
        return {
          ...state,

          productRequests: [...state.productRequests, newFeedback],
        };
      case "EDIT_FEEDBACK":
        return {
          ...state,
          productRequests: state.productRequests.map((item) => {
            if (item.id === action.payload.id) {
              return { id: item.id, ...action.payload.content };
            }
            return item;
          }),
        };

      case "DELETE_FEEDBACK":
        return {
          ...state,
          productRequests: state.productRequests.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  }

  const initialData = {
    ...data,
    sortOrder: "Most Upvotes",
    category: null,
  };

  // Use the useReducer hook to manage the state of the app
  const [state, dispatch] = useReducer(appReducer, initialData);

  // Get the total number of suggestions from the state
  const getSuggestionCount = useCallback(() => {
    return state.productRequests.filter((item) => item.status === "suggestion").length;
  }, [state.productRequests]);

  const getDataByStatus = useCallback(
    (status) => {
      // Filter the items by status
      const filteredItems = state.productRequests.filter((item) => item.status === status);

      // Sort the filtered items in descending order of upvotes
      const sortedItems = filteredItems.sort((a, b) => b.upvotes - a.upvotes);

      return sortedItems;
    },
    [state.productRequests]
  );

  // Get a request by its ID from the state
  const getRequestById = useCallback(
    (id) => {
      return state.productRequests.find((item) => item.id === id);
    },
    [state.productRequests]
  );

  //So this was a pain to figure out. Here's an article about the basics for a refresher:
  //https://www.javascripttutorial.net/javascript-array-sort/
  const getSortedSuggestions = useCallback(() => {
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
  }, [state.productRequests, state.sortOrder]);

  const getFilteredSuggestions = useCallback((category) => {
    const sortedSuggestions = getSortedSuggestions();

    switch (state.category) {
      case "UI":
        return sortedSuggestions.filter((item) => item.category === "ui");
      case "UX":
        return sortedSuggestions.filter((item) => item.category === "ux");
      case "Feature":
        return sortedSuggestions.filter((item) => item.category === "feature");
      case "Bug":
        return sortedSuggestions.filter((item) => item.category === "bug");
      case "Enhancement":
        return sortedSuggestions.filter((item) => item.category === "enhancement");
      default:
        return sortedSuggestions;
    }
  });

  // Save the state to local storage whenever it changes
  useEffect(() => {
    if (isAppLoaded) {
      localStorage.setItem("state", JSON.stringify(state));
    }
  }, [state]);

  // Load the state from local storage if it exists, otherwise load from data.json
  useEffect(() => {
    const savedState = localStorage.getItem("state");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      dispatch({ type: "LOAD_STATE", payload: parsedState });
      setIsAppLoaded(true);
    } else {
      dispatch({ type: "LOAD_STATE", payload: initialData });
      setIsAppLoaded(true);
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, getSuggestionCount, getDataByStatus, getRequestById, getFilteredSuggestions }}>
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
