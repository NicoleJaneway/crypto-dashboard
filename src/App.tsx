import React, { useState, useMemo } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./view/Header";
import Dashboard from "./view/Dashboard";

import { ColorModeContext } from "./helpers/ColorModeContext";

export default function App(): JSX.Element {
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
        <Header />
        <Dashboard />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
