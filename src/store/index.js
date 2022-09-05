import { configureStore } from "@reduxjs/toolkit";
import inventorySliceReducer from "./inventory-slice";
import cartSliceReducer from "./cart-slice";

const store = configureStore({
  reducer: { inventory: inventorySliceReducer, cart: cartSliceReducer },
});

export default store;
