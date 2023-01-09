import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root"),
);
