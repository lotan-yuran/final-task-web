import { muiTheme } from "./MuiTheme";
import { Store, Cart, Login } from "./pages";
import { NavigationBar } from "./components";
import { Box, ThemeProvider } from "@mui/material";
// import storeService from "./services/storeService";
import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";

export default function App() {
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
      <ThemeProvider theme={muiTheme}>
        <Routes>
          <Route path="/" element={<LayoutNavbar />}>
            <Route path="/" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
