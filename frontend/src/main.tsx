import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.ts";
import CommonStyle from "./styles/CommonStyle.tsx";
import serviceWorker from "./mocks/serviceWorker";

if (process.env.NODE_ENV === "development") {
  serviceWorker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CommonStyle theme={theme} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
