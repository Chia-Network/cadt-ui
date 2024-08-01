import "flowbite";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// @ts-ignore
import { PersistGate } from "redux-persist/integration/react";
// @ts-ignore
import { store, persistor } from "@/store"

const root = ReactDOM.createRoot(document.getElementById("root") || document.createElement("div"));

localStorage.theme = "light";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
