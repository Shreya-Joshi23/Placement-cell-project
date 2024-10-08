import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster/>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </>
);
