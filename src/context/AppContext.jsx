import { createContext, useContext, useReducer } from "react";
import initialData from "../assets/data/data.json";

const AppContext = createContext(null);

const AppDispatchContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialData);

  return (
    <AppContext.Provider value={state}>
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

function appReducer(state, action) {
  switch (action.type) {
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
