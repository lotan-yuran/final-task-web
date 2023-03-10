import "./index.css";
import App from "./App";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { muiTheme } from "./MuiTheme";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { SocketProvider } from "./socket/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={muiTheme}>
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Suspense>
    </RecoilRoot>
  </ThemeProvider>
);
