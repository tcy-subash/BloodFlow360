import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { ColorModeProvider, useColorMode } from "./theme/ColorModeContext";
import { getTheme } from "./theme/theme";

const queryClient = new QueryClient();

function MainApp() {
  const { mode } = useColorMode();
  const activeTheme = React.useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ColorModeProvider>
        <MainApp />
      </ColorModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);