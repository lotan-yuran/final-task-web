import { grey } from "@mui/material/colors";
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
      main: "#ffffff"
    },
    scrollTopButton: {
      main: "#ffffff",
      hover: grey[900]
    }
  }
});
