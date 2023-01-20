import { grey, amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: "#9faec5"
    },
    notification: {
      main: "#d53ed5"
    },
    action: {
      main: "#ffffff",
      hover: grey[900]
    },
    itemlist: {
      main: amber[50]
    }
  }
});
