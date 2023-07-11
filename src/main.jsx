import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UidContext } from "./scripts/DataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UidContext>
      <App />
    </UidContext>
  </React.StrictMode>
);
