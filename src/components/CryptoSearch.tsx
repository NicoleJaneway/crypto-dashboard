import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useState } from "react";

export default function CryptoSearch() {
  const [currency, setCurrency] = useState("");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    // const { get, loading } = useFetch("https://api.coingecko.com/api/v3/");

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
        label="Select crypto"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}
