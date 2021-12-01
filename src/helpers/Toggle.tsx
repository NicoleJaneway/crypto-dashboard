import { useContext, useEffect } from "react";

import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

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
        padding: "8px",
      }}
    >
      <Switch
        defaultChecked
        color="default"
        onClick={colorMode.toggleColorMode}
      />
      <Typography
        style={{ padding: "4px", fontSize: "0.8em", alignSelf: "center" }}
        sx={{
          color: "text.primary",
        }}
      >
        dark
      </Typography>
    </div>
  );
}
