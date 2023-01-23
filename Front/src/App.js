import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NavigationBar } from "./components";
import { Store, Cart, Login, Admin, Register, Profile, Product } from "./pages";
import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { connectedUsersState } from "./Recoil";
import { useSocket } from "./socket/SocketHook";
import { userState } from "./Recoil";

export default function App() {
  const isAdmin = true;
  const socket = useSocket();
  const setUser = useSetRecoilState(userState);
  const [searchText, setSearchText] = useState("");
  const setConnectedUsers = useSetRecoilState(connectedUsersState);

  useEffect(() => {
    socket.onmessage = event => {
      const connectedUsers = event.data;
      setConnectedUsers(connectedUsers);
    };

    // Send a messege to the server
    socket.send("connected!");

    //clean up function
    return () => {
      socket.close();
    };
  }, [socket, setConnectedUsers]);

  const checkLoggeedIn = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const jsonUser = JSON.parse(user);
      setUser(jsonUser);
    }
  };

  useEffect(() => {
    checkLoggeedIn();
  }, []);

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/Product/:id" element={<Product />} />
          {isAdmin && <Route path="/admin" element={<Admin />} />}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
