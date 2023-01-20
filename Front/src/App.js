import { useState } from "react";
import { Box } from "@mui/material";
import { NavigationBar } from "./components";
import { Store, Cart, Login, Admin, Register } from "./pages";
import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";

export default function App() {
  const isAdmin = true;
  const [searchText, setSearchText] = useState("");

  const onSearch = value => {
    setSearchText(value);
  };

  const LayoutNavbar = () => (
    <>
      <NavigationBar onSearch={onSearch} />
      <Box sx={{ m: 3 }}>
        <Outlet />
      </Box>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutNavbar />}>
          <Route path="/" element={<Store searchText={searchText} setSearchText={setSearchText} />} />
          <Route path="/cart" element={<Cart />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
