import React, { useState, useMemo } from "react";

import logo from "./img/logo512.png";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import FiatSelector from "./components/FiatSelector";
import PriceTable from "./components/PriceTable";
import CryptoSearch from "./components/CryptoSearch";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "3em auto auto" }}>
          <img
            src={logo}
            alt="crypto logo"
            style={{ height: "2em", margin: "0.67em", alignSelf: "start" }}
          />
          <h1
            style={{
              alignSelf: "start",
              marginTop: "0.2em",
              marginLeft: "0.2em",
            }}
          >
            Crypto Dashboard
          </h1>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 1,
              p: 3,
            }}
          >
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </div>
        <div style={{ justifySelf: "end" }}>
          <CryptoSearch />
        </div>
        <div style={{ justifySelf: "end" }}>
          <FiatSelector />
        </div>
      </div>
      <PriceTable />
    </>
  );
}

export default function App() {
  let mode: any;
  let setMode: any;
  [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
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
