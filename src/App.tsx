import React, { useState, useMemo, useEffect } from "react";

import logo from "./img/logo512.png";

import Typography from "@mui/material/Typography";
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

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60vw 20vw 20vw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3em auto auto",
            alignContent: "start",
          }}
        >
          <img
            src={logo}
            alt="crypto logo"
            style={{ height: "2em", margin: "0.67em", alignSelf: "start" }}
          />
          <Typography
            variant="h4"
            component="div"
            style={{
              alignSelf: "start",
              marginTop: "0.2em",
              marginLeft: "0.2em",
              color: "text.primary",
            }}
          >
            Crypto Dashboard
          </Typography>
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              justifySelf: "end",
              alignSelf: "start",
              marginTop: "2px",
            }}
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "end",
              color: "text.primary",
              borderRadius: 1,
            }}
          >
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
              style={{ justifySelf: "end", alignSelf: "start" }}
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
