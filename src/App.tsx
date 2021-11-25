import React, { useState, useMemo, useEffect } from "react";

import logo from "./img/logo512.png";

import Typography from "@mui/material/Typography";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import Toggle from "./helpers/Toggle";
import FiatSelector from "./components/FiatSelector";
import PriceTable from "./components/PriceTable";
import CryptoSearch from "./components/CryptoSearch";

import { ColorModeContext } from "./helpers/ColorModeContext";

function MyApp() {
  return (
    <>
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
          sx={{
            alignSelf: "start",
            marginTop: "0.2em",
            marginLeft: "0.2em",
            color: "text.primary",
          }}
        >
          Crypto Dashboard
        </Typography>
        <Toggle />
      </div>
      <hr />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "60vw 20vw 20vw",
        }}
      >
        <div></div>
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
