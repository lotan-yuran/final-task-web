import { Link, useLocation } from "react-router-dom";
import { SearchTextField, StyledTypography } from "./NavigationBar.style";
import { AdminPanelSettings, Search, ShoppingCart } from "@mui/icons-material";
import { AppBar, IconButton, InputAdornment, TextField, Toolbar } from "@mui/material";

export const NavigationBar = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <StyledTypography variant="h5" component={Link} to={"/"}>
          Store
        </StyledTypography>

        {location.pathname === "/" && (
          <SearchTextField
            size="small"
            variant="filled"
            // onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        )}

        <Link to={"/cart"}>
          <IconButton color="action">
            <ShoppingCart />
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
