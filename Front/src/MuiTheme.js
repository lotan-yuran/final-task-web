import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: grey[600]
    },
    action: {
      main: blue[50]
    }
  }
});
