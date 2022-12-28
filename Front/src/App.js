import { Box } from "@mui/material";
import { Store, Cart } from "./pages";
import { useEffect, useState } from "react";
import { NavigationBar } from "./components";
import storeService from "./services/storeService";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

export default function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    storeService
      .getItems()
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  const addItemToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <Router>
      <NavigationBar />
      <Box sx={{ m: 3 }}>
        <Routes>
          <Route
            path="/"
            element={<Store addItemToCart={addItemToCart} items={items} />}
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
        </Routes>
      </Box>
    </Router>
  );
}
