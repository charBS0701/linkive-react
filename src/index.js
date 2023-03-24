import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CustomDialog from "./components/CustomDialog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <App />
      <CustomDialog />
  </React.StrictMode>
);
