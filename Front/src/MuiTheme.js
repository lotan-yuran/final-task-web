import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: "#9faec5"
    },
    notification: {
      main: "purple"
    },
    action: {
      main: "#ffffff",
      hover: grey[900]
    }
  }
});
