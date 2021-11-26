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
  const { get, loading } = useFetch("https://api.coingecko.com/api/v3/");
  const { post } = useFetch("/");
  const [cryptos, setCryptos] = useState([]);
  const [searchedCrypto, setSearchedCrypto] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState([]);

  const handleChange = (event) => {
    setSearchedCrypto(event.target.value);
  };

  const handleCheckChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  useEffect(() => {
    console.log(selectedCrypto);
  }, [selectedCrypto]);

  useEffect(() => {
    get("coins/list")
      .then((data: { id: string; symbol: string; name: string }[]) => {
        console.log(data);
        const input = data.filter(
          (obj) =>
            obj.id === "dogecoin" ||
            obj.id === "shiba-inu" ||
            obj.id === "litecoin"
        );
        console.log(input);
        setCryptos(input);
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
          id="checkboxes-tags-demo"
          options={cryptos}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                onChange={handleCheckChange}
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
              value={searchedCrypto}
              onChange={handleChange}
            />
          )}
        />
      </Box>
    </>
  );
}
