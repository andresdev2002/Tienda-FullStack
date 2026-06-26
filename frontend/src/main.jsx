import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { ThemeModeProvider } from "./theme/ThemeModeContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <ThemeModeProvider>

      <AuthProvider>

        <BrowserRouter>

          <App />

        </BrowserRouter>

      </AuthProvider>

    </ThemeModeProvider>

  </React.StrictMode>
);