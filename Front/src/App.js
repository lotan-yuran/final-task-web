import { Box } from "@mui/material";
import { NavigationBar } from "./components";
import { Store, Cart, Login, Admin } from "./pages";
import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";

export default function App() {
  const isAdmin = true;
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
          <Route path="/" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}
