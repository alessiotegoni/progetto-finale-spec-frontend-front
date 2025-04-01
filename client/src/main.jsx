import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./lib/redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";
import theme from "./lib/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
