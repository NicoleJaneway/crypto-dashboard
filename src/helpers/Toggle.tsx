import { useContext, useEffect } from "react";

import Switch from "@mui/material/Switch";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import { ColorModeContext } from "./ColorModeContext";

export default function Toggle() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "end",
        padding: "6px",
      }}
    >
      <span role="img" aria-label="light mode" style={{ padding: "4px" }}>
        🌞
      </span>
      <Switch color="default" onClick={colorMode.toggleColorMode} />
      <span role="img" aria-label="dark mode" style={{ padding: "4px" }}>
        🌚
      </span>
    </div>
  );
}
