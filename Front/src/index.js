import "./index.css";
import App from "./App";
import { muiTheme } from "./MuiTheme";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={muiTheme}>
    <App />
  </ThemeProvider>
);
