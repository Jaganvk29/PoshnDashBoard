import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { AuthProvider } from "../src/Context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "https://girish.ml";

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Suspense>,

  document.getElementById("root")
);

reportWebVitals();
