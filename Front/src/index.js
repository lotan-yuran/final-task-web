import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import "./index.css";
import App from "./App";
import { Suspense } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </RecoilRoot>
);
