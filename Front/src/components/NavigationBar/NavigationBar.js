import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, Toolbar } from "@mui/material";
import { StyledTypography } from "./NavigationBar.style";
import { cartQuantityState } from "../../Recoil/CartItems";
import { useRecoilValue } from "recoil";

export const NavigationBar = () => {
  const cartQuantity = useRecoilValue(cartQuantityState);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <StyledTypography variant="h5" component={Link} to={"/"}>
          Store
        </StyledTypography>
        <Link to={"/cart"}>
          <Badge badgeContent={cartQuantity} color="notification">
            <IconButton color="action">
              <ShoppingCart />
            </IconButton>
          </Badge>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
