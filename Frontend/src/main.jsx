import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.scss";
import App from "./App.jsx";
import { RouterProvider } from "react-router"; 
import router from "./routers/router.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
