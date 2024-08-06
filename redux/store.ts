import { configureStore } from "@reduxjs/toolkit";
import insDataReducer from "./orgSourceSlice";

export const store = configureStore({
  reducer: {
    oraganization: insDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
