import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice"; // Adjust the path as per your project structure

const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

export default store;
