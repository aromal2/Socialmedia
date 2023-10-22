import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice";
import adminslice from "./adminslice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    admin:adminslice

  },
});

export default store;
