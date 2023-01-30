import { Box } from "@mui/material";
import { userState } from "./Recoil";
import { useEffect, useState } from "react";
import { NavigationBar } from "./components";
import { connectedUsersState } from "./Recoil";
import { useSocket } from "./socket/SocketHook";
import { ProtectedRoute } from "./ProtectedRoute";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Store, Cart, Login, Admin, Register, Profile, Product } from "./pages";
import { Route, Routes, BrowserRouter as Router, Outlet, Navigate } from "react-router-dom";

export default function App() {
  const socket = useSocket();
  const [user, setUser] = useRecoilState(userState);
  const [searchText, setSearchText] = useState("");
  const setConnectedUsers = useSetRecoilState(connectedUsersState);

  useEffect(() => {
    socket.onmessage = event => {
      const connectedUsers = event.data;
      setConnectedUsers(connectedUsers);
    };

    socket.onopen = () => {
      if (user.email) {
        // Send a messege to the server
        socket.send("connected!");
      }
    };

    //clean up function
    return () => {
      socket.close();
    };
  }, [socket, setConnectedUsers, user]);

  useEffect(() => {
    //checkLoggeedIn
    const userL = localStorage.getItem("user");
    if (userL) {
      const jsonUser = JSON.parse(userL);
      setUser(jsonUser);
    }
  }, [setUser]);

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

  const ProtectedLoginRoute = ({ children }) => (
    <ProtectedRoute routeTo={"/login"} authCondition={user?.email}>
      {children}
    </ProtectedRoute>
  );

  const ProtectedAdminRoute = ({ children }) => (
    <ProtectedRoute routeTo={"/store"} authCondition={user?.isAdmin}>
      {children}
    </ProtectedRoute>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route element={<LayoutNavbar />}>
          <Route element={<ProtectedLoginRoute />}>
            <Route path="/store" element={<Store searchText={searchText} setSearchText={setSearchText} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Product/:id" element={<Product />} />
          </Route>
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate replace to="/store" />} />
      </Routes>
    </Router>
  );
}
