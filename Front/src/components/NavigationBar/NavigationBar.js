import { useRecoilValue } from "recoil";
import { cartQuantityState, userState } from "../../Recoil";
import { Link, useLocation } from "react-router-dom";
import { SearchTextField } from "../SearchTextField";
import { StyledTypography } from "./NavigationBar.style";
import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import { AdminPanelSettings, Person, ShoppingCart } from "@mui/icons-material";
import { useEffect } from "react";

export const NavigationBar = ({ onSearch }) => {
  const location = useLocation();
  const cartQuantity = useRecoilValue(cartQuantityState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log("user")
    console.log(user)
  }, [user])
  

  return (
    <AppBar position="sticky">
      <Toolbar>
        <StyledTypography variant="h5" component={Link} to={"/"}>
          Store 
        </StyledTypography>

        {user?.name &&<span>hello {`${user?.name}    `}</span>}

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
        <Link to={"/admin"}>
          <IconButton color="action">
            <AdminPanelSettings />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
