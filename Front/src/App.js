import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Store, Cart, Login } from "./pages";
import { NavigationBar } from "./components";
import storeService from "./services/storeService";
import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";

export default function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    storeService
      .getItems()
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const addItemToCart = item => {
    setCartItems(prev => [...prev, item]);
  };

  const LayoutNavbar = () => (
    <>
      <NavigationBar />
      <Box sx={{ m: 3 }}>
        <Outlet />
      </Box>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutNavbar />}>
          <Route path="/" element={<Store addItemToCart={addItemToCart} items={items} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}
