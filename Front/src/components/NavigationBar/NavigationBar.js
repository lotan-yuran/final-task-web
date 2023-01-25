import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchTextField } from "../SearchTextField";
import { StyledTypography } from "./NavigationBar.style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartQuantityState, userState } from "../../Recoil";
import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import { AdminPanelSettings, Person, ShoppingCart, LogoutRounded } from "@mui/icons-material";

export const NavigationBar = ({ onSearch }) => {
  const location = useLocation();
  const cartQuantity = useRecoilValue(cartQuantityState);
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    console.log("user");
    console.log(user);
  }, [user]);

  const logout = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <StyledTypography variant="h5" component={Link} to={"/"}>
          Store
        </StyledTypography>
        {location.pathname === "/" && <SearchTextField onSearch={onSearch} />}

        <Link to={"/cart"}>
          <IconButton color="action">
            <Badge badgeContent={cartQuantity} color="notification">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Link>
        <Link to={"/profile"}>
          <IconButton color="action">
            <Person />
          </IconButton>
        </Link>
        {user?.isAdmin && (
          <Link to={"/admin"}>
            <IconButton color="action">
              <AdminPanelSettings />
            </IconButton>
          </Link>
        )}
        <Link to={"/login"}>
          <IconButton color="action" onClick={logout}>
            <LogoutRounded />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
