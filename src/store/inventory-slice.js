import { createSlice } from "@reduxjs/toolkit";

const initialInventorySlice = {
  inventory: [],
  isInventoryLoaded: false,
  categories: [[], []],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialInventorySlice,
  reducers: {
    fetchInventoryData(state, action) {
      state.inventory = action.payload.inventoryData;
    },
    inventoryLoaded(state, action) {
      state.isInventoryLoaded = true;
    },
    populateCategories(state, action) {
      state.categories = action.payload.categories;
    },
  },
});

export const inventoryActions = inventorySlice.actions;
export default inventorySlice.reducer;
