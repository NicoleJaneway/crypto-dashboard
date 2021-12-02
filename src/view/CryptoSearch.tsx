import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { cryptoListData } from "../types";
import React from "react";

export default function CryptoSearch({
  cryptoList,
  handleSelection,
  display,
}: {
  cryptoList: cryptoListData[];
  handleSelection: (event: object, values: any) => void;
  display: { name: string }[];
}): JSX.Element {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "75ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Autocomplete
          multiple
          disableCloseOnSelect
          id="search-crypto"
          value={display}
          options={cryptoList || []}
          onChange={handleSelection}
          getOptionLabel={(option: cryptoListData) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              {option.name + " (" + option.symbol.toUpperCase() + ")"}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select cryptocurrencies to track"
              placeholder=""
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </Box>
    </>
  );
}
