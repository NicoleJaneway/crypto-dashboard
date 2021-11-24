import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { useState } from "react";

const fiatOptions = [
  {
    value: "USD",
    label: "USD $",
  },
  {
    value: "EUR",
    label: "EUR €",
  },
  {
    value: "CNY",
    label: "CNY 元",
  },
  {
    value: "JPY",
    label: "JPY ¥",
  },
];

export default function FiatSelector() {
  const [fiat, setFiat] = useState("USD");

  const handleChange = (event) => {
    setFiat(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="fiat-selector"
        select
        label="Select fiat currency"
        variant="outlined"
        value={fiat}
        onChange={handleChange}
      >
        {fiatOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
