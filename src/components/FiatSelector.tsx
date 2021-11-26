import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import React, { useContext } from "react";
import { FiatContext } from "../helpers/FiatContext";

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
  {
    value: "INR",
    label: "INR ₹",
  },
];

export default function FiatSelector() {
  const { fiat, setFiat } = useContext(FiatContext);

  const handleChange = (event) => {
    setFiat(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "15ch" },
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
