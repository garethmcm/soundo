import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the root component
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  // This assumes there is an element with the id 'root' in your HTML
);
