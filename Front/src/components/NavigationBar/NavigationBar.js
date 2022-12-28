import { Link } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export const NavigationBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            boxShadow: "none",
            color: "#fff",
          }}
          component={Link}
          to={"/"}
        >
          Store
        </Typography>
        <Link to={"/cart"}>
          <IconButton>
            <ShoppingCart />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
