import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { StyledTypography } from "./NavigationBar.style";

export const NavigationBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <StyledTypography variant="h5" component={Link} to={"/"}>
          Store
        </StyledTypography>
        <Link to={"/cart"}>
          <IconButton color="action">
            <ShoppingCart />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
