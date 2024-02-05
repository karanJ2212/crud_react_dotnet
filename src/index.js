import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

// Select the element where the React app will be mounted
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render the app within the root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
