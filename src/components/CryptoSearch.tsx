import { useState, useEffect } from "react";
import useFetch from "../helpers/useFetch";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CryptoSearch() {
  const { get } = useFetch("http://localhost:8080/");
  const { post, del } = useFetch("http://localhost:8080/");
  const [cryptos, setCryptos] = useState([]);
  const [checkedCrypto, setCheckedCrypto] = useState("");

  const handleFetch = (value, status) => {
    if (status) {
      post("checked", {
        coin: value,
      })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } else {
      // del("checked", {
      //   coin: value,
      // })
      //   .then((data) => console.log(data))
      //   .catch((error) => console.log(error));
      console.log("DELETE " + value);
    }
  };

  const handleSelection = (event, value) => {
    if (value > 0) {
      post("checked", { coin: value[value.length - 1].id })
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    get("marketdata")
      .then((data: any): void => {
        console.log(data.body);
        setCryptos(data.body);
      })
      .catch((error) => console.log("Could not load crypto", error));
  }, []);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Autocomplete
          multiple
          id="search-crypto"
          options={cryptos}
          onChange={handleSelection}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                onChange={() => handleFetch(option.id, !selected)}
              />
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
