import { createSlice } from "@reduxjs/toolkit";

const initialCartSlice = {
  selectedItems: [],
  subTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartSlice,
  reducers: {
    addCart(state, action) {
      const productID = action.payload.id;
      const isProductInCart =
        state.selectedItems.length > 0
          ? state.selectedItems?.find((item) => item.id === productID)
          : false;
      if (!isProductInCart) {
        state.selectedItems = [...state.selectedItems, action.payload.value];
      } else {
        const itemInCartIndex = state.selectedItems?.findIndex(
          (item) => item.id === productID
        );
        state.selectedItems[itemInCartIndex].amount =
          action.payload.value.amount;
      }
    },
    removeCart(state, action) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.value.id
      );
    },
    clearCart(state, action) {
      state.selectedItems = [];
    },
    calculateSubTotal(state, action) {
      state.subTotal = state.selectedItems.reduce(
        (prev, next) => prev + next.price * next.amount,
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
