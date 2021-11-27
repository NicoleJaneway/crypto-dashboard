import React, { useState, useMemo, useEffect } from "react";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

import { ColorModeContext } from "./helpers/ColorModeContext";

function MyApp() {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  );
}

export default function App() {
  let mode: any;
  let setMode: any;
  [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
