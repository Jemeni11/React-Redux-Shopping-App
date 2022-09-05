import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { inventoryActions } from "./store/inventory-slice";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Home,
  Categories,
  Category,
  Product,
  Cart,
  Error404Page,
} from "./pages";
import Navbar from "./components/Navbar/Navbar";
import NormalizeURL from "./helpers/NormalizeURL";
import CapitalizeString from "./helpers/CapitalizeString";

function App() {
  const dispatch = useDispatch();

  const populateInventory = (inventoryData = []) => {
    dispatch(inventoryActions.fetchInventoryData({ inventoryData }));
    dispatch(inventoryActions.inventoryLoaded());
  };

  const populateCategories = (inventoryData = []) => {
    let inventoryCategories = [[], []];
    inventoryData.map((item) => {
      if (!inventoryCategories[0].includes(CapitalizeString(item.category))) {
        inventoryCategories[0].push(CapitalizeString(item.category));
        inventoryCategories[1].push(NormalizeURL(item.category));
      }
    });
    dispatch(
      inventoryActions.populateCategories({ categories: inventoryCategories })
    );
  };

  const FIREBASE_INVENTORY_URL =
    "https://redux-shopping-cart-b9135-default-rtdb.firebaseio.com/inventory.json";

  useEffect(() => {
    fetch(FIREBASE_INVENTORY_URL)
      .then((res) => res.json())
      .then((data) => {
        for (const [, value] of Object.entries(data)) {
          populateInventory(value);
          populateCategories(value);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/:category" element={<Category />} />
        <Route path="categories/:category/:productId" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="error/:pageTitle" element={<Error404Page />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
