import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../features/products/productsSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import categoryReducer from "../features/category/categorySlice";
import cartReducer from "../features/cart/cartSlice"

const store = configureStore({
  reducer: {
    productsR: productsReducer,
    singleProductR: singleProductReducer,
    categoryR: categoryReducer,
    cartR: cartReducer,
  },
});

export default store;
